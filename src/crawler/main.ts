import { crawlDomains } from "./crawler";
import { getDomainList } from "./input";
import { initOutputDB, insertResult } from "./output";

const SLICE_SIZE = 10; // domains per slice (in parallel)

async function main() {
  const domainList = await getDomainList("data/domains.parquet");

  const slices = Math.ceil(domainList.length / SLICE_SIZE);

  const db = await initOutputDB("data/crawl_results.db");

  for (let i = 0; i < slices; i++) {
    console.time(`Processing slice ${i + 1} of ${slices}...`);

    const searchDomains = domainList.slice(
      SLICE_SIZE * i,
      SLICE_SIZE * (i + 1)
    );

    const results = await crawlDomains(searchDomains);

    console.timeEnd(`Processing slice ${i + 1} of ${slices}...`);
    console.log(
      results.filter((x) => x.text !== null).length,
      "Crawled successfully"
    );

    for (const result of results) {
      await insertResult(db, result);
    }
  }
}

main();
