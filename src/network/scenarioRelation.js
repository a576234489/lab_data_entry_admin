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