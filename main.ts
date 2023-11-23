import { executeWebhook } from "aoc-dailies/lib/discord/webhook.ts";
import { getAoCDaily } from "aoc-dailies/lib/aoc/mod.ts";
import { load } from "aoc-dailies/deps.ts";

// executeDiscordWebhook executes the Discord webhook at 5:00 AM UTC (midnight EST).
async function executeDiscordWebhook() {
  const date = new Date();

  // For testing, we set the year to (current year - 1) = 2023 - 1 = 2022 data
  const year = date.getFullYear() - 1;
  const day = date.getDate();
  const { title, description } = await getAoCDaily({ year, day });

  const discordWebhookURL = Deno.env.get("DISCORD_WEBHOOK_URL")!;
  await executeWebhook({
    url: discordWebhookURL,
    data: {
      embeds: [
        {
          color: 0x00cc00,
          title: `Advent of Code ${year} Day ${day}: ${title}`,
          description: description.substring(0, 49) + "…",
        },
      ],
    },
  });
}

async function main() {
  await load({ export: true });

  // Execute the webhook at midnight EST, or 5:00 AM UTC.
  await Deno.cron(
    "executeDiscordWebhook",
    // TODO: Change to "0 5 * 12 *".
    "0 5 * 11,12 *",
    executeDiscordWebhook,
  );
}

if (import.meta.main) {
  await main();
}
