<script>
  import ActionItem from "./ActionItem.svelte";
</script>

<div class="flex flex-col">
  <div class="mb-4 top-0 sticky bg-gray-900 ">
    <span class="ml-3 text-xl ">Action List</span>
  </div>

  <div class="flex flex-row gap-2 ml-4">
    <div class="container w-3/4 flex flex-col gap-2">
      <ActionItem />
      <ActionItem />
      <ActionItem />
      <ActionItem />
      <ActionItem />
      <ActionItem />
      <ActionItem />
      <ActionItem />
      <ActionItem />
    </div>
    <div class="container w-auto pl-2 flex flex-col gap-2">
      <button
        class="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base mt-4 md:mt-0"
      >
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
        Action
      </button>
      <button
        class="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base mt-4 md:mt-0"
      >
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
        Sequence Strict
      </button>
    </div>
  </div>
</div>
