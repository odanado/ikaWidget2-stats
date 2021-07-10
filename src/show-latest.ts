import Realm from "realm";

import { Result } from "ikaWidget2";
import { config } from "./config";

async function main(): Promise<void> {
  const db = new Realm({ path: config.path });
  const results = db.objects<Result>("Result");

  console.log(results.length);
  // 直近のみかたの id を知る
  const result = results[results.length - 1];

  [...new Array(3).keys()].forEach((i) => {
    console.log(result.myMembers[i].principalID);
    console.log(result.myMembers[i].name);
  });

  db.close();
}

main();
