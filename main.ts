import { getProgrammingLanguage } from "aoc-dailies/lib/extra/languages.ts";
import { executeWebhook } from "aoc-dailies/lib/discord/webhook.ts";
import { getAoCDaily } from "aoc-dailies/lib/aoc/mod.ts";
import { load, retry } from "aoc-dailies/deps.ts";
import { getRandomMessage } from "aoc-dailies/lib/extra/messages.ts";

// executeDiscordWebhook executes the Discord webhook at 5:00 AM UTC (midnight EST).
async function executeDiscordWebhook() {
  const date = new Date();

  const year = date.getFullYear();
  const day = date.getDate();
  const { title, description, url } = await getAoCDaily({ year, day });

  const discordWebhookURL = Deno.env.get("DISCORD_WEBHOOK_URL")!;
  await executeWebhook({
    url: discordWebhookURL,
    data: {
      embeds: [{
        color: 0x00cc00,
        url,
        title: `---*** Advent of Code ${year} Day ${day}: ${title} ***---`,
        fields: [{
          name: "Puzzle Description:",
          value: description.length > 500
            ? description.substring(0, 499) + "…"
            : description,
        }, {
          name: "Fun Challenge - Complete the program using:",
          value: getProgrammingLanguage(day - 1),
        }, {
          name: "Message of the day:",
          value: getRandomMessage(),
        }],
      }],
    },
  });
}

// retryPromise will attempt to execute the callback until success or after 60 seconds.
async function retryPromise() {
  await retry(executeDiscordWebhook);
}

async function main() {
  await load({ export: true });

  // Execute at midnight EST, or 5:00 AM UTC.
  await Deno.cron(
    "Executing Discord webhook via retryPromise",
    // "0 5 1-25 12 *",
    "*/5 * * * *",
    retryPromise,
  );
}

if (import.meta.main) {
  await main();
}
