<script>
  // import { invoke } from "@node_modules/@tauri-apps/api/tauri";

  import { getContext } from "svelte";
  import { goto } from "$app/navigation";
  import {
    charStore,
    actionConfigStore,
    opt,
    resultStore,
  } from "@components/store.js";
  import Loader from "@components/Sim/Loader.svelte";
  import Error from "./Error.svelte";
  import Options from "./Options.svelte";
  import { onMount } from "svelte";
  import Help from "./Help.svelte";
  import { teamToConfig } from "./convert";

  let Command, saveFile, writeFile, tempdir, readTextFile;

  onMount(async () => {
    // const { invoke } = await import("@tauri-apps/api/tauri");
    Command = (await import("@tauri-apps/api/shell")).Command;
    writeFile = (await import("@tauri-apps/api/fs")).writeFile;
    readTextFile = (await import("@tauri-apps/api/fs")).readTextFile;
    tempdir = (await import("@tauri-apps/api/os")).tempdir;
    saveFile = (await import("@tauri-apps/api/dialog")).save;
  });

  const { open, close } = getContext("modal");

  const handleOpenOpts = () => {
    open(Options, {
      handleExport: handleExport,
    });
  };

  const handleOpenHelp = () => {
    open(Help);
  };

  const handleClearActionConfig = () => {
    actionConfigStore.set("");
  };

  const handleExport = () => {
    //combine the configs
    let cfg = $actionConfigStore;
    if ($opt.useBuilder) {
      cfg = teamToConfig($charStore) + "\n" + cfg;
    }
    //strip out the options line and replace w our own
    cfg = cfg.replace(/^options.*$/m, "");
    //add our own options
    const cust = `options debug=${$opt.debug.toString()} iteration=${
      $opt.i
    } duration=${$opt.d} workers=${$opt.w};`;
    // console.log(cust);
    cfg = cust + "\n" + cfg;

    saveFile({
      filters: [
        {
          name: "txt",
          extensions: ["txt"],
        },
      ],
    })
      .then((location) => {
        console.log(location);
        return writeFile({
          contents: cfg,
          path: location,
        });
      })
      .then(() => {
        alert("Sim config exported ok");
      })
      .catch((e) => {
        console.log(e);
        alert("Error saving file: ", e);
      });
  };

  const handleRun = () => {
    //combine the configs
    let cfg = $actionConfigStore;
    if ($opt.useBuilder) {
      cfg = teamToConfig($charStore) + "\n" + cfg;
    }
    //strip out the options line and replace w our own
    cfg = cfg.replace(/^options.*$/m, "");
    //add our own options
    const cust = `options debug=${$opt.debug.toString()} iteration=${
      $opt.i
    } duration=${$opt.d} workers=${$opt.w};`;
    // console.log(cust);
    cfg = cust + "\n" + cfg;

    console.log(cfg);

    let path = "";

    tempdir()
      .then((dir) => {
        path = dir;
        console.log(path);
        return writeFile({
          contents: cfg,
          path: path + "/gcsim-input.txt",
        });
      })
      .then(() => {
        let params = [
          "-c=" + path + "/gcsim-input.txt",
          "-js=" + path + "/gcsim-out.txt",
          "-dh=false",
        ];
        if ($opt.calc) {
          params.push("-calc");
        }
        const command = Command.sidecar("gcsim", params);
        return command.execute();
      })
      .then((message) => {
        console.log(message);
        close();
        if (message.code !== 0) {
          open(Error, {
            err: `Error running sim (exited with code ${message.code}): ${message.stderr}`,
          });
          return Promise.reject("error running sim");
        } else {
          return readTextFile(path + "gcsim-out.txt");
        }
      })
      .then((data) => {
        const result = JSON.parse(data);
        result.ok = true;
        resultStore.set(result);
        // console.log($resultStore);
        //otherwise save the result and load the results page
        goto("/result");
      });

    //pop open a modal with clock on it as long as we're still loading
    open(Loader, {}, { closeOnEsc: false, closeOnOuterClick: false });
  };
</script>

