import duckdb from "duckdb";

export function getDomainList(path: string): Promise<string[]> {
  const db = new duckdb.Database(":memory:");

  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM read_parquet($1)", path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.map((row) => row.domain));
      }
    });
  });
}
