<script>
  import "../app.css";
  import { onMount } from "svelte";

  import Navbar from "../components/Navbar.svelte";
  import Modal from "../components/Modal/Modal.svelte";
  import genshindb from "genshin-db";

  genshindb.addAltName(
    genshindb.Languages.English,
    genshindb.Folders.characters,
    "Traveler",
    "Lumine"
  );
</script>

<div class="mx-auto h-full">
  <Navbar />

  <Modal>
    <slot />
  </Modal>
</div>
