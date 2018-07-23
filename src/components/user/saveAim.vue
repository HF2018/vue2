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
</style>
<template>
  <div>
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
      <BreadcrumbItem to="/user/cGroup">会员中心</BreadcrumbItem>
      <BreadcrumbItem to="">保存目标</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',fontSize: '14px',color: '#495060'}">
      <Steps :current="0">
        <Step title="选择分组" content="在下面的筛选条件中进行条件组合"></Step>
        <Step title="保存为营销目标" content="保存为营销目标"></Step>
      </Steps>
      <!-- 筛选条件： -->
      <div style="color:#495060;font-size:14px;padding: 0 0 20px 0;margin:20px 0;border-bottom:1px solid #ddd">
        <h2 style="color:#495060;font-size:16px">筛选条件：</h2>
        <div class="allproperty">

          <Tabs :animated="false" @on-click='getOnepro' v-model="one.oneProperty">
            <TabPane :label="item.label" v-for="(item,pindex) in one.allPro" :key="pindex" :name="item.label">
              <div>
                <CheckboxGroup @on-change="getTwopro" v-model="two.checkedTwo">
                  <Checkbox v-for="(site,index) in item.children" :key="index" :label="site.label">
                    <span>{{site.label}}</span>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <!-- 所选分组： -->
      <div style="border-bottom:1px solid #ddd">
        <h2 style="color:#495060;font-size:16px">所选分组：</h2>
        <div class="allproperty">
          <div v-for="(item,aindex) in hasChoosed" :key="aindex" :style="{margin: '10px 0'}" class="clear">
            <b style="display:inline-block;padding:8px 10px 0">{{item.label}}</b>
            <div style="display:inline-block">
              <Button v-for="(site,index) in item.children" :key="index" @click="getThree(aindex, index, $event)" v-bind:class="[index==hasChoosed[aindex].selectedIndex? 'threeactive' : '']" style="margin: 0 10px 0px 0">
                {{site.label}}
              </Button>
            </div>

          </div>
        </div>
      </div>
      <div :style="{margin: '20px 0',textAlign:'right'}">
        <Button type="primary" size="large" @click="saveTargets('3')">保存为目标因子</Button>
      </div>
      <div class='notice_text'>
        <h2>已选分组：</h2>
      </div>
      <Button @click="choosedEmpty" :disabled='three.allchoosedContition.length == 0'>清空</Button>
      <Table :columns="columns1" :data="this.three.allchoosedContition" border height='220' :style="{margin: '20px 0'}"></Table>
      <!-- 已创建的目标 -->
      <div class='notice_text'>
        <h2>已创建的目标因子</h2>
      </div>
      <p>共{{ClassifyTabel.total}}条</p>
      <div style="margin: 10px 0">
        <Button @click="handleSelectAll(true)" :disabled='ClassifyTabel.data.length == 0'>全选</Button>
        <Button @click="handleSelectAll(false)" :disabled='ClassifyTabel.data.length == 0'>取消全选</Button>
        <Button @click="deleteSorted()" :disabled='compound.checked.length == 0'>删除</Button>
      </div>
      <!-- <Table ref="selection" :columns=" ClassifyTabel.columns" :data="ClassifyTabel.data" @on-select-cancel='getCompundcancel' @on-select='getCompound'></Table> -->
      <Table ref="selection" :columns=" ClassifyTabel.columns" :data="ClassifyTabel.data" @on-selection-change='getCompound'></Table>
      <!-- </TabPane>
      </Tabs> -->
      <!-- 筛选的结果 -->
      <div class='notice_text' style='margin: 20px 0'>
        <h2>筛选的结果</h2>
      </div>
      <i-table height="550" stripe border :columns="columns" :data="typedata"></i-table>
      <Page :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page"></Page>
    </Content>

    <!-- 保存分组的对话框 -->
    <Modal v-model="saveGroup.modal1" :title="saveGroup.text" :loading='saveGroup.loading1' @on-ok="ok('saveGroup')">
      <Form ref="saveGroup" :model="saveGroup" :label-width="110" :rules="saveValidate" enctype="multipart/form-data">
        <FormItem label="名称" prop="label">
          <Input v-model="saveGroup.label" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="你选择的目标因子" prop="label">
          <p v-for="(item,index) in three.allchoosedContition" :key="index">名称：{{item.label}}；分数类型：{{item.rank_type}}；值：{{item.value}}</p>
          <p style="text-align: right">共{{three.allchoosedContition.length}}个已选目标因子</p>
        </FormItem>
        <FormItem label="求分方式" prop="sortScore">
          <RadioGroup v-model="saveGroup.sortScore" @on-change='getallScore'>
            <Radio label="score">
              <span>求平均分</span>
            </Radio>
            <Radio label="level">
              <span>组合方式</span>
            </Radio>
            <Radio label="sum">
              <span>求和</span>
            </Radio>
          </RadioGroup>
          <div v-if="saveGroup.sortScore == 'sum'">逻辑：
            <Select v-model="saveGroup.relation" style="width:30%">
              <Option v-for="item in saveGroup.allrelation" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            数：
            <InputNumber placeholder="请输入数值" v-model="saveGroup.relationValue"></InputNumber>
          </div>
          <p style="color:#ff0000">注：请选择相同的分数类型进行操作。</p>
        </FormItem>

        <FormItem label="得分" prop="mark">
          <Input v-model="saveGroup.mark" placeholder="请选择上面的求分方式" disabled style="{color:'#ff0000'}"></Input>
        </FormItem>
        <!-- <FormItem label="等级" prop="class">
          <Input v-model="saveGroup.class" placeholder="请输入等级"></Input>
        </FormItem> -->

        <FormItem label="备注" prop="remark">
          <Input v-model="saveGroup.remark" placeholder="请输入该组的备注内容" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>

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
      table: {
        id: "",
        total: 0,
        title: [],
        pageSizeval: false,
        //筛选时的加载中...
        spinShow: false,
        currentpage: 1
      },
      //获得的初始筛类型
      cityList: [],
      //保存为营销目标的表单验证
      saveValidate: {
        wayGroup: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ],
        label: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ],
        sortScore: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ],
        mark: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ]
        // class: [
        //   {
        //     validator: inputValue,
        //     trigger: "change"
        //   }
        // ]
      },
      //已创建的目标
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
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.editAim(params.row);
                      }
                    }
                  },
                  "编辑"
                ),

                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },

                    on: {
                      click: () => {
                        this.filteraxios(params.row.id);
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
                    style: {
                      marginRight: "5px"
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
      //点击的一二级的index
      allIndex: {
        oneIndex: 0,
        twoIndex: 0
      },
      //第一级
      one: {
        oneProperty: "",
        clickName: "",
        allPro: [],
        currentOne: "",
        total: 0,
        currentPage: 1
      },

      //第二级的属性
      two: {
        checkedTwo: [],
        allchecked: [], //第二级的model
        allchoosed: [], //第二级所有被选中的
        allPro: [], //2级所有的属性
        currentTwo: "",
        total: 0,
        currentPage: 1
      },
      hasChoosed: [], //所有分组
      editClick: false, //点击了已创建目标表格里面的编辑
      editInfro: [], //点击编辑的当前这一项的基本目标
      editCurrent: null, //当前编辑项的所有信息
      //第三级的属性
      three: {
        checkedThree: [],
        isActive: false, //第三级是否被选中
        clickId: [], //第三级被点击的id
        clickOwner: [], //第三级被点击的,他所属于第二级的哪个
        allchoosedContition: [], //展示所有已选条件，已选分组的表格里面的数据
        allScore: "", //已选择的所有条件的最后得分
        total: 0,
        currentPage: 1,
        pageItem: {} //第三级的分页处点击的那一行的数据
      },
      //保存营销目标的对话框
      saveGroup: {
        modal1: false,
        loading1: true,
        label: "",
        remark: "",
        mark: "", //分数
        class: "",
        sortScore: "", //求分方式
        id: "", //点击编辑的当前id
        allrelation: [
          {
            value: "$gte",
            label: "大于等于"
          }
        ], //求和的所有关系
        relation: "", //求和的当前被选择关系
        relationValue: 0, //求和的逻辑值（大于好多）
        text: "保存为目标因子" //弹出框的title
      },
      //(所有的目标)第三级的属性
      compound: {
        checked: [], //被选中的目标
        copyallInfro: [], //复制分级下的所有子项
        cancelitem: null //记录每次取消选择的
      },
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center"
        },

        {
          title: "名称",
          key: "label"
        },
        {
          title: "评分类型",
          key: "rank_type"
        },
        {
          title: "分数",
          key: "value"
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
                    type: "warning",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeChoosed(params.index);
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

  created() {
    //全局配置提示框
    this.$Message.config({
      top: 90,
      duration: 3
    });
    this.getOne();
    this.getrankterms(); //得到目标的列表
    this.fastdatas();
  },
  computed: {},
  methods: {
    //已选分组的清空
    choosedEmpty() {
      this.three.allchoosedContition = [];
      this.three.clickId = [];
      this.editClick = false;
      this.hasChoosed.forEach((val, index) => {
        val.selectedIndex = -1;
      });
    },
    //已选分组表格里面的删除
    removeChoosed(index) {
      var removeitem = this.three.allchoosedContition[index];
      this.three.allchoosedContition.splice(index, 1);
      this.three.clickId.splice(index, 1);
      this.hasChoosed.forEach((val, index) => {
        val.ids.forEach(site => {
          if (site == removeitem.id) {
            val.selectedIndex = -1;
          }
        });
      });
    },
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
      var a;
      if (typeof val == "string") {
        this.table.id = val;
        a = this.HOST + "/api/targetfac/filter/" + this.table.id + "?p=1";
      } else {
        a = this.HOST + "/api/targetfac/filter/" + this.table.id + "?p=" + val;
      }
      console.log(a);
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
              // console.log(this.cityList)
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
                    align: "center",
                    minWidth: 100
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
    //所有目标的全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //得到目标列表
    getrankterms() {
      var a = this.HOST + "/api/targetfac";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
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
              this.ClassifyTabel.total = response.data.data.total;
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(error => {
          this.$Message.info("操作失败");
        });
    },
    //取消选择的
    getCompundcancel(val, row) {
      console.log(this.three.allchoosedContition);
      this.three.allchoosedContition = this.three.allchoosedContition.filter(
        function(item) {
          var test_id = true;
          row.rank_termses.forEach(site => {
            if (site.id == item.id) {
              // console.log("--" + item.id);
              test_id = false;
            }
          });
          return test_id;
        }
      );
      console.log(this.three.allchoosedContition);
    },
    //获得选择的目标
    getCompound(selection) {
      console.log(selection);
      this.compound.checked = selection;
      // if (row.rank_termses != null) {
      //   row.rank_termses.forEach(val => {
      //     this.three.allchoosedContition.push(val);
      //     this.three.clickId.push(val.id);
      //   });
      // }
      // console.log(this.three.allchoosedContition);
    },

    //删除已有的目标列表
    deleteSorted(type, val) {
      var tmpId = [];
      //表格中一个一个的进行删除
      if (type == "single") {
        tmpId.push(val.id);
      } else {
        //多个进行删除
        console.log(this.compound.checked);
        if (this.compound.checked.length != 0) {
          this.compound.checked.forEach(item => {
            tmpId.push(item.id);
          });
        }
      }
      var url = this.HOST + "/api/targetfac";
      axios
        .delete(url, { data: { ids: tmpId } })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.getrankterms();
              this.three.allchoosedContition = [];
              this.three.clickId = [];
              this.hasChoosed.forEach((val, index) => {
                val.selectedIndex = -1;
              });
              this.$Message.success(response.data.msg);
              this.compound.checked = [];
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(error => {
          this.$Message.info("操作失败");
        });
    },
    cancel() {},
    //编辑已创建的目标
    editAim(item) {
      this.editCurrent = item;
      this.editClick = true; //代表点击了编辑
      this.three.allchoosedContition = [];
      this.three.clickId = [];
      if (item.baseAll.length != 0) {
        this.editInfro = item.baseAll;
        item.baseAll.forEach(val => {
          this.three.allchoosedContition.push(val);
          this.three.clickId.push(val.id);
        });
      }
    },
    //得到第一级和第二级的属性
    getOne(state) {
      // var a = this.HOST + "/api/admin/vip/onelist?p/api/admin/vip/onelist?p=" + this.one.currentPage=" + this.one.currentPage;
      var a = this.HOST + "/api/class";
      axios({
        method: "get",
        url: a
      })
        .then(response => {
          console.log(response);
          // this.$Message.success(response.data.msg);
          if (response.status == 200 && response.data.error == 1) {
            if (response.data.data.total != 0) {
              this.one.allPro = response.data.data.data;
              this.one.total = response.data.data.total;
              this.one.currentOne = response.data.data.data[0].label;
              // commit('getTwo');
              var choosedOne;
              if (state.one.allPro.length != 0) {
                state.one.allPro.forEach(value => {
                  if (value.label == state.one.currentOne) {
                    choosedOne = value;
                  }
                });
                var a = api + "/api/rank?id=" + choosedOne.id;
                // + state.two.currentPage;
                axios({
                  method: "get",
                  url: a
                })
                  .then(response => {
                    console.log(response);
                    // this.$Message.success(response.data.msg);
                    if (response.status == 200 && response.data.error == 1) {
                      if (response.data.data.total != 0) {
                        this.two.allPro = response.data.data.data;

                        this.two.allchoosed = [
                          {
                            name: this.one.currentOne,
                            twoinfro: this.two.allPro
                          }
                        ];

                        this.two.currentTwo = response.data.data.data[0].id;
                        this.two.total = response.data.data.total;
                      }
                    }
                  })
                  .catch(response => {});
              }
            }
            // console.log(state.one.allPro)
          }
        })
        .catch(response => {});
    },
    //得到筛选的条件
    getCondition(val) {
      // console.log(val)
      // this.chooseCondition.conChoise.push(val);
      // console.log(this.chooseCondition.conChoise);
    },
    //得到第一级属性和第二级的属性
    getOnepro(name) {
      // this.$store.state.a.one.currentOne = name;
      // this.one.clickName = name;
      // // this.getTwo();
      var choosedOne;
      this.one.allPro.forEach((value, index) => {
        if (value.label == name) {
          // choosedOne = value;
          this.allIndex.oneIndex = index;
        }
      });
    },
    // 得到第二级属性和id(oi)和第三级的列表
    getTwopro(val) {
      if (this.hasChoosed.length < val.length) {
        var l = val.length - 1;
        this.two.checkedTwo = val;
        var ww = ""; //当前点击的第二级的id
        this.one.allPro[this.allIndex.oneIndex].children.forEach(
          (element, index) => {
            if (element.label == val[l]) {
              var ww = {
                label: element.label,
                id: element.id,
                ids: element.ids,
                children: element.children,
                selectedIndex: -1
              };
              this.hasChoosed.push(ww);
            }
          }
        );
      } else {
        //取消了一个
        this.hasChoosed = this.hasChoosed.filter(function(item) {
          return val.indexOf(item.label) >= 0;
        });
      }
    },
    // 得到第三级属性
    getThree(parentIndex, currentIndex, e) {
      if (this.hasChoosed[parentIndex].selectedIndex == currentIndex) {
        this.hasChoosed[parentIndex].selectedIndex = -1;
      } else {
        this.hasChoosed[parentIndex].selectedIndex = currentIndex;
      }
      //新建的目标
      this.three.clickId = [];
      this.three.allchoosedContition = [];
      var gg = []; //储存选择的第二级的id
      this.hasChoosed.forEach(item => {
        if (item.selectedIndex != -1) {
          this.three.clickId.push(item.children[item.selectedIndex].id);
          var ww = item.children[item.selectedIndex];
          this.three.allchoosedContition.push(ww);
        }
      });
      if (this.editClick) {
        this.three.allchoosedContition = this.three.allchoosedContition.concat(
          this.editInfro
        );
        var ids = [];
        this.editInfro.forEach(val => {
          ids.push(val.id);
        });
        this.three.clickId = this.three.clickId.concat(ids);
      }
    },
    //得到第二级的页码
    getOnePage(val) {
      this.$store.state.a.one.currentPage = val;
      this.$store.dispatch("getOne");
    },
    //得到第二级的页码
    getPage(val) {
      this.$store.state.a.two.currentPage = val;
      this.$store.dispatch("getTwo");
    },
    pagegetThree(item, parentIndex) {
      console.log(item);
      this.three.pageItem.item = item;
      this.three.pageItem.parentIndex = parentIndex;
      item.pageShow = true;
      console.log(this.three.pageItem);
    },
    //得到第三级页码
    getThreePage(val) {},

    //求分方式的选择
    getallScore(val) {
      this.saveGroup.mark = "";
      this.three.allScore = 0;
      if (this.saveGroup.sortScore == "score") {
        //求平均
        //先获取已选条件的分数
        this.three.allchoosedContition.forEach(val => {
          this.three.allScore = parseInt(val.value) + this.three.allScore;
        });
        this.saveGroup.mark = (
          this.three.allScore / this.three.clickId.length
        ).toString();
      } else if (this.saveGroup.sortScore == "level") {
        //组合方式
        var ff = [];
        this.three.allchoosedContition.forEach(val => {
          ff.push(val.value);
        });
        this.saveGroup.mark = ff.join("");
      } else if (this.saveGroup.sortScore == "sum") {
        //求和方式
        var ss = 0;
        this.three.allchoosedContition.forEach(val => {
          ss = parseInt(val.value) + ss;
        });
        this.saveGroup.mark = ss.toString();
      }
    },
    //目标进行筛选
    aimSearch(id) {
      // console.log(id)
    },
    //点击’保存为营销目标‘的模态框的显示
    saveTargets(val) {
      this.saveGroup.mark = "";
      this.saveGroup.sortScore = "";
      if (this.three.clickId.length != 0) {
        this.saveGroup.modal1 = true;
        if (this.editClick) {
          //为更新已创建的目标，进行编辑，保存
          this.saveGroup.label = this.editCurrent.name;
          this.saveGroup.id = this.editCurrent.id;
          this.saveGroup.text = "编辑该目标因子";
        } else {
          //为创建新的组
          this.saveGroup.text = "保存为目标因子";
        }
      } else {
        this.$Message.info({
          content: "先选择条件,进行组合，再保存为目标因子"
        });
      }
    },
    //获得营销策略下的分组
    Markets(val) {
      if (this.saveGroup.allMarket.length != 0) {
        this.saveGroup.allMarket.forEach((value, index) => {
          if (value.label == val) {
            let oi = value.id;
            //console.log(oi)
            // let a = this.HOST + "/api/admin/vip/ploysonlist?oi=" + oi + "&p=1";
            // axios
            //   .get(a)
            //   .then(response => {
            //     if (response.status == 200 && response.data.error == 1) {
            //       // this.saveGroup.Pathema = response.data.data.data;
            //       response.data.data.data == null
            //         ? (this.saveGroup.Pathema = [])
            //         : (this.saveGroup.Pathema = response.data.data.data);
            //     } else {
            //       this.$Message.info(response.data.msg);
            //     }
            //   })
            //   .catch(error => {
            //     console.log(error);
            //   });
          }
        });
      } else {
      }
    },
    //获得策略下的分组
    Pathemats(val) {
      this.saveGroup.wayGroup = val;
      this.saveGroup.Pathema.forEach((value, index) => {
        if (value.label == val) {
          //console.log(value)
          this.saveGroup.oi = value.id;
        }
      });
    },

    //保存为营销目标的确定提交
    ok(name) {
      this.$refs[name].validate(valid => {
        // console.log(valid);
        if (valid) {
          //通过验证
          let a = this.HOST + "/api/targetfac";
          let rank = "";
          let ee =
            this.saveGroup.sortScore +
            "," +
            this.saveGroup.relation +
            "," +
            this.saveGroup.relationValue;
          rank =
            this.saveGroup.sortScore == "sum" ? ee : this.saveGroup.sortScore;
          let b = {
            name: this.saveGroup.label,
            rank_type: rank,
            value: this.saveGroup.mark,
            rank_terms_ids: this.three.clickId
          };
          let c = {
            id: this.saveGroup.id,
            name: this.saveGroup.label,
            rank_type: rank,
            value: this.saveGroup.mark,
            rank_terms_ids: this.three.clickId
          };

          if (this.editClick) {
            this.saveGroup.text = "编辑该目标";
            //编辑的保存
            axios
              .put(a, c)
              .then(response => {
                if (response.status == 200 && response.data.error == 1) {
                  this.saveGroup.modal1 = false;
                  this.$Message.success(response.data.msg);
                  this.getrankterms();
                  this.three.allchoosedContition = [];
                  this.three.clickId = [];
                  this.hasChoosed.forEach((val, index) => {
                    val.selectedIndex = -1;
                  });
                } else {
                  this.saveGroup.modal1 == true;
                  this.$Message.info(response.data.msg);
                  setTimeout(() => {
                    this.saveGroup.loading1 = false;
                    this.$nextTick(() => {
                      this.saveGroup.loading1 = true;
                    });
                  }, 1000);
                }
              })
              .catch(error => {
                this.$Message.info("保存失败");
              });
          } else {
            //新建目标的保存
            this.saveGroup.text = "保存为目标因子";
            axios
              .post(a, b)
              .then(response => {
                if (response.status == 200 && response.data.error == 1) {
                  this.saveGroup.modal1 = false;
                  this.$Message.success(response.data.msg);
                  this.getrankterms();
                  this.three.allchoosedContition = [];
                  this.three.clickId = [];
                  this.hasChoosed.forEach((val, index) => {
                    val.selectedIndex = -1;
                  });
                } else {
                  this.saveGroup.modal1 == true;
                  this.$Message.info(response.data.msg);
                  setTimeout(() => {
                    this.saveGroup.loading1 = false;
                    this.$nextTick(() => {
                      this.saveGroup.loading1 = true;
                    });
                  }, 1000);
                }
              })
              .catch(error => {
                this.$Message.info("保存失败");
              });
          }
        } else {
          setTimeout(() => {
            this.saveGroup.loading1 = false;
            this.$nextTick(() => {
              this.saveGroup.loading1 = true;
            });
          }, 1000);
        }
      });
    }
  }
};
</script>
