import { config } from "../configs/envConfig";

export const isDev = config.app.environment === 'development';
export const domain = config.app.domain;