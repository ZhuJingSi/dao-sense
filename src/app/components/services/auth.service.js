import { ApiService } from './api.service';

export class AuthService extends ApiService {
  constructor(AppConfig, $http, $q, state, $state) {
    'ngInject';

    super(AppConfig, $http, $q, state);

    this.$state = $state;
  }

  login({ username, password } = {}) {
    const params = {
      username,
      password,
    };
    return this.$http.post(`${this.API_URL}/api/v1/login`, params)
      .then(res => {
        this.state.actions.setAuthToken(res.data.key);
        this.state.actions.setUserName(username);
      });
  }

  logout() {
    this.state.actions.clear();
    this.$state.go('login');
  }
}
