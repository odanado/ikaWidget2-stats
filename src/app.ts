import fs from "fs";
import Realm from "realm";

import { Result } from "ikaWidget2";

import { getResult } from "./utils";

function filter(result: Result, ids: string[]): boolean {
  const myMemberIds = result.myMembers
    .map(player => player.principalID)
    .filter((id): id is string => {
      return !!id;
    });

  return ids.every(id => myMemberIds.includes(id));
}

async function main(): Promise<void> {
  const db = new Realm({ path: "./data/stats.realm" });
  const results = db.objects<Result>("Result");
  const result = results[results.length - 20];
  [...new Array(3).keys()].forEach(i => {
    console.log(result.myMembers[i].principalID);
    console.log(result.myMembers[i].name);
  });
  const ids = ["584fb3fbce50cc27", "c5ffec79c3607d96", "3f17872fa875a69c"];
  const filteredResults = results.filter(result => filter(result, ids));

  type Count = {
    win: number;
    lose: number;
  };
  type Stats = {
    [stage: string]: {
      [rule: string]: Count;
    };
  };

  const stats = filteredResults.reduce<Stats>((prev, cur) => {
    const stage = cur.stage?.name;
    const rule = cur.game?.rule;
    if (!stage || !rule) {
      console.log("warning", stage, rule);
      return prev;
    }
    if (!prev[stage]) {
      prev[stage] = {};
    }
    if (!prev[stage][rule]) {
      prev[stage][rule] = { win: 0, lose: 0 };
    }
    const win = prev[stage][rule].win || 0;
    const lose = prev[stage][rule].lose || 0;

    const count: Count = cur.win
      ? { win: win + 1, lose }
      : { win, lose: lose + 1 };

    prev[stage][rule] = count;
    return prev;
  }, {});

  const rules = [
    "ガチホコバトル",
    "ガチエリア",
    "ガチヤグラ",
    "ガチアサリ",
    "ナワバリバトル"
  ];
  console.log(["", ...rules].join(","));
  Object.keys(stats).forEach(stage => {
    const line: string[] = [stage];
    rules.forEach(rule => {
      if (!stats[stage][rule]) {
        stats[stage][rule] = { win: 0, lose: 0 };
      }
      const win = stats[stage][rule].win;
      const lose = stats[stage][rule].lose;
      const total = win + lose;
      const rate = total === 0 ? 0 : win / total;
      line.push(`${win}/${total}`);
    });
    console.log(line.join(","));
  });

  db.close();
}

main();

process.on("unhandledRejection", reason => {
  console.error(reason);
  process.exit(1);
});
