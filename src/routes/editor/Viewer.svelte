<svelte:options immutable={true} />

<script lang="ts">
  import { VFile } from "vfile";
  import type { ViewerProps as Props } from "./type";
  import { getProcessor } from "./utils/getProcessor";

  export let value: Props["value"] = "";

  let file: VFile;

  $: try {
    file = getProcessor().processSync(value);
  } catch (error) {
    console.error(error);
  }
</script>

<div class="markdown-body">
  {@html file}
</div>

<style>
  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 4%;
  }
</style>
