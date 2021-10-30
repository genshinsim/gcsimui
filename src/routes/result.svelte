<script>
  import { resultStore } from "@components/store.js";
  import Results from "@components/Results/Results.svelte";
</script>

{#if $resultStore.ok}
  <Results />
{:else}
  <div class="pl-6 pr-6">No results. Please run sim first</div>
{/if}
