<script>
  import { onMount } from "svelte";
  let open = () => {};

  onMount(async () => {
    // const { invoke } = await import("@tauri-apps/api/tauri");
    open = (await import("@tauri-apps/api/shell")).open;
  });
</script>

<div class="bg-gray-700 p-2 rounded-md shadow edit-content">
  <div class="font-medium items-center text-white title-font mb-4">FAQ</div>
  <div>
    <strong>How does this thing work?</strong>
    <p>
      The sim runs on a text based config file. For more help on the config file
      itself, see <a
        href="/#"
        on:click={(e) => {
          e.preventDefault();
          open("https://github.com/genshinsim/gsim/wiki/Configuration");
        }}>wiki</a
      >.
    </p>
    <p>
      The UI assist with the process of building a config file. On the builder
      tab you can put together your team of characters (and there respective
      weapon, artifacts, etc..). Then click on the Load from Builder button to
      convert that into the text format accepted by the sim.
    </p>
    <p>
      Currently there is no UI for assisting with building the action list (i.e.
      what character ability the sim should use in what order). This will have
      to be written in the text format still. For more information on the action
      list itself, see <a
        href="/#"
        on:click={(e) => {
          e.preventDefault();
          open("https://github.com/genshinsim/gsim/wiki/Action-List");
        }}>wiki</a
      >.
    </p>
    <p>
      However, you can use an action list someone else has already made. Feel
      free to ask in the sim's discord for help.
    </p>
  </div>
</div>

<style lang="postcss" scoped>
  .edit-content {
    width: 90vw;
  }
</style>
