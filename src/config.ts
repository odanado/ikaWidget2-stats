export type Config = {
  path: string;
  playerIds: string[];
};

export const config: Config = {
  path: "./data/stats.realm",
  playerIds: ["584fb3fbce50cc27", "c5ffec79c3607d96", "3f17872fa875a69c"],
};

export const STAGES = [
  "チョウザメ造船",
  "タチウオパーキング",
  "ハコフグ倉庫",
  "Ｂバスパーク",
  "ガンガゼ野外音楽堂",
  "デボン海洋博物館",
  "海女美術大学",
  "ムツゴ楼",
];
export const RULES = [
  "ガチホコバトル",
  "ガチエリア",
  "ガチヤグラ",
  "ガチアサリ",
  "ナワバリバトル",
];
