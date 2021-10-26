<script>
  import { resultStore } from "@components/store.js";
</script>

{#if $resultStore.ok}
  <div class="flex flex-col pl-6 pr-6">
    <div class="bg-gray-700 p-2 rounded-md">
      <div class="text-lg font-medium pt-2 pb-2">Text Summary</div>
      <pre>
        {$resultStore.text}
    </pre>
    </div>
  </div>
{:else}
  <div class="pl-6 pr-6">No results. Please run sim first</div>
{/if}
