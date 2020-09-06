import Cookies from 'js-cookie'

export function getToken(name) {
  return Cookies.get(name)
}

export function setToken(name, value) {
  return Cookies.set(name, value)
}

export function removeToken(name) {
  return Cookies.remove(name)
}
