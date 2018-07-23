<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  width: 100%;
  height: 100%;
}
.layout {
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  /* overflow: hidden; */
      width: 100%;
    height: 100%;
}
.layout-logo {
  width: 110px;
  height: 36px;
  float: left;
  position: relative;
  left: 22px;
  color: #4dc2f3;
  font-size: 36px;
}
.layout-nav {
  float: left;
  margin-left: 48px;
}
.layout-nav a {
  height: 100%;
  display: inline-block;
  padding: 0 20px;
  color: #fff;
}
.layout-nav .router-link-active {
  color: #4dc2f3;
}
.layout .ivu-menu-horizontal {
  height: auto;
}
/* .layout .layout-nav .ivu-menu-item {
  color: #fff;
} */
.layout .ivu-layout-header {
  background-color: #293c55;
}
.user_left {
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 100px;
  font-size: 20px;
  color: #ccc;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div id="app">
    <div class="layout">
      <router-view v-if="isRouterAlive"></router-view>
    </div>

  </div>
</template>
<script>
import Login from "./components/login";
export default {
  name: "App",
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  //登录
  created() {
    //   var a = this.HOST + "/api/login/admin";
    //   var s = { account: "admin", pwd: "123", code: "3035" };
    //   this.$axios
    //     .post(a, s)
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    //刷新短信状态
    //   var b = this.HOST + "/api/sms/send/refresh";
    //    this.$axios
    //     .get(b)
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
  },
  components: {
    Login
  }
};
</script>

<style>
</style>
