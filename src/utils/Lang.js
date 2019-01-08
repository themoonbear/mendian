export default class Lang {
  static isEmpty(str) {
    return str === '' || str === null || str === 'null'
  }
  static isNotEmpty(str) {
    return !this.isEmpty(str)
  }
  static sum(numbers, toFixed = 2) {
    let sum = 0
    for (const str of numbers) {
      if (!this.isNumber(str)) {
        return NaN
      }
      const num = parseFloat(str)
      if (isNaN(num)) {
        return NaN
      }
      sum += num
    }
    return sum.toFixed(toFixed)
  }
  static isNumber(value) {
    const patrn = /^[-+]?\d+(\.\d+)?$/
    return patrn.test(value)
  }
  static isPositiveNumber(value) {
    const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/
    return patrn.test(value)
  }
  static isArray(o) {
    return Array.isArray(o)
  }
  static convertTimestapeToDay(timestape) {
    return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.')
  }
  static dateFormate(date, fmt) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }
}
