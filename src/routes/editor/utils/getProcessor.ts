import { unified } from "unified";
import type { ViewerProps } from "../type";
import remarkParse from "remark-parse";
import { defaultSchema, type Schema } from "hast-util-sanitize";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const schemaStr = JSON.stringify(defaultSchema);

export function getProcessor({ sanitize }: Omit<ViewerProps, "value">) {
  let schema = JSON.parse(schemaStr) as Schema;

  schema.attributes!["*"].push("className"); // Allow class names by default

  if (typeof sanitize === "function") {
    schema = sanitize(schema);
  }

  let processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeSanitize, schema);

  return processor.use(rehypeStringify);
}
