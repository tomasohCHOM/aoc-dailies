import { executeWebhook } from "aoc-dailies/lib/discord/webhook.ts";
import { load } from "./deps.ts";

const main = async () => {
  await load({ export: true });
  const discordWebhookURL = Deno.env.get("DISCORD_WEBHOOK_URL");
  if (!discordWebhookURL) {
    throw new Error("Discord Webhook not set");
  }
  await executeWebhook({
    url: discordWebhookURL,
    data: {
      embeds: [{
        color: 0x00cc00,
        title: "Title of Question",
        description: "This is the AOC daily",
      }],
    },
  });
};

if (import.meta.main) {
  await main();
}