<div class="flex flex-col">
  <div class="pl-6 pr-6">
    <div>
      <div class="text-lg font-medium pb-2">Actions</div>
      <div class="flex flex-row gap-2 pl-3">
        <textarea
          spellcheck="false"
          rows="30"
          class="bg-gray-700 resize-none rounded-md whitespace-pre text-xs font-mono w-full"
          placeholder="Enter action list config here"
          bind:value={$actionConfigStore}
        />
      </div>
    </div>
    <div class="w-full flex flex-row gap-4 mt-4 p-4">
      <button class="btn btn-primary w-48 flex-1" on:click={handleRun}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="play"
          class="w-6 h-6 pr-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          ><path
            fill="currentColor"
            d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"
          /></svg
        >
        Run
      </button>

      <button class="btn btn-secondary w-48 flex-1" on:click={handleOpenOpts}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="gears"
          class="w-6 h-6  pr-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          ><path
            fill="currentColor"
            d="M314.6 216.6L285.6 199.9C287.1 192.1 288 184.2 288 176.1C288 167.8 287.1 159.8 285.6 151.1L314.6 135.2c4.293-2.48 6.445-7.695 4.883-12.4C312.2 100.1 300.6 81.11 285.7 64.28C283.7 62.03 280.9 60.87 278 60.87c-1.861 0-3.736 .4785-5.42 1.449L243 79.41C231 69.11 217.3 61.07 202.1 55.75V21.65c0-4.943-3.418-9.348-8.258-10.36C182.9 9.002 171.6 7.67 160 7.67c-11.61 0-22.88 1.342-33.81 3.632c-4.84 1.016-8.248 5.41-8.248 10.35v34.09C102.7 61.07 88.96 69.11 76.98 79.41L47.39 62.32C45.71 61.35 43.83 60.87 41.97 60.87c-2.893 0-5.648 1.169-7.652 3.427C19.39 81.12 7.758 100.1 .5078 122.8C-1.053 127.5 1.098 132.7 5.391 135.2l29.04 16.77C32.93 159.8 32 167.8 32 176.1c0 8.137 .9434 16.04 2.395 23.75L5.391 216.6C1.098 219.1-1.053 224.3 .5078 228.1c7.25 21.83 18.79 41.69 33.71 58.52C36.22 289.8 39.08 290.9 41.97 290.9c1.861 0 3.738-.4785 5.42-1.449L76.7 272.6c12.04 10.41 25.91 18.53 41.24 23.89v33.69c0 4.941 3.419 9.279 8.258 10.29C137.1 342.7 148.4 344.1 160 344.1c11.61 0 22.88-1.411 33.81-3.7c4.84-1.016 8.247-5.343 8.247-10.28V296.5c15.34-5.365 29.2-13.49 41.24-23.9L272.6 289.5c1.68 .9707 3.559 1.449 5.42 1.449c2.891 0 5.646-1.238 7.652-3.498c14.92-16.83 26.56-36.6 33.81-58.44C321.1 224.3 318.9 219.1 314.6 216.6zM160 224.1c-26.51 0-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48S186.5 224.1 160 224.1zM628.5 318.2c-1.016-4.84-5.412-8.248-10.36-8.248h-34.09c-5.324-15.22-13.36-28.98-23.66-40.96l17.09-29.6c.9707-1.68 1.449-3.559 1.449-5.42c0-2.893-1.167-5.648-3.425-7.652c-16.83-14.92-36.67-26.56-58.51-33.81c-4.703-1.561-9.918 .5898-12.4 4.883l-16.77 29.04C479.1 224.9 471.1 224 463.7 224c-8.137 0-16.04 .9434-23.75 2.395L423.2 197.4c-2.48-4.293-7.699-6.443-12.4-4.883c-21.83 7.25-41.69 18.79-58.52 33.71c-2.26 2.004-3.419 4.857-3.419 7.748c0 1.861 .4795 3.738 1.45 5.42l16.92 29.31c-10.41 12.04-18.53 25.91-23.89 41.24H309.6c-4.941 0-9.496 3.393-10.51 8.232C296.8 329.1 295.7 340.4 295.7 352c0 11.61 1.184 22.9 3.473 33.82C300.1 390.7 304.7 394.1 309.6 394.1h33.69c5.365 15.34 13.49 29.2 23.9 41.24l-16.92 29.31c-.9707 1.68-1.45 3.559-1.45 5.42c0 2.891 1.044 5.742 3.304 7.748c16.83 14.92 36.8 26.46 58.63 33.71c4.703 1.562 9.922-.5898 12.4-4.883l16.74-29C447.6 479.1 455.5 480 463.7 480c8.268 0 16.3-.9336 24.13-2.432l16.77 29.04c2.48 4.293 7.695 6.445 12.4 4.883c21.84-7.25 41.69-18.9 58.52-33.82c2.258-2.006 3.414-4.751 3.414-7.642c0-1.861-.4785-3.736-1.449-5.42l-17.09-29.6c10.29-11.98 18.34-25.74 23.66-40.96h34.09c4.943 0 9.35-3.418 10.37-8.258C630.8 374.9 632.1 363.6 632.1 352C632.1 340.4 630.8 329.1 628.5 318.2zM463.7 400c-26.51 0-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48S490.2 400 463.7 400z"
          /></svg
        >
        Sim Options
      </button>

      <button
        class="btn btn-accent w-48 flex-1"
        on:click={handleClearActionConfig}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="trash-can"
          class="w-6 h-6  pr-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          ><path
            fill="currentColor"
            d="M32 464C32 490.5 53.5 512 80 512h288c26.5 0 48-21.5 48-48V128H32V464zM304 208C304 199.1 311.1 192 320 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM208 208C208 199.1 215.1 192 224 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM112 208C112 199.1 119.1 192 128 192s16 7.125 16 16v224C144 440.9 136.9 448 128 448s-16-7.125-16-16V208zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z"
          /></svg
        >
        Clear</button
      >

      <button class="btn btn-info w-48 flex-1" on:click={handleOpenHelp}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="circle-question"
          class="w-6 h-6 pr-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          ><path
            fill="currentColor"
            d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 336c-18 0-32 14-32 32s13.1 32 32 32c17.1 0 32-14 32-32S273.1 336 256 336zM289.1 128h-51.1C199 128 168 159 168 198c0 13 11 24 24 24s24-11 24-24C216 186 225.1 176 237.1 176h51.1C301.1 176 312 186 312 198c0 8-4 14.1-11 18.1L244 251C236 256 232 264 232 272V288c0 13 11 24 24 24S280 301 280 288V286l45.1-28c21-13 34-36 34-60C360 159 329 128 289.1 128z"
          /></svg
        >
        Help
      </button>
    </div>
  </div>
</div>
