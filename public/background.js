// background.js

function background () {
  let options = null
  let isOpen = null
  chrome.storage.sync.get(['proxyOption'], function(opts) {
    options = opts.proxyOption
  })
  chrome.storage.sync.get(['isOpen'], function(opts) {
    isOpen = opts.isOpen
  })
  if (isOpen && options) proxy(options)
}

function proxy (options) {
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      const url = details.url;
      for (let i = 0; i < options.length; i++) {
        let opt = options[i]
        if (url.indexOf(opt.api) > -1) {
          return { redirectUrl: opt.target + url.split(opt.api)[1] }
        }
      }
  
      return {cancel: false}
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  )
}

background()
