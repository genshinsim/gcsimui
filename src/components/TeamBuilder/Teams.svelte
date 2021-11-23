<script>
  import Character from "./Character.svelte";
  import ChooseCharacter from "./ChooseCharacter.svelte";
  import { charStore } from "../store.js";
  import { staticPath, toKey, blankChar } from "@src/_util";
  import { getContext } from "svelte";
  import genshindb from "genshin-db";
  // import Save from "./Save.svelte";
  // import Load from "./Load.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let openFile, saveFile, writeFile, readTextFile;

  onMount(async () => {
    // const { invoke } = await import("@tauri-apps/api/tauri");
    // Command = (await import("@tauri-apps/api/shell")).Command;
    openFile = (await import("@tauri-apps/api/dialog")).open;
    saveFile = (await import("@tauri-apps/api/dialog")).save;
    writeFile = (await import("@tauri-apps/api/fs")).writeFile;
    readTextFile = (await import("@tauri-apps/api/fs")).readTextFile;
    // tempdir = (await import("@tauri-apps/api/os")).tempdir;
  });

  // const existing = $charStore.map((e) => {
  //   return e.name;
  // });

  const charOptions = genshindb
    .characters("names", { matchCategories: true })
    .map((v) => {
      let x = genshindb.characters(v);
      return {
        name: v,
        key: toKey(v),
        icon: `${staticPath.avatar}/${toKey(v)}.png`,
        element: x.element,
        weapontype: x.weapontype,
      };
    });

  const { open, close } = getContext("modal");

  const handleOpenSave = () => {
    saveFile({
      filters: [
        {
          name: "json",
          extensions: ["json"],
        },
      ],
    })
      .then((location) => {
        console.log(location);
        const data = JSON.stringify($charStore);
        return writeFile({
          contents: data,
          path: location,
        });
      })
      .then(() => {
        alert("File saved");
      })
      .catch((e) => {
        console.log(e);
        alert("Error saving file: ", e);
      });
  };

  const handleOpenLoad = () => {
    openFile()
      .then((location) => {
        console.log(location);
        return readTextFile(location);
      })
      .then((content) => {
        console.log(content);
        //we're expecting a json of the state here

        charStore.update((store) => {
          try {
            store = JSON.parse(content);
          } catch (e) {
            alert("Error reading file");
            console.log(e);
            return store;
          }
          alert("Saved data loaded ok");
          return store;
        });
      });
  };

  const addChar = () => {
    if ($charStore.length === 4) {
      return;
    }

    open(ChooseCharacter, {
      charOptions: charOptions,
      onChange: (v) => {
        console.log("updating character");
        charStore.update((store) => {
          let c = blankChar();
          c.key = v.key;
          c.name = v.name;
          c.icon = v.icon;
          c.element = v.element;
          c.weapontype = v.weapontype;
          store.push(c);
          return store;
        });
        close();
      },
    });
  };
</script>

<div class="flex flex-col">
  <div
    class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-4 lg:pl-4 lg:pr-4"
  >
    {#each $charStore as char, index (index)}
      <Character {index} {char} />
    {/each}
    {#if $charStore.length < 4}
      <button
        class="bg-gray-700 m-1 shadow p-4 rounded-md text-sm hover:bg-gray-400 flex justify-center items-center"
        on:click={() => addChar()}
      >
        <div class="h-48 w-48 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>
    {/if}
  </div>

  <div class="mt-2 flex flex-row sm:flex-wrap gap-4 lg:pl-4 lg:pr-4">
    <div class=" flex-1">
      <button class="btn btn-primary w-full" on:click={handleOpenSave}
        >Save</button
      >
    </div>
    <div class="flex-1">
      <button class="btn btn-secondary w-full" on:click={handleOpenLoad}
        >Load</button
      >
    </div>
    <div class="flex-1">
      <button class="btn btn-info w-full" on:click={() => goto("/import")}
        >Import</button
      >
    </div>
  </div>
</div>
