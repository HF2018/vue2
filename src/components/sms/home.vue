<style scoped>
.sms_link li {
  background-color: #fff;
  color: #2d8cf0;
  height: 40px !important;
  line-height: 40px !important;
  margin-right: 10px;
  border: none!important;
  padding: 0;
  list-style: none;
  float: left;
}
.sms_link {
  background-color: transparent;
  clear: both;
  overflow: hidden;
}
.sms_link li a {
  color: #000;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.sms_link li a.router-link-active {
  color: #2d8cf0 !important;
  border: 1px solid #2d8cf0 !important;
}
</style>
<template>
  <div>
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
        <BreadcrumbItem to="/market/sms/dataBrief">营销方式</BreadcrumbItem>
        <BreadcrumbItem to="/market/sms/dataBrief">短信营销</BreadcrumbItem>  
        <BreadcrumbItem to="">{{aboutMsg}}</BreadcrumbItem>  
    </Breadcrumb>
    <div :style="{margin: '0 0 24px 0',textAlign:'left'}" >
        <!-- <Menu active-name="1" width="auto" mode="horizontal" class="sms_link" @on-select="getMenuItem">
            <MenuItem  name="1">  
                <router-link to="/market/sms/dataBrief">
                    数据概况
                </router-link> 
            </MenuItem >
            <MenuItem name="2">      
                <router-link to="/market/sms/sms">
                短信内容配置
                </router-link>                          
            </MenuItem>            
            <MenuItem name="3">      
                <router-link to="/market/sms/sendSms">
                发送短信与历史记录
                </router-link>                          
            </MenuItem>
        </Menu>  -->
         <ul class="sms_link"> 
          <li>
            <router-link to="/market/sms/dataBrief">
                  数据概况
            </router-link>
          </li>
          <li>
              <router-link to="/market/sms/sms">
                短信内容配置
              </router-link>
          </li>
          <li>
              <router-link to="/market/sms/sendSms">
                发送短信与历史记录
              </router-link>
          </li>
        </ul>       
    </div>                           
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <router-view></router-view>                     
    </Content>
  
    
  </div>
</template>
<script>
// import sms from './sms.vue'
// import dataBrief from './dataBrief.vue'
// import sendSms from './sendSms.vue'
export default {
  // components: {sms,dataBrief,sendSms},
  data() {
    return {
      aboutMsg: "数据概况",
      Msgurl: ''
    };
  },
  methods: {
    //获得短信营销的当前的展示item
    getMenuItem (value) { 
        var dd = ['数据概况','短信内容配置','发送短信与历史记录'];
        var url = ['dataBrief','sms','sendSms'];
        this.aboutMsg =  dd[value - 1];
        this.Msgurl = '/market/sms/'+ url[value - 1];
     
    }
  },
  computed: {

  },
  // mounted: function(){
  //   this.getMenuItem();
  // }
};
</script>
