<script>
  import { onMount } from "svelte";
  import Chart from "@node_modules/chart.js/auto";

  export let labels = [];
  export let values = [];
  export let colors = [];
  export let options = {};
  export let type = "line";
  export let chart;
  export let title = "";

  let ctx;
  let chartCanvas;

  Chart.defaults.color = "#ffffff";

  onMount(() => {
    ctx = chartCanvas.getContext("2d");
    chart = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: colors,
            borderColor: colors,
            data: values,
          },
        ],
      },
      options: options,
    });
    // console.log("rendering chart");
    // console.log(chart);
  });
</script>

<div class="relative h-72 rounded-md p-2 pt-10 bg-gray-600">
  <span
    style="position: absolute; top: 0; left: 0;"
    class="ml-2 mt-1 font-bold capitalize">{title}</span
  >
  <canvas id="myChart" bind:this={chartCanvas} />
</div>
