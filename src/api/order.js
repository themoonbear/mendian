import base from './base'

export default class order extends base {
  static async list(sid) {
    if (!sid) return []
    const url = `${this.baseUrl}/shop/${sid}/order`
    return await this.get(url)
  }
}
