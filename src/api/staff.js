import base from './base'

export default class staff extends base {
  static async list(sid) {
    const url = `${this.baseUrl}/staff/list/${sid}`
    return await this.get(url)
  }
  static async info(id) {
    if (!id) return {}
    const url = `${this.baseUrl}/staff/info/${id}`
    return await this.get(url)
  }
  static async remove(id) {
    const url = `${this.baseUrl}/staff/info/${id}`
    return await this.del(url)
  }
  static async save(staff) {
    const url = `${this.baseUrl}/staff/info`
    if (staff.id) {
      return await this.put(url + `/${staff.id}`, staff)
    }
    return await this.post(url, staff)
  }
}
