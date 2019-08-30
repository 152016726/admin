import Cookies from 'js-cookie'

const _useInfo = 'info'

export function getInfo() {
  return Cookies.get(_useInfo)
}

export function setInfo(info) {
  return Cookies.set(_useInfo, info)
}

export function removeInfo() {
  return Cookies.remove(_useInfo)
}
