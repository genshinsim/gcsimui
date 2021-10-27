<script>
  import { opt } from "@components/store.js";

  const pattern = new RegExp(/^[0-9]{1,4}$/m);
  const workerPattern = new RegExp(/^[0-9]{1,2}$/m);
  const iterPattern = new RegExp(/^[0-9]{1,6}$/m);
</script>

<div
  class="flex flex-col edit-content bg-gray-700 p-4 rounded-md shadow edit-content gap-2"
>
  <div class="font-medium text-lg flex-grow">Options</div>
  <div class="flex flex-row p-1 justify-items-center">
    <div class="flex items-center">Sim Duration</div>
    <div
      class="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300"
    >
      <input
        type="number"
        placeholder="enter amount"
        class="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500"
        value={$opt.d}
        on:input={(e) => {
          const val = e.target.value;
          if (pattern.test(val)) {
            e.target.setCustomValidity("");
            opt.update((store) => {
              store.d = parseInt(val);
              return store;
            });
            return;
          }
          e.target.setCustomValidity("invalid input");
        }}
      />
      <div class="p-1 w-2 rounded-r-md bg-gray-800 items-center flex" />
    </div>
  </div>
  <div class="flex flex-row p-1 justify-items-center">
    <div class="flex items-center  flex-grow">Iterations</div>
    <div
      class="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300"
    >
      <input
        type="number"
        placeholder="enter amount"
        class="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500"
        value={$opt.i}
        on:input={(e) => {
          const val = e.target.value;
          if (iterPattern.test(val)) {
            e.target.setCustomValidity("");
            opt.update((store) => {
              store.i = parseInt(val);
              return store;
            });
            return;
          }
          e.target.setCustomValidity("invalid input");
        }}
      />
      <div class="p-1 w-2 rounded-r-md bg-gray-800 items-center flex" />
    </div>
  </div>
  <div class="flex flex-row p-1 justify-items-center">
    <div class="flex items-center  flex-grow">Workers</div>
    <div
      class="ml-4 mr-4 rounded-md flex flex-row focus-within:ring focus-within:border-blue-300"
    >
      <input
        type="number"
        placeholder="enter amount"
        class="w-40 p-2 rounded-l-md bg-gray-800 text-right focus:outline-none invalid:text-red-500"
        value={$opt.w}
        on:input={(e) => {
          const val = e.target.value;
          if (workerPattern.test(val)) {
            e.target.setCustomValidity("");
            opt.update((store) => {
              store.w = parseInt(val);
              return store;
            });
            return;
          }
          e.target.setCustomValidity("invalid input");
        }}
      />
      <div class="p-1 w-2 rounded-r-md bg-gray-800 items-center flex" />
    </div>
  </div>
  <div class="flex flex-row p-1 justify-items-center">
    <div class="flex items-center  flex-grow">Debug</div>
    <div class="ml-4 mr-4 rounded-md">
      <input
        type="checkbox"
        checked={$opt.debug}
        class="toggle toggle-primary"
        on:change={(e) => {
          opt.update((store) => {
            store.debug = e.target.checked;
            return store;
          });
        }}
      />
    </div>
  </div>
</div>

<style lang="postcss" scoped>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
