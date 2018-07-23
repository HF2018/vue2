<style scoped>
#apps {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
.layouts {
  height: 64px;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
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
.layouts .ivu-menu-horizontal {
  height: auto;
}
/* .layout .layout-nav .ivu-menu-item {
  color: #fff;
} */
.layouts .ivu-layout-header {
  background-color: #293c55;
}
.user_left {
  height: 20px;
  float: right;
  margin-right: 100px;
  font-size: 14px;
  color: #000;
  cursor: pointer;
}

.layout-footer-center {
  text-align: center;
}
.user_left .headNav a{
  color: #495060
}
</style>
<template>
  
    <div class="layouts" style="z-index:3">
        <!-- <Layout> -->
          <!-- 头部导航 -->
            <Header :style="{position: 'fixed', width: '100%',padding: 0}" breakpoint="md">
                <Menu mode="horizontal">
                    <div class="layout-logo">药店狗</div>
                    <div class="layout-nav">
                        <MenuItem name="1">                                            
                            <router-link to="/brief">时时总览</router-link>
                        </MenuItem>
                        <MenuItem name="2">                      
                             <router-link to="/user">会员中心</router-link>
                        </MenuItem>
                        <MenuItem name="3">                               
                             <router-link to="/market">客户维系</router-link>
                        </MenuItem>
                        <MenuItem name="4">                              
                             <router-link to="/project">营销方案</router-link>                           
                        </MenuItem>
                        <MenuItem name="5">                              
                             <router-link to="/setting">设置</router-link>                           
                        </MenuItem>
                    </div>
                    <div class="user_left">  
                         <Dropdown trigger="click" class="headNav">
                             <Avatar icon="person" />
                              <DropdownMenu slot="list">
                                  <DropdownItem><p @click="loginOut">退出该系统</p></DropdownItem>
                                  <DropdownItem><p @click="modal1 = true">修改密码</p></DropdownItem>                              
                                  <DropdownItem><router-link to='/account'>账号管理</router-link></DropdownItem>                              
                              </DropdownMenu>
                          </Dropdown> 
                          <!-- 修改密码              -->
                          <Modal
                              v-model="modal1"
                              title="修改密码"
                              :loading="loading"
                              @on-ok="revisePmd('formValidate')"
                              @on-cancel="re">
                              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" enctype="multipart/form-data">
                                  <FormItem label="旧密码" prop="old_passwd">
                                      <Input v-model="formValidate.old_passwd" placeholder="请输入旧密码"></Input>    
                                  </FormItem>
                                  <FormItem label="新密码" prop="new_passwd">
                                        <Input v-model="formValidate.new_passwd" placeholder="请输入新密码"></Input>     
                                    </FormItem>
                                    <FormItem label="再次输入新密码" prop="sure_passwd">
                                        <Input v-model="formValidate.sure_passwd" placeholder="请再次输入你的新密码"></Input>                                 
                                    </FormItem>   
                              </Form>
                          </Modal>
                         
                      </Poptip>
                          
                    </div>
                     
                </Menu>
            </Header>
            
            <!-- 中间的内容区域 -->
            <!-- <Content :style="{margin: '64px 0px 0', background: '#fff', minHeight: '500px',height:'900px',}">
                  <router-view/>
            </Content> -->
            <!-- 脚步 -->
            <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
        <!-- </Layout> -->
    </div> 
    
 
</template>
<script>
export default {
  name: "headNav",
  data() {
    const validatePass = (rule, value, callback) => {
      var patrn = /^(\w){6}$/;
      if (value === "") {
        callback(new Error("请输入由字母、数字组成的6位数的密码"));
      } else if (!patrn.test(value)) {
        // if (this.formCustom.passwdCheck !== "") {
        //   // 对第二个密码框单独验证
        //   this.$refs.formCustom.validateField("passwdCheck");
        // }
        callback(new Error("请输入由字母、数字组成的6位数的密码"));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入你的密码"));
      } else if (value !== this.formValidate.new_passwd) {
        callback(new Error("两次输入的新密码不匹配"));
      } else {
        callback();
      }
    };
    //输入不能为空
    const inputValue = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      modal1: false, //修改密码的模态框
      loading: true,
      //修改密码
      formValidate: {
        old_passwd: "",
        new_passwd: "",
        sure_passwd: ""
      },
      ruleValidate: {
        old_passwd: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ],
        new_passwd: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        sure_passwd: [
          {
            validator: validatePassCheck,
            trigger: "change"
          }
        ]
      },
  
    } 
  },
  //登录
  // created() {
  //   var a = this.HOST + "/api/login";
  //   var s = { account: "dog", pwd: "123", code: "0700" };
  //   this.$axios
  //     .post(a, s)
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });

  //   //刷新短信状态
  //   var b = this.HOST + "/api/sms/send/refresh";
  //    this.$axios
  //     .get(b)
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  methods: {
    //退出登录
    loginOut() {
      // this.$Message.info("You click ok");
      // console.log(23222);
      var self = this;
      var b = self.HOST + "/api/loginout";
      self.$axios
        .get(b)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            //成功
            if (response.data.error == 1) {
              // console.log(this.$router)
              //  this.$router.replace('/user');
              self.$router.push({ path: "/index" });
              self.$Message.success("退出成功");
            }
          } else {
            self.$Message.info("请求服务器失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.$Message.info("You click cancel");
    },
    //修改密码
    revisePmd(name) {
      var self = this;
      self.$refs[name].validate(valid => {
        // console.log(valid);
        if (valid) {
          var b = self.HOST + "/api/admin/modifypasswd";
          var d = self.formValidate;
          console.log(d);
          self.$axios
            .post(b, d)
            .then(response => {
              console.log(response);
              if (response.status == 200 && response.data.error == 1) {
                //全部成功
                self.modal1 = false;
                self.$Message.success(response.data.msg);
              } else {
                console.log(2222);
                setTimeout(() => {
                  self.loading = false;
                  self.$nextTick(() => {
                    self.loading = true;
                  });
                }, 1000);
                self.$Message.info(response.msg);
              }
            })
            .catch(error => {
              //请求失败
              console.log(error);
              setTimeout(() => {
                self.loading = false;
                self.$nextTick(() => {
                  self.loading = true;
                });
              }, 1000);
              self.$Message.info("原始密码输入错误");
            });
        } else {
          setTimeout(() => {
                self.loading = false;
                self.$nextTick(() => {
                  self.loading = true;
                });
              }, 1000);
        }
      });
    },
    re() {},
    
  }
};
</script>

<style>

</style>
