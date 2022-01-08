<script>
  import { resultStore as r, gzipStore } from "@components/store.js";
  import { onMount } from "svelte";

  import PieChart from "./PieChart.svelte";
  import BarChart from "./BarChart.svelte";

  let saveFile, writeBinaryFile;

  onMount(async () => {
    writeBinaryFile = (await import("@tauri-apps/api/fs")).writeBinaryFile;
    saveFile = (await import("@tauri-apps/api/dialog")).save;
  });

  const handleShareResult = () => {
    let data = $gzipStore;

    saveFile({
      filters: [
        {
          name: "gz",
          extensions: ["gz"],
        },
      ],
    })
      .then((location) => {
        console.log(location);
        return writeBinaryFile({
          contents: data,
          path: location,
        });
      })
      .then(() => {
        alert("Sim results exported ok");
      })
      .catch((e) => {
        console.log(e);
        alert("Error exporting results file: ", e);
      });
  };

  const COLORS = [
    "#2965CC",
    "#29A634",
    "#D99E0B",
    "#D13913",
    "#8F398F",
    "#00B3A4",
    "#DB2C6F",
    "#9BBF30",
    "#96622D",
    "#7157D9",
  ];
  const CHAR_COLORS = ["#4472C4", "#ED7D31", "#A5A5A5", "#70AD47"];
  //handles on the various charts
  //team dps
  let avgDPSPerChar = [];
  let totalDamagePerChar = [];

  let selectedChar = -1; //-1 means show all char
  //depending on selected char build data
  $r.damage_by_char.forEach((v, i) => {
    let total = 0; //this is for the total
    for (const [_, value] of Object.entries(v)) {
      total += value.mean;
    }
    //add it to damage
    avgDPSPerChar.push((100 * total) / $r.dps.mean);
    totalDamagePerChar.push(total);
  });
  //indivdual contribution
  let charChartLabels = [];
  let charChartValues = [];
  let abilCountLabels = [];
  let abilCount = [];
  $: {
    if (selectedChar !== -1) {
      charChartValues = [];
      charChartLabels = [];
      abilCountLabels = [];
      abilCount = [];

      let v = $r.damage_by_char[selectedChar];
      for (const [key, value] of Object.entries(v)) {
        charChartLabels.push(key);
        charChartValues.push(
          (100 * value.mean) / totalDamagePerChar[selectedChar]
        );
      }

      v = $r.abil_usage_count_by_char[selectedChar];
      for (const [key, value] of Object.entries(v)) {
        abilCountLabels.push(key);
        abilCount.push(value.mean);
      }
      charChartLabels = charChartLabels;
      charChartValues = charChartValues;
      abilCountLabels = abilCountLabels;
      abilCount = abilCount;
    }
  }

  //char up time
  let charUptime = [];
  $r.char_active_time.forEach((v) => [charUptime.push(v.mean)]);
  //particle count
  let particleCount = [];
  let particleCountLabel = [];
  for (const [key, value] of Object.entries($r.particle_count)) {
    particleCountLabel.push(key);
    particleCount.push(value.mean);
  }
  //reaction count
  let reactionCount = [];
  let reactionCountLabel = [];
  for (const [key, value] of Object.entries($r.reactions_triggered)) {
    reactionCountLabel.push(key);
    reactionCount.push(value.mean);
  }

  console.log($r);
</script>

<div class="flex flex-col pl-6 pr-6 relative">
  <div class="bg-gray-700 p-2 rounded-md flex flex-col">
    <div class="text-lg font-medium pt-2 pb-2">
      Damage Breakdown (in damage/second, on average)
    </div>
    <div class="m-2 p-2 rounded-md bg-gray-600">
      <p>
        In total, the team did <strong class="text-gray-100"
          >{$r.dps.mean.toFixed(2)}</strong
        >

        damage per second (on average, over {$r.iter} iterations [min:{" "}
        {$r.dps.min.toFixed(2)}, max: {$r.dps.max.toFixed(2)}, std dev:{" "}
        {$r.dps.sd?.toFixed(2)}]), over the course of{" "}
        {$r.sim_duration.mean.toFixed(2)} seconds. The simulation took {(
          $r.runtime / 1000000000
        ).toFixed(3)} seconds
      </p>
    </div>
    <div class="grid grid-cols-2 p-2 gap-4">
      <PieChart
        labels={$r.char_names}
        values={totalDamagePerChar}
        colors={CHAR_COLORS}
        handleSelect={(id) => {
          selectedChar = id;
        }}
        title="Average DPS by Character"
      />
      <PieChart
        labels={$r.char_names}
        values={charUptime}
        colors={CHAR_COLORS}
        handleSelect={(id) => {
          selectedChar = id;
        }}
        title="Average Field Time (In Frames) by Character"
      />
    </div>
    {#if selectedChar !== -1}
      <div class="grid grid-cols-2 p-2 gap-4">
        {#key charChartLabels}
          <BarChart
            labels={charChartLabels}
            values={charChartValues}
            colors={COLORS}
            title={$r.char_names[selectedChar] + " DPS Per Ability"}
          />
        {/key}
        {#key abilCountLabels}
          <BarChart
            labels={abilCountLabels}
            values={abilCount}
            colors={COLORS}
            title={$r.char_names[selectedChar] + " Average Ability Usage"}
          />
        {/key}
      </div>
    {/if}
    <div class="grid grid-cols-2 p-2 gap-4">
      <BarChart
        labels={particleCountLabel}
        values={particleCount}
        colors={COLORS}
        title="Average Energy Particle by Source"
      />
      <BarChart
        labels={reactionCountLabel}
        values={reactionCount}
        colors={COLORS}
        title="Average Number of Reactions"
      />
    </div>

    <div class="text-lg font-medium pt-2 pb-2">Text Summary</div>
    <pre>
        {$r.text}
    </pre>
  </div>
  <div class="sticky bottom-2 w-full flex justify-center mb-2">
    <button class="btn btn-wide opacity-75" on:click={handleShareResult}
      >share</button
    >
  </div>
</div>
