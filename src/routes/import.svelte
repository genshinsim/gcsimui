<script>
  import { charStore, goStore } from "../components/store";
  import genshindb from "genshin-db";
  import { goto } from "$app/navigation";

  let selected = [];

  const notImplemented = [
    "traveler",
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
  ];

  function parseGO(val) {
    if (val === "") {
      return {
        err: "Please paste JSON from Genshin Optimizer to continue",
      };
    }

    //try parsing
    let data;
    try {
      data = JSON.parse(val);
    } catch (e) {
      return {
        err: "Invalid JSON",
      };
    }

    //build the characters
    let pos = new Map();
    let chars = [];
    let sel = [];
    if (!data.characters) {
      return {
        err: "",
        characters: [],
      };
    }
    let trav = "";
    data.characters.forEach((c, i) => {
      pos.set(c.key, i);
      c.weapon = {
        key: "",
        name: "",
        icon: "",
        level: 1,
        ascension: 0,
        refinement: 0,
        location: c.key,
        lock: false,
      };
      c.artifact = {
        flower: {
          level: 20,
          setKey: "",
          slotKey: "flower",
          rarity: 5,
          icon: "",
          mainStatKey: "hp",
          substats: [],
        },
        plume: {
          level: 20,
          setKey: "",
          slotKey: "plume",
          rarity: 5,
          icon: "",
          mainStatKey: "atk",
          substats: [],
        },
        sands: {
          level: 20,
          setKey: "",
          slotKey: "sands",
          rarity: 5,
          icon: "",
          mainStatKey: "",
          substats: [],
        },
        goblet: {
          level: 20,
          setKey: "",
          slotKey: "goblet",
          rarity: 5,
          icon: "",
          mainStatKey: "",
          substats: [],
        },
        circlet: {
          level: 20,
          setKey: "",
          slotKey: "circlet",
          rarity: 5,
          icon: "",
          mainStatKey: "",
          substats: [],
        },
      };
      let d = genshindb.characters(c.key);
      c.element = d.element;
      c.name = d.name;
      c.icon = d.images.icon;
      c.weapontype = d.weapontype;
      //special check for lumine/aether
      if (c.key === "Traveler") {
        c.name = "Lumine";
        c.element = c.elementKey;
        console.log(c);
        trav = JSON.stringify(c);
      }
      chars.push(c);
      sel.push(false);
      // console.log("adding ", c.key);
    });

    if (trav !== "") {
      let c = JSON.parse(trav);
      c.name = "Aether";
      let d = genshindb.characters("Aether");
      c.icon = d.images.icon;
      chars.push(c);
      pos.set("Aether", chars.length - 1);
      sel.push(false);
    }

    //add weapons if any
    if (data.weapons) {
      data.weapons.forEach((e) => {
        if (pos.has(e.location)) {
          console.log("adding weapon for ", e.location);
          //grab index
          let index = pos.get(e.location);
          //set some data
          let d = genshindb.weapons(e.key);
          e.name = d.name;
          e.icon = d.images.icon;
          chars[index].weapon = e;
          //special check for traveler
          if (e.location === "Traveler") {
            index = pos.get("Aether");
            chars[index].weapon = e;
          }
        }
      });
    }

    //add artifacts if any
    if (data.artifacts) {
      data.artifacts.forEach((e) => {
        if (pos.has(e.location)) {
          let index = pos.get(e.location);
          let x = genshindb.artifacts(e.setKey);
          //set slot
          e.setKey = x.name;
          e.icon = x.images[e.slotKey];
          chars[index].artifact[e.slotKey] = e;
          //special check for traveler
          if (e.location === "Traveler") {
            index = pos.get("Aether");
            chars[index].artifact[e.slotKey] = e;
          }
        }
      });
    }

    //set selected
    selected = sel;

    console.log(chars);

    //sort chars by element -> name
    chars.sort((a, b) => {
      if (b.name > a.name) {
        return -1;
      }
      if (b.name < a.name) {
        return 1;
      }
      return 0;
    });

    return {
      err: "",
      characters: chars,
    };
  }
  $: data = parseGO($goStore);

  function handleSelect(index) {
    return function () {
      //check if we're unselecting
      if (selected[index]) {
        selected[index] = false;
        // selected = selected;
      } else {
        //other wise set to true only if we have less than 4 already true
        const count = selected.filter(Boolean).length;
        if (count === 4) {
          return;
        }
        selected[index] = true;
      }
      // console.log(selected);
      // selected = selected;
    };
  }

  function handleImport() {
    //set store to data if selected
    if (!data.characters) {
      return;
    }
    let next = [];
    selected.forEach((e, i) => {
      if (e && i < data.characters.length) {
        next.push(data.characters[i]);
      }
    });
    console.log(next);
    charStore.set(next);
    if (next.length > 0) {
      goto("/builder");
    }
  }
</script>

<div class="flex flex-col gap-y-4 pl-8 pr-8">
  <div>
    <div class="text-lg font-bold">Instructions</div>
    Under Genshin Optimizer's
    <a
      class="text-blue-600 hover:text-blue-400"
      target="_blank"
      href="https://frzyc.github.io/genshin-optimizer/#/database">database</a
    >
    tab, click on <strong>Copy to Clipboard</strong> button. Paste the result in
    the text area below. Select up to 4 characters from the list below and click
    Import to Builder to finish import.
    <strong class="text-yellow-400"
      >This will overwrite any existing team. This action cannot be reversed.
      You have been warned</strong
    >
  </div>

  {#if data.err === ""}
    {#if data.characters.length > 0}
      <div class="grid grid-cols-12 gap-2 ">
        {#each data.characters as char, index}
          <div
            class={selected[index]
              ? "selected-char-box overflow-hidden rounded-md border-2"
              : notImplemented.includes(char.key.toLowerCase())
              ? "selected-char-box overflow-hidden rounded-md cursor-not-allowed"
              : "selected-char-box overflow-hidden rounded-md hover:bg-gray-500 cursor-pointer"}
            on:click={() => {
              if (notImplemented.includes(char.key.toLowerCase())) {
                return;
              }
              handleSelect(index)();
            }}
          >
            <img
              src={char.icon}
              alt={char.name}
              class={selected[index]
                ? "object-contain opacity-100"
                : "object-contain opacity-50"}
            />
          </div>
        {/each}
      </div>
    {:else}
      No characters found in Genshin Optimizer export
    {/if}
    <button
      class="btn btn-primary w-full"
      on:click={handleImport}
      disabled={selected.filter(Boolean).length === 0}>Import to Builder</button
    >
  {/if}
  <div
    class={data.err !== ""
      ? "rounded-md p-2 bg-gray-600 border-red-500 border-2 flex flex-col"
      : "rounded-md p-2 bg-gray-600 flex flex-col"}
  >
    <textarea
      spellcheck="false"
      rows="4"
      class="bg-transparent whitespace-pre text-xs font-mono w-full"
      placeholder="Paste JSON from Genshin Optimizer here"
      bind:value={$goStore}
    />
    {#if data.err !== ""}
      <span class="mt-2 text-red-500">Invalid JSON</span>
    {/if}
  </div>
</div>

<style>
  .selected-char-box {
    position: relative;
    display: inline-block;
  }
</style>
