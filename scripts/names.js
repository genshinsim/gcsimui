import genshindb from "genshin-db";

const weapons = genshindb.weapons("names", { matchCategories: true });

weapons.forEach((e) => {
  const x = genshindb.weapons(e);
  console.log(x.name.replace(/[^0-9a-z]/gi, "").toLowerCase());
});

const chars = genshindb.characters("names", { matchCategories: true });

chars.forEach((e) => {
  const x = genshindb.characters(e);
  console.log(x.name.replace(/[^0-9a-z]/gi, "").toLowerCase());
});

const sets = genshindb.artifacts("4", { matchCategories: true });

sets.forEach((e) => {
  const x = genshindb.artifacts(e);
  console.log(x.name.replace(/[^0-9a-z]/gi, "").toLowerCase());
});

/**

[
"akuoumaru",
"amberbead",
"apprenticesnotes",
"beginnersprotector",
"blacktassel",
"bloodtaintedgreatsword",
"compoundbow",
"coolsteel",
"darkironsword",
"debateclub",
"dullblade",
"ebonybow",
"emeraldorb",
"everlastingmoonglow",
"ferrousshadow",
"filletblade",
"hakushinring",
"halberd",
"huntersbow",
"ironpoint",
"katsuragikirinagamasa",
"luxurioussealord",
"messenger",
"mitternachtswaltz",
"mouunsmoon",
"oldmercspal",
"otherworldlystory",
"pocketgrimoire",
"polarstar",
"predator",
"quartz",
"ravenbow",
"recurvebow",
"seasonedhuntersbow",
"silversword",
"slingshot",
"swordofdescension",
"theflagstaff",
"travelershandysword",
"twinnephrite",
"wastergreatsword",
"wavebreakersfin",
"whiteirongreatsword",
"whitetassel",
"wineandsong",
]

[
"aether",
"aloy",
"barbara",
"lumine",
"mona",
"qiqi",
"razor",
"sangonomiyakokomi",
"sayu",
"tartaglia",
"thoma",
"xinyan",
"yanfei",
]



core.RegisterSetFunc("berserker", New)
core.RegisterSetFunc("braveheart", New)
core.RegisterSetFunc("defenderswill", New)
core.RegisterSetFunc("gambler", New)
core.RegisterSetFunc("martialartist", New)
core.RegisterSetFunc("prayersfordestiny", New)
core.RegisterSetFunc("prayersforillumination", New)
core.RegisterSetFunc("prayersforwisdom", New)
core.RegisterSetFunc("prayerstospringtime", New)
core.RegisterSetFunc("resolutionofsojourner", New)
core.RegisterSetFunc("scholar", New)
core.RegisterSetFunc("theexile", New)
core.RegisterSetFunc("tinymiracle", New)


 */
