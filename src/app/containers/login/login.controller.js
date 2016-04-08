import 'particles.js/particles';

export class LoginController {
  constructor($state, authService, daoVoiceService, returnTo) {
    'ngInject';
    this.$state = $state;
    this.returnTo = returnTo;
    this.authService = authService;
    this.daoVoiceService = daoVoiceService;
    this.loginState = '登录';

    this.activate();
  }

  activate() {
    particlesJS.load('particles-js', 'app/helpers/particles-login.json');
  }

  enter(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  login() {
    this.loginState = '登录中';
    const successFn = () => {
      this.loginState = 'successful';
      this.$state.go(this.returnTo.state, this.returnTo.params);

      this.daoVoiceService.init();
    };
    const errorFn = (res) => {
      this.loginState = '登录';
      this.errMsg = '登录失败，请重试';
    };
    this.authService.login({
      username: this.name,
      password: this.pwd,
    })
      .then(successFn, errorFn);
  }

}
