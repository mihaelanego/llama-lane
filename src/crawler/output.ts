import duckdb from "duckdb";
import { CrawlItem } from "./crawler";

export async function initOutputDB(path: string): Promise<duckdb.Database> {
  const db = new duckdb.Database(path);

  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE crawl_results (
        domain STRING NOT NULL, 
        text STRING NULL
    );`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      }
    );
  });
}

export async function insertResult(
  db: duckdb.Database,
  result: CrawlItem
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO crawl_results (domain, text) VALUES ($1, $2)",
      result.domain,
      result.text,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
