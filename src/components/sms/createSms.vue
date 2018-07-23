<style>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}

.text_list p {
  line-height: 20px;
}
</style>
<template>
    <div>
    <!-- <Button type="primary" @click="modal1 = true">创建签名</Button> -->
    <Button type="primary" @click="modal1 = true" >创建正文模板</Button>
    <Modal
        width="600"
        v-model="modal1"
        title="创建正文模板"
        class-name="vertical-center-modal"
         :loading="loading"
        @on-ok="handleSubmit('formValidate')"
        @on-cancel="handleReset('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="模板名称" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入模板名称"></Input>
                <p style="lineHeight: 16px;marginTop: 10px">长度为2-20个字。例如：圣诞节促销活动</p>
            </FormItem>
            <FormItem label="短信类型" prop="type">
                <RadioGroup v-model="formValidate.type">
                  <!-- 1->营销短信,0->普通短 -->
                    <Radio label="0">普通短信</Radio>
                    <Radio label="1">营销短信</Radio>    
                </RadioGroup>
                
            </FormItem>
            <FormItem label="短信内容" prop="text">
                <Input v-model="formValidate.text" type="textarea" :autosize="{minRows: 4,maxRows: 6}" @on-change="getTextarea"
                placeholder="模板示例：尊敬的{姓名}，感谢您的支持，现有{可变文本}回馈活动，验证码：{验证码}，有效期至{截止日期}止。祝您身体健康！回T退订。"/>
                <p style="color:#ff0000;font-size:14px">{{marketingSms}}</p>
                <p style="lineHeight: 16px;marginTop: 10px">已输入<span style="color: #ff0000" id="sms_num">{{enteredWordNum}}</span>个字，最多可输入450 个字。</p>   
                <p style="color: #bbb;lineHeight: 20px" >当前模板预计发送条数约为<span id="mes_num" style="color: #ff0000">{{predictSmsNum}}</span>条</p>
                <p style="color: #ff0000;lineHeight: 20px">(实际发送时，如有模板变量会影响计费条数，请特别关注)。</p>
                <div class="text_list"> 
                    <p>1.长度不超过450字。单条短信超过70字后，按67字/条分多条计费。</p>
                    <p>2.营销类短信，请在短信内容后面增加“回T退订”。</p>
                    <p>3.短信模板内容不能含有【】符号。</p>
                    <p>4.不能发送房产、移民、贷款、政治、色情暴力等违法短信。</p>
                    <!-- <p>模板示例：{1}为您的登录验证码，请于{2}分钟内填写。如非本人操作，请忽略本短信。（其中{数字}为可自定义的内容，须从1开始连续编号，如{1}、{2}等。</p> -->
                    <b>模板示例：尊敬的{姓名}，感谢您的支持，现有{可变文本}回馈活动，验证码：{验证码}，有效期至{截止日期}止。祝您身体健康！回T退订。</b>
                </div>               
                        
            </FormItem>
            <FormItem label="申请说明" prop="remark">
                <Input v-model="formValidate.remark" placeholder="请描述该模板内容的发送场景和发送对象，以便管理员及时审核通过" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
               
            </FormItem>
           
        </Form>
    </Modal>
    </div>    
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      loading: true,
      marketingSms: "", //营销短信的提示
      formValidate: {
        title: "",
        type: "",
        text: "",
        remark: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
          {
            type: "string",
            min: 2,
            max: 20,
            message: "长度为2-20个字，由中英文、数字组成。",
            trigger: "blur"
          }
        ],
        type: [
          { required: true, message: "请选择短信类型", trigger: "change" }
        ],
        text: [
          { required: true, message: "请输入短信内容", trigger: "change" },
          {
            type: "string",
            min: 2,
            max: 450,
            message: "最多可输入450个字",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请描述模板内容的发送场景和发送对象",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    //短信内容里面的输入字数
    enteredWordNum: function() {
      return this.formValidate.text.length;
    },
    //预计发送的短信条数
    predictSmsNum: function() {
      return Math.ceil(this.formValidate.text.length / 70);
    }
  },
  methods: {
    handleSubmit(name) {
      //判定营销短信，末尾加上“回T退订”
      //  this.marketingSms = '';
      // console.log(this.formValidate.type);
      var data_all = new FormData();
      data_all.append("text", this.formValidate.text);
      data_all.append("remark", this.formValidate.remark);
      data_all.append("title", this.formValidate.title);
      data_all.append("type", this.formValidate.type);
      this.$refs[name].validate(valid => {
        if (valid) {
          //判定营销短信，末尾加上“回T退订”
          var n = this.formValidate.text.search("回T退订"); //-1代表没有匹配到
          var d = this.formValidate.type; //1->营销短信,0->普通短信
          if (d == 1 && n == -1) {
            //当为营销短信的时候，没有匹配到’回T退订‘
            this.marketingSms = '营销短信模版结尾请添加:"回T退订"';
            setTimeout(() => {
              this.loading = false;
              this.$nextTick(() => {
                this.loading = true;
              });
            }, 1000);
          }
          var a = this.HOST + "/api/sms/tpl/add";
          var b = data_all;
          console.log(b);
          this.$axios
            .post(a, b)
            .then(response => {
              console.log(response);
              //请求成功
              if (response.status == 200) {
                if (response.data.error == 1) {
                  //全部成功
                  this.modal1 = false;
                  this.marketingSms = "";
                  this.$Message.success(response.data.msg);
                  //刷新短信正文列表
                  this.$store.commit("getSignList");
                } else {
                  //营销短信模版结尾请添加:"回T退订
                  this.modal1 = true;
                  this.marketingSms = '营销短信模版结尾请添加:"回T退订"';
                  setTimeout(() => {
                    this.loading = true;
                    this.$nextTick(() => {
                      this.loading = false;
                    });
                  }, 1000);
                }
              } else {
                //失败
                this.modal1 = true;
                this.$Message.error(response.msg);
              }
            })
            .catch(error => {
              // console.log(error);
            });
        } else {
          this.modal1 = true;
          console.log("this.modal1=" + this.modal1);
          setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 1000);
        }
      });
    },
    //监听当为营销短信的时候，短信内容结尾处必须有“回T退订”
    getTextarea: function(value) {
      //判定营销短信，末尾加上“回T退订”
      var n = this.formValidate.text.search("回T退订"); //-1代表没有匹配到
      var d = this.formValidate.type; //1->营销短信,0->普通短信
      if (d == 1) {
        //当为营销短信的时候，没有匹配到’回T退订‘
        if (n == -1) {
          //没哟匹配到
          this.marketingSms = '营销短信模版结尾请添加:"回T退订"';
        } else {
          this.marketingSms = "";
        }
      } else if ((d = 0)) {
        //普通短信的时候
        this.marketingSms = "";
      }
    },
   
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
