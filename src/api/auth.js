import base from './base'
import wepy from 'wepy'

export default class auth extends base {
  static isLogin() {
    return this.getConfig('login_code') != null
  }

  static async login(phone, code) {
    const appCode = wepy.$instance.globalData.appCode
    const url = `${this.baseUrl}/auth/login`
    const data = await this.post(url, {
      phone: phone,
      sms_code: code,
      app_code: appCode
    })
    return data.login_code
  }

  static async sms(phone) {
    const url = `${this.baseUrl}/auth/sms_code?phone=${phone}`
    const data = await this.get(url)
    return data.result
  }

  static async check(loginCode) {
    const url = `${this.baseUrl}/auth/check?login_code=${loginCode}`
    const data = await this.get(url)
    return data.result
  }

  static getConfig(key) {
    return wepy.$instance.globalData.auth[key]
  }

  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value})
    wepy.$instance.globalData.auth[key] = value
  }

  static async removeConfig(key) {
    wepy.$instance.globalData.auth[key] = null
    await wepy.removeStorage({key: key})
  }
}
