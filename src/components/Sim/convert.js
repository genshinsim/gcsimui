import genshindb from "genshin-db";
import { ascLvlMin, charAscLvlCap } from "@src/_util";

//converts charStore to config file
export function teamToConfig(store) {
  if (!Array.isArray(store)) {
    return "";
  }

  let str = "";
  store.forEach((char) => {
    //grab char from genshindb
    const gd_char = genshindb.characters(char.key);
    const c_key = char.key.replace(/[^0-9a-z]/gi, "");

    str += `${c_key} char lvl=${char.level}/${charAscLvlCap(
      char.ascension
    )} cons=${char.constellation} talent=${char.talent.auto},${
      char.talent.skill
    },${char.talent.burst}; \n`;

    //weapon next
    const w_key = char.weapon.key.replace(/[^0-9a-z]/gi, "");
    str += `${c_key} add weapon="${w_key}" refine=${
      char.weapon.refinement
    } lvl=${char.weapon.level}/${charAscLvlCap(char.weapon.ascension)};\n`;

    //artifacts next
    let main = {};
    let subs = {
      hp: 0,
      hp_: 0,
      atk: 0,
      atk_: 0,
      def: 0,
      def_: 0,
      eleMas: 0,
      enerRech_: 0,
      critRate_: 0,
      critDMG_: 0,
    };
    const slots = ["flower", "plume", "sands", "goblet", "circlet"];
    let sets = {};

    //assume 5 star if rarity not given
    slots.forEach((slot) => {
      let a = char.artifact[slot];
      //calc main
      let rarity = 5;
      if (a.rarity && a.rarity > 0 && a.rarity < 5) {
        rarity = a.rarity;
      }

      if (a.mainStatKey !== "") {
        let mainKey = a.mainStatKey;
        if (mainKey.endsWith("_dmg_") && mainKey !== "physical_dmg_") {
          mainKey = "ele_dmg_";
        }

        // console.log("checking main stat");
        // console.log(mainStatMap[rarity]);
        // console.log(mainStatMap[rarity][mainKey]);
        // console.log(mainKey);
        // console.log(mainStatMap[rarity][mainKey][a.level]);

        let val = mainStatMap[rarity][mainKey][a.level];

        //check for _
        if (mainKey.endsWith("_")) {
          val = val / 100;
        }
        if (a.mainStatKey in main) {
          main[a.mainStatKey] = main[a.mainStatKey] + val;
        } else {
          main[a.mainStatKey] = val;
        }
      }

      //add up subs
      if (a.substats) {
        a.substats.forEach((e) => {
          let val = e.value;
          if (e.key.endsWith("_")) {
            val = val / 100;
          }
          subs[e.key] += val;
        });
      }

      //track the sets
      if (a.setKey !== "") {
        if (a.setKey in sets) {
          sets[a.setKey] = sets[a.setKey] + 1;
        } else {
          sets[a.setKey] = 1;
        }
      }
    });

    //add the sets
    for (const [key, value] of Object.entries(sets)) {
      if (value > 1) {
        str += `${c_key} add set="${key}" count=${value};\n`;
      }
    }

    //add main stats
    str += `${c_key} add stats `;
    for (const [key, value] of Object.entries(main)) {
      str += `${simStat(key)}=${value} `;
    }
    str += "; #main\n";

    //add subs
    str += `${c_key} add stats `;
    for (const [key, value] of Object.entries(subs)) {
      if (value > 0) {
        str += `${simStat(key)}=${value} `;
      }
    }
    str += "; #subs\n";

    //extra line skip
    str += "\n";
  });

  return str.toLowerCase();
}

