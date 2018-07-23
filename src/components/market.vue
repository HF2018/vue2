<style scoped>
.market_side a {
  height: 100%;
  display: inline-block;
  color: #000;
  width: 100%;
  padding: 20px 0;
  text-align: center;
}
.market_side a.router-link-active {
  color: #4dc2f3;
  background-color: #f5f7f9;
}
.market_side a.router-link-active span {
  color: #4dc2f3;
}
.market_side a.router-link-active i {
  color: #4dc2f3;
}
.market_side li {
  padding: 0;
}
.collapsed-menu span {
  width: 0px!important;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
   font-size: 20px
}
.layout-con {
  height: 100%;
  width: 100%;
}
.market_side span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
  color: #fff;
}
.market_side i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
   color: #fff;
}

</style>
<template>
  <layout>
    <headNav></headNav>
    <div style="margin: 64px 0 0 0;width:100% ">
      <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',}" collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1" theme="dark" width="auto" :open-names="['1']" class="market_side">
            <MenuItem  name="1">
                <!-- <template slot="title"> -->      
                <router-link to="/market/sms">
                    <Icon type="chatbox-working"></Icon>
                    <span>短信营销</span>
                </router-link> 
            </MenuItem >
            <MenuItem name="2">                
                <router-link to="/market/cheap">
                       <Icon type="social-yen"></Icon>
                        <span>优惠券</span>
                </router-link>                          
                <!-- <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem> -->
            </MenuItem>
            <MenuItem name="3">      
                <router-link to="/market/HelloWorld">
                    <Icon type="chatbubbles"></Icon>
                <span>微信营销</span>
                </router-link>                          

            </MenuItem>
            <!-- <Submenu name="3">
                <template slot="title">
                   <Icon type="iphone"></Icon>
                    电话营销
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu> -->
            <MenuItem name="4">                
                <router-link to="/market/mixmarket">
                        <Icon type="ios-telephone"></Icon>
                        <span>电话营销</span>
                </router-link>                               
            </MenuItem>
            
        </Menu>
    </Sider>
    <Content :style="{padding: '0 24px 24px',marginLeft: '200px',overflow:'hidden'}">
          <router-view></router-view>  
    </Content>
    </div>
    
    
  </layout>
</template>
<script>
import headNav from "./headNav.vue";
export default {
   components: { headNav },
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>
