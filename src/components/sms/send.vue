
<style scoped>
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
#smsPreview {
  background-color: #eee;
  border-radius: 5px;
  padding: 6px;
  min-height: 40px;
  line-height: 18px;
}
#file1 {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
}
</style>
<template>
  <div>
    <Button type="primary" @click="createSign">编辑短信</Button>
    <Modal width="600" v-model="modal1" title="编辑短信" class-name="vertical-center-modal" :loading="loading" @on-ok="handleSubmit('formValidate')" @on-cancel="handleReset('formValidate')">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="模板名称" prop="modalName">
          <Select v-model="formValidate.modalName" filterable placeholder="请选择或者搜索选择">
            <!-- <Select v-model="formValidate.modalName" filterable> -->
            <Option v-for="(item,index) in allTpl" :value="item.label" :key="item.index">
              <p @click="getIndex(index)">{{ item.label }}</p>

            </Option>

          </Select>
        </FormItem>
        <FormItem label="签名名称" prop="signName">
          <Select v-model="formValidate.signName" filterable placeholder="请选择或者搜索选择">
            <Option v-for="(item,index) in allSign" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="短信预览" prop="param">
          <div id="smsPreview">
            <smsContent :content="smsPreview"></smsContent>
          </div>
        </FormItem>
        <FormItem label='测试手机'>
          <Input placeholder="请输入手机号码" style='width:80%'></Input>
          <Button type="primary">发&nbsp;&nbsp;送</Button>
        </FormItem>
        <FormItem label='测试说明'>
          <p>因不同运营的审核策略和网关延时，短信发送可能延迟5-30分钟，请耐心等待。</p>
        </FormItem>
        <FormItem label="是否核销短信" prop="checkSms">
          <RadioGroup v-model="formValidate.checkSms">
            <Radio label="false" style='display:block'>否</Radio>
            <Radio label="true">是
              <div style='display:block' v-if="formValidate.checkSms == 'true'">
                <p style='display:inline-block'>
                  <span>有效时间： 收到短信
                    <InputNumber></InputNumber>天内</span>
                </p>
                <p style='display:block'>
                  <span>核销内容：
                    <Input placeholder='请输入核销内容'></Input >
                  </span>
                </p>
              </div>

            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="发送时间" prop="sendTime">
          <RadioGroup v-model="formValidate.sendTime" vertical @on-change="sendTime">
            <Radio label="1">立即发送</Radio>
            <Radio label="2">预约发送
              <p v-if='sendTimeShow' style='display:inline-block'>
                <DatePicker type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
                <TimePicker type="time" placeholder="请选择时间" style="width: 168px"></TimePicker>
              </p>
            </Radio>
            <!-- <Radio label="3">定时发送</Radio>     -->
          </RadioGroup>
        </FormItem>

        <!-- <FormItem label="发送对象" prop="sendObject">

          <Button>导入已有分组名单</Button>
          <Button :style="{position: 'relative'}">
            <Icon type="android-upload"></Icon>导入本地文件<input type="file" @change="uploadFile" ref="upload" id="file1" /></Button>

        </FormItem> -->

      </Form>
    </Modal>
  </div>
</template>

<script>
//短信预览处的动态添加组件
import Vue from "vue";
var _date = "";
var _DatePicker = Vue.extend({
  template:
    '<span><DatePicker type="date" placeholder="请选择日期" style="width: 150px"  size="small" @on-change="dateChoose"></DatePicker></span>',
  data: function() {
    return {
      dateValue: ""
    };
  },
  methods: {
    dateChoose(value) {
      // _date = value.replace('-','').replace('-','');
      _date = value.replace(/-/g, "");
      console.log(value);
      console.log(_date);
    }
  }
});

var disabledInput = Vue.extend({
  template:
    '<span><Input disabled placeholder="系统生成" style="width: 100px"  size="small"/></span>' //不能编写输入
});
var ff = "";
var _Input = Vue.extend({
  template:
    '<span><Input  style="width: 200px"  size="small" placeholder="系统生成" v-model="changeTextarea" @on-change="qwe"/></span>',
  data: function() {
    return {
      changeTextarea: ""
    };
  },
  methods: {
    qwe(value) {
      ff = this.changeTextarea;
      console.log(this.changeTextarea);
    }
  }
});

var _smsContent = Vue.component("smsContent", {
  props: ["content"],
  data: function() {
    return {
      contents: this.content
    };
  },

  components: {
    smsDatePicker: _DatePicker,
    smsInput: _Input,
    smsDisabledInput: disabledInput
  },
  render: function(h) {
    // var smsPreviewHtml = this.content ? this.content : ''; //'尊敬的{姓名}，感谢您的支持，现有{可变文本}回馈活动，验证码：{验证码}，有效期至{截止日期}止。祝您身体健康！回T退订(圣诞节获得)';
    var smsPreviewHtml =
      "尊敬的{姓名}，感谢您的支持，现有{可变文本}回馈活动，验证码：{验证码}，有效期至{截止日期}止。祝您身体健康！回T退订";
    var smsPreviewTexts = smsPreviewHtml.split(
      /({姓名}|{可变文本}|{验证码}|{截止日期})/g
    );
    var result = [];
    smsPreviewTexts.map((v, k) => {
      if (v == "{姓名}") {
        result.push(h("smsDisabledInput"));
      } else if (v == "{验证码}") {
        result.push(h("smsDisabledInput"));
      } else if (v == "{截止日期}") {
        result.push(h("smsDatePicker"));
      } else if (v == "{可变文本}") {
        result.push(h("smsInput"));
      } else {
        result.push(h("span", v));
        //  dd = ''
      }
    });
    return h("div", result);
  }
});

