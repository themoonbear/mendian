import base from './base'
import wepy from 'wepy'

export default class shop extends base {
  static async list() {
    const url = `${this.baseUrl}/shop/list`
    return await this.get(url)
  }

  static async getShopCategories() {
    const url = `${this.baseUrl}/shop/categories`
    return await this.get(url)
  }

  static async info(id) {
    if (!id) return {}
    const shop = wepy.$instance.getShopInfo()
    if (shop && shop.id === id) {
      return shop
    } else {
      wepy.$instance.setShopInfo(null)
    }
    const url = `${this.baseUrl}/shop/info/${id}`
    return await this.get(url)
  }

  static async updateShop(shop) {
    wepy.$instance.setShopInfo(shop)
    const url = `${this.baseUrl}/shop`
    return await this.post(url, shop)
  }

  static async getStatus() {
    const url = `${this.baseUrl}/shop/status`
    const data = await this.get(url)
    data.statusText = this._processStatusText(data)
    data.status = data.status === 'NORMAL'
    data.day = data.beginTime === '00:00' && data.endTime === '23:59'
    return data
  }

  static async setStatus(status) {
    const url = `${this.baseUrl}/shop/status`
    return this.put(url, status)
  }

  static _processStatusText(data) {
    const status = data.status
    const isOpen = data.open
    if (status === 'NORMAL') {
      return isOpen ? '营业中' : '已打烊'
    } else if (status === 'CLOSE') {
      return '歇业中'
    }
  }

  static _processVersionText(data) {
    if (data) {
      data.versionText = this.autoVersion[data.chargeVersion]
      data.versionConfig = this.autoConfig[data.chargeVersion]
    }
    return data
  }

  static async listStaff() {
    const url = `${this.baseUrl}/shop/staffs`
    return this.get(url)
  }

  static async createStaff(staff) {
    const url = `${this.baseUrl}/shop/staff`
    return this.post(url, staff)
  }

  static async removeStaff(id) {
    const url = `${this.baseUrl}/staff/${id}`
    return this.delete(url)
  }

  static async updateStaff(staff) {
    const url = `${this.baseUrl}/staff`
    return this.put(url, staff)
  }
}
