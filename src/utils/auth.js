import Cookies from 'js-cookie'

const TokenKey = 'onino'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expireTime) {
  return Cookies.set(TokenKey, token,  { expires: expireTime/3600 || 0.5 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
