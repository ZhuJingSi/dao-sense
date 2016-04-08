import { ApiService } from './api.service';
import * as Obj from '../../helpers/object.js';

export class UserService extends ApiService {
  constructor(AppConfig, $http, $q, state) {
    'ngInject';

    super(AppConfig, $http, $q, state);

    this.userInfo = {};
  }

  getUserInfo({ force = false } = {}) {
    if (!force && !Obj.isEmpty(this.userInfo)) {
      return this.$q.when(this.userInfo);
    }
    return this.$http.get(`${this.API_URL}/api/v1/user`)
      .then(res => {
        angular.copy(res.data, this.userInfo);
        return this.userInfo;
      });
  }
}
