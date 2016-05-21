export function authHook($state, $transitions, state, userService) {
  'ngInject';

  // 登陆页是否自动跳到 dashboard
  $transitions.onBefore({
    to: 'login',
  }, () => {
    return userService.getUserInfo({ force: true })
      .then(() => {
        return $state.go('app.dashboard');
      }, () => {
        state.actions.clear();
      });
  });
}

export function addDaoVoice() {
  'ngInject';

  // daoVoiceService.init();
}

export function redirectTo($state, $transitions) {
  'ngInject';
  // Matches if the destination state has a 'redirectTo' property
  const matchCriteria = {
    to: (state) => state.redirectTo,
  };
  // Function that returns a redirect for a transition,
  // with a TargetState created using the desitionat state's 'redirectTo' property
  const redirectFn = ($transition$) => {
    'ngInject';
    return $state.target($transition$.to().redirectTo);
  };
  // Register the redirectTo hook
  $transitions.onBefore(matchCriteria, redirectFn);
}
