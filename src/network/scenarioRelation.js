import {request} from './request'

export function fetchGetListPage(params) {
  return request({
    url:"/scenarioRelation/getListPage",
    method:'get',
    params: params
  })
}
export function fetchCreate(data) {
  return request({
    url:"/scenarioRelation/create",
    method:'post',
    data: data
  })
}
export function fetchGetById(params) {
  return request({
    url:"/scenarioRelation/getById",
    method:'get',
    params: params
  })
}