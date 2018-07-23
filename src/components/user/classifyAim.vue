<style scoped>
.notice_text {
  text-align: left;
  border-radius: 4px;
  padding: 10px;
  line-height: 18px;
  background: rgb(232, 233, 235);
  border: 1px solid #ddd;
  margin: 0 0 20px 0;
}
.threeactive {
  background-color: #2b85e4;
  color: #fff;
  border-color: #2b85e4;
}
._border {
  padding: 2em 2em 2em 2em;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.aaa {
  background: red;
}
</style>
<template>
  <div>
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
      <BreadcrumbItem to="/user/cGroup">会员中心</BreadcrumbItem>
      <BreadcrumbItem to="">分类分级</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',fontSize: '14px',color: '#495060'}">
      <Row>
        <!-- <Col span="12" class="_border">
        所有分类 -->
        <!-- <div style="color:#495060;font-size:14px;padding: 0 0 20px 0;margin:20px 0;border-bottom:1px solid #ddd;">
          <h2 style="color:#495060;font-size:16px">策略</h2>
          <div class="allproperty">
            <div>
              <Checkbox :indeterminate="classOne.indeterminate" :value="classOne.checkAll" @click.prevent.native="handleCheckAll(1)">全选</Checkbox>
              <Button type="warning" size='small' @click="deleteclass(1)">删除</Button>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding: 10px 0">
              <b>所有策略:</b>
              <div style="display:inline-block">
                <CheckboxGroup v-model="classOne.checkAllGroup" @on-change="checkAllGroupChange(1,classOne.checkAllGroup)">
                  <Checkbox v-for="(item,index) in classOne.allPro" :key="index" :style="{margin: '10px 0'}" :label="item.label"></Checkbox>
                </CheckboxGroup>
              </div>
              <div style="display:inline-block">
                <Input v-model="classinputValue" placeholder="请输入策略名称" icon="ios-plus-outline" @on-enter='creatClass' @on-click='creatClass'></Input>
              </div>
            </div>
            <b style="margin: 10px 0;display: block">归策略下：</b>
            <Tabs type="card" v-model="classOne.single" @on-click='getClassSingle(1,classOne.single)' :style="{margin: '10px 0'}">
              <TabPane v-for="(item,index) in classOne.allPro" :key="index" :label='item.label' :name="item.label">
                <Tag v-for="(site,index) in item.tarsets" :key="index" :name="site.id" closable @on-close="handleClose1">
                  {{site.label}}
                </Tag>
              </TabPane>
            </Tabs>
          </div>
        </div> -->
        <!-- 快捷操作 -->
        <!-- <div>
          <h2 style="color:#495060;font-size:16px">快捷操作</h2>
          <div class="allproperty">
            <Button type="info" @click="copyClassCompound()" :disabled='classOne.copydisabled'>复制</Button>
            <Button @click="addClass" type="success">添加到策略下</Button>
            <Button @click="classOne.fastallInfro = []">清空</Button>
            <Button @click="removeallChosed(1)">清空</Button>
          </div>
        </div>
        </Col> -->
        <Col span="24" class="_border">
        <!-- 目标 -->
        <div style="color:#495060;font-size:14px;padding: 0 0 20px 0;margin:20px 0;border-bottom:1px solid #ddd">
          <h2 style="color:#495060;font-size:16px">目标</h2>
          <div class="allproperty">
            <div style="">
              <Checkbox :indeterminate="rankTwo.indeterminate" :value="rankTwo.checkAll" @click.prevent.native="handleCheckAll(2)">全选</Checkbox>
              <Button type="warning" size='small' @click="deleteclass(2)">删除</Button>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding: 10px 0">
              <b>所有目标:</b>
              <div style="display:inline-block">
                <CheckboxGroup v-model="rankTwo.checkAllGroup" @on-change="checkAllGroupChange(2,rankTwo.checkAllGroup)">
                  <Checkbox v-for="(item,index) in rankTwo.allPro" :key="index" :style="{margin: '10px 0'}" :label="item.label"></Checkbox>
                </CheckboxGroup>
              </div>
              <div style="display:inline-block">
                <Input v-model="rankinputValue" placeholder="请输入名称" @on-enter='creatRank' icon="ios-plus-outline" @on-click='creatRank'></Input>
              </div>
            </div>
            <b style="margin: 10px 0;display: block">归目标下：</b>
            <Tabs type="card" v-model="rankTwo.single" @on-click='getClassSingle(2,rankTwo.single)' :style="{margin: '10px 0'}">
              <TabPane v-for="(item,index) in rankTwo.allPro" :key="index" :label='item.label' :name="item.label">
                <Tag v-for="(site,index) in item.children" :key="index" :name="site.id" closable @on-close="handleClose2">
                  {{site.name}}
                </Tag>
              </TabPane>
            </Tabs>

          </div>
        </div>

        <!-- 所有基础目标 -->
        <div>
          <h2 style="color:#495060;font-size:16px">快捷操作</h2>
          <div class="allproperty">
            <Button type="info" @click="copyCompund" :disabled='rankTwo.copydisabled'>复制</Button>
            <Button @click="increaseClass" type="success" :disabled='compound.checked.length == 0 && compound.copyallInfro.length == 0'>添加到目标</Button>
            <!-- <Button @click="compound.copyallInfro = []">清空</Button> -->
            <Button @click="removeallChosed(2)">清空</Button>
          </div>
        </div>
        </Col>
      </Row>
      <Row style="margin: 20px 0">
        <Col span="24" class="_border">
        <h3>所有目标因子</h3>
        <!-- 标签 -->
        <Tabs type="card">
          <TabPane v-for="(item,index) in ClassifyTabel.tabs" :key="index" :label="item">
            <p>共{{ClassifyTabel.total}}条</p>
            <div style="margin: 10px 0">
              <Button @click="handleSelectAll(true)">全选</Button>
              <Button @click="handleSelectAll(false)">取消全选</Button>
              <Button @click="deleteSorted()" :disabled='compound.checked.length == 0'>删除</Button>
              <Button @click="increaseClass" type="success" :disabled='compound.checked.length == 0 && compound.copyallInfro.length == 0'>添加到目标</Button>
            </div>
            <Table ref="selection" :columns=" ClassifyTabel.columns" :data="ClassifyTabel.data" @on-selection-change='getCompound'></Table>
          </TabPane>
        </Tabs>
        </Col>

      </Row>
      <!-- 筛选的结果 -->
      <div class='notice_text' style='margin: 20px 0'>
        <h2>筛选的结果</h2>
      </div>
      <i-table height="550" stripe border :columns="columns" :data="typedata"></i-table>
      <Page :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page"></Page>
    </Content>

  </div>

</template>
<script>
import axios from "axios";
import { formatDate } from './date.js'
export default {
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
      //左侧分类表单
      ClassifyTabel: {
        alldata: null, //目标的基本信息（表格里面的信息）
        tabs: ["全部"],
        // tabs: ["全部", "最新", "有效会员", "时间"],
        //最终复合条件的列表
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "名称",
            key: "name",
            width: 150
          },
          {
            title: "组成目标",
            key: "baseAim",
            render: (h, params) => {
              return h(
                "div",
                {
                  slot: "content"
                },
                [
                  h(
                    "ul",
                    this.ClassifyTabel.data[params.index].baseAim.map(
                      (item, index) => {
                        return h(
                          "li",
                          {
                            style: {
                              listStyle: "none",
                              padding: "4px",
                              display: "inline-block"
                            }
                          },
                          [index + 1 + "." + item]
                        );
                      }
                    )
                  )
                ]
              );
            }
          },
          {
            title: "Action",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
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
                      type: "warning",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.deleteSorted("single", params.row);
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
        selected: [],
        total: 0
      },
      //左边最终匼条件的标签
      mixConditionChecked: [], //左边选中的最终复合条件(经过了去重的)

      //分类的属性（第一级）
      classinputValue: "", //分类的输入框
      //分级的属性（第二级）
      rankinputValue: "", //分级的输入框
      //所有的分类
      classOne: {
        allPro: [], //所有的分类
        total: 0,
        checkAllGroup: [],
        indeterminate: true,
        checkAll: false,
        checkedinfo: [], //被选择的所有项的所有信息
        single: "", //单选的model
        singleInfo: null, //单选项的所有信息
        fastallInfro: [], //点击复制，选择了当前分类下的所有信息
        copydisabled: false
      },
      //分级的属性（第二级）
      rankTwo: {
        allPro: [], //所有的分类
        total: 0,
        checkAllGroup: [], //多选框的model
        indeterminate: true,
        checkAll: false,
        checkedinfo: [], //被选择的所有项
        single: "", //单选的model
        singleInfo: null, //单选项的所有信息
        copydisabled: false
      },
      hasChoosed: [],
      //(所有的复合条件)第三级的属性
      compound: {
        checked: [], //被选中的复合条件
        copyallInfro: [] //复制分级下的所有子项
      },
      three: {
        checkedThree: [],
        isActive: false, //第三级是否被选中
        clickId: [], //第三级被点击的id
        clickOwner: [], //第三级被点击的,他所属于第二级的哪个
        allchoosedContition: [], //展示所有已选条件
        allScore: "", //已选择的所有条件的最后得分
        total: 0,
        currentPage: 1,
        pageItem: {} //第三级的分页处点击的那一行的数据
      },

      spinShow: false,
      //表单验证
      saveValidate: {
        label: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ]
      }
    };
  },

  created() {
    //全局配置消息提示框
    this.$Message.config({
      top: 100,
      duration: 3
    });
    //配置通知提醒框
    this.$Notice.config({
      top: 100,
      duration: 5
    });
    this.getrankterms(); //得到已有的目标因子列表
    // this.getClasslist(-1); //得到营销策略列表
    this.getRanklist(-1); //得到目标组的列表
    this.fastdatas() //
  },
  mounted() {
    // this.classOne.single = this.classOne.allPro[0].label
  },
  computed: {},
  methods: {
    //获得选择的目标
    getCompound(val) {
      this.compound.checked = val;
    },
    //所有复合条件的全选
    handleSelectAll(status) {
      this.$refs.selection[0].selectAll(status);
    },
    //得到已有的目标因子列表
    getrankterms() {
      var a = this.HOST + "/api/targetfac";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.ClassifyTabel.total = response.data.data.total;
              var dd = response.data.data.data;
              this.ClassifyTabel.data = [];
              if (dd != null) {
                dd.forEach(val => {
                  var base = [];
                  var all = [];
                  var ww = null;
                  ww = {
                    name: val.name,
                    id: val.id,
                    baseAim: base,
                    baseAll: all
                  };
                  if (val.rank_termses != null) {
                    val.rank_termses.forEach(site => {
                      var qq =
                        "目标名称：" +
                        site.label +
                        "，分数：" +
                        site.value +
                        "，评分类型：" +
                        site.rank_type +
                        "。";
                      all.push(site);
                      base.push(qq);
                    });
                  } else {
                    base = [];
                    all = [];
                  }
                  this.ClassifyTabel.data.push(ww);
                });
              }
              console.log(this.ClassifyTabel.data);
              this.ClassifyTabel.total = response.data.data.total;
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.data.error == 3) {
              alert("客户端出错");
            }
            console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            alert("服务器无响应");
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            alert("发送请求出错");
          }
          // console.log(error.config);
        });
    },
    //保存计算指标
    ok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //通过验证
          let url = this.HOST + "/api/formula";
          //计算指标
          // 加入计算公式
          var aa = null;
          aa = {
            label: this.saveGroup.label,
            visible: JSON.parse(this.saveGroup.visible),
            expression: [
              {
                which: this.saveGroup.checkedone,
                multerms: this.saveGroup.mulCondition
              }
            ]
          };
          this.$axios
            .post(url, aa)
            .then(response => {
              console.log(response);
              if (response.status == 200) {
                if (response.data.error == 1) {
                  this.$Message.success(response.data.msg);
                  this.saveGroup.modal1 = false;
                } else {
                  this.$Message.info(response.data.msg);
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
                // console.log("Error", error.message);
                alert(error.message);
              }
              // console.log(error.config);
            });
        } else {
          setTimeout(() => {
            this.saveGroup.loading1 = false;
            this.$nextTick(() => {
              this.saveGroup.loading1 = true;
            });
          }, 1000);
        }
      });
    },
    //得到策略列表
    getClasslist(type) {
      var a = this.HOST + "/api/ploy";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.classOne.allPro = [];
              this.classOne.total = [];
              this.classOne.singleInfo = null;
              this.classOne.single = "";
              if (response.data.data.data != null) {
                this.classOne.allPro = response.data.data.data;
                this.classOne.total = response.data.data.total;
                this.classOne.singleInfo = null;
                this.classOne.single = "";
                if (type == -1) {
                  //代表第一次加载页面
                  this.classOne.singleInfo = response.data.data.data[0];
                  this.classOne.single = response.data.data.data[0].label;
                } else {
                  this.classOne.single = type;
                  this.classOne.allPro.forEach(val => {
                    if (val.label == this.classOne.single) {
                      this.classOne.singleInfo = val;
                    }
                  });
                }
                this.classOne.copydisabled =
                  this.classOne.singleInfo.tarsets != null ? false : true;
              } else {
                this.$Message.info("暂无营销策略");
              }

              // this.classOne.allPro = response.data.data.data;
              // this.classOne.total = response.data.data.total;
              // this.classOne.single = response.data.data.data[0].name;
              // this.classOne.singleInfo = response.data.data.data[0];
              // this.classOne.copydisabled =
              //   this.classOne.singleInfo.tarsets != null ? false : true;
            } else {
              this.$Message.info(response.data.msg);
            }

            // console.log(this.allcount);
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.data.error == 3) {
              alert("客户端出错");
            }
            console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            alert("服务器无响应");
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            alert("发送请求出错");
          }
          // console.log(error.config);
        });
    },

    //得到目标的列表
    getRanklist(type) {
      var a = this.HOST + "/api/target";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.rankTwo.allPro = [];
              this.rankTwo.total = [];
              this.rankTwo.singleInfo = null;
              this.rankTwo.single = "";
              if (response.data.data.data != null) {
                this.rankTwo.allPro = response.data.data.data;
                this.rankTwo.total = response.data.data.total;
                this.rankTwo.singleInfo = null;
                if (type == -1) {
                  //第一次渲染页面
                  this.rankTwo.single = response.data.data.data[0].label;
                  this.rankTwo.singleInfo = response.data.data.data[0];
                } else {
                  //其他情况
                  this.rankTwo.single = type;
                  this.rankTwo.allPro.forEach(val => {
                    if (val.label == this.rankTwo.single) {
                      this.rankTwo.singleInfo = val;
                    }
                  });
                }

                this.rankTwo.copydisabled =
                  this.rankTwo.singleInfo.children != null ? false : true;
              } else {
                this.$Message.info("暂无目标组");
              }

              // this.rankTwo.allPro = response.data.data.data;
              // this.rankTwo.total = response.data.data.total;
              // this.rankTwo.single = response.data.data.data[0].name;
              // this.rankTwo.singleInfo = response.data.data.data[0];
              // this.rankTwo.copydisabled =
              //   this.rankTwo.singleInfo.targets != null ? false : true;
            } else {
              this.$Message.info(response.data.msg);
            }

            // console.log(this.allcount);
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
            // console.log("Error", error.message);

            alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //删除已有的目标列表
    deleteSorted(type, val) {
      var tmpId = [];
      //表格中一个一个的进行删除
      if (type == "single") {
        tmpId.push(val.id);
      } else {
        //多个进行删除
        if (this.compound.checked.length != 0) {
          this.compound.checked.forEach(item => {
            tmpId.push(item.id);
          });
        } else {
          this.$Message.info("请先选择你要删除的内容");
          return false;
        }
      }
      var url = this.HOST + "/api/target";
      // tmpId.push(val.id);
      axios
        .delete(url, { data: { ids: tmpId } })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.getrankterms();
              this.$Message.success(response.data.msg);
              this.getRanklist(-1);
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.data.error == 3) {
              alert("客户端出错");
            }
            console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            alert("服务器无响应");
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            alert("发送请求出错");
          }
          // console.log(error.config);
        });
    },
    //创建分类（第一级）
    creatClass() {
      console.log(this.classinputValue);
      var url = this.HOST + "/api/ploy";
      axios
        .post(url, { name: this.classinputValue })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.getClasslist();
              this.$Message.success(response.data.msg);
              this.classinputValue = "";
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.data.error == 3) {
              alert("客户端出错");
            }
            console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            alert("服务器无响应");
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            alert("发送请求出错");
          }
          // console.log(error.config);
        });
    },
    //创建目标组（第二级）
    creatRank() {
      var url = this.HOST + "/api/target";
      axios
        .post(url, { label: this.rankinputValue })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.getRanklist(-1);
              this.$Message.success(response.data.msg);
              this.rankinputValue = "";
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.data.error == 3) {
              alert("客户端出错");
            }
            console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            alert("服务器无响应");
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            alert("发送请求出错");
          }
          // console.log(error.config);
        });
    },

    //得到左边选择的复合条件
    getChoosedmix(index, selection) {},
    //分类分级的全选
    handleCheckAll(val) {
      var tmp = val == 1 ? this.classOne : this.rankTwo;
      console.log(tmp);
      if (tmp.indeterminate) {
        tmp.checkAll = false;
      } else {
        tmp.checkAll = !tmp.checkAll;
      }
      tmp.indeterminate = false;
      if (tmp.checkAll) {
        var checkname = [];
        tmp.allPro.forEach(val => {
          checkname.push(val.label);
        });
        tmp.checkAllGroup = checkname;
        tmp.checkedinfo = tmp.allPro;
      } else {
        tmp.checkAllGroup = [];
        tmp.checkedinfo = [];
      }
    },
    //分类分级的多选框的选择
    checkAllGroupChange(type, data) {
      var tmp = type == 1 ? this.classOne : this.rankTwo;
      tmp.singleInfo = null;
      tmp.allPro.forEach(item => {
        if (item.label == data[data.length - 1]) {
          tmp.singleInfo = item;
        }
      });
      console.log(tmp.singleInfo);
      console.log(tmp.checkAllGroup);
      if (data.length === tmp.allPro.length) {
        tmp.indeterminate = false;
        tmp.checkAll = true;
      } else if (data.length > 0) {
        tmp.indeterminate = true;
        tmp.checkAll = false;
      } else {
        tmp.indeterminate = false;
        tmp.checkAll = false;
      }
      tmp.allPro.forEach(item => {
        if (item.label == data[data.length - 1]) {
          tmp.checkedinfo.push(item);
        }
      });
    },
    //分类分级的删除
    deleteclass(type) {
      let url = "";
      url = type == 1 ? this.HOST + "/api/ploy" : this.HOST + "/api/target";
      var tmp = type == 1 ? this.classOne : this.rankTwo;
      var tmpId = [];
      console.log(tmp.checkedinfo);
      if (tmp.checkedinfo.length != 0) {
        tmp.checkedinfo.forEach(val => {
          tmpId.push(val.id);
        });
        axios
          .delete(url, { data: { ids: tmpId } })
          .then(response => {
            //判断是否是正常状态
            console.log(response);
            if (response.status == 200) {
              if (response.data.error == 1) {
                // this.getRanklist();
                this.getClasslist(-1);
                this.getRanklist(-1);
                tmp.checkAllGroup = [];
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
              if (error.response.data.error == 3) {
                alert("客户端出错");
              }
              console.log(error.response.data);
              // console.log(error.response.status);
            } else if (error.request) {
              alert("服务器无响应");
              // console.log(error.request);
            } else {
              // console.log("Error", error.message);
              alert("发送请求出错");
            }
            // console.log(error.config);
          });
      } else {
        this.$Message.info("请先选择你要删除的内容");
      }
    },
    //将分级添加到分类中（第二级添加到第一级）
    //得到分类、分级的单选项
    getClassSingle(type, data) {
      var tmp = type == 1 ? this.classOne : this.rankTwo;
      tmp.singleInfo = null;
      tmp.allPro.forEach(item => {
        if (item.label == data) {
          tmp.singleInfo = item;
        }
      });
      if (type == 1) {
        this.classOne.copydisabled =
          this.classOne.singleInfo.tarsets != null ? false : true;
      } else if (type == 2) {
        this.rankTwo.copydisabled =
          this.rankTwo.singleInfo.children != null ? false : true;
      }

      // console.log(this.compound.copyallInfro);
    },

    //复合条件添加到分级
    increaseClass() {
      var url = this.HOST + "/api/target";
      var tmp = this.rankTwo;
      var tmpId = [];
      // console.log(this.compound.checked);
      // console.log(this.compound.copyallInfro);
      // console.log(tmp.singleInfo);
      //选择了复合条件,或者是点击了分级下的复制
      if (
        this.compound.checked.length != 0 ||
        this.compound.copyallInfro.length != 0 ||
        tmp.singleInfo.children != null
      ) {
        //选择的
        this.compound.checked.forEach(val => {
          tmpId.push(val.id);
        });
        //原来已有的
        if (tmp.singleInfo.children != null) {
          tmp.singleInfo.children.forEach(val => {
            tmpId.push(val.id);
          });
        }
        //点击复制的
        if (this.compound.copyallInfro.length != 0) {
          this.compound.copyallInfro.forEach(val => {
            tmpId.push(val.id);
          });
        }
        axios
          .put(url, {
            ids: tmpId,
            id: tmp.singleInfo.id,
            label: tmp.single
          })
          .then(response => {
            //判断是否是正常状态
            console.log(response);
            if (response.status == 200) {
              if (response.data.error == 1) {
                this.$Message.success(response.data.msg);
                var ww = this.rankTwo.single;
                this.getRanklist(ww);
                tmp.single = tmp.singleInfo.label;
                tmp.copydisabled =
                  tmp.singleInfo.children != null ? false : true;
                this.compound.checked = [];
                this.handleSelectAll(false);
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
              // console.log(error.response.data);
              // console.log(error.response.status);
            } else if (error.request) {
              // console.log(error.request);
            } else {
              // console.log("Error", error.message);

              alert(error.message);
            }
            // console.log(error.config);
          });
      } else {
        this.$Message.info("请先选择你要添加的条件");
      }
    },
    //复制当前选择的分级（第二级）下的所有子集
    copyCompund() {
      console.log(this.rankTwo.singleInfo);
      var ww = this.rankTwo.singleInfo.label;
      this.compound.copyallInfro = this.rankTwo.singleInfo.children;
      this.$Notice.success({
        title: "复制成功",
        desc: "The desc will hide when you set render.",
        render: h => {
          return h("span", [
            "你复制的内容为",
            h(
              "span",
              {
                style: {
                  color: "#ff0000",
                  fontSize: "14px"
                }
              },
              ww
            ),
            "下的所有子集"
          ]);
        }
      });
      console.log(this.compound.copyallInfro);
    },

    //快捷操作的清空
    removeallChosed(type) {
      if (type == 1) {
        //清空大分类的
        this.classOne.fastallInfro = [];
        var rr = this.classOne.singleInfo.label;
        this.$Notice.success({
          title: "清空完毕",
          desc: "The desc will hide when you set render.",
          render: h => {
            return h("span", [
              "你清空的复制内容为",
              h(
                "span",
                {
                  style: {
                    color: "#ff0000",
                    fontSize: "14px"
                  }
                },
                rr
              ),
              "下的所有子集"
            ]);
          }
        });
      } else {
        this.compound.copyallInfro = [];
        var ee = this.rankTwo.singleInfo.label;
        this.$Notice.success({
          title: "清空完毕",
          desc: "The desc will hide when you set render.",
          render: h => {
            return h("span", [
              "你清空的复制内容为",
              h(
                "span",
                {
                  style: {
                    color: "#ff0000",
                    fontSize: "14px"
                  }
                },
                ee
              ),
              "下的所有子集"
            ]);
          }
        });
      }
    },
    //移除掉已经归级的
    handleClose2(event, name) {
      var closeindex = -1;
      // console.log(this.rankTwo);
      // console.log(this.rankTwo.singleInfo);
      if (this.rankTwo.singleInfo.children != null) {
        this.rankTwo.singleInfo.children.forEach((val, index) => {
          if (val.id == name) {
            closeindex = index;
          }
        });
        this.rankTwo.singleInfo.children.splice(closeindex, 1);
      }

      this.compound.copyallInfro = [];
      this.increaseClass();
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
        a = this.HOST + "/api/targetfac/filter/" + this.table.id + "?p=1";
      } else {
        a = this.HOST + "/api/targetfac/filter/" + this.table.id + "?p=" + val;
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
        console.log(this.cityList)
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.typedata = response.data.data.data;
              this.table.total = response.data.data.total;
              console.log(this.typedata);
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
              
              // console.log(this.cityList)
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
    }
  }
};
</script>
