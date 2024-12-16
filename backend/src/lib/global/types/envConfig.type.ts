interface AppConfig {
  port: string,
  environment: string,
  domain: string,
  frontendDomain: string,
  frontendProdDomain: string,
  frontendDevDomain: string,
};

interface AuthConfig {
  jwtSecret: string,
}

interface DBConfig {
  psql: string,
}

export interface ConfigType {
  app: AppConfig,
  auth: AuthConfig,
  db: DBConfig,
}