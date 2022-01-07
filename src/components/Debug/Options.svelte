<script>
  import { logSettings } from "@components/store.js";
  import { eventColor } from "@src/_util";

  const opts = [
    "procs",
    "damage",
    "pre_damage_mods",
    "hurt",
    "heal",
    "calc",
    "reaction",
    "element",
    "snapshot",
    "snapshot_mods",
    "status",
    "action",
    "queue",
    "energy",
    "character",
    "enemy",
    "hook",
    "sim",
    "task",
    "artifact",
    "weapon",
    "shield",
    "construct",
    "icd",
  ];

  const defaults = [
    "damage",
    "element",
    "action",
    "energy",
    "pre_damage_mods",
    "snapshot_mods",
  ];

  var handleClear = () => {
    logSettings.set([]);
  };

  var handleSetDefault = () => {
    logSettings.set(defaults);
  };

  var toggleLogEvent = (val) => {
    logSettings.update((store) => {
      //if not in store already then add it in
      const i = store.indexOf(val);
      if (i === -1) {
        store.push(val);
      } else {
        store.splice(i, 1);
      }
      return store;
    });
  };
</script>

<!-- left section -->
<!-- right section -->
<div class="bg-gray-700 rounded-md p-2">
  <div class="text-md font-medium">Log Options</div>
  <div class="grid grid-cols-3">
    <!-- various options -->
    {#each opts as o, index (index)}
      <div class="flex flex-row gap-1 p-1 items-center">
        <input
          type="checkbox"
          checked={$logSettings.indexOf(o) > -1}
          class="checkbox"
          on:change={() => toggleLogEvent(o)}
        />
        <span class="font-medium" style={`color: ${eventColor(o)}`}>{o}</span>
      </div>
    {/each}
  </div>
  <div class="grid grid-cols-2 p-2 gap-2 mt-2">
    <button class="btn btn-info" on:click={handleSetDefault}>Defaults</button>
    <button class="btn btn-error" on:click={handleClear}>Clear</button>
  </div>
</div>
