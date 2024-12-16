import { config } from "../lib/configs/envConfig";

export const isDev = config.app.environment === 'development';
export const domain = config.app.domain;
export const frontendProdDomain = config.app.frontendProdDomain;
export const frontendDevDomain = config.app.frontendDevDomain;