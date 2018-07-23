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
          <div style="text-align:right">
            <Page :total="$store.state.a.one.total" size="small" show-total @on-change='getOnePage' style="margin: 20px 0"></Page>
          </div>
          <!-- <Row v-for="(item,pindex) in one.allPro" :key="pindex" :name="item.label">
            <Col span="4">
            <b>{{item.label}}</b>
            </Col>
            <Col span="20">
            <div>
              <CheckboxGroup @on-change="getTwopro" v-model="two.checkedTwo">
                <Checkbox v-for="(site,index) in item.children" :key="index" :label="site.label">    
                  <span>{{site.label}}</span>
                </Checkbox>
              </CheckboxGroup>  
            </div>
            </Col>
          </Row> -->

          <Tabs :animated="false" @on-click='getOnepro' v-model="one.oneProperty">
            <TabPane :label="item.label" v-for="(item,pindex) in one.allPro" :key="pindex" :name="item.label">
              <!-- <TabPane :label="item.name" v-for="(item,pindex) in two.allchoosed" :key="pindex" :name="item.name"> -->
              <div>
                <CheckboxGroup @on-change="getTwopro" v-model="two.checkedTwo">
                  <!-- <Checkbox v-for="(site,index) in two.allchoosed[pindex].twoinfro" :key="index" :label="site.label"> -->
                  <Checkbox v-for="(site,index) in item.children" :key="index" :label="site.label">
                    <!-- <Checkbox v-for="(site,index) in two.allchoosed[pindex].twoinfro" :key="index" :label="site.label"> -->
                    <span>{{site.label}}</span>
                  </Checkbox>
                </CheckboxGroup>
                <!-- <Button type="primary" @click="saveTargets('2')">保存为营销目标</Button> -->
              </div>
              <!-- <Page :total="$store.state.a.two.total" size="small" show-total @on-change='getPage' style="margin: 20px 0"></Page> -->
            </TabPane>
          </Tabs>
        </div>
      </div>
      <!-- 所有分组： -->
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
        <Button type="primary" size="large" @click="saveTargets('3')">保存为营销目标</Button>
      </div>
      <div class='notice_text'>
        <h2>已选分组：</h2>
      </div>
      <Table :columns="columns1" :data="this.three.allchoosedContition" border height='220' :style="{margin: '20px 0'}"></Table>
      <!-- 已创建的目标 -->
      <div class='notice_text'>
        <h2>已创建的目标</h2>
      </div>
      <!-- 标签 -->
      <Tabs type="card">
        <TabPane v-for="(item,index) in ClassifyTabel.tabs" :key="index" :label="item">
          <p>共{{ClassifyTabel.total}}条</p>
          <div style="margin: 10px 0">
            <Button @click="handleSelectAll(true)">全选</Button>
            <Button @click="handleSelectAll(false)">取消全选</Button>
            <Button @click="deleteSorted()">删除</Button>
            <!-- <Button @click="increaseClass" type="success">添加到目标组下</Button> -->
          </div>
          <Table ref="selection" :columns=" ClassifyTabel.columns" :data="ClassifyTabel.data" @on-selection-change='getCompound'></Table>
        </TabPane>
      </Tabs>
      <!-- 筛选的结果 -->
      <div class='notice_text'>
        <h2>筛选的结果</h2>
      </div>
      <!-- <div style="position:relative" v-show="SavePacket.tableShow">
      <Spin size="large" fix v-if="table.spinShow"></Spin>
      <h2 style="color:#495060;font-size:16px">筛选的结果：</h2>
      <i-table v-if="PageShow" height="550" stripe border :columns="columns" :data="typedata"></i-table>
      <Page v-if="PageShow" :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page" @on-page-size-change="pageSize"></Page>
    </div> -->
    </Content>

    <!-- 保存分组的对话框 -->
    <Modal v-model="saveGroup.modal1" title="保存为营销目标" :loading='saveGroup.loading1' @on-ok="ok('saveGroup')">
      <Form ref="saveGroup" :model="saveGroup" :label-width="80" :rules="saveValidate" enctype="multipart/form-data">
        <FormItem label="分组名称" prop="label">
          <Input v-model="saveGroup.label" placeholder="请输入分组名称"></Input>
        </FormItem>
        <FormItem label="求分方式" prop="sortScore">
          <RadioGroup v-model="saveGroup.sortScore" @on-change='getallScore'>
            <Radio label="1">
              <span>求平均分</span>
            </Radio>
            <Radio label="2">
              <span>组合方式</span>
            </Radio>
            <!-- <Radio label="3">
              <span>其他</span>
            </Radio> -->
          </RadioGroup>
        </FormItem>

        <FormItem label="得分" prop="mark">
          <Input v-model="saveGroup.mark" placeholder="请选择上面的求分方式" disabled style="{color:'#ff0000'}"></Input>
        </FormItem>
        <FormItem label="等级" prop="class">
          <Input v-model="saveGroup.class" placeholder="请输入等级"></Input>
        </FormItem>
        <!-- <FormItem label="营销策略" prop="way">
          <RadioGroup v-model="saveGroup.way" @on-change="Markets">
            <Radio :label="item.label" v-for="item in saveGroup.allMarket" :key="item.label"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="策略分组" prop="wayGroup">
          <RadioGroup v-model="saveGroup.wayGroup" @on-change="Pathemats">
            <Radio :label="item.label" v-for="item in saveGroup.Pathema" :key="item.label"></Radio>
          </RadioGroup>
          <p v-if="saveGroup.Pathema.length == 0?true:false" style="float:left;color:#2d8cf0">该营销策略下暂无对应的分组。若要保存该营销目标，请点击
            <Button>
              <router-link to='/user/aim'>添加策略下的分组</router-link>
            </Button>
            进行添加</p>
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
        ],
        class: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ]
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
            key: "name"
          },

          {
            title: "分了级的条件（基本条件）",
            key: "rank_termses"
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
                        this.aimSearch(params.row.id);
                      }
                    }
                  },
                  "筛选"
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
      //第三级的属性
      three: {
        checkedThree: [],
        isActive: false, //第三级是否被选中
        clickId: [], //第三级被点击的id
        clickOwner: [], //第三级被点击的,他所属于第二级的哪个
        allchoosedContition: [], //展示所有已选条件，已选分组的表格里面
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
        way: "", //营销方法
        wayGroup: "", //策略分组
        allMarket: [], //所有的营销策略
        Pathema: [], //策略下的分组
        oi: "" //策略下的分组oi
      },
      //(所有的目标)第三级的属性
      compound: {
        checked: [], //被选中的目标
        copyallInfro: [] //复制分级下的所有子项
      },
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        // {
        //   title: "分类",
        //   key: "twoname"
        // },
        {
          title: "名称",
          key: "label"
        },
        // {
        //   title: "基本条件",
        //   key: "filters"
        // },
        {
          title: "评分类型",
          key: "rank_type"
        },
        {
          title: "分数",
          key: "value"
        }
        // {
        //   title: "备注",
        //   key: "remark"
        // }
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
  },
  computed: {},
  methods: {
    //所有目标的全选
    handleSelectAll(status) {
      this.$refs.selection[0].selectAll(status);
    },
    //得到目标列表
    getrankterms() {
      var a = this.HOST + "/api/target";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.ClassifyTabel.data = response.data.data.data;
              this.ClassifyTabel.total = response.data.data.total;
              //   if (
              //     this.ClassifyTabel.data != null &&
              //     this.ClassifyTabel.data.rank_termses != null
              //   ) {
              //       this.ClassifyTabel.data.conditionName =
              //   }
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
    //获得选择的目标
    getCompound(val) {
      console.log(val);
      var var_name = []; //表格中点击的name
      val.forEach(site => {
        var_name.push(site.name);
      });
// console.log(this.compound)
      //  this.three.allchoosedContition = [];
      // this.three.clickId = [];
      if (this.compound.checked.length < val.length) {
        if (val[val.length - 1].rank_termses != null) {
          val[val.length - 1].rank_termses.forEach(val => {
            this.three.allchoosedContition.push(val);
            this.three.clickId.push(val.id);
          });
        }
        console.log(this.three.allchoosedContition);
      } else {
        // 取消了一个

        this.compound.checked = this.compound.checked.filter(function(item) {
          return var_name.indexOf(item.name) >= 0;
        });
        // var difference = val.concat(this.compound.checked).filter(function(v) {
        //   return (
        //     val.indexOf(v) === -1 || this.compound.checked.indexOf(v) === -1
        //   );
        // });
        // console.log(difference);
      }
   this.compound.checked = val;
      // console.log(this.compound.checked);
    },
    //删除已有的目标列表
    deleteSorted(type, val) {
      console.log(val);
      console.log(type);
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
              this.three.allchoosedContition = [];
              this.three.clickId = [];
              this.$Message.success(response.data.msg);
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
      console.log(item);
      this.three.allchoosedContition = [];
      this.three.clickId = [];
      if (item.rank_termses != null) {
        item.rank_termses.forEach(val => {
          this.three.allchoosedContition.push(val);
          this.three.clickId.push(val.id);
        });
      }

      console.log(this.three.allchoosedContition);
      console.log(this.three.clickId);
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
      // var choosedOne;
      this.one.allPro.forEach((value, index) => {
        if (value.label == name) {
          // choosedOne = value;
          this.allIndex.oneIndex = index;
        }
      });
      // var a = this.HOST + "/api/admin/vip/twolist?oi=" + choosedOne.id + "&p=0";
      // //  + state.two.currentPage;
      // axios({
      //   method: "get",
      //   url: a
      // }).then(response => {
      //   // this.$Message.success(response.data.msg);
      //   if (response.status == 200 && response.data.error == 1) {
      //     if (response.data.data.total != 0) {
      //       this.two.allPro = response.data.data.data;
      //       var qq = {
      //         name: name,
      //         twoinfro: this.two.allPro
      //       };
      //       // 判断是否重复添加
      //       console.log(this.two.allchoosed.length);
      //       if (this.two.allchoosed.length == 0) {
      //         this.two.allchoosed.push(qq);
      //       } else {
      //         var hh = [];
      //         this.two.allchoosed.forEach(val => {
      //           hh.push(val.name);
      //         });
      //         if (hh.indexOf(name) == -1) {
      //           //没有匹配到的
      //           this.two.allchoosed.push(qq);
      //         }
      //       }
      //     }
      //   }
      // });
    },
    // 得到第二级属性和id(oi)和第三级的列表
    getTwopro(val) {
      console.log(val);
      if (this.hasChoosed.length < val.length) {
        var l = val.length - 1;
        this.two.checkedTwo = val;
        var ww = ""; //当前点击的第二级的id
        console.log(this.allIndex);
        console.log(this.one.allPro[this.allIndex.oneIndex]);
        this.one.allPro[this.allIndex.oneIndex].children.forEach(
          (element, index) => {
            if (element.label == val[l]) {
              var ww = {
                label: element.label,
                id: element.id,
                ids: element.ids,
                children: element.children,
                // total: this.three.total,
                // currentPage: this.three.currentPage,
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
      var gg = []; //储存选择的第二级的id
      if (this.hasChoosed[parentIndex].selectedIndex == currentIndex) {
        this.hasChoosed[parentIndex].selectedIndex = -1;
      } else {
        this.hasChoosed[parentIndex].selectedIndex = currentIndex;
      }
      this.three.clickId = [];
      this.three.allchoosedContition = [];
      console.log(this.hasChoosed);
      this.hasChoosed.forEach(item => {
        if (item.selectedIndex != -1) {
          // this.three.clickId.push(item.three[item.selectedIndex].id);
          this.three.clickId.push(item.children[item.selectedIndex].id);
          var ww = item.children[item.selectedIndex];
          console.log(ww);
          var aa = {
            label: ww.label,
            // remark: ww.remark,
            value: ww.value,
            // filters: ww.filters,
            // twoname: item.label,
            rank_type: ww.rank_type
          };
          this.three.allchoosedContition.push(aa);
        }
      });
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
    getThreePage(val) {
      // this.hasChoosed[this.three.pageItem.parentIndex].selectedIndex = -1;
      // var a =
      //   this.HOST +
      //   "/api/admin/vip/threelist?oi=" +
      //   this.three.pageItem.item.oi +
      //   "&p=" +
      //   val;
      // axios
      //   .get(a)
      //   .then(response => {
      //     console.log(response);
      //     // this.$Message.success(response.data.msg);
      //     if (response.status == 200 && response.data.error == 1) {
      //       if (response.data.data.total != 0) {
      //         this.three.total = response.data.data.total;
      //         this.hasChoosed[this.three.pageItem.parentIndex].three =
      //           response.data.data.data;
      //       }
      //     }
      //   })
      //   .catch(response => {});
    },

    //求分方式的选择
    getallScore(val) {
      this.saveGroup.mark = "";
      this.three.allScore = 0;
      console.log(this.three.allchoosedContition);
      if (this.saveGroup.sortScore == 1) {
        //求平均
        //先获取已选条件的分数
        this.three.allchoosedContition.forEach(val => {
          this.three.allScore = parseInt(val.score) + this.three.allScore;
        });
        this.saveGroup.mark = this.three.allScore / this.three.clickId.length;
      } else if (this.saveGroup.sortScore == 2) {
        //组合方式
        var ff = [];
        this.three.allchoosedContition.forEach(val => {
          ff.push(val.score);
        });
        this.saveGroup.mark = ff.join("");
      }
    },
    //目标进行筛选
    aimSearch(id) {
      console.log(id);
      var a = this.HOST + "/api/target/filter/" + id + "?p=1";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              // this.ClassifyTabel.data = response.data.data.data;
              // this.ClassifyTabel.total = response.data.data.total;
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
    //点击’保存为营销目标‘的模态框的显示
    saveTargets(val) {
      // console.log(val);
      // var one = 1;
      // var two = 2;
      // var three = 3;
      // if (val == one) {

      // } else if (val == two) {
      //   console.log(this.hasChoosed);
      //   var allTwoID = [];
      //   this.hasChoosed.forEach(val => {
      //     allTwoID.push(val.id);
      //   });
      //   console.log(allTwoID);
      // }else if(val == three){

      // }
      if (this.three.clickId.length != 0) {
        this.saveGroup.modal1 = true;
        // this.getallScore();
        // //获取营销策略
        // let a = this.HOST + "/api/admin/vip/ploylist";
        // axios
        //   .get(a)
        //   .then(response => {
        //     console.log(response);
        //     if (response.status == 200 && response.data.error == 1) {
        //       this.saveGroup.allMarket = response.data.data.data;
        //       this.saveGroup.way = this.saveGroup.allMarket[0].label;
        //       this.$options.methods.Markets.bind(this)(this.saveGroup.way);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      } else {
        this.$Message.info({
          content: "先选择条件,进行组合，再保存为营销目标"
        });
      }
    },
    //获得营销策略下的分组
    Markets(val) {
      console.log(this.saveGroup.allMarket);
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
          let a = this.HOST + "/api/target";
          let b = {
            name: this.saveGroup.label,
            // oi: this.saveGroup.oi,
            rank_terms_ids: this.three.clickId
            // mark: this.saveGroup.mark,
            // class: this.saveGroup.class
          };
          console.log(b);
          axios
            .post(a, b)
            .then(response => {
              if (response.status == 200 && response.data.error == 1) {
                this.saveGroup.modal1 = false;
                this.$Message.success(response.data.msg);
                this.getrankterms();
                this.three.allchoosedContition = [];
                this.three.clickId = [];
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
