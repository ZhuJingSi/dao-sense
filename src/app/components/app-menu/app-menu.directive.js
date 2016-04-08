import '../../helpers/jquery.menu-aim';
import template from './app-menu.directive.html';

export function AppMenuDirective() {
  'ngInject';

  function linkFun(scope, element, attrs, leftNavCtrl) {
    scope.vm.userInfo = leftNavCtrl.userInfo;
  }

  function appMenuController(authService) {
    'ngInject';
    const vm = this;

    function menuControl() {
      let $menu = $('#app-menu-left-list');

      function activateSubmenu(row) {
        var $row = $(row),
          submenuId = $row.data('submenuId'),
          $submenu = $('#' + submenuId);
          if ($submenu.length === 0) {
            $('.mainmenu').removeClass('active');
            $row.addClass('active');
            return;
          }

        $('.mainmenu').removeClass('active');
        $('.submenu').removeClass('active');
        $row.addClass('active');
        $submenu.addClass('active');
      }

      $menu.menuAim({
        activate: activateSubmenu,
        // deactivate: deactivateSubmenu
      });
    }

    vm.logout = () => {
      authService.logout();
    };

    function activate() {
      menuControl();
    }

    activate();
  }

  return {
    restrict: 'E',
    require: '?^leftNav',
    template,
    scope: {},
    link: linkFun,
    controller: appMenuController,
    controllerAs: 'vm',
    bindToController: true,
    replace: true,
  };
}
