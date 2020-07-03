import {request} from './request'

export function fetchCreate(data) {
  return request({
    url:"/applicationScenarioData/create",
    method:'post',
    data: data
  })
}
export function fetchGetByApplicationScenarioId(params) {
  return request({
    url:"/applicationScenarioData/getByApplicationScenarioId",
    method:'get',
    params: params
  })
}
export function fetchUpdate(data) {
  return request({
    url:"/applicationScenarioData/update",
    method:'post',
    data: data
  })
}
export function fetchDeleteBatch(data) {
  return request({
    url:"/applicationScenarioData/delete/batch",
    method:'post',
    data: data
  })
}
export function fetchUpdateApplicationScenario(data) {
  return request({
    url:"/applicationScenarioData/update/batch",
    method:'post',
    data: data
  })
}
export function fetchGetListPage(params) {
  return request({
    url:"/applicationScenarioData/getListPage",
    method:'get',
    params: params
  })
}