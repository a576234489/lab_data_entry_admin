import {request} from './request'

export function fetchGetListPage(params) {
  return request({
    url:"/audit/getListPage",
    method:'get',
    params: params
  })
}

export function fetchUpdateAudio(data) {
  return request({
    url:"/audit/updateAudio",
    method:'post',
    data: data
  })
}
