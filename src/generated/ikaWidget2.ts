declare module "ikaWidget2" {
  type Boss = {
    key?: string;
    id: number;
    name?: string;
  };
  type BossCount = {
    boss?: Boss;
    count: number;
  };
  type Brand = {
    ID: number;
    name?: string;
    image?: string;
    frequentSkill?: Skill;
  };
  type CoopResult = {
    jobID: number;
    isClear: boolean;
    failureReason?: string;
    failureWave: number;
    dangerRate: number;
    schedule?: CoopSchedule;
    startTime?: Date;
    playTime?: Date;
    endTime?: Date;
    jobScore: number;
    jobRate: number;
    kumaPoint: number;
    grade?: Grade;
    gradePoint: number;
    gradePointDelta: number;
    myResult?: Worker;
    otherResults: Worker[];
    playerType?: PlayerType;
    bossCounts: BossCount[];
    waveDetails: WaveDetail[];
  };
  type CoopSchedule = {
    startTimeKey: number;
    startTime?: Date;
    endTime?: Date;
    stage?: CoopStage;
    weapons: CoopWeapon[];
  };
  type CoopStage = {
    name?: string;
    image?: string;
  };
  type CoopWeapon = {
    id: number;
    name?: string;
    image?: string;
    thumbnail?: string;
  };
  type EventType = {
    key?: string;
    name?: string;
  };
  type Fes = {
    ID: number;
    myTheme?: string;
    myThemeKey?: string;
    otherTheme?: string;
    otherThemeKey?: string;
    myColorR: number;
    myColorG: number;
    myColorB: number;
    otherColorR: number;
    otherColorG: number;
    otherColorB: number;
    mode?: string;
    modeKey?: string;
    eventType?: string;
    eventTypeName?: string;
    eventTypeMultilineName?: string;
    eventTypeClassName?: string;
    contributionPoint: number;
    contributionPointTotal: number;
    myConsecutiveWin: number;
    otherConsecutiveWin: number;
    myAnotherName?: string;
    otherAnotherName?: string;
    uniformBonus: number;
  };
  type Game = {
    key?: string;
    mode?: string;
    rule?: string;
    type?: string;
    modeKey?: string;
    ruleKey?: string;
  };
  type Gear = {
    uniqueID?: string;
    ID: number;
    name?: string;
    image?: string;
    thumbnail?: string;
    rarity: number;
    kind?: string;
    brand?: Brand;
  };
  type Grade = {
    key?: string;
    id: number;
    name?: string;
    longName?: string;
  };
  type Player = {
    name?: string;
    principalID?: string;
    rank: number;
    udemae: number;
    udemaeName?: string;
    udemaeIsX: boolean;
    udemaeIsReached: boolean;
    isCrown: boolean;
    sPlusNumber: number;
    starRank: number;
    kill: number;
    death: number;
    assist: number;
    special: number;
    ratio: number;
    allKill: number;
    allRatio: number;
    sortScore: number;
    paintPoint: number;
    fesGrade: number;
    fesGradeName?: string;
    style?: string;
    species?: string;
    weapon?: Weapon;
    headGear?: Gear;
    clothesGear?: Gear;
    shoesGear?: Gear;
    headSkills?: Skills;
    clothesSkills?: Skills;
    shoesSkills?: Skills;
  };
  type PlayerType = {
    key?: string;
    species?: string;
    style?: string;
  };
  type Result = {
    no: number;
    version: number;
    stage?: Stage;
    game?: Game;
    player?: Player;
    startTime?: Date;
    elapsedTime: number;
    win: boolean;
    rank: number;
    starRank: number;
    udemae: number;
    udemaeName?: string;
    udemaeIsX: boolean;
    udemaeIsReached: boolean;
    sPlusNumber: number;
    xRanking: number;
    xPower: number;
    myCount: number;
    otherCount: number;
    winMeter: number;
    weaponPaintPoint: number;
    myMembers: Player[];
    otherMembers: Player[];
    leaguePoint: number;
    leagueMaxPoint: number;
    leagueTeamEstimatePoint: number;
    leagueOtherEstimatePoint: number;
    gachiEstimatePower: number;
    gachiEstimateXPower: number;
    fesPoint: number;
    fesPower: number;
    fesMaxPower: number;
    fesGrade: number;
    fesGradeName?: string;
    fesTeamEstimatePower: number;
    fesOtherEstimatePower: number;
    fes?: Fes;
    skillLogs: SkillLog[];
  };
  type Skill = {
    ID: number;
    name?: string;
    image?: string;
  };
  type SkillLog = {
    skill?: Skill;
    multiply: number;
  };
  type Skills = {
    main?: Skill;
    subs: Skill[];
  };
  type Special = {
    ID: number;
    name?: string;
    imageA?: string;
    imageB?: string;
  };
  type Stage = {
    ID: number;
    name?: string;
    image?: string;
  };
  type SubWeapon = {
    ID: number;
    name?: string;
    imageA?: string;
    imageB?: string;
  };
  type WaterLevel = {
    key?: string;
    name?: string;
  };
  type WaveDetail = {
    ikuraNum: number;
    goldenIkuraNum: number;
    goldenIkuraPopNum: number;
    quotaNum: number;
    waterLevel?: WaterLevel;
    eventType?: EventType;
  };
  type Weapon = {
    ID: number;
    name?: string;
    image?: string;
    thumbnail?: string;
    special?: Special;
    sub?: SubWeapon;
  };
  type Worker = {
    pid?: string;
    name?: string;
    helpCount: number;
    deadCount: number;
    ikuraNum: number;
    goldenIkuraNum: number;
    special?: Special;
    specialCount0: number;
    specialCount1: number;
    specialCount2: number;
    weaponList: CoopWeapon[];
    bossKillCounts: BossCount[];
  };
}
