import {request} from './request'

export function fetchGetListPage(params) {
  return request({
    url:"/detectionCurve/getListPage",
    method:'get',
    params: params
  })
}

export function fetchListAll() {
  return request({
    url:"/detectionCurve/listAll",
    method:'get'
  })
}

export function fetchCreate(data) {
  return request({
    url:"/detectionCurve/create",
    method:'post',
    data:data
  })
}

export function fetchDelete(id) {
  return request({
    url:"/detectionCurve/delete/"+id,
    method:'get',
  })
}
