import base from './base'

export default class room extends base {
  static async list(sid) {
    if (!sid) return []
    const url = `${this.baseUrl}/room/list/${sid}`
    return await this.get(url)
  }
  static async info(rid) {
    if (!rid) return {}
    const url = `${this.baseUrl}/room/info/${rid}`
    return await this.get(url)
  }
  static async getCategories(sid) {
    const url = `${this.baseUrl}/room/categories/${sid}`
    return await this.get(url)
  }
  static async addCategories(sid, name) {
    const url = `${this.baseUrl}/room/categories/${sid}`
    return await this.post(url, {name: name})
  }
  static async remove(id) {
    const url = `${this.baseUrl}/room/info/${id}`
    return await this.del(url)
  }
  static async save(room) {
    const url = `${this.baseUrl}/room/info`
    if (room.id) {
      return await this.put(url + `/${room.id}`, room)
    } else {
      return await this.post(url, room)
    }
  }
  static async state(sid) {
    const url = `${this.baseUrl}/room/states/${sid}`
    return await this.get(url)
  }
  static async checkin(info) {
    const url = `${this.baseUrl}/room/${info.rid}/checkin`
    return await this.post(url)
  }
}
