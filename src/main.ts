import { getDomainList } from "./input";

async function main() {
  console.log(await getDomainList("data/input.parquet"));
}

main();
