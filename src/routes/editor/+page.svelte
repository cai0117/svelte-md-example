<svelte:options immutable={true} />

<script lang="ts">
  import { EditorView, basicSetup } from "codemirror";
  import { EditorState } from "@codemirror/state";
  import { markdown } from "@codemirror/lang-markdown";
  import { onDestroy, onMount, tick } from "svelte";
  import Viewer from "./Viewer.svelte";
  import { theme } from "./utils/config";

  let divElement: HTMLDivElement;

  let previewElement: HTMLDivElement;

  let value: string;

  let state = EditorState.create({
    extensions: [
      basicSetup,
      EditorView.lineWrapping,
      markdown(),
      theme,
      EditorView.updateListener.of((viewUpdate) => {
        value = viewUpdate.state.doc.toString();
        let scrollTop = viewUpdate.view.scrollDOM.scrollTop;
        previewElement.scrollTop = scrollTop;
      }),
    ],
  });

  let editor: EditorView;

  const styles = (() => {
    let edit: string = `width:50%`;
    let preview: string = `width:50%`;

    return { edit, preview };
  })();

  onMount(() => {
    if (divElement) {
      editor = new EditorView({
        state,
        parent: divElement,
      });
    }
  });

  onDestroy(() => {
    if (editor) editor.destroy();
  });
</script>

<svelte:head>
  <title>Editor</title>
  <meta name="description" content="Editor this app" />
</svelte:head>

<div class="selfmd">
  <div class="editor" style={styles.edit} bind:this={divElement}></div>
  <div class="preview" style={styles.preview} bind:this={previewElement}>
    <Viewer {value} />
  </div>
</div>

<style>
  .selfmd {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Helvetica,
      Arial,
      sans-serif,
      Apple Color Emoji,
      Segoe UI Emoji;
    color: #24292e;
    background-color: #ffffff;
    height: 300px;
    display: flex;
  }

  .editor {
    background: #f8f9fa;
  }
  .preview {
    overflow: auto;
  }
</style>
