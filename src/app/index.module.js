import { AppConfig } from './index.config';
import { pluginConfig } from './index.config';
import { routerConfig } from './index.route';
import { interceptorConfig } from './index.interceptor';
import * as Run from './index.run';
import * as State from './app.state';

// service
import { AuthService } from './components/services/auth.service';
import { UserService } from './components/services/user.service';
import { DaoVoiceService } from './components/daovoice/daovoice.service';

// controller
import { LayoutController } from './containers/layout/layout.controller';
import { LoginController } from './containers/login/login.controller';
import { DashboardController } from './containers/dashboard/dashboard.controller';

// directive
import { AppMenuDirective } from './components/app-menu/app-menu.directive';
import { LeftNavDirective } from './components/left-nav/left-nav.directive';

// svg
import './components/svg/svg.js';

// filter
import * as Filters from './index.filter';

// plugin
import daoStyle from 'dao-style';

angular.module('DHE', ['ui.router', 'angular-loading-bar', 'ngSanitize', daoStyle])
  .constant('moment', moment)
  .constant('AppConfig', AppConfig)
  .config(routerConfig)
  .config(interceptorConfig)
  .config(pluginConfig)
  .value('state', State)
  .run(Run.authHook)
  .run(Run.addDaoVoice)
  .run(Run.redirectTo)

  .service('authService', AuthService)
  .service('userService', UserService)
  .service('daoVoiceService', DaoVoiceService)

  .controller('LoginController', LoginController)
  .controller('LayoutController', LayoutController)
  .controller('DashboardController', DashboardController)

  .directive('appMenu', AppMenuDirective)
  .directive('leftNav', LeftNavDirective)

  .filter('imageFilter', Filters.imageFilter);
