import { Result, Player, Gear, Weapon } from "ikaWidget2";
import { format } from "date-fns";

interface Image {
  ID: number;
  image?: string;
  name?: string;
}

function convertImage(image?: Image) {
  if (!image) return;

  return {
    id: image.ID,
    image: image.image,
    name: image.name,
  };
}

function convertGear(gear?: Gear) {
  if (!gear) return undefined;
  return {
    id: gear.ID,
    image: gear.image,
    kind: gear.kind,
    name: gear.name,
    brand: {
      id: gear.brand?.ID,
      name: gear.brand?.name,
      image: gear.brand?.image,
      frequent_skill: {
        name: gear.brand?.frequentSkill?.name,
        id: gear.brand?.frequentSkill?.ID,
        image: gear.brand?.frequentSkill?.image,
      },
    },
    thumbnail: "TODO",
    rarity: 1, // TODO
  };
}

function convertWeapon(weapon?: Weapon) {
  if (!weapon) return;
  return {
    id: weapon.ID,
    thumbnail: weapon.thumbnail,
    name: weapon.name,
    image: weapon.image,
    special: {
      id: weapon.special?.ID,
      image_a: weapon.special?.imageA,
      image_b: weapon.special?.imageB,
      name: weapon.special?.name,
    },
    sub: {
      id: weapon.sub?.ID,
      image_a: weapon.sub?.imageA,
      image_b: weapon.sub?.imageB,
      name: weapon.sub?.name,
    },
  };
}

function convertPlayer(player: Player | undefined, i: number) {
  if (!player) return;
  return {
    special_count: player.special,
    game_paint_point: player.paintPoint,
    sort_score: i,
    kill_count: player.kill,
    assist_count: player.assist,
    death_count: player.death,
    player: {
      nickname: player.name,
      shoes: convertGear(player.shoesGear),
      clothes: convertGear(player.clothesGear),
      head: convertGear(player.headGear),
      shoes_skills: {
        main: convertImage(player.shoesSkills?.main),
        subs: player.shoesSkills?.subs.map((sub) => convertImage(sub)),
      },
      clothes_skills: {
        main: convertImage(player.clothesSkills?.main),
        subs: player.clothesSkills?.subs.map((sub) => convertImage(sub)),
      },
      head_skills: {
        main: convertImage(player.headSkills?.main),
        subs: player.headSkills?.subs.map((sub) => convertImage(sub)),
      },
      udemae: {
        name: player.udemae,
        s_plus_number: player.sPlusNumber,
        is_x: player.udemaeIsX,
      },
      principal_id: player.principalID,
      weapon: convertWeapon(player.weapon),
      star_rank: player.starRank,
      player_type: {
        style: player.style,
        species: "TODO", // TODO
      },
      player_rank: player.rank,
    },
  };
}

function getTeamMembers(players: Player[]) {
  return players.map((player, i) => {
    return convertPlayer(player, i);
  });
}

function convertTeamResult(isWin: boolean) {
  return {
    name: isWin ? "WIN!" : "LOSE…",
    key: isWin ? "victory" : "defeat",
  };
}

