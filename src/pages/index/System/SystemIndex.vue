<template>
  <el-container class="g-system">
    <el-aside width="200px">
      <div class="title" @click="chgV">{{ title+this.$store.state.system.version }}</div>
      <el-menu
        :default-active="activeIndex"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title"><router-link to="/system/user">用户管理</router-link></span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title"><router-link to="/system/log">日志管理</router-link></span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title"><router-link to="/system/fields">字段管理</router-link></span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
//import "router-view" from "vue-router";
export default {
  data() {
    return {
      activeIndex: "1",
      title:"系统管理"
    };
  },
  created () {
    if(this.$route.path=="/system/user"){
      this.activeIndex="1";
    }
    if(this.$route.path=="/system/log"){
      this.activeIndex="2";
    }
    if(this.$route.path=="/system/fields"){
      this.activeIndex="3";
    }
  },
  mounted () {
  },
  methods: {
    chgV() {
      this.$store.dispatch("changeVersionAsync","3.0.0");
      //加入使用了命令控件，则用如下方式触发action
      //this.$store.dispatch("system/changeVersionAsync","2.0.0");
    }
  },
};
</script>

<style lang="less" scoped>
.g-system {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    .el-menu{
      background-color: transparent;
      .el-menu-item{
        a{
          color: #333;
          text-decoration: none;
        }
      }
    }
    .title{
      line-height: 40px;
      border-bottom: solid 1px #ccc;
      font-weight: bold;
    }
  }
}
</style>