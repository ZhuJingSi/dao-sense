import { pluck } from '../../helpers/lodash';

export class UnreadController {
  constructor($mdSidenav, spiderService, moment, $mdToast) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.spiderService = spiderService;
    this.moment = moment;
    this.pluck = pluck;
    this.$mdToast = $mdToast;

    this.selected = [];

    // this.query = {
    //   limit: 5,
    //   page: 1,
    // };

    this.activate();
  }

  activate() {
    this.getUnreadList();
  }

  toast(text) {
    this.$mdToast.show(
      this.$mdToast.simple()
      .textContent(text)
      .position('top right')
      .hideDelay(3000)
    );
  }

  getUnreadList() {
    this.spiderService.getUnreadList()
      .then(res => {
        this.unreadList = res;
      });
  }

  batch(action) {
    if (action === 'favourite') {
      this.setAsFavorite(this.pluck(this.selected, 'id'));
    } else if (action === 'unfavourite') {
      this.setAsUnFavorite(this.pluck(this.selected, 'id'));
    } else if (action === 'read') {
      this.markRead(this.pluck(this.selected, 'id'));
    } else if (action === 'unread') {
      this.markUnread(this.pluck(this.selected, 'id'));
    }
  }

  setAsFavorite(idList) {
    this.spiderService.setAsFavorite(idList)
      .then(() => {
        this.toast('收藏成功!');
        angular.forEach(idList, id => {
          const post = this.unreadList.find(v => v.id === id);
          if (post) {
            post.is_favorite = true;
          }
        });
        this.selected = [];
      });
  }

  setAsUnFavorite(idList) {
    this.spiderService.setAsUnFavorite(idList)
      .then(() => {
        this.toast('取消收藏成功!');
        angular.forEach(idList, id => {
          const post = this.unreadList.find(v => v.id === id);
          if (post) {
            post.is_favorite = false;
          }
        });
        this.selected = [];
      });
  }

  markRead(idList) {
    this.spiderService.markRead(idList)
      .then(() => {
        angular.forEach(idList, id => {
          const post = this.unreadList.find(v => v.id === id);
          if (post) {
            post.read = true;
          }
        });
        this.selected = [];
      });
  }

  markUnread(idList) {
    this.spiderService.markUnread(idList)
      .then(() => {
        angular.forEach(idList, id => {
          const post = this.unreadList.find(v => v.id === id);
          if (post) {
            post.read = false;
          }
        });
        this.selected = [];
      });
  }

  filterUnread(post) {
    return !post.read;
  }
}
