// image filter
export function imageFilter() {
  'ngInject';
  return (keyword, imgFormat) => {
    if (!keyword) return;
    keyword = keyword.toString().toLowerCase();
    if (!imgFormat || imgFormat === 'svg') {

      // inject:imageFilter
      // injectend

      return '#container';
    }
  };
}
