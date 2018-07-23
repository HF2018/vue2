<style scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}
/* 上传图片 */
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
    <div>
    <!-- <Button type="primary" @click="modal1 = true">创建签名</Button> -->
    <Button type="primary"  @click="modal1 = true">创建签名</Button>
    <Modal
        width="600"
        v-model="modal1"
        title="创建短信签名"
        :loading="loading"
        class-name="vertical-center-modal"     
        @on-ok="handleSubmit('formValidate')"
        @on-cancel="handleReset('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" enctype="multipart/form-data">
            <FormItem label="签名内容" prop="text">
                <Input v-model="formValidate.text" placeholder="请输入你的签名内容"></Input>
                <p style="lineHeight: 16px;marginTop: 10px">长度为2~12个字，由中英文、数字组成，内容不包含【】。范例：成都森蓝科技</p>
            </FormItem>
            <FormItem label="签名类型" prop="signClass">
                <RadioGroup v-model="formValidate.signClass" vertical @on-change='signClass'>
                    <Radio label="1"><b>公司名全称或简称：</b><span>须提供营业执照截图</span></Radio>
                    <Radio label="2"><b>APP名全称或简称：</b><span>须提供任一应用商店的下载链接及开发者的营业执照截图</span></Radio>
                    <Radio label="3"><b>工信部备案的网站名全称或简称：</b><span>须提供主办单位的营业执照截图</span></Radio>
                    <Radio label="4"><b>公众号或小程序名全称或简称：</b><span>须提供公众号（小程序）主体营业执照截图</span></Radio>
                    <Radio label="5"><b>商标全称或简称：</b><span>须提供商标注册证书截图</span></Radio>
                </RadioGroup>
          
            </FormItem>
            <FormItem label="备注内容" prop="remark">
                <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注内容"></Input>
            </FormItem>
          
           <FormItem label="上传图片">         
                <input type="file" @change="uploadPicture" ref="upload" id="file1"/>  
                <p style="display:inline-block;color:#2d8cf0">{{signClassText}}</p>
                <p style="color:#ff0000">{{fileErrorText}}</p>  
                <!-- <input type="file" @change="uploadPicture" ref="upload" id="file1" value = 'formValidate.pic'/>     -->
                <p style="lineHeight: 16px;marginTop: 10px">上传营业执照等证明文件，支持jpg、png格式，建议在5M以下。</p>
            </FormItem>
            <!-- <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem> -->
        </Form>
    </Modal>
    </div>    
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      modal1: false, //控制模态框的显示与影藏
      loading: true,
      //   loading: true,
      signClassChoose: "", //选中的签名类型值
      fileErrorText: "", //文件合适错误
      formValidate: {
        text: "",
        signClass: "",
        remark: "",
        pic: {}
      },
      // 上传图片
      file: null,
      // loadingStatus: false,

      ruleValidate: {
        text: [
          {
            required: true,
            message: "长度为2~12个字",
            trigger: "blur",
            min: 2,
            max: 12
          }
        ],
        signClass: [
          { required: true, message: "请选择签名类型", trigger: "change" }
        ],
        remark: [
          {
            type: "string",
            max: 20,
            message: "最多输入20个字",
            trigger: "blur"
          }
        ],
        pic: [{ required: true, message: "请上传相关图片", trigger: "change" }]
      }
    };
  },
  methods: {
    // count() {
    //   return this.$store.state.a.count;
    // },
    ...mapMutations([ "getSignList"]),
    ...mapActions(["addAction", "reduceAction",]),
    //获得签名类型选中的值,上传文件处提醒文件类型
    signClass: function(value) {
      this.signClassChoose = value;
     
    },
    createSign: function() {
      this.modal1 = true;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    uploadPicture(e) {
      var data_all = new FormData();
      //  this.formValidate.pic = document.getElementById("file1").files[0];
      var file = e.target.files[0];
      console.log(file);
      if (e.target.files.length != 0) {
        //确保是真得选择了图片
        if (file.type != "image/jpeg" && file.type != "image/png") {
          //图片格式判断
          this.fileErrorText = "图片类型必须是jpg/png格式";

          return false;
        } else {
          this.fileErrorText = "";
        }
        //圖片尺寸大小判断
        var ss = e.target.files[0].size / (1024 * 1024);
        //                        console.log((e.target.files[0].size) / (1024 * 1024));
        if (ss > 5) {
          //图片大小判断
          this.fileErrorText = "请上传5M以下的图片";
          return false;
        } else {
          this.fileErrorText = "";
        }
      } else {
        //没有上传图片
        this.fileErrorText = "请上传图片";
        return false;
      }
    },
    handleSuccess(res, file) {
      console.log(res + "3333");
    },

    handleSubmit(name) {
      var dd = document.getElementById("file1").files.length;
      var data_all = new FormData();
      data_all.append("text", this.formValidate.text);
      data_all.append("remark", this.formValidate.remark);
      data_all.append("signClass", this.formValidate.signClass);
      data_all.append("pic", document.getElementById("file1").files[0]);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.fileErrorText == "" && dd != 0) {
            //上面图片的大小和尺寸确定为正确再提交,且也有图片上传了
            this.fileErrorText = "";
            var a = this.HOST + "/api/sms/sign/add";
            var b = data_all;
            console.log(b);
            this.$axios
              .post(a, b)
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  //请求成功
                  if (response.data.error == 1) {
                    //全部成功
                    this.modal1 = false;
                    // console.log("this.modal1=" + this.modal1);
                    this.$Message.success(response.data.msg);
                    //刷新签名列表
                    this.$store.commit("getSignList");
                   
                  } else if (response.data.error == 2) {
                    //服务端错误(签名错误)
                    this.modal1 = false;
                  } else if (response.data.error == 3) {
                    //图片上传失败
                    this.modal1 = true;
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
            this.fileErrorText = "请上传图片";
            setTimeout(() => {
              this.loading = false;
              this.$nextTick(() => {
                this.loading = true;
              });
            }, 1000);
          }
        } else {
          if (dd == 0) {
            this.fileErrorText = "请上传图片";
          } else {
            this.fileErrorText = "";
          }

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
    }
  },
  computed: {
    signClassText: function() {
      var button_text = [
        "上传营业执照",
        "上传开发者营业执照",
        "上传主体营业执照",
        "上传主体营业执照",
        "上传商标注册证书"
      ]; //下面上传文件按钮的文字显示
      var fileClass = button_text[this.signClassChoose - 1];
      return fileClass;
    }
  },
  mounted() {
    //  判定图片是否上传的问题
    var dd = document.getElementById("file1").files.length;
    if (dd != 0) {
      this.fileErrorText = "";
    }
  }
};
</script>
