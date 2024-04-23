import { EditorView } from "codemirror";

export const theme = EditorView.theme({
  // 除去默认聚焦原始
  "&.cm-focused": {
    outline: "none",
  },
  // 标题样式
  ".ͼ7": {
    textDecoration: "none",
  },
  // 除去当前选中代码背景样式
  ".cm-activeLine": {
    backgroundColor: "transparent",
  },
  // 主元素样式
  ".cm-scroller": {
    height: "300px",
    display: "inline-block",
    boxSizing: "border-box",
    border: " 1px solid #e1e4e8",
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace",
  },
  ".cm-content": {
    padding: "16px 4%",
  },
  // 列表头样式
  ".cm-gutters": {
    display: "none",
  },
});
