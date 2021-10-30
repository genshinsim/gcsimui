<script>
  import Chart from "./Chart.svelte";

  export let labels = [];
  export let values = [];
  export let colors = [];
  export let handleSelect = () => {};
  export let title = "Pie Chart";

  let chart;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        onClick: (_, item) => {
          handleSelect(item.index);
        },
      },
    },
    onClick: (e) => {
      const points = chart.getElementsAtEventForMode(
        e,
        "nearest",
        { intersect: true },
        true
      );
      if (points.length) {
        let firstPoint = points[0];
        handleSelect(firstPoint.index);
      }
    },
  };
</script>

<Chart {title} {labels} {values} {colors} {options} bind:chart type="pie" />
