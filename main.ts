import { getAoCDaily } from "aoc-dailies/lib/aoc/mod.ts";
import { load } from "./deps.ts";

const main = async () => {
  const daily = await getAoCDaily({ year: 2022, day: 1 });
  console.log(daily.title);
  console.log(daily.description);
};

if (import.meta.main) {
  await main();
}
