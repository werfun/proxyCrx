<template>
  <div class="main_app">
    <div class="row">
      <i class="el-icon-sort"></i><span>{{state?'已开启代理':'已关闭代理'}}</span>
      <el-switch
        v-model="state">
      </el-switch>
    </div>
    <div @click="toOptions" class="row"><i class="el-icon-setting"></i> <span class="setting">设置</span></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      state: true
    }
  },
  watch: {
    state: function () {
      this.toggleProxy()
    }
  },
  methods: {
    toggleProxy () {
      chrome.storage.sync.set({ isOpen: this.state }, function() {
        chrome.extension.getBackgroundPage().background()
      })
    },
    toOptions () {
      window.open('./options.html')
    }
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
  margin: 0 20px;
}
.row {
  padding: 5px 10px;
  cursor: pointer;
}
.setting {
  margin: 0 20px;
}
</style>

