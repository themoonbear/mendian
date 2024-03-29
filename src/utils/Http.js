import wepy from 'wepy'
import Tips from './Tips'
// const app = getApp()

export default class http {
  static async request(method, url, data) {
    const param = {
      url: url,
      method: method,
      data: data
    }
    Tips.loading()
    const res = await wepy.request(param)
    if (this.isSuccess(res)) {
      return res.data.data
    } else {
      console.error(method, url, data, res)
      throw this.requestException(res)
    }
  }
  static isSuccess(res) {
    const wxCode = res.statusCode
    if (wxCode !== 200) {
      return false
    }
    const wxData = res.data
    return !(wxData && wxData.code !== 0)
  }
  static requestException(res) {
    const error = {
      statusCode: res.statusCode
    }
    const wxData = res.data
    const serverData = wxData.data
    if (serverData) {
      error.serverCode = wxData.code
      error.message = serverData.message
      error.serverData = serverData
    }
    return error
  }

  static get(url, data) {
    return this.request('GET', url, data)
  }

  static put(url, data) {
    return this.request('PUT', url, data)
  }

  static post(url, data) {
    return this.request('POST', url, data)
  }

  static patch(url, data) {
    return this.request('PATCH', url, data)
  }

  static del(url, data) {
    return this.request('DELETE', url, data)
  }
}
