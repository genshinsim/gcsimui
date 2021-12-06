<script>
  import { charStore, goStore } from "../components/store";
  import { goto } from "$app/navigation";
  import { parseFromGO, toKey, staticPath } from "@src/_util";

  const notImplemented = [
    "traveler",
    "aether",
    "barbara",
    "lumine",
    "mona",
    "razor",
    "sayu",
    "thoma",
    "xinyan",
  ];

  $: data = parseFromGO($goStore);

  function handleSelect(index) {
    return function () {
      //check if we're unselecting
      if (data.selected[index]) {
        data.selected[index] = false;
        // selected = selected;
      } else {
        //other wise set to true only if we have less than 4 already true
        const count = data.selected.filter(Boolean).length;
        if (count === 4) {
          return;
        }
        data.selected[index] = true;
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
    data.selected.forEach((e, i) => {
      if (e && i < data.characters.length) {
        next.push(data.characters[i]);
      }
    });
    console.log(next);
    charStore.set(next);
    if (next.length > 0) {
      goto("/");
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
    Import Team to finish import.
    <strong class="text-yellow-400"
      >This will overwrite any existing team. This action cannot be reversed.
      You have been warned</strong
    >
  </div>

  {#if data.err === ""}
    {#if data.characters.length > 0}
      <div class="grid grid-cols-12 gap-2 ">
        {#each data.characters as char, index (index)}
          <div
            class={data.selected[index]
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
              src={`${staticPath.avatar}/${char.key}.png`}
              alt={char.name}
              class={data.selected[index]
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
      disabled={data.selected.filter(Boolean).length === 0}>Import Team</button
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
