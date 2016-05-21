import { ApiService } from './api.service';
// import * as Obj from '../../helpers/object.js';

export class SpiderService extends ApiService {
  constructor(AppConfig, $http, $q, state) {
    'ngInject';

    super(AppConfig, $http, $q, state);
  }

  getUnreadList() {
    return this.$http.get(`${this.API_URL}/api/v1/posts`)
      .then(res => res.data);
  }

  getReadList() {
    return this.$http.get(`${this.API_URL}/api/v1/posts?read=true`)
      .then(res => res.data);
  }

  getFavoriteList() {
    return this.$http.get(`${this.API_URL}/api/v1/favorites`)
      .then(res => res.data);
  }

  setAsFavorite(idList) {
    return this.$http.post(`${this.API_URL}/api/v1/favorites`, {
      ids: idList,
    }).then(res => res.data);
  }

  setAsUnFavorite(idList) {
    return this.$http.delete(`${this.API_URL}/api/v1/favorites`, {
      data: {
        ids: idList,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.data);
  }

  markRead(idList) {
    return this.$http.post(`${this.API_URL}/api/v1/posts/read`, {
      ids: idList,
    }).then(res => res.data);
  }

  markUnread(idList) {
    return this.$http.post(`${this.API_URL}/api/v1/posts/unread`, {
      ids: idList,
    }).then(res => res.data);
  }
}
