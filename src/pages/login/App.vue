<template>
  <div class="g-login">
    <header>登录</header>
    <div class="login">
      <el-row>
        <el-col :span="6">用户名</el-col>
        <el-col :span="18">
          <el-input placeholder="请输入用户名" v-model="input"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">密码</el-col>
        <el-col :span="18">
          <el-input
            placeholder="请输入密码"
            v-model="input"
            show-password
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="18" class="btn">
          <el-button type="primary" size="medium">登录</el-button>
          <el-link type="primary">忘记密码？</el-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
  text-align: center;
}
.g-login {
  position: relative;
  margin: -200px auto 0 auto;

  top: 50%;
  width: 500px;
  height: 350px;
  border: solid 1px #ddd;
  box-shadow: 1px 1px 12px 5px #ddd;
  .login {
    padding: 40px 80px 40px 40px;
    .el-row{
      padding-bottom: 20px;
      .el-col-6{
        text-align: right;
        padding-right: 10px;
        line-height: 40px;
      }
      .btn{
        padding-top:20px;
      }
    }
  }
  header {
    line-height: 60px;
    font-size: 18px;
    text-align: center;
    border-bottom: solid 1px #ddd;
    background-color: #409EFF;
    color:#fff;
  }
}
</style>