//convert some short hands in calc mode
export function calcModeConvert(cfg) {
  //valid symbols are q,e,n,a,c,j,d (with a number)
  let skill = /\b(e)(\d?)\b/gm;
  let burst = /\b(q)(\d?)\b/gm;
  let attack = /\b(n)(\d?)\b/;
  let charge = /\b(c)(\d?)\b/gm;
  let low_lunge = /\b(p)(\d?)\b/gm;
  let aim = /\b(a)(\d?)\b/gm;
  let dash = /\b(d)(\d?)\b/gm;
  let jump = /\b(j)(\d?)\b/gm;

  //find and replace in cfg
  cfg = cfg.replace(skill, "skill:$2");
  cfg = cfg.replace(burst, "burst:$2");
  cfg = cfg.replace(attack, "attack:$2");
  cfg = cfg.replace(charge, "charge:$2");
  cfg = cfg.replace(low_lunge, "low_lunge:$2");
  cfg = cfg.replace(aim, "aim:$2");
  cfg = cfg.replace(dash, "dash:$2");
  cfg = cfg.replace(jump, "jump:$2");

  cfg = cfg.replace(/:(?!\d)/gm, "");
  return cfg;
}

/**
 *   {
    "key": "Kaeya",
    "level": 1,
    "ascension": 0,
    "hitMode": "avgHit",
    "reactionMode": "",
    "conditionalValues": {},
    "bonusStats": {},
    "talent": { "auto": 1, "skill": 1, "burst": 1 },
    "infusionAura": "",
    "constellation": 0,
    "weapon": {
      "key": "DullBlade",
      "level": 1,
      "ascension": 0,
      "refinement": 1,
      "location": "Kaeya",
      "lock": false,
      "name": "Dull Blade",
      "icon": "https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_Sword_Blunt.png"
    },
    "artifact": {
      "flower": {
        "level": 20,
        "setKey": "",
        "slotKey": "flower",
        "icon": "",
        "mainStatKey": "hp",
        "substats": []
      },
      "plume": {
        "level": 20,
        "setKey": "",
        "slotKey": "plume",
        "icon": "",
        "mainStatKey": "atk",
        "substats": []
      },
      "sands": {
        "level": 20,
        "setKey": "",
        "slotKey": "sands",
        "icon": "",
        "mainStatKey": "",
        "substats": []
      },
      "goblet": {
        "level": 20,
        "setKey": "",
        "slotKey": "goblet",
        "icon": "",
        "mainStatKey": "",
        "substats": []
      },
      "circlet": {
        "level": 20,
        "setKey": "",
        "slotKey": "circlet",
        "icon": "",
        "mainStatKey": "",
        "substats": []
      }
    },
    "element": "Cryo",
    "name": "Kaeya",
    "icon": "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Kaeya.png",
    "weapontype": "Sword"
  },
 */

export function simStat(stat) {
  switch (stat) {
    case "hp":
      return "hp";
    case "hp_":
      return "hp%";
    case "atk":
      return "atk";
    case "atk_":
      return "atk%";
    case "def":
      return "def";
    case "def_":
      return "def%";
    case "eleMas":
      return "em";
    case "enerRech_":
      return "er";
    case "heal_":
      return "heal";
    case "critRate_":
      return "cr";
    case "critDMG_":
      return "cd";
    case "physical_dmg_":
      return "phys%";
    case "anemo_dmg_":
      return "anemo%";
    case "geo_dmg_":
      return "geo%";
    case "electro_dmg_":
      return "electro%";
    case "hydro_dmg_":
      return "hydro%";
    case "pyro_dmg_":
      return "pyro%";
    case "cryo_dmg_":
      return "cryo%";
    default:
      return "";
  }
}

export function gd_c_subs(stat) {
  switch (stat) {
    case "ATK":
      return "atk_";
    case "DEF":
      return "def_";
    case "HP":
      return "hp_";
    case "Elemental Mastery":
      return "eleMas";
    case "Energy Recharge":
      return "enerRech_";
    case "CRIT Rate":
      return "critRate_";
    case "CRIT DMG":
      return "critDMG_";
    case "Healing Bonus":
      return "heal_";
    case "Electro DMG Bonus":
      return "electro_dmg_";
    case "Geo DMG Bonus":
      return "geo_dmg_";
    case "Cryo DMG Bonus":
      return "cryo_dmg_";
    case "Pyro DMG Bonus":
      return "pyro_dmg_";
    case "Physical DMG Bonus":
      return "physical_dmg_";
    case "Hydro DMG Bonus":
      return "hydro_dmg_";
    case "Anemo DMG Bonus":
      return "anemo_dmg_";
    default:
      return "";
  }
}

