<script>
  import { page } from "$app/stores";
  import { resultStore } from "@components/store.js";
</script>

<header>
  <div
    class="mx-auto flex flex-wrap p-2 flex-col md:flex-row mb-3 items-center"
  >
    <a
      class="flex title-font font-medium items-center text-white mb-4 md:mb-0"
      href="/"
    >
      <span class="ml-3 text-xl border-b-2 border-transparent">gsim</span>
    </a>
    <nav
      class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center"
    >
      <a
        class={$page.path === "/"
          ? "mr-5 hover:text-white border-b-2"
          : "mr-5 hover:text-white border-b-2 border-transparent"}
        href="/">Sim</a
      >
      <a
        class={$page.path === "/builder"
          ? "mr-5 hover:text-white border-b-2"
          : "mr-5 hover:text-white border-b-2 border-transparent"}
        href="/builder">Builder</a
      >
      <a
        class={$page.path === "/import"
          ? "mr-5 hover:text-white border-b-2"
          : "mr-5 hover:text-white border-b-2 border-transparent"}
        href="/import">Import</a
      >
      <a
        class={$page.path === "/result"
          ? "mr-5 hover:text-white border-b-2"
          : "mr-5 hover:text-white border-b-2 border-transparent"}
        href="/result"
        disabled={!$resultStore.ok}>Result</a
      >
      <a
        class={$page.path === "/debug"
          ? "mr-5 hover:text-white border-b-2"
          : "mr-5 hover:text-white border-b-2 border-transparent"}
        href="/debug"
        disabled={!$resultStore.ok}>Debug</a
      >
      <a
        class={$page.path === "/credits"
          ? "mr-5 hover:text-white border-b-2"
          : "mr-5 hover:text-white border-b-2 border-transparent"}
        href="/credits">Credits</a
      >
    </nav>
  </div>
</header>
