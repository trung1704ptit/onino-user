import Cookies from 'js-cookie'

const TokenKey = 'onino'

export function getToken() {
  console.log('get token')
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('set token', token)
  return Cookies.set(TokenKey, token,  { expires: 7 })
}

export function removeToken() {
  console.log('remove token')
  return Cookies.remove(TokenKey)
}
