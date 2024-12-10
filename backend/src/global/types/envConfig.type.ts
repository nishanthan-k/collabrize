interface AppConfig {
  port: string,
  environment: string,
  domain: string,
};

interface AuthConfig {
  jwtSecret: string,
}

export interface ConfigType {
  app: AppConfig,
  auth: AuthConfig,
}