<script>
  import { getContext } from "svelte";
  import Details from "./Details.svelte";

  export let data = {
    frame: 0,
    msg: "title goes here",
    raw: "",
    event: "",
    char: "",
    color: "bg-gray-600",
    icon: "circle",
    amount: 0,
    target: "",
  };

  //handlers
  const { open } = getContext("modal");

  const handleClick = () => {
    open(
      Details,
      {
        raw: data.raw,
      },
      {
        closeOnEsc: true,
        closeOnOuterClick: true,
        disableScrollWhenOpen: true,
      }
    );
  };

  //display logic
  const css = `flex flex-row gap-2 items-center pl-1 pr-1 pt-px pb-px rounded-md m-1 cursor-pointer bg-${data.color}`;
</script>

<div class={css} on:click={handleClick}>
  <span class="material-icons text-sm">
    {data.icon}
  </span>
  <div class="flex-grow">
    {data.msg}
  </div>
  <div>
    {data.target}
  </div>
</div>

<style>
  .bg-test {
    @apply bg-indigo-400;
  }
  .test-orange {
    --tw-bg-opacity: 1;
    background-color: #ec7d65;
  }
</style>
