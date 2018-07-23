<style scoped>
.notice_text {
  text-align: left;
  border-radius: 4px;
  padding: 2px 10px;
  line-height: 18px;
  background: rgb(232, 233, 235);
  border: 1px solid #ddd;
}
/* .ivu-poptip-inner{

   background-color: #ddd!important 
} */
</style>

<template>
    <div>
      <div class='notice_text'>
        <p>1. 一个完整的短信由短信签名和短信正文内容两部分组成，您可以根据业务需求分别设置不同的短信正文内容模板，然后进行组合形成最终展示。短信签名+短信正文内容=最终显示内容;</p>
        <p>2. 短信签名和模板提交后，我们会在半个工作日内完成审核。</p>
      </div>
    <Tabs style="margin: 10px 0 0 0" v-model="smsType" @on-click="getSmsType">
        <TabPane label="短信签名" name="0">
            <div style="padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #ddd">
                <createSign style="display: inline-block"></createSign>               
                <span>你可以在下面的<span style="color: #2d8cf0">示例签名模板</span>中选择参考</span>
                <Input v-model="signSearchVal" icon="ios-search"  placeholder="请输入签名内容" style="width: 25%;float:right"  @on-enter="signSearch" @on-click="signSearch"/>          
            </div>
             <Tabs type="card" v-model="signClass" @on-click="getSignClass">
                <TabPane label="示例签名模板" name="1">
                    <Table border :columns="columns7" :data="$store.state.a.exampleSign"  height="520"></Table>
                    <!-- <signModal modal1="true" v-show="false" v-bind:modal1="parentMsg"></signModal>   -->
                    <signModal  v-bind:modalshow="modal1" v-show="modal1">222</signModal>  
                    <!-- <signModal v-show="modal1" :panelShow="modal1"></signModal>   -->
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="$store.state.a.exampleSignTotal" :current="$store.state.a.signCurrentpage" @on-change="changePage" show-total show-elevator></Page>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="我的签名模板"  name="2">
                    <Table border :columns="columns7" :data="$store.state.a.exampleSign"  height="520"></Table>
                    <!-- <signModal modal1="true" v-show="false" v-bind:modal1="parentMsg"></signModal>   -->
                    <signModal  v-bind:modalshow="modal1" v-show="modal1">222</signModal>  
                    <!-- <signModal v-show="modal1" :panelShow="modal1"></signModal>   -->
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="$store.state.a.exampleSignTotal" :current="$store.state.a.signCurrentpage" @on-change="changePage" show-total  show-elevator></Page>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </TabPane>
        <TabPane label="短信内容" name="1">
             <div style="padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #ddd">
                <createSms style="display: inline-block"></createSms>               
                <span>你可以在下面的<span style="color: #2d8cf0">示例正文模板</span>中选择参考</span>
                <Input v-model="signSearchVal" icon="ios-search" placeholder="请输入模板名称" style="width: 25%;float:right" @on-enter="signSearch" @on-click="signSearch"/>    
            </div>
            
             <Tabs type="card" v-model="signClass" @on-click="getSignClass">
                <TabPane label="示例正文模板" name="1">
                    <Table border :columns="columns8" :data="$store.state.a.exampleSign"  height="520"></Table>
                    <signModal  v-bind:modalshow="modal1" v-show="modal1">222</signModal>  
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="$store.state.a.exampleSignTotal" :current="$store.state.a.signCurrentpage" @on-change="changePage" show-total show-elevator></Page>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="我的正文模板" name="2">
                    <Table border :columns="columns8" :data="$store.state.a.exampleSign"  height="520"></Table>
                    <signModal  v-bind:modalshow="modal1" v-show="modal1">222</signModal>  
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="$store.state.a.exampleSignTotal" :current="$store.state.a.signCurrentpage" @on-change="changePage" show-total show-elevator></Page>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </TabPane>
    </Tabs>
    
  </div>
