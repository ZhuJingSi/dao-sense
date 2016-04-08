import * as Store from './helpers/store';

/**
 * PREFIX
 */
const PREFIX = 'dhe_';
function formatKey(key) {
  return (PREFIX + key).toUpperCase();
}

/**
 * AUTH
 */
const AUTH_TOKEN = formatKey('token');
const USER_NAME = formatKey('username');

/**
 * state 运行时状态
 */
export const state = {
  /**
   * 认证
   */
  auth: {
    method: '',
    token: '',
    userName: '',
  },
};

function getAuthMethod() {
  return state.auth.method;
}

function setAuthMethod(method) {
  state.auth.method = method;
}

function getAuthToken() {
  state.auth.token = Store.get(AUTH_TOKEN);
  return state.auth.token;
}

function setAuthToken(token) {
  state.auth.token = token;
  Store.set(AUTH_TOKEN, token);
}

function getUserName() {
  state.auth.userName = Store.get(USER_NAME);
  return state.auth.userName;
}

function setUserName(name) {
  state.auth.userName = name;
  Store.set(USER_NAME, name);
}

function clear() {
  Store.remove(USER_NAME);
  Store.remove(AUTH_TOKEN);
}

export const actions = {
  getAuthMethod,
  setAuthMethod,
  getAuthToken,
  setAuthToken,
  getUserName,
  setUserName,
  clear,
};
