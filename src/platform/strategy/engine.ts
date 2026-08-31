import type { PageBlock } from "@/config/client.schema";

export function processStrategy(blocks: PageBlock[]) {
  return blocks.map((block: PageBlock) => {
    return {
      ...block,
      processed: true,
    };
  });
}
