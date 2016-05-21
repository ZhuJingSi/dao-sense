// image filter
export function imageFilter() {
  'ngInject';
  return (keyword, imgFormat) => {
    if (!keyword) return;
    keyword = keyword.toString().toLowerCase();
    if (!imgFormat || imgFormat === 'svg') {

      // inject:imageFilter
      if (keyword.indexOf('icon_archive') > -1) {
        images.push('#icon_archive');
      }
      if (keyword.indexOf('icon_caret-left') > -1) {
        images.push('#icon_caret-left');
      }
      if (keyword.indexOf('icon_chat') > -1) {
        images.push('#icon_chat');
      }
      if (keyword.indexOf('icon_heart') > -1) {
        images.push('#icon_heart');
      }
      if (keyword.indexOf('icon_menu') > -1) {
        images.push('#icon_menu');
      }
      if (keyword.indexOf('icon_ripple') > -1) {
        images.push('#icon_ripple');
      }
      if (keyword.indexOf('icon_star-hollow') > -1) {
        images.push('#icon_star-hollow');
      }
      if (keyword.indexOf('icon_star-solid') > -1) {
        images.push('#icon_star-solid');
      }
      if (keyword.indexOf('icon_trash') > -1) {
        images.push('#icon_trash');
      }
      // injectend

      return '#container';
    }
  };
}
