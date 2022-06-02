<template>
  <div class="m-header">
    <div class="logo">
      <img :src="logoUrl" height="30" />
    </div>
    <div class="menus">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"
        ><router-link to="/">首页</router-link></el-menu-item
      >
      <el-menu-item index="2"
        ><router-link to="/org">组织管理</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/flow">流程管理</router-link></el-menu-item
      >
      <el-menu-item index="4"
        ><router-link to="/system">系统管理</router-link></el-menu-item
      >
    </el-menu>
    </div>
    <div class="logininfo">
      <div class="user">{{user.nickname}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    logoUrl() {
      return this.$store.state.logoUrl;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    if (this.$route.path == "/org") {
      this.activeIndex = "2";
    }
    if (this.$route.path == "/flow") {
      this.activeIndex = "3";
    }
    if (this.$route.path == "/system") {
      this.activeIndex = "4";
    }
  },
  mounted() {
    console.log(this.$store.state, 999);
    // window.setTimeout(() => {
    //   this.$store.commit("chgLogo", {
    //     url: "https://res.qiyukf.net/operation/eb82614bb7bed1c7c28f563e8dc677fe",
    //   });
    // }, 1000);
    this.$store.dispatch("changeLogoAsync",{
      url:"https://res.qiyukf.net/operation/eb82614bb7bed1c7c28f563e8dc677fe"
    });
  },
  methods: {
    handleSelect(e) {
      this.activeIndex = e;
      console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
.m-header {
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  .logo {
    width: 200px;
    margin-right: 50px;
    color: #fff;
  }
  .menus{
    width:100%;
  }
  .el-menu-item {
    min-width: 150px;
    a {
      display: block;
      text-decoration: none;
    }
  }
  .user{
    min-width: 200px;
  }
}
</style>