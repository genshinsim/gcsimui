<script>
  export let weapons = [];
  export let onChange = (v) => {};

  const notImplemented = [
    "amberbead",
    "bloodtaintedgreatsword",
    "compoundbow",
    "darkironsword",
    "ebonybow",
    "emeraldorb",
    "everlastingmoonglow",
    "ferrousshadow",
    "filletblade",
    "hakushinring",
    "halberd",
    "ironpoint",
    "katsuragikirinagamasa",
    "messenger",
    "mitternachtswaltz",
    "oldmercspal",
    "otherworldlystory",
    "pocketgrimoire",
    
    "predator",
    "quartz",
    "ravenbow",
    "recurvebow",
    "seasonedhuntersbow",
    "silversword",
    "slingshot",
    "swordofdescension",
    "theflagstaff",
    "travelershandysword",
    "twinnephrite",
    "whiteirongreatsword",
    "whitetassel",
    "wineandsong",
    "calamityqueller",
  ];
</script>

<div class="bg-gray-700 p-4 rounded-md shadow edit-content">
  <div class="font-medium items-center text-white title-font mb-4">
    Choose a weapon
  </div>
  <div class="grid grid-cols-10 title-font">
    {#each weapons as w, index (index)}
      <div
        class={notImplemented.includes(w.key)
          ? "opacity-40 rounded-md p-1 cursor-not-allowed"
          : "hover:bg-gray-500 rounded-md p-1 cursor-pointer"}
        on:click={() => {
          if (notImplemented.includes(w.key)) {
            return;
          }
          onChange(w);
        }}
      >
        <div data-tip={w.name} class="tooltip">
          <img src={w.icon} alt={w.name} title={w.name} />
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss" scoped>
  .edit-content {
    width: 85vw;
  }
</style>
