<script>
  import { getContext } from "svelte";
  export let err = "";

  const { close } = getContext("modal");

  const handleClose = () => {
    close();
  };
</script>

<div class="p4 bg-gray-700 p-4 rounded-md">
  <div class="alert alert-error">
    <div class="flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 mx-2 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
      <div>{err}</div>
    </div>
  </div>
  <div class="flex mt-4 items-end">
    <button class="btn btn-accent" on:click={handleClose}>Close</button>
  </div>
</div>
