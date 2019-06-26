// background.js
let proxyOption = []
function background () {
  chrome.storage.sync.get(['proxyOption', 'isOpen'], function(opts) {
    if (opts.isOpen && opts.proxyOption) {
      proxyOption = opts.proxyOption
      proxy()
    }
  })
}

function callback (details) {
  let options = proxyOption
  const url = details.url;
  if (options) {
    for (let i = 0; i < options.length; i++) {
      let opt = options[i]
      // options请求重定向会跨域报错
      if (!opt.api || !opt.target || details.method.toLowerCase() === 'options') continue
      if (url.indexOf(opt.api) > -1) {
        return { redirectUrl: opt.target + url.split(opt.api)[1] }
      }
    }
  }

  return {cancel: false}
}

function proxy () {
  chrome.webRequest.onBeforeRequest.addListener(
    callback,
    {urls: ["<all_urls>"]},
    ["blocking"]
  )
}

function stopProxy () {
  chrome.webRequest.onBeforeRequest.removeListener(
    callback,
    {urls: ["<all_urls>"]},
    ["blocking"]
  )
  // alert(chrome.webRequest.onBeforeRequest.hasListeners())
}

background()
