import * as conf from './constant';

export const AppConfig = {
  API_URL: conf.API_URL,
  COOKIE_DOMAIN: conf.COOKIE_DOMAIN,
};

export function pluginConfig(cfpLoadingBarProvider) {
  'ngInject';
  cfpLoadingBarProvider.includeSpinner = false;
}
