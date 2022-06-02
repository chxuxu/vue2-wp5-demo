<template>
  <el-container class="g-org">
    <el-aside width="200px">orgAside</el-aside>
    <el-main>
      <div>{{ title }}</div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
//import "router-view" from "vue-router";
export default {
  data() {
    return {
      title: "org",
    };
  },
};
</script>

<style lang="less" scoped>
.g-org{
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: #d3dce6;
    color: #333;
    text-align: center;
  }
}
</style>