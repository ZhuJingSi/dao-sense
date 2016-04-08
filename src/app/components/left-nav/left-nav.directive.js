import template from './left-nav.directive.html';

export function LeftNavDirective() {
  function leftNavController($state, userService) {
    'ngInject';

    const vm = this;
    vm.$state = $state;
    vm.appMenuTemplate = '<app-menu></app-menu>';

    function getUserInfo() {
      userService.getUserInfo()
        .then(res => {
          vm.userInfo = res;
        });
    }

    function activate() {
      getUserInfo();
    }

    activate();

    vm.ifActive = (page) => {
      return vm.$state.includes(`app.${page}-list`)
      || vm.$state.includes(`app.${page}-detail`)
      || vm.$state.includes(`app.${page}-new`)
      || vm.$state.includes(`app.${page}`);
    };
  }

  const directive = {
    restrict: 'E',
    template,
    scope: {},
    controller: leftNavController,
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
  };

  return directive;
}
