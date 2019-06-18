// background.js
function background () {
  chrome.storage.sync.get(['proxyOption', 'isOpen'], function(opts) {
    if (opts.isOpen && opts.proxyOption) proxy(opts.proxyOption)
  })
}

function proxy (options) {
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      const url = details.url;
      for (let i = 0; i < options.length; i++) {
        let opt = options[i]
        if (!opt.api || !opt.target) continue
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
