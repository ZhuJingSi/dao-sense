import store from 'store';
import cookie from 'js-cookie';
import { COOKIE_DOMAIN } from '../constant.js';

export function set(key, value) {
  store.set(key, value);
  cookie.set(key, value, { domain: COOKIE_DOMAIN });
}

export function get(key) {
  return store.get(key);
}

export function remove(key) {
  store.remove(key);
}

export function clear() {
  store.clear();
}

export function storeWithExpiration() {
  return {
    set: (key, val, exp) => {
      store.set(key, { val, exp, time: new Date().getTime() });
    },

    get: (key) => {
      const info = store.get(key);
      if (!info) {
        return null;
      }
      if (new Date().getTime() - info.time > info.exp) {
        return null;
      }
      return info.val;
    },
  };
}
