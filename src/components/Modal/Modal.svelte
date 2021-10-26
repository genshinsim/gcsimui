<script>
  import { setContext } from "svelte";

  let closeOnEsc = true;
  let closeOnOuterClick = true;
  let disableScrollWhenOpen = true;

  //track diff components
  let bgDiv;
  let wrapDiv;
  let windowDiv;
  let outerClickTarget; //check where we clicked
  //for scroll
  let scrollY;
  let prevBodyPosition;
  let prevBodyOverflow;
  let prevBodyWidth;

  let Component = null;
  let props = {}; //component probs

  const open = (
    NewComponent,
    newProps = {},
    opts = {
      closeOnEsc: true,
      closeOnOuterClick: true,
      disableScrollWhenOpen: true,
    }
  ) => {
    Component = NewComponent;
    props = newProps;
    //overide options of any
    closeOnEsc = opts.closeOnEsc;
    closeOnOuterClick = opts.closeOnOuterClick;
    disableScrollWhenOpen = opts.disableScrollWhenOpen;
    if (disableScrollWhenOpen) {
      disableScroll();
    }
  };

  const close = () => {
    Component = null;
    props = {};
    if (disableScrollWhenOpen) {
      enableScroll();
    }
  };

  //handle clicking outside the modal
  const handleOuterMousedown = (event) => {
    if (
      closeOnOuterClick &&
      (event.target === bgDiv || event.target === wrapDiv)
    )
      outerClickTarget = event.target;
  };
  const handleOuterMouseup = (event) => {
    if (closeOnOuterClick && event.target === outerClickTarget) {
      event.preventDefault();
      close();
    }
  };

  const disableScroll = () => {
    scrollY = window.scrollY;
    prevBodyPosition = document.body.style.position;
    prevBodyOverflow = document.body.style.overflow;
    prevBodyWidth = document.body.style.width;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
  };
  const enableScroll = () => {
    document.body.style.position = prevBodyPosition || "";
    document.body.style.top = "";
    document.body.style.overflow = prevBodyOverflow || "";
    document.body.style.width = prevBodyWidth || "";
    window.scrollTo(0, scrollY);
  };

  //trap focus
  const handleKeydown = (event) => {
    if (closeOnEsc && Component && event.key === "Escape") {
      event.preventDefault();
      close();
    }
    if (Component && event.key === "Tab") {
      // trap focus
      const nodes = windowDiv.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((node) => node.tabIndex >= 0);
      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && event.shiftKey) index = 0;
      index += tabbable.length + (event.shiftKey ? -1 : 1);
      index %= tabbable.length;
      tabbable[index].focus();
      event.preventDefault();
    }
  };

  //make the open and close function available
  setContext("modal", { open, close });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if Component}
  <div
    bind:this={bgDiv}
    class="modal-bg"
    on:mousedown={handleOuterMousedown}
    on:mouseup={handleOuterMouseup}
  >
    <div class="bg-wrap flex flex-row justify-center" bind:this={wrapDiv}>
      <div class="bg-window" bind:this={windowDiv}>
        <div class="content">
          <svelte:component this={Component} {...props} />
        </div>
      </div>
    </div>
  </div>
{/if}

<slot />

<style>
  .modal-bg {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.66);
  }
  .bg-wrap {
    position: relative;
    margin: 2rem;
    max-height: 100%;
  }
  .bg-window {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }
  .content {
    position: relative;
    padding: 1rem;
    max-height: calc(100vh - 4rem);
    overflow: auto;
  }
</style>
