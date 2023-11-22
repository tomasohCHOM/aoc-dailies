import { executeWebhook } from "aoc-dailies/lib/discord/webhook.ts";
import { getAoCDaily } from "aoc-dailies/lib/aoc/mod.ts";
import { load } from "./deps.ts";

async function prepareDiscordWebhook() {
  console.log("Preparing Discord Webhook Execution");
  await load({ export: true });
  const discordWebhookURL = Deno.env.get("DISCORD_WEBHOOK_URL");
  if (!discordWebhookURL) throw new Error("Discord Webhook not set");

  const date = new Date();

  // if (date.getMonth() !== 11) {
  //   // Only execute in December.
  //   console.log("Not December yet :(");
  //   return;
  // }

  // For testing, we set the year to (current year - 1) = 2023 - 1 = 2022 data
  const year = date.getFullYear() - 1;
  const day = date.getDate();
  const { title, description } = await getAoCDaily({ year, day });

  await executeWebhook({
    url: discordWebhookURL,
    data: {
      embeds: [{
        color: 0x00cc00,
        title: `Advent of Code ${year} Day ${day}: ${title}`,
        description: description.substring(0, 49) + "...",
      }],
    },
  });
}

async function main() {
  // Execute the webhook at midnight EST, or 5:00 AM UTC.
  await Deno.cron("prepareDiscordWebhook", "0 5 * * *", prepareDiscordWebhook);

  // Execute the webhook every minute (testing purposes)
  // await Deno.cron("prepareDiscordWebhook", "* * * * *", prepareDiscordWebhook);
}

if (import.meta.main) {
  await main();
}
