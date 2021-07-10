import Realm from "realm";

import { Result } from "ikaWidget2";
import { STAGES, RULES, config } from "./config";

function filter(result: Result, ids: string[]): boolean {
  const myMemberIds = result.myMembers
    .map((player) => player.principalID)
    .filter((id): id is string => {
      return !!id;
    });

  return ids.every((id) => myMemberIds.includes(id));
}

async function main(): Promise<void> {
  const db = new Realm({ path: config.path });
  const results = db.objects<Result>("Result");

  console.log(results.length);
  const ids = config.playerIds;
  const filteredResults = results.filter((result) => filter(result, ids));

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

  const stages = STAGES;
  const rules = RULES;

  console.log(["", ...rules].join(","));
  stages.forEach((stage) => {
    const line: string[] = [stage];
    rules.forEach((rule) => {
      if (!stats[stage][rule]) {
        stats[stage][rule] = { win: 0, lose: 0 };
      }
      const win = stats[stage][rule].win;
      const lose = stats[stage][rule].lose;
      const total = win + lose;
      const rate = total === 0 ? 0 : win / total;
      line.push(`${total}`);
    });
    console.log(line.join(","));
  });

  stages.forEach((stage) => {
    const win = rules.reduce((prev, cur) => {
      return prev + stats[stage][cur].win;
    }, 0);
    const total = rules.reduce((prev, cur) => {
      return prev + stats[stage][cur].win + stats[stage][cur].lose;
    }, 0);
    console.log(stage, win, total, win / total);
  });

  rules.forEach((rule) => {
    const win = stages.reduce((prev, cur) => {
      return prev + stats[cur][rule].win;
    }, 0);
    const total = stages.reduce((prev, cur) => {
      return prev + stats[cur][rule].win + stats[cur][rule].lose;
    }, 0);
    console.log(rule, win, total, win / total);
  });

  const win = stages.reduce((prev, stage) => {
    return (
      prev +
      rules.reduce((prev, rule) => {
        return prev + stats[stage][rule].win;
      }, 0)
    );
  }, 0);
  const total = stages.reduce((prev, stage) => {
    return (
      prev +
      rules.reduce((prev, rule) => {
        return prev + stats[stage][rule].win + stats[stage][rule].lose;
      }, 0)
    );
  }, 0);

  console.log("total", win, total, win / total);

  db.close();
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
