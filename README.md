# aoc-dailies

Discord bot that notifies about Advent Of Code daily puzzles.

## Development

Deno must be installed on your machine.
[See the docs](https://docs.deno.com/runtime/manual/getting_started/installation).

To update to the latest version:

```sh
deno upgrade
```

Next, generate a new
[Discord Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
and save it under a new `.env` file (copying the template from `.env.example`).

For running the server locally, run this command:

```sh
deno task start
```

For formatting, linting, updating dependencies, and updating the lock file run
the following:

```sh
deno task all
```

## Deployment

[Deno Deploy](https://deno.com/deploy) is the easiest way to deploy your Deno
application with an available GitHub repository. The application will
automatically be redeployed on push to the main branch.

Ensure to copy the corresponding environmental variables to the deployment under
the project's Settings > Environmental Variables.

## References

- [Deno Installation](https://docs.deno.com/runtime/manual/getting_started/installation)
- [Deno Deploy](https://deno.com/deploy)
- [Discord Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
