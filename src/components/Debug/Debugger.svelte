<script>
  import { getContext } from "svelte";
  import { logSettings, resultStore } from "@components/store.js";
  import { parseLog } from "@src/_util";
  import Item from "./Item.svelte";

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
  $: data = parseLog(
    $resultStore.active_char,
    $resultStore.char_names,
    $resultStore.debug
  );
</script>

<div class="p-2 bg-gray-700 rounded-md w-full text-xs mb-16">
  <!-- 5 columns and a sticky header -->
  <table class="w-full table-fixed">
    <thead>
      <tr>
        <th class="font-medium text-lg w-12 text-gray-100">F</th>
        <th class="font-medium text-lg text-gray-100 border-l-2 border-gray-500"
          >Sim</th
        >
        {#each $resultStore.char_names as char, index (index)}
          <th
            class="capitalize text-lg font-medium text-gray-100 border-l-2 border-gray-500"
            >{char}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row, index (index)}
        <tr class="rounded-md">
          <!-- first col is frame data -->
          <td class="text-right pr-2">{row.f}</td>
          <!-- next 5 is char data etc -->
          {#each row.slots as slot, index}
            <td
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
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="debug-footer flex justify-center mb-2">
  <button class="btn btn-wide opacity-75" on:click={handleOpenOpts}
    >options</button
  >
</div>

<style lang="postcss" scoped>
  .debug-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  th {
    position: sticky;
    top: 0; /* Don't forget this, required for the stickiness */
    @apply bg-gray-700;
  }
  tr {
    @apply border-b-2 border-gray-500;
  }
  /* tr:nth-child(even) {
    @apply bg-gray-700;
  }
  tr:nth-child(odd) {
    @apply bg-gray-500;
  } */
</style>
