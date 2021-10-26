<script>
  import Character from "./Character.svelte";
  import ChooseCharacter from "./ChooseCharacter.svelte";
  import { charStore } from "../store.js";
  import { blankChar } from "@src/_util";

  import { getContext } from "svelte";

  import genshindb from "genshin-db";

  // const existing = $charStore.map((e) => {
  //   return e.name;
  // });

  const charOptions = genshindb
    .characters("names", { matchCategories: true })
    .map((v) => {
      let x = genshindb.characters(v);
      return {
        name: v,
        key: v.replace(/[^0-9a-z]/gi, "").toLowerCase(),
        icon: x.images.icon,
        element: x.element,
        weapontype: x.weapontype,
      };
    });

  const { open, close } = getContext("modal");

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

  <div
    class="mt-6 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-4 lg:pl-4 lg:pr-4"
  >
    <div class="xl:col-span-2 lg:col-span-1">
      <button class="btn btn-primary w-full">Save</button>
    </div>
    <div class="xl:col-span-2 lg:col-span-1">
      <button class="btn btn-secondary w-full">Load</button>
    </div>
  </div>
</div>
