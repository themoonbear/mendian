import Tips from './Tips'
import wepy from 'wepy'

export default class WxUtils {
  static backOrRedirect(url) {
   // const pages = getCurrentPages()
   // const index = pages.findIndex(item => ('/' + item.__route__) === url)
   // if (pages.length < 2 || index < 0) {
   //   wx.redirectTo({url: url})
   // } else {
   //   const delta = pages.length - 1 - index
   //   wx.navigateBack({delta: delta})
   // }
  }
  static backOrNavigate(url) {
   // const pages = getCurrentPages()
   // const index = pages.findIndex(item => ('/' + item.__route__) === url)
   // if (pages.length < 2 || index < 0) {
   //   wx.navigateTo({url: url})
   // } else {
   //   const delta = pages.length - 1 - index
   //   wx.navigateBack({delta: delta})
   // }
  }
  static chooseImage(param, maxSize) {
    Tips.loading()
    return wepy.chooseImage(param).then(async ({tempFilePaths, tempFiles}) => {
      if (tempFiles && maxSize) {
        const removeIndex = []
        tempFiles.forEach((file, index) => {
          const limit = maxSize * 1024 * 1024
          if (file.size > limit) {
            removeIndex.push(index)
          }
        })
        const posStr = removeIndex.map(v => v + 1).join(',')
        if (removeIndex.length > 0) {
          removeIndex.forEach(i => tempFilePaths.splice(i, 1))
          await Tips.alert(`第${posStr}张图超过${maxSize}M`)
        }
      }
      Tips.loaded()
      return tempFilePaths
    }).catch(() => {
      Tips.loaded()
      return []
    })
  }
  static canIUse(str) {
    return wx.canIUse ? wx.canIUse(str) : false
  }
  static isSDKExpired() {
    const {SDKVersion} = wx.getSystemInfoSync()
    return SDKVersion == null || SDKVersion < '1.2.0'
  }
  static checkSDK() {
    if (this.isSDKExpired()) {
      Tips.modal('您的微信版本太低，为确保正常使用，请尽快升级')
    }
  }
}
