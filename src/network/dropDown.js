import {request} from './request'

export function fetchCreateGround(data) {
  return request({
    url:"/dropDown/createGround",
    method:'post',
    data: data,
  })
}

export function fetchCreateEnvironment(data) {
  return request({
    url:"/dropDown/createEnvironment",
    method:'post',
    data: data,
  })
}
