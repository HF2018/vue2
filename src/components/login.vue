<template>
  <div class="cover">
     <div class="login-box">
          <div class="login-title">成都零到壹后台系统</div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
              <FormItem prop="account">
                  <Input type="text" v-model="formInline.account" placeholder="账号">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="pwd">
                  <Input type="password" v-model="formInline.pwd" placeholder="密码" @keyup.enter.native="handleSubmit('formInline')">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="code">
                  <Input type="password" v-model="formInline.code" placeholder="验证码" style="width: 69%;display:inline-table" @keyup.enter.native="handleSubmit('formInline')">
                      <Icon type="happy-outline" slot="prepend"></Icon>                    
                  </Input>
                   <img :src=codeimg alt="pic" class='capture_style' @click='verificated'/>                
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')" class="login-form-button">登录</Button>
              </FormItem>
          </Form>
        </div>
  </div>
 
</template>

<script>
//import { mapState, mapMutations, mapActions } from 'vuex'
import store from "@/vuex/store";
import axios from "axios";
import "./css/login/login.css";

export default {
  name: "HelloWorld",
  store,
  data() {
    return {
      codeimg: "", //验证码的图
      formInline: {
        account: "admin",
        pwd: "123",
        code: ""
      },
      ruleInline: {
        account: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          },
          {
            type: "string",
            // min: 6,
            // max: 6,
            message: "密码位数为6位",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      Username: "",
      Password: "",
      verification: "",
      img1: ""
    };
  },
  store,
  created() {
    this.verificated();
  },
  computed: {},
  methods: {
    handleSubmit(name) {
      // const LandedaDeda = {
      //   account: this.Username,
      //   pwd: this.Password,
      //   code: this.verification
      // }
      // const LandedaDeda = {
      //   account: "admin",
      //   pwd: "123",
      //   code: "2222"
      // };
      this.$refs[name].validate(valid => {
        // console.log(valid);
        if (valid) {
          //表单验证成功之后
          let url = this.HOST + "/api/login/admin";
          axios
            .post(url, this.formInline)
            .then(response => {
              console.log(response);
              const error = response.data.error;
              if (error == 1) {
                this.$router.replace("/user");
                this.$Message.success("登录成功");
                const key = response.data.data;
                let keya = JSON.stringify(data);
                localStorage.setItem("key", keya);
              } else {
                this.$Message.error(response.data.msg);
                this.verificated();
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          //表单验证失败
        }
      });
    },
    // get(name) {
    //   var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");

    //   return v ? v[2] : null;
    // },
    //获取验证码
    verificated() {
      let url = this.HOST + "/api/captcha";
      const aa = "data:image/png;base64,";
      // console.log(url);

      // store.commit(types.LOGIN, window.localStorage.getItem('token'))
     

      axios
        .get(url)
        .then(response => {
          if (response.status == 200) {
            this.codeimg = aa + response.data.img;
          }

          const bb = response.data.data.img;
          this.img1 = aa + bb;
          console.log(this.img1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
/*本页面公用*/

</style>