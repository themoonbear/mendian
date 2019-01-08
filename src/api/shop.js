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
}
