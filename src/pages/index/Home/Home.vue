<template>
  <el-container class="g-home">
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <div>{{ title }}</div>
      <!-- <router-view></router-view> -->
    </el-main>
  </el-container>
</template>

<script>
//import "router-view" from "vue-router";
export default {
  data() {
    return {
      title: "home",
    };
  },
};
</script>

<style lang="less" scoped>
.g-home{
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: #d3dce6;
    color: #333;
    text-align: center;
  }
}
</style>