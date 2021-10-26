<script>
  import { ascLvlMin, charAscLvlCap } from "@src/_util";
  import genshindb from "genshin-db";

  export let lvl = 1;
  export let asc = 0;
  export let cons = 0;
  export let tal = {
    auto: 1,
    skill: 1,
    burst: 1,
  };
  export let name = "";
  export let onChange = (v) => {};

  let consImages = ["", "", "", "", "", ""];

  $: {
    let x = genshindb.constellations(name);
    if (x) {
      consImages[0] = x.images.c1;
      consImages[1] = x.images.c2;
      consImages[2] = x.images.c3;
      consImages[3] = x.images.c4;
      consImages[4] = x.images.c5;
      consImages[5] = x.images.c6;
    }
  }

  $: minLvl = ascLvlMin(asc);
  $: maxLvl = charAscLvlCap(asc);

  const handleChange = () => {
    onChange({
      level: lvl,
      ascension: asc,
      constellation: cons,
      talent: tal,
    });
  };
</script>

<div class="flex flex-col bg-gray-700 p-4 rounded-md shadow ">
  <div class="font-medium text-lg rounded-md mb-2">
    {name}
  </div>
  <div class="ml-2">
    <div class="flex flex-col">
      <div class="flex flex-row items-center">
        <span class="flex-grow">Level {lvl}/{maxLvl}</span>
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

    <div class="flex flex-col mt-4">
      <div class="grid grid-cols-6 gap-2">
        {#each consImages as url, index (index)}
          <div
            class={cons > index
              ? "rounded-md border-2 border-gray-100 opacity-100 hover:bg-gray-500"
              : "rounded-md border-2 border-transparent opacity-25 hover:bg-gray-500"}
            on:click={() => {
              cons = cons == index + 1 ? index : index + 1;
              handleChange();
            }}
          >
            <img src={url} alt="" class="w-12 h-12" />
          </div>
        {/each}
      </div>
    </div>
    <div class="grid grid-cols-3 mt-4">
      <div class="flex flex-col ml-2 mt-1 items-center">
        <span>Normal</span>
        <div class="flex flex-row items-center">
          <div
            class="flex flex-col justify-center text-center rounded-full bg-gray-600 h-10 w-10"
          >
            {tal.auto}
          </div>
          <div class="flex flex-col">
            <div
              class="rounded-full hover:bg-gray-600"
              on:click={() => {
                if (tal.auto < 10) {
                  tal.auto++;
                }
                handleChange();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <div
              class="rounded-full hover:bg-gray-600"
              on:click={() => {
                if (tal.auto > 0) {
                  tal.auto--;
                }
                handleChange();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col ml-2 mt-1 items-center">
        <span>Skill</span>
        <div class="flex flex-row items-center">
          <div
            class="flex flex-col justify-center text-center rounded-full bg-gray-600 h-10 w-10"
          >
            {tal.skill}
          </div>
          <div class="flex flex-col">
            <div
              class="rounded-full hover:bg-gray-600"
              on:click={() => {
                if (tal.skill < 10) {
                  tal.skill++;
                }
                handleChange();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <div
              class="rounded-full hover:bg-gray-600"
              on:click={() => {
                if (tal.skill > 0) {
                  tal.skill--;
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col ml-2 mt-1 items-center">
        <span>Burst</span>
        <div class="flex flex-row items-center">
          <div
            class="flex flex-col justify-center text-center rounded-full bg-gray-600 h-10 w-10"
          >
            {tal.burst}
          </div>
          <div class="flex flex-col">
            <div
              class="rounded-full hover:bg-gray-600"
              on:click={() => {
                if (tal.burst < 10) {
                  tal.burst++;
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <div
              class="rounded-full hover:bg-gray-600"
              on:click={() => {
                if (tal.burst > 0) {
                  tal.burst--;
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
