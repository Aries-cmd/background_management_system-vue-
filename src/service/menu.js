import { request } from './request'

const menuList = () => {
  return request({
    url: '/menus'
  })
}

export { menuList }
