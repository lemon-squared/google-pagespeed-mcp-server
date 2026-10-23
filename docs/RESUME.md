# Resume: PageSpeed and CrUX MCP

Scaffold only. No API calls, no OAuth app, and no published packages. Start from this file.

Kaneo was unavailable when this was written (`/api/auth/get-session: Application not found`), so this document is the tracker.

Lab scores from PageSpeed Insights and field Core Web Vitals from the Chrome UX Report. Both are read-only.

## Related scaffolds

Each API family has its own repository. Do not add their tools here.

| Repo | Role |
| --- | --- |
| [google-analytics-mcp](https://github.com/lemon-squared/google-analytics-mcp) | GA4 Admin and Data |
| [google-tag-manager-mcp-server](https://github.com/lemon-squared/google-tag-manager-mcp-server) | Tag Manager |
| [google-business-profile-mcp-server](https://github.com/lemon-squared/google-business-profile-mcp-server) | Business Profile |
| [google-search-console-mcp-server](https://github.com/lemon-squared/google-search-console-mcp-server) | Search Console |
| [google-pagespeed-mcp-server](https://github.com/lemon-squared/google-pagespeed-mcp-server) | PageSpeed Insights and CrUX |
| [google-ads-mcp-server](https://github.com/lemon-squared/google-ads-mcp-server) | Ads conversion actions |
| [bing-webmaster-mcp-server](https://github.com/lemon-squared/bing-webmaster-mcp-server) | Bing Webmaster |
| [indexnow-mcp-server](https://github.com/lemon-squared/indexnow-mcp-server) | IndexNow URL pushes |
| [google-indexing-mcp-server](https://github.com/lemon-squared/google-indexing-mcp-server) | Indexing API for 8ball.live streams |
| [google-merchant-mcp-server](https://github.com/lemon-squared/google-merchant-mcp-server) | Merchant Center for the WMS |

## This repository

TypeScript, formatted with Ultracite. The local CLI keeps client data on the machine that holds the credentials.

| Path | Package | Status |
| --- | --- | --- |
| `packages/core` | `@lemon-squared/google-pagespeed-mcp-core` | `PageSpeedAuthProvider` only. Tools go here. |
| `packages/cli` | `@lemon-squared/google-pagespeed-mcp` | Exits immediately and points at this file. |
| `apps/worker` | not created | Hosted credentials, after the CLI is in use. |

`PageSpeedAuthProvider.getApiKey()` is the only auth seam. The CLI and a later worker both implement it. Tools never see how the credential was obtained.

Do not put that value in a committed `.cursor/mcp.json`. When the CLI speaks MCP over stdio, user-level Cursor config is `~/.cursor/mcp.json` so every internal and client project can see it.

One API key covers both APIs. There is no OAuth scope.

### Tools to add

| Tool | Purpose |
| --- | --- |
| `run_pagespeed` | Lighthouse lab result for one URL and strategy (`mobile` or `desktop`). |
| `query_crux_record` | Current field metrics for an origin or URL. |
| `query_crux_history` | Field metrics over time for an origin or URL. |

A normal call is `query_crux_record` for the origin, then `run_pagespeed` when a lab trace is needed. CrUX has no row until the origin has enough traffic.

## Order of work

1. Implement the three read tools in `packages/core`, then make `packages/cli` an stdio MCP server.
2. Add a hosted worker only after the local CLI is what Cursor uses for client projects.

## Constraints

- Format with Ultracite (`bun run format`). The config extends `ultracite/biome/core`.
- Keep client data on the local CLI until a hosted worker exists.
- Do not treat a PageSpeed score as field data. CrUX is the field source.
