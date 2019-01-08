const WxNotifactionCenter = require('./WxNotificationCenter.js')

export default class Event {
  static USER_LOGOUT = 'USER_LOGOUT';
  static ORDER_TAB_UPDATE = 'ORDER_TAB_UPDATE';
  static ROOM_LIST_UPDATE = 'ROOM_LIST_UPDATE';
  static listen(eventName, callback, target) {
    WxNotifactionCenter.addNotification(eventName, callback, target)
  }

  static emit(eventName, params) {
    WxNotifactionCenter.postNotification(eventName, params)
  }

  static remove(eventName, target) {
    WxNotifactionCenter.removeNotification(eventName, target)
  }
}
