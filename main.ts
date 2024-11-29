import { getProgrammingLanguage } from "aoc-dailies/lib/extra/languages.ts";
import { executeWebhook } from "aoc-dailies/lib/discord/webhook.ts";
import { getAoCDaily } from "aoc-dailies/lib/aoc/mod.ts";
import { load, retry } from "aoc-dailies/deps.ts";
import { getRandomMessage } from "aoc-dailies/lib/extra/messages.ts";

// Executes the AOC Daily Webhook message via an embed
async function executeDaily() {
  const discordWebhookURL = Deno.env.get("DISCORD_WEBHOOK_URL")!;
  const date = new Date();

  const year = date.getFullYear();
  const day = date.getDate();
  const { title, description, url } = await getAoCDaily({ year, day });

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

// Webhook message
async function executeReminder() {
  const discordWebhookURL = Deno.env.get("DISCORD_WEBHOOK_URL")!;
  const ROLE_ID = Deno.env.get("DISCORD_ROLE_ID") ?? "";

  const now = new Date();
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth(); // 0-based
  const utcDate = now.getUTCDate();

  // 5:00 AM UTC
  const reminderTime = new Date(Date.UTC(utcYear, utcMonth, utcDate, 5, 0, 0));

  // Generate UNIX timestamp for Discord to render it
  const unixTimestamp = Math.floor(reminderTime.getTime() / 1000);

  const message =
    `**<@&${ROLE_ID}> Advent Of Code ${utcYear} Day ${utcDate} release <t:${unixTimestamp}:R>!`;

  await executeWebhook({
    url: discordWebhookURL,
    data: { content: message },
  });
}

// retryPromise will attempt to execute the callback until success or after 60 seconds
async function retryPromise(callback: () => Promise<void>) {
  await retry(callback);
}

async function main() {
  await load({ export: true });

  // Execute daily reminder 5 minutes before 5:00 AM UTC
  await Deno.cron(
    "Execute AOC daily reminder via retryPromise",
    "55 4 1-25 12 *",
    async () => await retryPromise(executeReminder),
  );

  // Execute daily message at 5:00 AM UTC
  await Deno.cron(
    "Executing AOC message via retryPromise",
    "0 5 1-25 12 *",
    async () => await retryPromise(executeDaily),
  );
}

if (import.meta.main) {
  await main();
}
