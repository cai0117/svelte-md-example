import type { Schema } from "hast-util-sanitize";

export interface ViewerProps {
  value: string;
  sanitize?: (schema: Schema) => Schema;
}
