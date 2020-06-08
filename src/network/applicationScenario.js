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