</template>
<script>
import createSign from "./createSign.vue";
import createSms from "./createSms.vue";
import signModal from "./signModal.vue";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import failReasonVue from "./failReason.vue";
export default {
  components: { createSign, createSms, signModal },
  data() {
    return {
      value4: "",
      signSearchVal: "", //签名的搜索框
      signData: [], //示例签名的数据
      signDatatotal: null,
      modal1: false,
      signClass: null, //签名类型
      smsType: 0, //短信签名（0）,短息内容（1）

      columns7: [
        {
          type: "index",
          width: 80,
          align: "center",
          title: "序号"
        },
        {
          title: "ID",
          align: "center",
          key: "sid",
          width: 150
        },
        {
          title: "签名内容",
          key: "text"
          // width: "40%"
        },

        {
          title: "备注",
          key: "remark",
          width: 250
        },
        {
          title: "状态",
          align: "center",
          width: 200,
          key: "s",
          render: (h, params) => {
            const row = params.row;
            const color = row.s === 0 ? "green" : row.s === 1 ? "blue" : "red";
            const text =
              row.s === 0 ? "已通过" : row.s === 1 ? "待审核" : "未通过(原因)";//(s=0(已通过），，s=1(待审核),,s=2(未通过，，))
            if (row.s == 2) {
              //未通过
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom",
                    width: 300
                  }
                },
                [
                  h(
                    "Tag",
                    {
                      props: {
                        color: color,
                        type: "border"
                      }
                    },
                    text
                  ),
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        textAlign: "left",
                        width: "100%",
                        height: "100px",
                        whiteSpace: "normal"
                      }
                    },
                    [h("span", row.reply)]
                  )
                ]
                // text
              );
            } else {
              //已通过和待审核
              return h(
                "span",
                {
                  props: {
                    // type: "dot",
                    color: color
                  }
                },
                text
              );
            }
          }
        },
        {
          title: "操作",
          // key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                    // v-model: 'Modal1',
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editSign(params.index);
                      this.modal1 = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.signRemove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns8: [
        {
          type: "index",
          width: 80,
          align: "center",
          title: "序号"
        },
        {
          title: "ID",
          align: "center",
          key: "tid",
          width: 100
        },
        {
          title: "短信类型",
          align: "center",
          key: "type",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            const text = row.s === 0 ? "普通短信" : "营销短信";
            return h(
              "span",
              {
                props: {
                  // type: "dot",
                }
              },
              text
            );
          }
        },
        {
          title: "模板名称",
          align: "center",
          key: "title",
          width: 200
        },
        {
          title: "内容",
          key: "text"
          // width: "40%"
        },

        {
          title: "备注",
          key: "remark",
          width: 200
        },
        {
          title: "状态",
          align: "center",
          width: 200,
          key: "s",
          render: (h, params) => {
            const row = params.row;
            const color = row.s === 0 ? "green" : row.s === 1 ? "blue" : "red";
            const text =
              row.s === 0 ? "已通过" : row.s === 1 ? "待审核" : "未通过(原因)";
            if (row.s == 2) {
              //未通过
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom",
                    width:300
                  }
                },
                [
                  h(
                    "Tag",
                    {
                      props: {
                        color: color,
                        type: "border"
                      }
                    },
                    text
                  ),
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        textAlign: "left",
                        width: "100%",
                        height: "100px",
                        whiteSpace: "normal"
                      }
                    },
                    [h("p", row.reply)]
                  )
                ]
                // text
              );
            } else {
              //已通过和待审核
              return h(
                "span",
                {
                  props: {
                    // type: "dot",
                    color: color
                  }
                },
                text
              );
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                    // v-model: 'Modal1',
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editSign(params.index);
                      this.modal1 = true;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.signRemove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  created: function() {
    this.$store.commit("getSignList");
    console.log(this.smsType);
  },

  methods: {
    //引入签名列表
    ...mapMutations(["getSignList"]),
    ...mapActions(["addAction", "reduceAction"]),
    //编辑签名
    editSign(index) {
      this.modal1 = true;
      console.log(this.modal1);
      // return signModal
      //   this.$Modal.confirm({
      //     title: "编辑短信签名",
      // //     // content: '<p>signModal</p>',
      //     render: (h) => {
      //         return h(signModal, {
      //                         props: {
      //                             value: this.value,
      //                             autofocus: true,
      //                             placeholder: 'Please enter your name...'
      //                         },
      //                         on: {
      //                             // input: (val) => {
      //                             //     this.value = val;
      //                             // }
      //                             signModal: () => {this.modal1 = true}
      //                         }
      //                     })
      //     }

      //   })
    },

    //删除签名
    signRemove(index) {
      // this.data6.splice(index, 1);
      console.log(index);
      //短信签名（0）,短息内容（1）
      var allUrl = ["sign", "tpl"];
      var deleteUrl = allUrl[this.smsType];
      this.$Modal.confirm({
        title: "删除确认",
        content: `<div>ID:${
          this.$store.state.a.exampleSign[index].sid
        }<br>签名内容：${
          this.$store.state.a.exampleSign[index].text
        }<br>备注：${this.$store.state.a.exampleSign[index].remark}
        <br>状态：${this.$store.state.a.exampleSign[index].s}</div>
         <p style="fontSize:'14px'">确定删除该签名？删除后原有内容将不再进行保存。</p>`,
        onOk: () => {
          var a = this.HOST + "/api/sms/" + deleteUrl + "/remove";
          var b = new FormData();
          var s = [
            this.$store.state.a.exampleSign[index].sid,
            this.$store.state.a.exampleSign[index].tid
          ];
          var dd = s[this.smsType];
          b.append("id", dd);
          this.$axios
            .post(a, b)
            .then(response => {
              console.log(response);
              if (response.status == 200) {
                if (response.data.error == 1) {
                  //成功
                  this.$Message.success(response.data.msg);
                  //刷新签名列表
                  this.$store.commit("getSignList");
                } else {
                  this.$Message.info(response.data.msg);
                }
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        onCancel: () => {
          //   this.$Message.info("Clicked cancel");
        }
      });
    },
    //分页
    changePage(value) {
      this.$store.state.a.signCurrentpage = value;
      //刷新签名列表(按照页数来请求数据)
      this.$store.commit("getSignList");
    },
    //签名的搜索
    signSearch() {
      console.log(this.signSearchVal);
      this.$store.state.a.searchVal = this.signSearchVal;
      this.$store.state.a.signCurrentpage = 1;
      console.log(this.$store.state.a.searchVal);
      this.$store.commit("getSignList");
    },
    //监听签名类型（示例（1）、我的（2）签名模板列表）
    getSignClass(value) {
      console.log(value);
      console.log(this.signClass);
      this.$store.state.a.signCurrentClass = this.signClass;
      this.$store.state.a.signCurrentpage = 1;
      this.signSearchVal = "";
      this.$store.state.a.searchVal = ""; //清空搜索框的值
      this.$store.commit("getSignList");
    },
    //签名与正文的切换
    getSmsType(val) {
      this.smsType = val;
      // this.$store.state.a.signCurrentClass = 1;
      this.$store.state.a.smsType = this.smsType;
      this.$store.commit("getSignList");
    }
  },

  watch: {
    //监听签名的搜索框的值
    signSearchVal: function(val) {
      console.log(val);
      if (val == "") {
        //为空的时候，刷新数据
        this.signSearchVal = "";
        this.$store.state.a.searchVal = ""; //清空搜索框的值
        this.$store.commit("getSignList");
      } else {
      }
    }
  },
  mounted: function() {}
};
</script>
