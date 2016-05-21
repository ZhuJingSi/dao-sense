import { pluck } from '../../helpers/lodash';

export class FavouritesController {
  constructor($mdSidenav, spiderService, moment, $mdToast, $mdDialog) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.spiderService = spiderService;
    this.moment = moment;
    this.pluck = pluck;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;

    this.selected = [];

    // this.query = {
    //   limit: 5,
    //   page: 1,
    // };

    this.activate();
  }

  activate() {
    this.getFavoriteList();
  }

  toast(text) {
    this.$mdToast.show(
      this.$mdToast.simple()
      .textContent(text)
      .position('top right')
      .hideDelay(3000)
    );
  }

  confirm({ title, content }) {
    const confirm = this.$mdDialog.confirm()
      .title(title)
      .textContent(content)
      .ok('确定')
      .cancel('取消');
    return this.$mdDialog.show(confirm);
  }

  getFavoriteList() {
    this.spiderService.getFavoriteList()
      .then(res => {
        this.favoriteList = res;
      });
  }

  batch(action) {
    if (action === 'unfavourite') {
      this.setAsUnFavorite(this.pluck(this.selected, 'id'));
    }
  }

  setAsUnFavorite(idList) {
    this.confirm({
      title: '取消收藏',
      content: '确定取消收藏？',
    }).then(() => {
      this.spiderService.setAsUnFavorite(idList)
        .then(() => {
          this.toast('取消收藏成功!');
          angular.forEach(idList, id => {
            const post = this.favoriteList.find(v => v.id === id);
            if (post) {
              post.is_favorite = false;
            }
          });
          this.favoriteList = this.favoriteList.filter(v => v.is_favorite);
          this.selected = [];
        });
    });
  }
}