function convertPlayerCSV(
  player: Player | undefined,
  prefix: string
): [string, unknown][] {
  if (!player) return [];

  const primitiveNames = [
    "name",
    "principalID",
    "rank",
    "udemae",
    "udemaeName",
    "sPlusNumber",
    "udemaeIsX",
    "udemaeIsReached",
    "isCrown",
    "starRank",
    "kill",
    "death",
    "assist",
    "special",
    "ratio",
    "allKill",
    "sortScore",
    "paintPoint",
    "fesGrade",
    "fesGradeName",
  ] as const;

  let csvResults: [string, unknown][] = [];

  csvResults = csvResults.concat(
    primitiveNames.map((name) => {
      const suffix =
        name === "udemaeName"
          ? name
          : `${name[0].toUpperCase()}${name.slice(1)}`;
      const value = name === "name" ? `"${player[name]}"` : player[name];
      return [`${prefix}${suffix}`, value];
    })
  );

  csvResults = csvResults.concat([
    [`${prefix}WeaponID`, player.weapon?.ID],
    [`${prefix}WeaponName`, player.weapon?.name],
    [`${prefix}WeaponSpecialID`, player.weapon?.special?.ID],
    [`${prefix}WeaponSpecialName`, player.weapon?.special?.name],
    [`${prefix}WeaponSubID`, player.weapon?.sub?.ID],
    [`${prefix}WeaponSubName`, player.weapon?.sub?.name],
  ]);

  csvResults = csvResults.concat([
    [`${prefix}HeadID`, player.headGear?.ID],
    [`${prefix}HeadName`, player.headGear?.name],
    [`${prefix}HeadRarity`, player.headGear?.rarity ?? 0],
    [`${prefix}HeadKind`, player.headGear?.kind],
    [`${prefix}HeadBrandID`, player.headGear?.brand?.ID],
    [`${prefix}HeadBrandName`, player.headGear?.brand?.name],
    [
      `${prefix}HeadBrandFrequentSkillID`,
      player.headGear?.brand?.frequentSkill?.ID,
    ],
    [
      `${prefix}HeadBrandFrequentSkillName`,
      player.headGear?.brand?.frequentSkill?.name,
    ],
    [`${prefix}HeadSkillID`, player.headSkills?.main?.ID],
    [`${prefix}HeadSkillName`, player.headSkills?.main?.name],
    [`${prefix}HeadSub1SkillID`, player.headSkills?.subs[0]?.ID],
    [`${prefix}HeadSub1SkillName`, player.headSkills?.subs[0]?.name],
    [`${prefix}HeadSub2SkillID`, player.headSkills?.subs[1]?.ID],
    [`${prefix}HeadSub2SkillName`, player.headSkills?.subs[1]?.name],
    [`${prefix}HeadSub3SkillID`, player.headSkills?.subs[2]?.ID],
    [`${prefix}HeadSub3SkillName`, player.headSkills?.subs[2]?.name],
    [`${prefix}ClothesID`, player.clothesGear?.ID],
    [`${prefix}ClothesName`, player.clothesGear?.name],
    [`${prefix}ClothesRarity`, player.clothesGear?.rarity ?? 0],
    [`${prefix}ClothesKind`, player.clothesGear?.kind],
    [`${prefix}ClothesBrandID`, player.clothesGear?.brand?.ID],
    [`${prefix}ClothesBrandName`, player.clothesGear?.brand?.name],
    [
      `${prefix}ClothesBrandFrequentSkillID`,
      player.clothesGear?.brand?.frequentSkill?.ID,
    ],
    [
      `${prefix}ClothesBrandFrequentSkillName`,
      player.clothesGear?.brand?.frequentSkill?.name,
    ],
    [`${prefix}ClothesSkillID`, player.clothesSkills?.main?.ID],
    [`${prefix}ClothesSkillName`, player.clothesSkills?.main?.name],
    [`${prefix}ClothesSub1SkillID`, player.clothesSkills?.subs[0]?.ID],
    [`${prefix}ClothesSub1SkillName`, player.clothesSkills?.subs[0]?.name],
    [`${prefix}ClothesSub2SkillID`, player.clothesSkills?.subs[1]?.ID],
    [`${prefix}ClothesSub2SkillName`, player.clothesSkills?.subs[1]?.name],
    [`${prefix}ClothesSub3SkillID`, player.clothesSkills?.subs[2]?.ID],
    [`${prefix}ClothesSub3SkillName`, player.clothesSkills?.subs[2]?.name],
    [`${prefix}ShoesID`, player.shoesGear?.ID],
    [`${prefix}ShoesName`, player.shoesGear?.name],
    [`${prefix}ShoesRarity`, player.shoesGear?.rarity ?? 0],
    [`${prefix}ShoesKind`, player.shoesGear?.kind],
    [`${prefix}ShoesBrandID`, player.shoesGear?.brand?.ID],
    [`${prefix}ShoesBrandName`, player.shoesGear?.brand?.name],
    [
      `${prefix}ShoesBrandFrequentSkillID`,
      player.shoesGear?.brand?.frequentSkill?.ID,
    ],
    [
      `${prefix}ShoesBrandFrequentSkillName`,
      player.shoesGear?.brand?.frequentSkill?.name,
    ],
    [`${prefix}ShoesSkillID`, player.shoesSkills?.main?.ID],
    [`${prefix}ShoesSkillName`, player.shoesSkills?.main?.name],
    [`${prefix}ShoesSub1SkillID`, player.shoesSkills?.subs[0]?.ID],
    [`${prefix}ShoesSub1SkillName`, player.shoesSkills?.subs[0]?.name],
    [`${prefix}ShoesSub2SkillID`, player.shoesSkills?.subs[1]?.ID],
    [`${prefix}ShoesSub2SkillName`, player.shoesSkills?.subs[1]?.name],
    [`${prefix}ShoesSub3SkillID`, player.shoesSkills?.subs[2]?.ID],
    [`${prefix}ShoesSub3SkillName`, player.shoesSkills?.subs[2]?.name],
  ]);

  return csvResults;
}

