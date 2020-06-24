import {request} from './request'

export function fetchGetParamForAdd() {
  return request({
    url:"/applicationScenario/getParamForAdd",
    method:'get',
  })
}
export function fetchGetListPage(params) {
  return request({
    url:"/applicationScenario/getListPage",
    method:'get',
    params: params
  })
}
export function fetchCreate(data) {
  return request({
    url:"/applicationScenario/create",
    method:'post',
    data: data
  })
}
export function fetchDelete(data) {
  return request({
    url:"/applicationScenario/delete/batch",
    method:'post',
    data: data
  })
}
export function fetchGetById(params) {
  return request({
    url:"/applicationScenario/getById",
    method:'get',
    params: params
  })
}
export function fetchGetByUserId(params) {
  return request({
    url:"/applicationScenario/getByUserId",
    method:'get',
    params: params
  })
}