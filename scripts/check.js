import genshindb from "genshin-db";

const weapons = genshindb.weapons("names", { matchCategories: true });

const stats = weapons.map((e) => {
  const x = genshindb.weapons(e);
  return x.substat;
});

const map1 = new Map();

stats.forEach((s) => {
  map1.set(s, 1);
});

console.log(map1);

const chars = genshindb.characters("names", { matchCategories: true });

const cs = chars.map((e) => {
  const x = genshindb.characters(e);
  return x.substat;
});

const map2 = new Map();

cs.forEach((s) => {
  map2.set(s, 1);
});

console.log(map2);
