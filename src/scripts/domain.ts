import { domainConfig } from "~/site.config";

type Environment = keyof typeof domainConfig;

export function getSiteUrl() {
  const currentEnv = process.env.PUBLIC_SITE_ENV ?? "dev";

  const domain = domainConfig[currentEnv as Environment].site;

  return domain;
}
