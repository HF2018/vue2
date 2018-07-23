<style scoped>
.clear {
  clear: both;
  overflow: hidden;
}
.notice_text {
  text-align: left;
  border-radius: 4px;
  padding: 10px;
  line-height: 18px;
  background: rgb(232, 233, 235);
  border: 1px solid #ddd;
  margin: 0 0 20px 0;
}
/* .sms_link li {
  background-color: #fff;
  color: #2d8cf0;
  height: 40px !important;
  line-height: 40px !important;
  margin-right: 10px;
  border: none !important;
  padding: 0;
  list-style: none;
  float: right;
}
.sms_link {
  background-color: transparent;
  clear: both;
  overflow: hidden;
}
.sms_link li a {
  color: #fff;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #2d8cf0;
}
.sms_link li a.router-link-active {
  color: #2d8cf0 !important;
  border: 1px solid #2d8cf0 !important;
} */
</style>
<template>
  <div>
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
      <BreadcrumbItem to="/user/cGroup">会员中心</BreadcrumbItem>
      <BreadcrumbItem to="">属性设置</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',fontSize: '14px',color: '#495060'}">
      <div>
        <Tabs value="name1">
          <TabPane label="营销目标" name="name1">
            <div style="text-align:right;margin: 10px">
              <!-- <Input v-model="value4" icon="ios-search-strong" placeholder="Enter something..." style="width: 300px;"></Input> -->
            </div>
            <p style="border:1px solid green;"></p>
            <Row type="flex" justify="start" align="middle">
              <Col span="6">
              <h3 style="padding:10px 0px;">1、目标列表——总数：{{aim.allPro.length}}</h3>
              </Col>
              <Col>
              </Col>
            </Row>
            <Table :columns="aim.columns" :data="aim.allPro" border></Table>
            <RadioGroup v-model="aim.choose" type="button" @on-change="TacticsValue">
              <Radio :label="item.id" v-for="(item,index) in aim.allPro" :key="index">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>

            <p style="margin: 10px 0;text-align: right">
              <!-- <ul class="sms_link">
                <li > -->
              <Button @click="createPlans(aim.chooseInfo)" type="primary">创建营销方案</Button>
              <!-- <router-link to="/project/createPlans?ids  + checkAllGroup"> -->
              <!-- <router-link :to="{path:'/project/createPlans', query:{ids:checkAllGroup}}">
                    创建营销方案
                  </router-link> -->
              <!-- </li>
              </ul> -->
            </p>
            <div style="position:relative;margin:20px 0" v-if="tabelShow">
              <div class='notice_text'>
                <h2>目标因子：</h2>
              </div>
              <Table :columns="table.columns" :data="table.data" border></Table>
              <!-- <Page :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page" @on-page-size-change="pageSize"></Page> -->
            </div>
            <!-- 筛选的结果 -->
            <div class='notice_text' style='margin: 20px 0'>
              <h2>筛选的结果</h2>
            </div>
            <i-table height="550" stripe border :columns="columns" :data="typedata"></i-table>
            <Page :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page"></Page>
          </TabPane>
        </Tabs>
      </div>
    </Content>
  </div>
</template>
<script>
import axios from "axios";
import store from "@/vuex/store";
import { mapMutations } from "vuex";
//import fastSearchVue from './fastSearch.vue'
import expandRow from "./table-expand.vue";
import fastSearchVue from "./fastSearch.vue";

