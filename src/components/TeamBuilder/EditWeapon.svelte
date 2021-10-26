<script>
  import { charAscLvlCap, ascLvlMin } from "@src/_util";

  export let lvl = 1;
  export let asc = 0;
  export let refine = 0;
  export let name = "invalid";
  export let onChange = (v) => {};

  $: minLvl = ascLvlMin(asc);
  $: maxLvl = charAscLvlCap(asc);

  const handleChange = () => {
    onChange({
      level: lvl,
      ascension: asc,
      refinement: refine,
    });
  };
</script>

<div class="flex flex-col bg-gray-700 p-4 rounded-md shadow">
  <div class="font-medium text-lg rounded-md mb-4">
    {name}
  </div>
  <div class="ml-2">
    <div class="flex flex-col">
      <div class="flex flex-row items-center">
        <span class="flex-grow w-44">Level {lvl}/{maxLvl}</span>
        <div class="flex flex-row">
          {#each Array(6) as _, index (index)}
            <span
              class={index < asc
                ? "fill-current text-yellow-400 hover:bg-gray-500 p-1 rounded-md"
                : "hover:bg-gray-500 p-1 rounded-md"}
              on:click={() => {
                asc = asc == index + 1 ? index : index + 1;
                const min = ascLvlMin(asc);
                const max = charAscLvlCap(asc);
                if (lvl > max) {
                  lvl = max;
                  console.log("lvl set to: ", lvl);
                }
                if (lvl < min) {
                  lvl = min;
                  console.log("lvl set to: ", lvl);
                }
                handleChange();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </span>
          {/each}
        </div>
      </div>

      <label>
        <input
          type="range"
          class="range p-1 mt-2"
          min={minLvl}
          max={maxLvl}
          value={lvl}
          on:input={(e) => {
            lvl = parseInt(e.target.value);
            handleChange();
          }}
          on:change={(e) => {
            lvl = parseInt(e.target.value);
            handleChange();
          }}
        />
      </label>
    </div>
    <div class="flex flex-col mt-1">
      <span class="flex-grow">Refinement {refine}/{5}</span>
      <label>
        <input
          type="range"
          class="range p-1 mt-2"
          min={1}
          max={5}
          value={refine}
          on:input={(e) => {
            refine = parseInt(e.target.value);
            handleChange();
          }}
          on:change={(e) => {
            refine = parseInt(e.target.value);
            handleChange();
          }}
        />
      </label>
    </div>
  </div>
</div>
