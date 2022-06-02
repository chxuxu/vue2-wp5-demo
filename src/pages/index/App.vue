<template>
  <el-container id="app">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="20px">*********技术支持</el-footer>
  </el-container>
</template>

<script>
//import "router-view" from "vue-router";
import Header from "./Home/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      title: "系统标题",
    };
  },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
  .el-footer {
    background-color: #b3c0d1;
    color: #fff;
    text-align: center;
    line-height: 20px;
    height: 20px;
    font-size: 12px;
  }
  .el-main {
    padding:0;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
  }
}
</style>