export default {
  components: { expandRow },
  data() {
    //输入不能为空
    const inputValue = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      //表单
      columns: [],
      //表单
      typedata: [],
      //获得的初始筛类型
      cityList: [],
      table: {
        id: "",
        total: 0,
        title: [],
        pageSizeval: false,
        //筛选时的加载中...
        spinShow: false,
        currentpage: 1
      },
      //修改的表单验证
      reviseValidate: {
        value1: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ],
        value2: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ]
      },
      //搜索框
      value4: "",
      tabelShow: true,
      table: {
        spinShow: false,
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "序列号",
            type: "index",
            width: 100,
            align: "center"
          },
          {
            title: "分组名",
            key: "name",
            align: "center"
          },
          {
            title: "分数类型",
            key: "rank_type",
            align: "center"
          },
          {
            title: "分数",
            key: "value",
            align: "center"
          },
          {
            title: "操作",
            key: "age",
            width: 400,
            align: "center",
            render: (h, params) => {
              const row = params.row;
              //console.log(row)
              return h("div", [
                h(
                  "router-link",
                  {
                    props: {
                      to: "/user/gDetail/" + row.id
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        // console.log(params)
                        // this.editSign(params)
                        // this.modal1 = true;
                      }
                    }
                  },
                  "了解详情"
                ),
                h(
                  "router-link",
                  {
                    props: {
                      to: "/user/cGroup/accurateSearch"
                      // v-model: 'Modal1',
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        //this.editSign(params)
                        // this.modal1 = true;
                      }
                    }
                  },
                  "添加条件"
                ),
                h(
                  "router-link",
                  {
                    props: {
                      to: "/market/sms/sendSms/" + row.id
                      // to: '/market/sms/sendSms'
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        // this.signRemove(params.index);
                      }
                    }
                  },
                  "会员维系"
                ),
                h(
                  "router-link",
                  {
                    props: {
                      to: "/project/plans/" + row.id
                      //disabled:'disabled'
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        // this.signRemoves(params);
                      }
                    }
                  },
                  "营销方案"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                      disabled: "disabled"
                    },
                    style: {
                      margin: "0 5px"
                    },
                    on: {
                      click: () => {
                        this.TableReviseName(row);
                      }
                    }
                  },
                  "修改"
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
                        this.signRemove(params);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        data: [],
        //点击搜索出现的弹出框
        modal: false,
        value1: "",
        value2: "",
        params: "",
        loading3: true,
        total: 0,
        pageSizeval: false,
        currentpage: 1
      },
      //已有目标
      aim: {
        allPro: [], //所有的目标
        choose: "", //选中的目标d的Id
        chooseInfo: null, //选中的目标的全部信息
        columns: [
          // {
          //   type: "selection",
          //   width: 60,
          //   align: "center"
          // },
          {
            title: "序列号",
            type: "index",
            width: 100,
            align: "center"
          },
          {
            title: "分组名",
            key: "label",
            align: "center"
          },
          {
            title: "组成",
            key: "children",
            align: "center"
          },
          {
            title: "操作",
            key: "age",
            width: 400,
            align: "center",
            render: (h, params) => {
              const row = params.row;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "dashed",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        // console.log(params)
                        // this.editSign(params)
                        // this.modal1 = true;\
                        this.TacticsValue(row);
                      }
                    }
                  },
                  "了解详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.filteraxios(params.row);
                      }
                    }
                  },
                  "筛选"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        // this.signRemoves(params);
                        this.createPlans(row);
                        // console.log(row)
                      }
                    }
                  },
                  "创建营销方案"
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
                        this.signRemove(row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      },
      indeterminate: true,
      checkAll: false,
      checkAllGroup: []
    };
  },
  created() {
    this.GetTactics();
    this.$Message.config({
      top: 100,
      duration: 3
    });
    this.fastdatas(); //
  },
  computed: {},
  // mounted() {},
  methods: {
    //...mapMutations(['getOne']),
    //首先获取目标
    GetTactics() {
      let url = this.HOST + "/api/target";
      axios
        .get(url)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data.data != null) {
                this.aim.allPro = response.data.data.data;
                console.log(this.aim.allPro);
                // this.aim.choose = response.data.data.data[0].id;
                // this.$options.methods.TacticsValue.bind(this)(this.aim.choose);
              }
            } else {
              this.$Message.info("暂时没有目标");
            }
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data);
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            // console.log(error.request);
          } else {
          }
        });
    },
    //选中目标
    TacticsValue(row) {
      console.log(row);
      this.table.data = row.children;
      // if (this.aim.allPro != []) {
      //   this.aim.allPro.forEach(val => {
      //     if (val.id == id) {
      //       this.aim.chooseInfo = val;
      //     }
      //   });
      //   if (this.aim.chooseInfo.children != null) {
      //     this.table.data = this.aim.chooseInfo.children;
      //   }
      // } else {
      //   this.$Message.info("暂时没有数据，快去创建吧");
      // }
    },

    //表单
    GetGroup(val) {
      let DiseaseType = this.Group.DiseaseType;
      if (typeof val == "object") {
        // console.log(val)
      }
      this.table.total = val.length;
      this.$options.methods.TableVoluation.bind(this)(val);
    },
    createPlans(item) {
      console.log(item);
      this.table.id = item;
      this.$router.push({
        name: "createPlans",
        params: { params: item }
      });
    },
    //筛选
    //1、获取初始筛选条件
    fastdatas() {
      // let url = this.HOST + '/api/admin/vip/item'
      let url = this.HOST + "/api/item";
      axios
        .get(url)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.cityList = response.data.data;
            } else {
              this.$Message.error(response.data.msg);
            }
          } else {
            this.$Message.warning("服务器请求出错...");
          }
        })
        .catch(error => {
          this.$Message.warning("服务器请求出错...");
        });
    },
    //表单
    page(val) {
      this.table.pageSizeval = false;
      this.$options.methods.filteraxios.bind(this)(val);
    },
    filteraxios(val) {
      console.log(typeof val);
      var a;
      if (typeof val == "object") {
        this.table.id = val.id;
        a = this.HOST + "/api/target/filter/" + this.table.id + "?p=1";
      } else {
        a = this.HOST + "/api/target/filter/" + this.table.id + "?p=" + val;
      }
      //传给后台的计算条件
      // var cafilters = this.allcount;

      //表单筛选出的title清空

      this.table.title = [];
      //表单筛选出的数据清空
      this.columns = [];
      this.typedata = [];
      let filterurl;
      let url;

      //当页码与每页显示条数未发生改变执行
      // if (val) {
      //   //改变每页显示条数
      //   if (this.table.pageSizeval) {
      //     this.table.currentpage = 1
      //     url = filterurl + '?p=1&item=' + val
      //   } else {
      //     //改变页码
      //     this.table.currentpage = val
      //     url = filterurl + '?p=' + val + '&item=10'
      //   }
      // } else {
      //   //默认页码1与每页显示10条
      //   this.table.currentpage = 1
      //   url = filterurl + '?p=1&item=10'
      // }
      console.log(this.cityList);
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.typedata = response.data.data.data;
              this.table.total = response.data.data.total;
              this.table.spinShow = false;
              //计算数量的极端的搜索结果
              //转换时间戳
              this.typedata.forEach((value, index) => {
                if (value.hasOwnProperty("lb")) {
                  let date = formatDate(
                    new Date(value.lb * 1000),
                    "yyyy-MM-dd"
                  );
                  value.lb = date;
                }
              });

              //筛选表头 当返回数据中 再类型选择框中存在 则放入table.title中 作为表头
              this.cityList.forEach((value, index) => {
                if (this.typedata[0].hasOwnProperty(value.field)) {
                  this.table.title.push(value);
                }
              });

              //  console.log(this.cityList)
              //根据表头 匹配显示内容
              this.table.title.forEach((value, index) => {
                //console.log(value)
                if (this.columns.length == 0) {
                  let cc = {
                    title: "序列号",
                    type: "index",
                    width: 100,
                    align: "center",
                    fixed: "left",
                    align: "center"
                  };
                  let aa = {
                    title: value.name,
                    key: value.field,
                    width: 100,
                    fixed: "left",
                    align: "center"
                  };
                  let bb = {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                      return h("div", [
                        h(
                          "Button",
                          {
                            props: {
                              type: "text",
                              size: "small"
                            },
                            style: {
                              color: "blue"
                            },
                            on: {
                              click: () => {
                                //console.log(params)
                              }
                            }
                          },
                          "查看详情"
                        )
                      ]);
                    }
                  };
                  this.columns.unshift(aa);
                  this.columns.push(bb);
                  this.columns.unshift(cc);
                } else {
                  let aa = {
                    title: value.name,
                    key: value.field,
                    align: "center"
                  };
                  this.columns.unshift(aa);
                }
              });
              this.$Message.success("筛选成功");
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            //alert(error.response.data);
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            //alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //删除目标
    signRemove(row) {
      var url = this.HOST + "/api/target";
      var tmpId = [];
      tmpId.push(row.id);
      // tmpId.push(val.id);
      this.$axios
        .delete(url, { data: { ids: tmpId } })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
                this.GetTactics();
              this.$Message.success(response.data.msg);
           
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(function(error) {
            if (error.response) {
              alert(error.response.data);
              // this.spinShow = false;
              // console.log(error.response.data);
              // console.log(error.response.status);
            } else if (error.request) {
              // console.log(error.request);
            } else {
              alert(error.message);
            }
          });
    }
  }
};
</script>
