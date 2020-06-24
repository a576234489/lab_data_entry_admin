import {request} from './request'

export function fetchCreateDataApply(data) {
  return request({
    url:"/dataApply/createDataApply",
    method:'post',
    data: data
  })
}

