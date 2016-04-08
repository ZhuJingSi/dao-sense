export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  const returnTo = ($transition$) => {
    let redirectedFrom = $transition$;
    // Follow the current transition's redirect chain all the way backwards
    while (redirectedFrom.previous()) {
      redirectedFrom = redirectedFrom.previous();
    }

    // Get the "from" state & params, so we can return to there after successful authentication.
    const _returnTo = {
      state: redirectedFrom.from(),
      params: redirectedFrom.params('from'),
    };

    return _returnTo.state.name ? _returnTo : {
      state: 'app.dashboard',
    };
  };

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/containers/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      resolve: {
        returnTo,
      },
    })
    .state('app', {
      abstract: true,
      templateUrl: 'app/containers/layout/layout.html',
      controller: 'LayoutController',
      controllerAs: 'vm',
    })
    .state('app.dashboard', {
      url: '/',
      views: {
        content: {
          templateUrl: 'app/containers/dashboard/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
        },
      },
    });

  $urlRouterProvider.otherwise('/');
}
