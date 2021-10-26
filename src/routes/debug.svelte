<script>
  import { resultStore } from "@components/store.js";

  import Debugger from "@components/Debug/Debugger.svelte";
</script>

{#if $resultStore.ok}
  <div class="flex flex-col pl-6 pr-6">
    <Debugger />
  </div>
{:else}
  <div class="pl-6 pr-6">No results. Please run sim first</div>
{/if}
