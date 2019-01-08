import base from './base'

export default class customer extends base {
  static async list(shopID) {
    const url = `${this.baseUrl}/customer/list/${shopID}`
    return await this.get(url)
  }
  static async info(id) {
    const url = `${this.baseUrl}/customer/info/${id}`
    return await this.get(url)
  }

  static async lastOrder(id) {
    const url = `${this.baseUrl}/order/search?customerID=${id}&top=1`
    return await this.get(url)
  }
}
