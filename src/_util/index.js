export function statToString(input) {
  switch (input) {
    case "hp":
      return "HP";
    case "hp_":
      return "HP%";
    case "atk":
      return "Atk";
    case "atk_":
      return "Atk%";
    case "def":
      return "Def";
    case "def_":
      return "Def%";
    case "eleMas":
      return "EM";
    case "enerRech_":
      return "ER";
    case "heal_":
      return "Heal";
    case "critRate_":
      return "CR";
    case "critDMG_":
      return "CD";
    case "physical_dmg_":
      return "Phy%";
    case "anemo_dmg_":
      return "Ane%";
    case "geo_dmg_":
      return "Geo%";
    case "electro_dmg_":
      return "Ele%";
    case "hydro_dmg_":
      return "Hyd%";
    case "pyro_dmg_":
      return "Pyr%";
    case "cryo_dmg_":
      return "Cry%";
  }
  return "-";
}

export function slotMainStat(slot) {
  switch (slot) {
    case "flower":
      return ["hp"];
    case "plume":
      return ["atk"];
    case "sands":
      return ["hp_", "atk_", "def_", "eleMas", "enerRech_"];
    case "goblet":
      return [
        "hp_",
        "atk_",
        "def_",
        "eleMas",
        "physical_dmg_",
        "anemo_dmg_",
        "geo_dmg_",
        "electro_dmg_",
        "hydro_dmg_",
        "pyro_dmg_",
        "cryo_dmg_",
      ];
    case "circlet":
      return [
        "hp_",
        "atk_",
        "def_",
        "eleMas",
        "heal_",
        "critRate_",
        "critDMG_",
      ];
  }
}

export function blankChar() {
  return {
    key: "", //
    name: "", //display name
    element: "",
    icon: "",
    level: 80,
    constellation: 0,
    ascension: 6,
    talent: {
      auto: 6,
      skill: 6,
      burst: 6,
    },
    weapontype: "",
    weapon: {
      key: "", //"CrescentPike"
      name: "",
      icon: "",
      level: 1, //1-90 inclusive
      ascension: 0, //0-6 inclusive. need to disambiguate 80/90 or 80/80
      refinement: 1, //1-5 inclusive
      location: "", //where "" means not equipped.
      lock: false, //Whether the weapon is locked in game.
    },
    artifact: {
      flower: {
        setKey: "", //e.g. "GladiatorsFinale"
        slotKey: "flower", //e.g. "plume"
        icon: "",
        level: 20, //0-20 inclusive
        rarity: 5, //1-5 inclusive
        mainStatKey: "hp",
        location: "", //where "" means not equipped.
        lock: false, //Whether the artifact is locked in game.
        substats: [],
      },
      plume: {
        setKey: "", //e.g. "GladiatorsFinale"
        slotKey: "plume", //e.g. "plume"
        icon: "",
        level: 20, //0-20 inclusive
        rarity: 5, //1-5 inclusive
        mainStatKey: "atk",
        location: "", //where "" means not equipped.
        lock: false, //Whether the artifact is locked in game.
        substats: [],
      },
      sands: {
        setKey: "", //e.g. "GladiatorsFinale"
        slotKey: "sands", //e.g. "plume"
        icon: "",
        level: 20, //0-20 inclusive
        rarity: 5, //1-5 inclusive
        mainStatKey: "",
        location: "", //where "" means not equipped.
        lock: false, //Whether the artifact is locked in game.
        substats: [],
      },
      goblet: {
        setKey: "", //e.g. "GladiatorsFinale"
        slotKey: "goblet", //e.g. "plume"
        icon: "",
        level: 20, //0-20 inclusive
        rarity: 5, //1-5 inclusive
        mainStatKey: "",
        location: "", //where "" means not equipped.
        lock: false, //Whether the artifact is locked in game.
        substats: [],
      },
      circlet: {
        setKey: "", //e.g. "GladiatorsFinale"
        slotKey: "circlet", //e.g. "plume"
        icon: "",
        level: 20, //0-20 inclusive
        rarity: 5, //1-5 inclusive
        mainStatKey: "",
        location: "", //where "" means not equipped.
        lock: false, //Whether the artifact is locked in game.
        substats: [],
      },
    },
  };
}

export const defaultWeapons = {
  Sword: "Dull Blade",
  Claymore: "Waster Greatsword",
  Bow: "Hunter's Bow",
  Catalyst: "Apprentice's Notes	",
  Polearm: "Beginner's Protector",
};

export function ascLvlMin(asc) {
  switch (asc) {
    case 1:
      return 20;
    case 2:
      return 40;
    case 3:
      return 50;
    case 4:
      return 60;
    case 5:
      return 70;
    case 6:
      return 80;
  }
  return 1;
}

export function charAscLvlCap(asc) {
  switch (asc) {
    case 0:
      return 20;
    case 1:
      return 40;
    case 2:
      return 50;
    case 3:
      return 60;
    case 4:
      return 70;
    case 5:
      return 80;
    case 6:
      return 90;
  }
  return 0;
}

