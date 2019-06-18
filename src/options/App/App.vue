<template>
  <div class="main_app">
    <p>代理配置列表</p>
    <el-row v-for="(item, index) in list" :key="index" class="row">
      <el-col :span="4">
        <el-input size="mini" placeholder="请输入目标字符串" v-model="list[index].api"></el-input>
      </el-col>
      <el-col :span="4" class="col-right">
        <el-input size="mini" placeholder="请输入替换字符串" v-model="list[index].target"></el-input>
      </el-col>
      <el-col :span="4" class="col-right">
        <el-button size="mini" type="danger" @click="remove(index)">删除</el-button>
      </el-col>
    </el-row>
    <el-button @click="add" size="mini" type="primary">添加</el-button>
    <el-button @click="save" size="mini" type="success">保存</el-button>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'app',
  data () {
    return {
      list: [
        {
          api: '/api',
          target: ''
        }
      ]
    }
  },
  methods: {
    add () {
      this.list.push({api: '', target: ''})
    },
    remove (i) {
      this.list.splice(i, 1)
    },
    save () {
      chrome.storage.sync.set({proxyOption: this.list}, function() {
        Message.success('保存成功!')
        chrome.extension.getBackgroundPage().background()
      })
    }
  },
  created () {
    let that = this
    chrome.storage.sync.get(['proxyOption'], function(opts) {
      if (opts.proxyOption) that.list = opts.proxyOption
    })
  }
}
</script>
<style>
.main_app {
  color: #333;
}
.col-right {
  margin-left: 20px;
}
.row {
  margin: 15px 0;
}
</style>
