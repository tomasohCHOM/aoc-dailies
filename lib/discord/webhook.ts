import type { RESTPostAPIWebhookWithTokenJSONBody } from "aoc-dailies/deps.ts";

/**
 * ExecuteWebhookOptions are the options for a webhook message.
 */
export interface ExecuteWebhookOptions {
  /**
   * url is the webhook url.
   */
  url: string;

  /**
   * data is the webhook data.
   */
  data: RESTPostAPIWebhookWithTokenJSONBody;

  /**
   * file is a file that can be sent along with the webhook message (optional).
   */
  file?: File;
}

/**
 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
export function executeWebhook(o: ExecuteWebhookOptions) {
  if (o.file) {
    const form = new FormData();
    form.append("payload_json", JSON.stringify(o.data));
    form.append(`files[0]`, o.file, o.file.name);
    return fetch(o.url, {
      method: "POST",
      body: form,
    });
  }
  return fetch(o.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(o.data),
  });
}
