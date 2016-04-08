/**
 * 当一个 http 的 GET 请求还没有回调之前合并相同的请求
 * @param {[type]} $cacheFactory [description]
 */
function CombineRequestInterceptor($cacheFactory) {
  'ngInject';
  let cache = $cacheFactory('cachedHttpGetUrls');

  return {
    request(request) {

      if (request.method !== 'GET' || request.url.indexOf('http') == -1) {
        return request;
      }

      request.cache = cache;
      return request;

    },

    response(response) {
      let url = buildUrl(response.config.url, response.config.paramSerializer(response.config.params));

      // 一旦请求有返回就清除缓存信息
      if (response.config.method == 'GET' && cache.get(url))
      {
        cache.remove(url);
      }

      return response;
    },
  };

  function buildUrl(url, serializedParams) {
    if (serializedParams.length > 0) {
      url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
    }

    return url;
  }
}

export default CombineRequestInterceptor;
