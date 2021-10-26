<script>
  export let color = "#2B59C3";
  export let unit = "px";
  export let duration = "5s";
  export let size = "60";
</script>

<div style="--size: {size}{unit}; --color:{color}; --duration:{duration}" />

<style>
  div {
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 2px var(--color);
    border-radius: 50%;
  }
  div::before,
  div:after {
    position: absolute;
    content: "";
    background-color: var(--color);
  }
  div:after {
    width: calc(var(--size) / 2.4);
    height: 2px;
    top: calc(var(--size) / 2);
    left: calc(var(--size) / 2);
    transform-origin: 1px 1px;
    animation: rotate calc(var(--duration) / 4) linear infinite;
  }
  div:before {
    width: calc(var(--size) / 3);
    height: 2px;
    top: calc((var(--size) / 2));
    left: calc((var(--size) / 2));
    transform-origin: 1px 1px;
    animation: rotate var(--duration) linear infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