export function gd_w_subs(stat) {
  switch (stat) {
    case "HP":
      return "hp_";
    case "ATK":
      return "atk_";
    case "DEF":
      return "def_";
    case "Elemental Mastery":
      return "eleMas";
    case "Energy Recharge":
      return "enerRech_";
    case "CRIT Rate":
      return "critRate_";
    case "CRIT DMG":
      return "critDMG_";
    case "Physical DMG Bonus":
      return "physical_dmg_";
    default:
      return "";
  }
}

const mainStatMap = {
  1: {
    hp: [129, 178, 227, 275, 324],
    atk: [8, 12, 15, 18, 21],
    hp_: [3.1, 4.3, 5.5, 6.7, 7.9],
    atk_: [3.1, 4.3, 5.5, 6.7, 7.9],
    def_: [3.9, 5.4, 6.9, 8.4, 9.9],
    physical_dmg_: [3.9, 5.4, 6.9, 8.4, 9.9],
    ele_dmg_: [3.1, 4.3, 5.5, 6.7, 7.9],
    eleMas: [13, 17, 22, 27, 32],
    enerRech_: [3.5, 4.8, 6.1, 7.5, 8.8],
    critRate_: [2.1, 2.9, 3.7, 4.5, 5.3],
    critDMG_: [4.2, 5.8, 7.4, 9.0, 10.5],
    heal_: [2.4, 3.3, 4.3, 5.2, 6.1],
  },
  2: {
    hp: [258, 331, 404, 478, 551, 624, 697, 770, 843],
    atk: [17, 22, 26, 31, 36, 41, 45, 50, 55],
    hp_: [4.2, 5.4, 6.6, 7.8, 9, 10.1, 11.3, 12.5, 13.7],
    atk_: [4.2, 5.4, 6.6, 7.8, 9, 10.1, 11.3, 12.5, 13.7],
    def_: [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1],
    physical_dmg_: [5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1],
    ele_dmg_: [4.2, 5.4, 6.6, 7.8, 9, 10.1, 11.3, 12.5, 13.7],
    eleMas: [17, 22, 26, 31, 36, 41, 45, 50, 55],
    enerRech_: [4.7, 6, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2],
    critRate_: [2.8, 3.6, 4.4, 5.2, 6, 6.8, 7.6, 8.3, 9.1],
    critDMG_: [5.6, 7.2, 8.8, 10.4, 11.9, 13.5, 15.1, 16.7, 18.3],
    heal_: [3.2, 4.1, 5.1, 6, 6.9, 7.8, 8.7, 9.6, 10.5],
  },
  3: {
    hp: [
      430, 552, 674, 796, 918, 1040, 1162, 1283, 1405, 1527, 1649, 1771, 1893,
    ],
    atk: [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123],
    hp_: [
      5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1,
    ],
    atk_: [
      5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1,
    ],
    def_: [
      6.6, 8.4, 10.3, 12.1, 14.0, 15.8, 17.7, 19.6, 21.4, 23.3, 25.1, 27.0,
      28.8,
    ],
    physical_dmg_: [
      6.6, 8.4, 10.3, 12.1, 14.0, 15.8, 17.7, 19.6, 21.4, 23.3, 25.1, 27.0,
      28.8,
    ],
    ele_dmg_: [
      5.2, 6.7, 8.2, 9.7, 11.2, 12.7, 14.2, 15.6, 17.1, 18.6, 20.1, 21.6, 23.1,
    ],
    eleMas: [21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 80, 86, 92],
    enerRech_: [
      5.8, 7.5, 9.1, 10.8, 12.4, 14.1, 15.7, 17.4, 19.0, 20.7, 22.3, 24.0, 25.6,
    ],
    critRate_: [
      3.5, 4.5, 5.5, 6.5, 7.5, 8.4, 9.4, 10.4, 11.4, 12.4, 13.4, 14.4, 15.4,
    ],
    critDMG_: [
      7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8,
      30.8,
    ],
    heal_: [
      4.0, 5.2, 6.3, 7.5, 8.6, 9.8, 10.9, 12.0, 13.2, 14.3, 15.5, 16.6, 17.8,
    ],
  },
  4: {
    hp: [
      645, 828, 1011, 1194, 1377, 1559, 1742, 1925, 2108, 2291, 2474, 2657,
      2839, 3022, 3205, 3388, 3571,
    ],
    atk: [
      42, 54, 66, 78, 90, 102, 113, 125, 137, 149, 161, 173, 185, 197, 209, 221,
      232,
    ],
    hp_: [
      6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7,
      29.5, 31.3, 33.0, 34.8,
    ],
    atk_: [
      6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7,
      29.5, 31.3, 33.0, 34.8,
    ],
    def_: [
      7.9, 10.1, 12.3, 14.6, 16.8, 19.0, 21.2, 23.5, 25.7, 27.9, 30.2, 32.4,
      34.6, 36.8, 39.1, 41.3, 43.5,
    ],
    physical_dmg_: [
      7.9, 10.1, 12.3, 14.6, 16.8, 19.0, 21.2, 23.5, 25.7, 27.9, 30.2, 32.4,
      34.6, 36.8, 39.1, 41.3, 43.5,
    ],
    ele_dmg_: [
      6.3, 8.1, 9.9, 11.6, 13.4, 15.2, 17.0, 18.8, 20.6, 22.3, 24.1, 25.9, 27.7,
      29.5, 31.3, 33.0, 34.8,
    ],
    eleMas: [
      25, 32, 39, 47, 54, 61, 68, 75, 82, 89, 97, 104, 111, 118, 125, 132, 139,
    ],
    enerRech_: [
      7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8,
      30.8, 32.8, 34.7, 36.7, 38.7,
    ],
    critRate_: [
      4.2, 5.4, 6.6, 7.8, 9.0, 10.1, 11.3, 12.5, 13.7, 14.9, 16.1, 17.3, 18.5,
      19.7, 20.8, 22.0, 23.2,
    ],
    critDMG_: [
      8.4, 10.8, 13.1, 15.5, 17.9, 20.3, 22.7, 25.0, 27.4, 29.8, 32.2, 34.5,
      36.9, 39.3, 41.7, 44.1, 46.4,
    ],
    heal_: [
      4.8, 6.2, 7.6, 9.0, 10.3, 11.7, 13.1, 14.4, 15.8, 17.2, 18.6, 19.9, 21.3,
      22.7, 24.0, 25.4, 26.8,
    ],
  },
  5: {
    hp: [
      717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952,
      3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780,
    ],
    atk: [
      47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232,
      245, 258, 272, 285, 298, 311,
    ],
    hp_: [
      7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8,
      30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6,
    ],
    atk_: [
      7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8,
      30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6,
    ],
    def_: [
      8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5,
      40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3,
    ],
    physical_dmg_: [
      8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5,
      40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3,
    ],
    ele_dmg_: [
      7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8,
      30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6,
    ],
    eleMas: [
      28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155,
      163, 171, 179, 187,
    ],
    enerRech_: [
      7.8, 10.0, 12.2, 14.4, 16.6, 18.8, 21.0, 23.2, 25.4, 27.6, 29.8, 32.0,
      34.2, 36.4, 38.6, 40.8, 43.0, 45.2, 47.4, 49.6, 51.8,
    ],
    critRate_: [
      4.7, 6.0, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2, 16.6, 17.9, 19.2, 20.5,
      21.8, 23.2, 24.5, 25.8, 27.1, 28.4, 29.8, 31.1,
    ],
    critDMG_: [
      9.3, 12.0, 14.6, 17.3, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.7, 38.4,
      41.0, 43.7, 46.3, 49.0, 51.6, 54.2, 56.9, 59.5, 62.2,
    ],
    heal_: [
      5.4, 6.9, 8.4, 10.0, 11.5, 13.0, 14.5, 16.1, 17.6, 19.1, 20.6, 22.1, 23.7,
      25.2, 26.7, 28.2, 29.8, 31.3, 32.8, 34.3, 35.9,
    ],
  },
};
