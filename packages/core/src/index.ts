export const serverName = "google-pagespeed-mcp";

/** Supplies a Google API key. PageSpeed Insights and the Chrome UX Report both use a key. The CLI and a future hosted worker both implement this. */
export interface PageSpeedAuthProvider {
  getApiKey: () => Promise<string>;
}
