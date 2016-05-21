/**
 * 用户认证拦截器
 */
function AuthInterceptor($q, state, AppConfig, $location) {
  'ngInject';

  const interceptor = {
    request(config) {
      if (config.url.indexOf(AppConfig.API_URL) > -1 && state.actions.getAuthToken()) {
        config.headers['Authentication'] = state.actions.getAuthToken();
      }
      return config;
    },

    responseError(rejection) {
      // if (rejection.status === 401) {
      //   state.actions.clear();
      //   $location.path('login');
      // }
      return $q.reject(rejection);
    },
  };
  return interceptor;
}

export default AuthInterceptor;
