<script>
  import { getContext } from "svelte";
  import { logSettings, resultStore } from "@components/store.js";
  import { parseLog } from "@src/_util";
  import Item from "./Item.svelte";
  import InfiniteLoading from "svelte-infinite-loading";

  import Options from "./Options.svelte";

  //handler
  const { open } = getContext("modal");

  const handleOpenOpts = () => {
    open(
      Options,
      {},
      {
        closeOnEsc: true,
        closeOnOuterClick: true,
        disableScrollWhenOpen: false,
      }
    );
  };
  //data logic
  let data = [];
  let list = [];
  $: {
    data = parseLog(
      $resultStore.active_char,
      $resultStore.char_names,
      $resultStore.debug
    );
    // list = data.slice(0, 20);
    console.log("recalculating debug data");
  }

  function infiniteHandler({ detail: { loaded, complete } }) {
    if (list.length < data.length) {
      console.log("loading: ", list, data);
      let max = list.length + 50;
      if (max >= data.length) {
        max = data.length;
      }
      let newRows = [];

      for (let i = list.length; i < max; i++) {
        newRows.push(data[i]);
      }

      list = [...list, ...newRows];

      loaded();
    } else {
      complete();
    }
  }
</script>

<div class="p-2 bg-gray-700 rounded-md w-full text-xs relative">
  <!-- 5 columns and a sticky header -->
  <div class="flex flex-row header">
    <div
      class="font-medium text-lg text-gray-100 border-b-2 border-gray-500 text-right"
      style="min-width: 100px"
    >
      F | Sec
    </div>
    <div class="grid grid-cols-5 flex-grow">
      <div
        class="font-medium text-lg text-gray-100 border-l-2 border-b-2 border-gray-500"
      >
        Sim
      </div>
      {#each $resultStore.char_names as char, index (index)}
        <div
          class="capitalize text-lg font-medium text-gray-100 border-l-2 border-b-2 border-gray-500"
        >
          {char}
        </div>
      {/each}
    </div>
    <div style="width: 20px; min-width:20px" />
  </div>
  <div
    class="flex flex-col overflow-y-auto infinite-wrapper"
    style="max-height: 600px"
  >
    {#each list as row, index (index)}
      <div class="flex flex-row">
        <!-- first col is frame data -->
        <div
          class="text-right text-gray-100 border-b-2 border-gray-500"
          style="min-width: 100px"
        >
          <div>{`${row.f} | ${(row.f / 60).toFixed(2)}s`}</div>
        </div>
        <!-- next 5 is char data etc -->
        <div class="grid grid-cols-5 flex-grow border-b-2 border-gray-500">
          {#each row.slots as slot, index}
            <div
              class={row.active == index
                ? "border-l-2 border-gray-500 bg-gray-400	"
                : "border-l-2 border-gray-500"}
            >
              <!-- inside each slot is another array of events -->
              {#each slot.filter((e) => {
                //if can't find in log settings then skip it
                return $logSettings.indexOf(e.event) > -1;
              }) as e, index (index)}
                <Item data={e} />
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
    <div style="mb-12" />
    <InfiniteLoading
      on:infinite={infiniteHandler}
      forceUseInfiniteWrapper=".infinite-wrapper"
    />
  </div>

  <div class="absolute bottom-0 w-full flex justify-center mb-2">
    <button class="btn btn-wide opacity-75" on:click={handleOpenOpts}
      >options</button
    >
  </div>
</div>

<style lang="postcss" scoped>
  .debug-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  div.header {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    @apply bg-gray-700;
  }
  /* tr:nth-child(even) {
    @apply bg-gray-700;
  }
  tr:nth-child(odd) {
    @apply bg-gray-500;
  } */

  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
</style>
