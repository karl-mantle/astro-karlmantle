type DomainConfig = {
  [key: string]: {
    site: string;
  };
};

export function getSiteUrl(config: DomainConfig) {
  type Environment = keyof typeof config;

  const env = import.meta.env.PUBLIC_SITE_ENV;

  if (env && env in config) {
    return config[env as Environment].site;
  }

  return config.development.site;
}
