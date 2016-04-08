export class ApiService {
  constructor(AppConfig, $http, $q, state) {
    'ngInject';

    this.AppConfig = AppConfig;
    this.$http = $http;
    this.$q = $q;
    this.state = state;

    this.API_URL = AppConfig.API_URL;
  }

  app() {}
}
