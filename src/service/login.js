import { request } from './request'

const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export { login }
