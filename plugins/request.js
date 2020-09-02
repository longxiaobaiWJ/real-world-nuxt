import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
// baseURL: "http://realworld.api.fed.lagounews.com",
})

/**
 * 通过插件机制获取上下文对象
 */
export default (content) => {
  request.interceptors.request.use(function (config) {
    /**
     * 避免登录后，仅在客户端切换页面时获取不到auth数据
     */
    const {auth} = content.store.state

    // 在发送请求之前做些什么
    if (auth && auth.token) {
      config.headers.authorization =
        `Token ${auth.token}`
    }

    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  request.interceptors.response.use(function (response) {
    // 对响应数据做点什么，响应数据适应化
    if (response) {
      return response.data ? response.data : response
    } else {
      return Promise.reject({
        response: {
          status: 502,
          data: 'XXXX'
        }
      })
    }
  }, function (error) {
    // 对响应错误做点什么
    const {status, data = 'error'} = error.response
    if (status == '404') {
      return Promise.reject(error)
    } else {
      return Promise.reject(data)
    }
  })
}
