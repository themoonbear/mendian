import base from './base'

export default class count extends base {
  static async today() {
    return await this.count('TODAY')
  }

  static async month() {
    return await this.count('MONTH')
  }

  static async order() {
    const url = `${this.baseUrl}/count/order`
    const data = await this.get(url)
    const result = {}
    for (let i = 0, j = data.length; i < j; i++) {
      const item = data[i]
      if (!result[`n${item.status}`]) {
        result[`n${item.status}`] = item.total
      } else {
        result[`n${item.status}`] += item.total
      }
    }
    return result
  }

  static async count(type) {
    const url = `${this.baseUrl}/count?count_type=${type}`
    const data = await this.get(url)
    return this._processCount(data)
  }

  static _processCount(data) {
    data.income = parseFloat(data.income).toFixed(2)
    return data
  }
}
