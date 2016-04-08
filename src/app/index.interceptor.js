import CombineRequest from './helpers/interceptors/combine-request.interceptor';
// import Timestamp from './helpers/interceptors/timestamp.interceptor';
import Auth from './helpers/interceptors/auth.interceptor';

export function interceptorConfig($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push(CombineRequest);
  // $httpProvider.interceptors.push(Timestamp);
  $httpProvider.interceptors.push(Auth);
}
