import { writable, derived } from "svelte/store";
import { browser } from "$app/env";

//  https://frzyc.github.io/genshin-optimizer/#/doc
//   interface ICharacter {
//     key: CharacterKey //e.g. "Rosaria"
//     level: number //1-90 inclusive
//     constellation: number //0-6 inclusive
//     ascension: number //0-6 inclusive. need to disambiguate 80/90 or 80/80
//     talent: { //does not include boost from constellations. 1-15 inclusive
//       auto: number
//       skill: number
//       burst: number
//     }
//   }

//   interface IWeapon {
//     key: WeaponKey //"CrescentPike"
//     level: number //1-90 inclusive
//     ascension: number //0-6 inclusive. need to disambiguate 80/90 or 80/80
//     refinement: number //1-5 inclusive
//     location: CharacterKey | "" //where "" means not equipped.
//     lock: boolean //Whether the weapon is locked in game.
//   }

//   interface IArtifact {
//     setKey: SetKey //e.g. "GladiatorsFinale"
//     slotKey: SlotKey //e.g. "plume"
//     level: number //0-20 inclusive
//     rarity: number //1-5 inclusive
//     mainStatKey: StatKey
//     location: CharacterKey|"" //where "" means not equipped.
//     lock: boolean //Whether the artifact is locked in game.
//     substats: ISubstat[]
//   }

//   interface ISubstat {
//     key: StatKey //e.g. "critDMG_"
//     value: number //e.g. 19.4
//   }

//   type SlotKey = "flower" | "plume" | "sands" | "goblet" | "circlet"

// let initialState = [defaultChar(), defaultChar(), defaultChar(), defaultChar()];

//current char store
const storedCharStore =
  JSON.parse(browser && localStorage.getItem("charStore")) || [];
export const charStore = writable(browser && storedCharStore);
charStore.subscribe(
  (val) => browser && (localStorage.charStore = JSON.stringify(val))
);

//saved profiles []charStore
const storedSaves =
  JSON.parse(browser && localStorage.getItem("savedProfiles")) || [];
export const savedStore = writable(browser && storedSaves);
savedStore.subscribe(
  (val) => browser && (localStorage.savedProfiles = JSON.stringify(val))
);

//saved json
const storedGOJSON = (browser && localStorage.getItem("goJSON")) || "";
export const goStore = writable(browser && storedGOJSON);
goStore.subscribe((val) => browser && (localStorage.goJSON = val));

const initialOpt = {
  debug: false,
  i: 1000,
  d: 90,
  w: 24,
  useBuilder: true,
  multi: false, //not used yet
  calc: false, //not used yet
};

//saved sim settings
let saved = JSON.parse(browser && localStorage.getItem("simSettings")) || {};
const storedSimSettings = Object.assign({}, initialOpt, saved);
export const opt = writable(browser && storedSimSettings);
opt.subscribe(
  (val) => browser && (localStorage.simSettings = JSON.stringify(val))
);

const storedTeamConfig =
  JSON.parse(browser && localStorage.getItem("teamConfig")) || "";
export const teamConfigStore = writable(browser && storedTeamConfig);
teamConfigStore.subscribe(
  (val) => browser && (localStorage.teamConfig = JSON.stringify(val))
);

const storedActionConfig =
  JSON.parse(browser && localStorage.getItem("actionConfig")) || "";
export const actionConfigStore = writable(browser && storedActionConfig);
actionConfigStore.subscribe(
  (val) => browser && (localStorage.actionConfig = JSON.stringify(val))
);

export const resultStore = writable({});

const storedLogSettings =
  JSON.parse(browser && localStorage.getItem("logSettings")) || [];
export const logSettings = writable(browser && storedLogSettings);
logSettings.subscribe(
  (val) => browser && (localStorage.logSettings = JSON.stringify(val))
);
