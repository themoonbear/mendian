let __notices = {}

function addNotification(name, selector, target) {
  if (name && selector) {
    addNotices({
      name: name,
      selector: selector,
      target: target
    })
  } else {
    console.error('addNotification error: no selector or name')
  }
}

function addNotices(notice) {
  if (!__notices[notice.name]) {
    __notices[notice.name] = [notice]
  } else {
    __notices[notice.name].push(notice)
  }
}

function removeNotification(name, target) {
  if (!__notices[name]) {
    return
  }

  const temp = __notices[name].filter(n => {
    return n.target !== target
  })

  __notices[name] = temp
}

function postNotification(name, params) {
  if (!__notices[name]) {
    return
  }
  for (let i = 0, j = __notices[name].length; i < j; i++) {
    let notice = __notices[name][i]
    notice.selector.call(notice.target, params)
  }
}

module.exports = {
  addNotification: addNotification,
  removeNotification: removeNotification,
  postNotification: postNotification
}
