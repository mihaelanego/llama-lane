import fs from "fs";
import { getCrawlItems } from "./input";
import { extractAddressFromText } from "./model";
import { AddressInfo } from "./prompt";

type Results = {
  [domain: string]: AddressInfo[];
};

const SLICE_SIZE = 10;

async function main() {
  const items = await getCrawlItems("data/crawl_results.db");
  const results: Results = {};

  const slices = Math.ceil(items.length / SLICE_SIZE);

  for (let i = 0; i < slices; i++) {
    console.time(`Processing slice ${i + 1} of ${slices}...`);

    const itemsProcess = items.slice(SLICE_SIZE * i, SLICE_SIZE * (i + 1));

    const pending = itemsProcess.map(async (item) => {
      console.log("Item:", item.domain);

      const text = item.text;

      if (!text) {
        results[item.domain] = [];
        return;
      }

      try {
        const address = await extractAddressFromText(text);
        results[item.domain] = address;
      } catch (err) {
        try {
          const address = await extractAddressFromText(text);
          results[item.domain] = address;
        } catch (err) {
          results[item.domain] = [];
          console.log("Failed to extract address from item:", item.domain);
        }
      }
    });

    await Promise.allSettled(pending);
    console.timeEnd(`Processing slice ${i + 1} of ${slices}...`);

    fs.writeFileSync("data/results.json", JSON.stringify(results, null, 2));
  }
}

main();
