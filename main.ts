import { getAoCDaily } from "aoc-dailies/lib/aoc/mod.ts";

async function executeWebhook() {
  const date = new Date();
  if (date.getMonth() !== 11) {
    // Only execute in December.
    return;
  }

  const year = date.getFullYear();
  const day = date.getDate();
  const daily = await getAoCDaily({ year, day });
  console.log(daily.title);
  console.log(daily.description);
}

async function main() {
  // Execute the webhook at midnight EST, or 5:00 AM UTC.
  await Deno.cron("executeWebhook", "0 5 * * *", executeWebhook);
}

if (import.meta.main) {
  await main();
}