// type StatKey
//"hp" //HP
//"hp_" //HP%
//"atk" //ATK
//"atk_" //ATK%
//"def" //DEF
//"def_" //DEF%
//"eleMas" //Elemental Mastery
//"enerRech_" //Energy Recharge%
//"heal_" //Healing Bonus%
//"critRate_" //CRIT Rate%
//"critDMG_" //CRIT DMG%
//"physical_dmg_" //Physical DMG Bonus%
//"anemo_dmg_" //Anemo DMG Bonus%
//"geo_dmg_" //Geo DMG Bonus%
//"electro_dmg_" //Electro DMG Bonus%
//"hydro_dmg_" //Hydro DMG Bonus%
//"pyro_dmg_" //Pyro DMG Bonus%
//"cryo_dmg_" //Cryo DMG Bonus%

export function eventColor(eve) {
  switch (eve) {
    case "procs":
      return "";
    case "damage":
      return "#2563EB";
    case "hurt":
      return "";
    case "heal":
      return "";
    case "calc":
      return "#9D174D";
    case "reaction":
      return "";
    case "element":
      return "#3F60A6";
    case "snapshot":
      return "#6366F1";
    case "snapshot_mods":
      return "#818CF8";
    case "status":
      return "";
    case "action":
      return "#AB5F45";
    case "queue":
      return "";
    case "energy":
      return "#036345";
    case "character":
      return "";
    case "enemy":
      return "";
    case "hook":
      return "";
    case "sim":
      return "";
    case "task":
      return "";
    case "artifact":
      return "";
    case "weapon":
      return "";
    case "shield":
      return "";
    case "construct":
      return "";
    case "icd":
      return "";
    default:
      return "gray-500";
  }
}

export function parseLog(active, team, log) {
  console.log("parsing log");
  //find initial active char
  let activeIndex = team.findIndex((e) => e === active);
  activeIndex++;

  let result = [];
  let slots = [[], [], [], [], []];

  let lastFrame = -1;

  //split the logs by new line
  const lines = log.split(/\r?\n/);

  lines.forEach((line) => {
    //parse json
    let d = {};
    try {
      d = JSON.parse(line);
    } catch (e) {
      console.log("error reading line: ", line);
      console.log(e);
      return;
    }

    //if no frame then set frame to -1
    if (!("frame" in d)) {
      d.frame = -1;
    }

    //if no event then set event to sim
    if (!("event" in d)) {
      d.event = "sim";
    }

    //shift char index down by 1 (b/c index 0 is sim stuff)
    let index = 0;
    if ("char" in d) {
      index = d.char + 1;
    } else {
      d.char = 0;
    }

    //check if frame changed; if so append stuff
    if (d.frame !== lastFrame) {
      result.push({
        f: lastFrame,
        slots: slots,
        active: activeIndex,
      });
      //reset
      lastFrame = d.frame;
      slots = [];
      for (var i = 0; i <= team.length; i++) {
        slots.push([]);
      }
    }

    //parse the data
    let e = {
      frame: d.frame,
      msg: d.M,
      raw: JSON.stringify(JSON.parse(line), null, 2),
      event: d.event,
      char: d.char,
      color: eventColor(d.event),
      icon: "circle",
      amount: 0,
      target: "",
    };

    if (e.color === "") {
      e.color = "#6B7280";
    }

    //set icon/color etc... based one vent
    switch (e.event) {
      case "damage":
        e.msg +=
          " [" +
          Math.round(d.damage)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          "]";
        let extra = "";
        if (d.amp && d.amp !== "") {
          extra += d.amp;
        }
        if (d.crit) {
          extra += " crit";
        }
        if (extra !== "") {
          e.msg += " (" + extra.trim() + ")";
        }

        e.icon = "local_fire_department";
        e.amount = d.damage;
        e.target = d.target;
        break;
      case "action":
        if (d.M.includes("executed") && d.action === "swap") {
          activeIndex = team.findIndex((e) => e === d.target) + 1;
          e.msg += " to " + d.target;
        }
        e.icon = "play_arrow";
        break;
      case "element":
        switch (d.M) {
          case "expired":
            e.msg = d.old_ele + " expired";
            break;
          case "application":
            e.msg =
              d.applied_ele +
              " applied" +
              (d.existing_ele === "" ? "" : " to " + d.existing_ele);
            break;
          case "refreshed":
            e.msg = d.ele + " refreshed";
            break;
          default:
            e.msg = d.M;
        }

        e.icon = "bolt";
        e.target = d.target;
        break;
      case "energy":
        if (e.msg.includes("particle")) {
          e.msg =
            d.M +
            " from " +
            d.source +
            ", next: " +
            Math.round(d["post_recovery"]);
        }
        e.icon = "local_cafe";
        break;
      case "calc":
        e.icon = "calculate";
        e.target = d.target;

        break;
      case "character":
        e.icon = "person";
        break;
      case "snapshot":
        e.icon = "photo_camera";
        break;
      case "snapshot_mods":
        e.icon = "build";
        break;
      case "heal":
        e.icon = "healing";
        break;
      case "hurt":
        e.icon = "coronavirus";
        break;
      case "queue":
        e.icon = "queue";
        break;
      case "shield":
        e.icon = "shield";
        break;
      case "hook":
        e.icon = "attachment";
        break;
      case "icd":
        e.icon = "timer";
        break;
      case "construct":
        e.icon = "apartment";
        break;
      default:
        e.msg = e.event + ": " + e.msg;
    }

    //add it to slots
    // console.log(slots);
    // console.log(e.char);
    // console.log(d);
    slots[index].push(e);
  });

  console.log(result);

  return result;
}
