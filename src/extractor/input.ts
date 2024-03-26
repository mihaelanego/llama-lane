import duckdb from "duckdb";
import { CrawlItem } from "../crawler/crawler";

export function getCrawlItems(path: string): Promise<CrawlItem[]> {
  const db = new duckdb.Database(path);

  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM crawl_results", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          data.map(
            (row) => ({ domain: row.domain, text: row.text }) as CrawlItem
          )
        );
      }
    });
  });
}
