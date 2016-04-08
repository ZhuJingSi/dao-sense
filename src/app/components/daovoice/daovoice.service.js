export class DaoVoiceService {
  constructor(userService) {
    'ngInject';

    this.userService = userService;
    this.voiceInfo = {
      app_id: '91af7bf3',
      product: 'DHE',
      name: '',
      email: '',
    };
  }

  init() {
    this.userService.getUserInfo()
      .then(res => {
        this.voiceInfo.name = res.name || `DHE${res.id.substring(0, 4)}`;
        this.voiceInfo.email = res.email || `DHE-${res.id}@dce.io`;
        daovoice('init', this.voiceInfo);
        daovoice('update');
      });
  }

  update({ name, email } = {}) {
    this.voiceInfo.name = name;
    this.voiceInfo.email = email;
    this.voiceInfo.license_alias = licenseAlias;
    this.voiceInfo.license_prefix = licensePrefix;
    this.voiceInfo.cluster_id = clusterId;
    daovoice('init', this.voiceInfo);
    daovoice('update');
  }
}