export function getResultCSV(result: Result) {
  let csvResults: [string, unknown][] = [];

  csvResults = csvResults.concat([
    ["no", result.no],
    ["startTime", format(result.startTime!, "yyyy/MM/dd HH:mm:ss")],
    ["elapsedTime", result.elapsedTime],
    ["win", result.win ? 1 : 0],
    ["udemae", result.udemae],
    ["udemaeName", result.udemaeName],
    ["udemaeIsX", result.udemaeIsX],
    ["udemaeIsReached", result.udemaeIsReached],
    ["sPlusNumber", result.sPlusNumber],
    ["xRanking", result.xRanking],
    ["xPower", result.xPower],
    ["myCount", result.myCount],
    ["otherCount", result.otherCount],
    ["winMeter", result.winMeter],
    ["weaponPaintPoint", result.weaponPaintPoint],
    ["leaguePoint", result.leaguePoint],
    ["leagueMaxPoint", result.leagueMaxPoint],
    ["leagueTeamEstimatePoint", result.leagueTeamEstimatePoint],
    ["leagueOtherEstimatePoint", result.leagueOtherEstimatePoint],
    ["gachiEstimatePower", result.gachiEstimatePower],
    ["gachiEstimateXPower", result.gachiEstimateXPower],
    ["fesPoint", result.fesPoint],
    ["fesPower", result.fesPower],
    ["fesMaxPower", result.fesMaxPower],
    ["fesTeamEstimatePower", result.fesTeamEstimatePower],
    ["fesOtherEstimatePower", result.fesOtherEstimatePower],
    ["stageID", result.stage?.ID],
    ["stageName", result.stage?.name],
    ["gameKey", result.game?.key],
    ["gameMode", result.game?.mode],
    ["gameModeKey", result.game?.modeKey],
    ["gameRule", result.game?.rule],
    ["gameRuleKey", result.game?.ruleKey],
    ["gameType", result.game?.type],
    ["fesID", result.fes?.ID ?? 0],
    ["fesMyTheme", result.fes?.myTheme],
    ["fesMyThemeKey", result.fes?.myThemeKey],
    ["fesOtherTheme", result.fes?.otherTheme],
    ["fesOtherThemeKey", result.fes?.otherThemeKey],
    ["fesMyColorR", result.fes?.myColorR ?? 0],
    ["fesMyColorG", result.fes?.myColorG ?? 0],
    ["fesMyColorB", result.fes?.myColorB ?? 0],
    ["fesOtherColorR", result.fes?.otherColorR ?? 0],
    ["fesOtherColorG", result.fes?.otherColorG ?? 0],
    ["fesOtherColorB", result.fes?.otherColorB ?? 0],
  ]);

  csvResults = csvResults.concat(convertPlayerCSV(result.player, "player"));
  result.myMembers.forEach((player, i) => {
    csvResults = csvResults.concat(convertPlayerCSV(player, `alpha${i + 1}`));
  });
  result.otherMembers.forEach((player, i) => {
    csvResults = csvResults.concat(convertPlayerCSV(player, `bravo${i + 1}`));
  });

  return csvResults;
}

export function getResult(result: Result) {
  return {
    my_team_members: getTeamMembers(result.myMembers),
    elapsed_time: result.elapsedTime,
    star_rank: result.starRank,
    crown_players: null, // TODO
    game_mode: {
      name: result.game?.mode,
      key: result.game?.modeKey,
    },
    my_team_result: convertTeamResult(result.win),
    other_team_result: convertTeamResult(!result.win),
    battle_number: result.no,
    player_rank: result.player?.rank,
    other_team_members: getTeamMembers(result.otherMembers),
    estimate_x_power: result.gachiEstimateXPower,
    estimate_gachi_power: result.gachiEstimatePower,
    rank: null, // TODO
    start_time: (result.startTime || new Date()).getTime() / 1000,
    player_result: convertPlayer(result.player, 3), // TODO
    weapon_paint_point: result.weaponPaintPoint,
    udemae: {
      name: result.udemaeName,
      s_plus_number: result.sPlusNumber,
      number: result.udemae,
      is_x: result.udemaeIsX,
      is_number_reached: result.udemaeIsReached,
    },
    rule: {
      multiline_name: result.game?.rule, // TODO ガチ\nエリア みたいにする
      name: result.game?.rule,
      key: result.game?.ruleKey,
    },
    stage: convertImage(result.stage),
    type: result.game?.type,
    other_team_count: result.otherCount,
    my_team_count: result.myCount,
    x_power: result.xPower,
  };
}
