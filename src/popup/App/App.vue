<template>
  <div class="main_app">
    <div class="row" @click="toggleProxy">
      <i :class="state ? 'el-icon-check' : 'el-icon-close'"></i><span>{{state?'已开启':'已关闭'}}</span>
    </div>
    <div @click="toOptions" class="row"><i class="el-icon-setting"></i> <span class="setting">设置</span></div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      state: false
    }
  },
  methods: {
    toggleProxy () {
      this.state = !this.state
      let that = this
      chrome.storage.sync.set({ isOpen: this.state }, function() {
        that.state ? chrome.extension.getBackgroundPage().background() : chrome.extension.getBackgroundPage().stopProxy()
      })
    },
    toOptions () {
      window.open('./options.html')
    }
  },
  created () {
    let that = this
    chrome.storage.sync.get(['isOpen'], function (opts) {
      that.state = opts.isOpen
    })
  }
}
</script>
<style>
.main_app {
  width: 200px;
  color: #333;
}
span {
  display: inline-block;
  margin: 0 10px;
}
.row {
  padding: 5px 0;
  cursor: pointer;
}
.row:hover {
  background-color: #D4D4D4;
}
i {
  font-size: 16px;
  transform: translate(1px, 1px)
}
</style>

