<style scoped>
.accounts{
  width: 90%;
  margin:  30px auto
}
</style>


</style>

<template>
  <div>
     <headNav></headNav>
    <div class="accounts">
        <div style="padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #ddd">
                <Button type="primary" @click="modal2 = true">添加用户</Button>
        </div>
        <div style="background:#fff">
            <Modal
            v-model="modal2"
            title="添加账号"
            :loading="loading2"
            @on-ok="addAccount('addValidate')"
            @on-cancel="re">
            <Form ref="addValidate" :model="addValidate" :rules="addruleValidate" :label-width="80" enctype="multipart/form-data">
                <FormItem label="账号名称" prop="account">
                    <Input v-model="addValidate.account" placeholder="请输入账号名称"></Input>    
                </FormItem>
                <FormItem label="密码" prop="pwd">
                      <Input v-model="addValidate.pwd" placeholder="请输入密码"></Input>     
                  </FormItem>
                  <!-- <FormItem label="用户类型" prop="user_type">
                      <Input v-model="addValidate.sure_passwd" placeholder="请输入用户类型"></Input>                                 
                  </FormItem>   -->
                    <FormItem label="用户类型" prop="user_type">
                      <RadioGroup v-model="addValidate.user_type">
                          <Radio label="admin">管理员</Radio>
                          <Radio label="user">普通用户</Radio>
                      </RadioGroup>
                  </FormItem> 
            </Form>
        </Modal>
        <Tabs v-model="accountClass" @on-click="getAccountClass">
              <TabPane label="管理员账号" name="admin" >
                  <Table :columns="columns1" :data="data1" border :style="{margin:'20px 0'}"  height="520"></Table>
                  <!-- <Page :total="100" show-elevator></Page> -->
              </TabPane>
              <TabPane label="用户账号" name="user">
                  <Table :columns="columns1" :data="data1" border :style="{margin:'20px 0'}"  height="520"></Table>    
                  <!-- <Page :total="100" show-elevator></Page>          -->
              </TabPane>
          </Tabs>
        </div>
        
      </div>
  </div>
</template>
<script>
import headNav from "./headNav.vue";
export default {
  components: { headNav },
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
      modal2: false, //添加用户的模态框
      loading2: true,
      accountClass: 'admin',//账号类型
      aUrl:'alist',
      //添加账号
      addValidate: {
        account: "",
        pwd: "",
        user_type: ""
      },
      addruleValidate: {
        account: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ],
        pwd: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        user_type: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ]
      },
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "账号名称",
          key: "account",
          align: "center"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "密码",
          key: "passwd"
        }
      ],
      data1: [
       
      ]
    };
  },
  mounted: function() {
    //请求账号列表的信息
    this.getList();
  },
  methods: {
    getList() {
      var a = this.HOST + "/api/admin/user/"+ this.aUrl;
      this.$axios
        .get(a)
        .then(response => {
          this.data1 = response.data.data.data
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getAccountClass(value){
      this.accountClass = value;
      this.accountClass == 'admin'?this.aUrl = 'alist':this.aUrl = 'ulist';
      this.getList();
    },
    re() {},
    //添加账号
    addAccount(name) {
      var self = this;
      self.$refs[name].validate(valid => {
        // console.log(valid);
        if (valid) {
          var a = self.HOST + "/api/admin/user/add";
          var c = self.addValidate;
          self.$axios
            .post(a, c)
            .then(response => {
              if (response.status == 200 && response.data.error == 1) {
                //全部成功
                self.modal2 = false;
                self.$Message.success(response.data.msg);
                  this.getList();
              } else {
                setTimeout(() => {
                  self.loading2 = false;
                  self.$nextTick(() => {
                    self.loading2 = true;
                  });
                }, 1000);
                self.$Message.info(response.msg);
              }
            })
            .catch(error => {
              //请求失败
              console.log(error);
              setTimeout(() => {
                self.loading2 = false;
                self.$nextTick(() => {
                  self.loading2 = true;
                });
              }, 1000);
              // self.$Message.info("原始密码输入错误");
            });
        } else {
          setTimeout(() => {
            self.loading2 = false;
            self.$nextTick(() => {
              self.loading2 = true;
            });
          }, 1000);
        }
      });
    }
  }
};
</script>
