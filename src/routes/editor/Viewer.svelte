<svelte:options immutable={true} />

<script lang="ts">
  import { VFile } from "vfile";
  import type { ViewerProps as Props } from "./type";
  import { getProcessor } from "./utils/getProcessor";

  export let value: Props["value"] = "";

  let file: VFile;
  let i = 0;

  $: try {
    file = getProcessor().processSync(value);
    i++;
  } catch (error) {
    console.error(error);
  }

  $: html = `${file}<!--${i}-->`;
</script>

<div class="markdown-body">
  {@html html}
</div>

<style>
  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 4%;
  }
</style>