export default {
  components: {
    smsDatePicker: _DatePicker,
    smsInput: _Input
  },
  data() {
    return {
      modal1: false, //控制模态框的显示与影藏
      loading: true,
      modalIndex: null, //模板名称的下拉框
      smsPreviewHtml: "", //短信预览deHTml
      smsPreviewTexts: "", //短信预览的值
      sendTimeShow: false, //发送时间的选择
      sendObject: "导入已有分组名单",
      allSign: [], //所有的通过的签名模板
      allTpl: [], //所有的通过的短信正文模板
      ws: "",
      formValidate: {
        modalName: "",
        signName: "",
        param: "", //短信预览
        sendTime: "",
        checkSms:'false',//是否核销短信
        
      },
      ruleValidate: {
        modalName: [
          { required: true, message: "请选择模板名称", trigger: "change" }
        ],
        signName: [
          { required: true, message: "请选择签名名称", trigger: "change" }
        ],
        sendTime: [
          { required: true, message: "请选择发送时间", trigger: "change" }
        ],
        senddate: [{ required: true, message: "请选择日期", trigger: "change" }]
        // sendObject: [
        //   { required: true, message: "请选择发送对象", trigger: "change" },
        // ]
      }
    };
  },
  computed: {
    //短信预览的值
    smsPreview: function() {
      console.log(this.modalIndex);
      // console.log(this.allTpl)
      // console.log(this.allTpl[this.modalIndex])
      if (this.modalIndex == null) {
        return;
      } else {
        return "【" + this.formValidate.signName + "】" + this.ws;
      }
    }
  },
  mounted: function() {
    //请求签名和正文模板的内容
  },
  methods: {
    //获得选择框的index
    getIndex(index) {
      this.modalIndex = index;
      this.ws = this.allTpl[this.modalIndex].text;
      console.log(this.ws);
    },
    //上传文件
    uploadFile(e) {},
    //发送时间的选择
    sendTime() {
      //console.log(this.formValidate.sendTime);
      if (this.formValidate.sendTime == 2) {
        this.sendTimeShow = true;
      } else {
        this.sendTimeShow = false;
      }
    },
    //提交表单
    handleSubmit(name) {
      //短信预览里面填写的数据
      var ee = this.ws.split(/({姓名}|{可变文本}|{验证码}|{截止日期})/g);
      var dd = "";
      ee.map((v, k) => {
        if (v == "{姓名}") {
          dd = dd + "姓名,";
        } else if (v == "{验证码}") {
          dd = dd + "验证码,";
        } else if (v == "{截止日期}") {
          dd = dd + _date + ",";
        } else if (v == "{可变文本}") {
          dd = dd + ff + ",";
        } else {
          dd = dd + "";
          //  dd = ''
        }
      });
      this.formValidate.param = dd;
      //判断立即发送还是定时发送
      var gg = "";
      if (this.formValidate.sendTime == "1") {
        //立即发送
        gg = "";
      }
      var ww = this.formValidate.param;
      var qq = ww.substring(0, ww.length - 1); //短信预览里面的参数集合
      var data_all = new FormData();
      data_all.append("sign", this.formValidate.signName);
      data_all.append("tid", this.allTpl[this.modalIndex].tid);
      data_all.append("param", qq);
      data_all.append("time", gg);
      data_all.append("file", document.getElementById("file1").files[0]);
      console.log(data_all);
      console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          // loading: false, this.$Message.success("Success!");
          var a = this.HOST + "/api/sms/send";
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
                  this.$store.commit("getSendSms");
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
          setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 1000);
          this.$Message.error("Fail!");
        }
      });
    },
    //点击发送短信的时候，请求签名和正文模板
    createSign: function() {
      let _this = this;
      _this.modal1 = true;
      _this.allSign = []; //先清空
      _this.allTpl = []; //先清空
      var a = "/api/api/sms/sign/list?p=0&g=0"; //签名
      _this
        .$axios({
          method: "get",
          url: a
        })
        .then(function(response) {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              // _this.allSign = response.data.data.data; //总数据
              var a = response.data.data.data; //总数据
              console.log(a); //(s=0(已通过），，s=1(待审核),,s=2(未通过，，))
              a.map((v, k) => {
                //过滤出已经通过的模板
                if (v.s == 0) {
                  _this.allSign.push(v.text);
                }
              });
            } else {
              console.log(22);
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      var b = "/api/api/sms/tpl/list?p=0&g=0"; //短信正文
      _this
        .$axios({
          method: "get",
          url: b
        })
        .then(function(response) {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              // _this.allSign = response.data.data.data; //总数据
              var dd = response.data.data.data; //总数据
              console.log(dd); //(s=0(已通过），，s=1(待审核),,s=2(未通过，，))
              dd.map((v, k) => {
                //过滤出已经通过的模板
                if (v.s == 0) {
                  var w = {};
                  w.title = v.title;
                  w.tid = v.tid;
                  w.text = v.text;
                  w.label = v.title;
                  _this.allTpl.push(w);
                }
              });
              console.log(_this.allTpl);
            } else {
              console.log(22);
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
