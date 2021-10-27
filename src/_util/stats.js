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
