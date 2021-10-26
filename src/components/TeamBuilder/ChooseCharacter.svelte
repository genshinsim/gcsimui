<script>
  import { getContext } from "svelte";
  import { charStore } from "../store.js";

  export let charOptions = [];
  export let onChange = (v) => {};

  const notImplemented = [
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

  //filter options here
  console.log($charStore);
  charOptions = charOptions.filter((v) => {
    if (v.name === "Thoma") {
      return true;
    }
    return (
      $charStore.findIndex((c) => {
        return c.name === v.name;
      }) === -1
    );
  });

  const { close } = getContext("modal");
</script>

<div class="bg-gray-700 p-2 rounded-md shadow edit-content">
  <div class="font-medium items-center text-white title-font mb-4">
    Choose a character
  </div>
  <div class="grid grid-cols-10 title-font">
    {#each charOptions as c, index (index)}
      <div
        class={notImplemented.includes(c.key)
          ? "opacity-40 rounded-md p-1 cursor-not-allowed"
          : "hover:bg-gray-500 rounded-md p-1 cursor-pointer"}
        on:click={() => {
          if (notImplemented.includes(c.key)) {
            return;
          }
          onChange(c);
          close();
        }}
      >
        <div data-tip={c.name} class="tooltip">
          <img src={c.icon} alt={c.name} title={c.name} />
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss" scoped>
  .edit-content {
    width: 90vw;
  }
</style>
