<style scoped>
.market_side a {
  height: 100%;
  display: inline-block;
  color: #fff;
  width: 100%;
  padding: 20px 0;
  text-align: center;
}
.market_side a.router-link-active {
  color: #4dc2f3;
  background-color: #f5f7f9;
}
.market_side li {
  padding: 0;
}
.market_side a.router-link-active span {
  color: #4dc2f3;
}
.market_side a.router-link-active i {
  color: #4dc2f3;
}
.market_side i {
  font-size: 20px;
}
.market_side span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  ·white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
  color: #fff;
}
</style>
<template>

  <layout>
    <headNav></headNav>
    <div style="margin: 64px 0 0 0;width:100%  ">
      <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',}">
        <Menu active-name="1" theme="dark" width="auto" :open-names="['1']" class="market_side">
          <MenuItem name="1">
          <!-- <template slot="title"> -->
          <router-link to="/user/cGroup">
            <Icon type="ios-search-strong"></Icon>
            <span>创建分组</span>
          </router-link>
          </MenuItem>
          <MenuItem name="2">
          <!-- <template slot="title"> -->
          <router-link to="/user/setClass">
            <Icon type="navicon-round"></Icon>
            <span>已创建的分组</span>
          </router-link>
          </MenuItem>
          <MenuItem name="3">
          <router-link to="/user/saveAim">
            <Icon type="ios-plus-outline"></Icon>
            <span>目标因子</span>
          </router-link>
          </MenuItem>
           <MenuItem name="4">
          <router-link to="/user/classifyAim">
           <Icon type="android-person-add"></Icon>
            <span>创建目标</span>
          </router-link>
          </MenuItem>
          <MenuItem name="5">
          <router-link to="/user/aim">
            <Icon type="android-list"></Icon>
            <span>匹配方案</span>
          </router-link>
          </MenuItem>
          <!-- <MenuItem name="6">
          <router-link to="/user/settings">
            <Icon type="ios-plus-outline"></Icon>
            <span>属性设置</span>
          </router-link>
          </MenuItem> -->
          <!-- <MenuItem name="7">
          <router-link to="/user/countIndex">
            <Icon type="calculator"></Icon>
            <span>计算指标</span>
          </router-link>
          </MenuItem> -->
        </Menu>
      </Sider>
      <Content :style="{padding: '0 24px 24px',marginLeft: '200px',overflow:'hidden',minHeight:'800px'}">
        <router-view></router-view>
      </Content>
    </div>
    </headNav>

  </layout>
</template>
<script>
import headNav from "./headNav.vue";
export default {
  components: { headNav },
  data() {
    return {
      //   aboutMsg: '我是电脑'
    };
  }
};
</script>
