<style scoped lang='less'>
.clear {
  clear: both;
  overflow: hidden;
}
@import "../table/table.less";
</style>
<template>
  <div>
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
      <BreadcrumbItem to="/user/cGroup">会员中心</BreadcrumbItem>
      <BreadcrumbItem to="">属性设置</BreadcrumbItem>
    </Breadcrumb>
    <!-- <div :style="{margin: '0 0 24px 0',textAlign:'left'}" >    
        <p>kdf就飞快的计费</p>          
    </div>                            -->
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',fontSize: '14px',color: '#495060'}">
      <div>
        <Tabs value="name1">
          <TabPane label="属性分类管理" name="name1">
            <div style="text-align:right;margin: 10px">
              <!-- <Input v-model="value4" icon="ios-search-strong" placeholder="Enter something..." style="width: 300px;"></Input> -->
            </div>
            <p style="border:1px solid green;"></p>
            <Row type="flex" justify="start" align="middle">
              <Col span="6">
              <h3 style="padding:10px 0px;">1、所有属性——总数：{{Group.tactics.nums}}</h3>
              </Col>
              <Col>
              <Button type="warning" :disabled="Group.tactics.ifNull" @click="addTactics">添加</Button>
              <Button type="warning" :disabled="Group.tactics.ifNull" @click="AltersTactics">修改</Button>
              <Button type="error" :disabled="!Group.tactics.delete.ifdelete || Group.DiseaseType.ifNull" @click="DeleteTactics">删除</Button>
              <Modal v-model="Group.tactics.add.ifshow" title="填写属性" @on-ok="addTacticsOk" @on-cancel="addTacticscancel" :loading="Group.tactics.loading1">
                <p>
                  <span>属性名称：</span>
                  <Input v-model="Group.tactics.add.value" placeholder="请输入属性名称" clearable style="width: 80%" @on-change='strategyInput' autofocus='autofocus' @on-enter='addTacticsOk'></Input>
                </p>
              </Modal>
              </Col>
            </Row>
            <RadioGroup v-model="Group.tactics.value" type="button" @on-change="TacticsValue">
              <Radio :label="item.label" v-for="item in Group.tactics.Datas" :key="item.label"></Radio>
            </RadioGroup>
            <Row type="flex" justify="start" align="middle">
              <Col span="6">
              <h3 style="padding:10px 0px;">2、所有分类——总数：{{Group.DiseaseType.nums}}</h3>
              </Col>
              <Col>
              <Button type="warning" :disabled="Group.DiseaseType.ifNull" @click="DiseaseTypeAdd">添加</Button>
              <Button type="warning" :disabled="Group.DiseaseType.ifNull" @click="AltersDisease">修改</Button>
              <Button type="error" :disabled="!Group.DiseaseType.delete.ifdelete || Group.DiseaseType.ifNull" @click="DiseaseTypeDelete">删除</Button>
              </Col>
              <Modal v-model="Group.DiseaseType.add.ifshow" title="填写分类" @on-ok="DiseaseTypeAddOK" @on-cancel="DiseaseTypeAddcancel" :loading="Group.DiseaseType.loading2">
                <p>
                  <span>分类名称：</span>
                  <Input v-model="Group.DiseaseType.add.value" placeholder="请输入分类名称" clearable style="width: 80%" @on-change='diseaseInput' autofocus='autofocus' @on-enter='DiseaseTypeAddOK'></Input>
                </p>
              </Modal>
            </Row>
            <RadioGroup v-model="Group.DiseaseType.value" type="button" @on-change="DiseaseTypeValue">
              <Radio :label="item.label" v-for="item in Group.DiseaseType.Datas" :key="item.label"></Radio>
            </RadioGroup>
            <br>
            <div style="position:relative;margin:20px 0" v-if="tabelShow">
              <Table :columns="table.columns" :data="table.data" border></Table>
              <Page :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page" @on-page-size-change="pageSize"></Page>
              <Modal v-model="table.modal" title="修改分组" @on-ok="ok('table')" @on-cancel="cancel" :loading='table.loading3'>
                <Form ref="table" :model="table" :label-width="80" :rules="reviseValidate" enctype="multipart/form-data">
                  <FormItem label="分组名称：" prop="value1">
                    <Input v-model="table.value1" placeholder="请输入分组名称"></Input>
                  </FormItem>
                  <!-- <FormItem label="备注：" prop="value2" v-if="false">
                    <Input v-model="table.value2" placeholder="请输入内容" type="textarea" :rows="4" height="520"></Input>
                  </FormItem> -->
                  <FormItem label="评分：" prop="value3">
                    <InputNumber :max="10" :min="1" v-model="table.value3" @on-change="TableGrade"></InputNumber>
                  </FormItem>
                </Form>
              </Modal>
            </div>

          </TabPane>
          <TabPane label="策略方案管理" :disabled="true" name="name2">
          </TabPane>
        </Tabs>
      </div>
      <Row class="margin-top-10">
        <Col>
        <Card>
          <p slot="title">
            <Icon type="android-remove"></Icon>
            可编辑单元行
          </p>
          <div class="edittable-table-height-con">
            <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>
          </div>
        </Card>
        </Col>
        <!-- <Col span="12" class="padding-left-10">
        <Card>
          <p slot="title">
            <Icon type="android-more-horizontal"></Icon>
            可编辑单元格(鼠标移入显示编辑单元格按钮)
          </p>
          <div class="edittable-table-height-con">
            <can-edit-table refs="table3" v-model="editIncellData" :hover-show="true" :edit-incell="true" :columns-list="editIncellColumns"></can-edit-table>
          </div>
        </Card>
        </Col> -->
      </Row>
    </Content>

  </div>
</template>
<script>
import axios from "axios";
import store from "@/vuex/store";
import { mapMutations } from "vuex";
import fastSearchVue from "./fastSearch.vue";
import canEditTable from "../table/canEditTable.vue";
import tableData from "../table/table_data.js";
export default {
  components: {
    canEditTable
  },
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
      editInlineData: [],
      editIncellColumns: [],
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
      tabelShow: false,
      table: {
        spinShow: false,
        columns: [],
        data: [],
        //点击搜索出现的弹出框
        modal: false,
        value1: "",
        value2: "",
        value3: 1,
        params: "",
        loading3: true,
        total: 0,
        pageSizeval: false,
        currentpage: 1
      },
      //分组模板
      Group: {
        //属性列表
        tactics: {
          nums: 0,
          value: "",
          loading1: true,
          Datas: [],
          error: false, //验证的错误提示
          ifNull: true, //判断是否获取到内容
          id: "",
          //添加
          add: {
            //添加弹出框是否有效
            ifshow: false,
            value: ""
          },
          //修改
          Alters: {
            id: "",
            ifshow: false
          },
          delete: {
            //判断当前属性中是否有分类
            ifdelete: false
          }
        },
        //分类列表
        DiseaseType: {
          nums: 0,
          value: "",
          Datas: [],
          id: "",
          error: false,
          loading2: true,
          ifNull: true, //判断是否获取到内容
          add: {
            //是否弹出
            ifshow: false,
            value: ""
          },
          //修改
          Alters: {
            id: "",
            ifshow: false
          },
          delete: {
            //判断当前分类中是否有内容
            ifdelete: true
          }
        }
      }
    };
  },
  created() {
    this.$Message.config({
      top: 90,
      duration: 3
    });
    this.GetTactics();
    this.getData();
  },
  computed: {
    // One(){
    //   return this.$store.getters.One
    // }
  },
  mounted() {},
  methods: {
    getData() {
      // this.columnsList = tableData.table1Columns;
      // this.tableData = tableData.table1Data;
      this.editInlineColumns = tableData.editInlineColumns;
      this.editInlineData = tableData.editInlineData;
      // this.editIncellColumns = tableData.editIncellColumns;
      // this.editIncellData = tableData.editIncellData;
      // this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;
      // this.editInlineAndCellData = tableData.editInlineAndCellData;
      // this.showCurrentColumns = tableData.showCurrentColumns;
    },
    // ...mapMutations(['getOne']),
    //首先获取属性列表
    GetTactics() {
      let url = this.HOST + "/api/admin/vip/onelist?p=1";
      axios
        .get(url)
        .then(response => {
          console.log(response);
          //判断是否是正常状态  筛选出属性列表
          if (response.status == 200 && response.data.error == 1) {
            //判断是否有内容
            if (response.data.data.data) {
              //当存在内容 则激活三个按钮
              this.Group.tactics.ifNull = false;
              //设定默认选中值
              let tactics = this.Group.tactics;
              tactics.value = response.data.data.data[0].label;
              //赋值
              tactics.Datas = response.data.data.data;
              tactics.nums = response.data.data.total;
              //console.log(this.Group.tactics.add)
              //筛选出属性列表
              this.$options.methods.TacticsValue.bind(this)(tactics.value);
            }
          }
        })

        .catch(error => {
          console.log(error);
        });
    },
    //当属性列表选择框发生变动时 获取分类列表
    TacticsValue(val) {
      //筛选出选中值与tacticsDatas中匹配的值
      //console.log(val)
      let tactics = this.Group.tactics;
      tactics.value = val;

      tactics.Datas.forEach((value, index) => {
        if (tactics.value == value.label) {
          tactics.id = value.id;
        }
      });
      //console.log(tactics.Datas)
      //获取分类列表
      let url = this.HOST + "/api/admin/vip/twolist?oi=" + tactics.id;
      axios
        .get(url)
        .then(response => {
          //console.log(response)
          //判断是否是正常状态
          if (response.status == 200 && response.data.error == 1) {
            let data = response.data.data;
            let DiseaseType = this.Group.DiseaseType;
            DiseaseType.nums = 0;
            DiseaseType.Datas = data.data;
            //判断是否返回有内容
            //console.log(response)
            if (data.data) {
              //当存在内容 则激活三个按钮
              this.Group.DiseaseType.ifNull = false;
              //当此属性下有分类时，属性列表删除按钮无效
              this.Group.tactics.delete.ifdelete = false;
              //赋值
              DiseaseType.value = DiseaseType.Datas[0].label;
              DiseaseType.nums = data.total;
              this.$options.methods.DiseaseTypeValue.bind(this)(
                DiseaseType.value
              );
            } else {
              //当此属性下无分类时，属性列表删除按钮有效
              this.Group.tactics.delete.ifdelete = true;

              let table = this.table;
              table.columns = [];
              table.data = [];
              this.$Message.info("本属性中，暂未拥有分类");
            }
            //  console.log(this.Group.tactics.delete.ifdelete)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //添加属性
    strategyInput() {
      this.Group.tactics.add.value == ""
        ? (this.Group.tactics.error = true)
        : (this.Group.tactics.error = false);
    },
    addTactics() {
      this.Group.tactics.add.ifshow = true;
      this.Group.tactics.add.value = "";
      this.Group.tactics.error = false;
      this.Group.tactics.loading1 = true;
    },
    //确定
    addTacticsOk() {
      let url;
      let label;
      if (this.Group.tactics.Alters.ifshow) {
        url = this.HOST + "/api/admin/vip/onemodifylabel";
        label = {
          id: this.Group.tactics.id,
          label: this.Group.tactics.add.value
        };
      } else {
        url = this.HOST + "/api/admin/vip/oneadd";
        label = {
          label: this.Group.tactics.add.value
        };
      }
      if (label.label == "") {
        //验证不能为空
        this.Group.tactics.error = true;
        setTimeout(() => {
          this.Group.tactics.loading1 = false;
          this.$nextTick(() => {
            this.Group.tactics.loading1 = true;
          });
        }, 1000);
      } else {
        //通过验证
        axios
          .post(url, label)
          .then(response => {
            //判断是否是正常状态
            console.log(response);
            if (response.status == 200 && response.data.error == 1) {
              //console.log(response.data)
              this.Group.tactics.loading1 = false;
              this.Group.tactics.add.ifshow = false;
              this.$options.methods.GetTactics.bind(this)();
              this.$Message.info("添加属性成功");
              this.Group.tactics.Alters.ifshow = false;
            } else {
              this.Group.tactics.add.ifshow == true;
              this.$Message.info(response.data.msg);
              setTimeout(() => {
                this.Group.tactics.loading1 = false;
                this.$nextTick(() => {
                  this.Group.tactics.loading1 = true;
                });
              }, 1000);
              // console.log(this.Group.tactics.add.ifshow)
              // console.log(this.Group.tactics.loading1)
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //取消
    addTacticscancel() {},
    //点击修改属性名
    AltersTactics() {
      this.Group.tactics.add.value = this.Group.tactics.value;
      this.Group.tactics.Alters.ifshow = true;
      this.Group.tactics.add.ifshow = true;
    },
    //删除属性
    DeleteTactics() {
      let tactics = this.Group.tactics;
      let id;
      tactics.Datas.forEach((value, index) => {
        if (tactics.value == value.label) {
          id = value.id;
        }
      });
      let url = this.HOST + "/api/admin/vip/oneremove";
      let ids = {
        id: id
      };
      //console.log(this.Group.tactics.add.value)
      axios;
      axios
        .post(url, ids)
        .then(response => {
          //判断是否是正常状态
          if (response.status == 200 && response.data.error == 1) {
            //console.log(response.data)
            this.$options.methods.GetTactics.bind(this)();
            this.$Message.success("删除成功");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //当分类筛选框发生变动时候执行
    DiseaseTypeValue(val) {
      let table = this.table;
      table.columns = [];
      table.data = [];
      this.Group.DiseaseType.delete.ifdelete = true;
      //筛选出选中值与tacticsDatas中匹配的值
      let DiseaseType = this.Group.DiseaseType;
      DiseaseType.value = val;

      DiseaseType.Datas.forEach((value, index) => {
        if (val == value.label) {
          DiseaseType.id = value.id;
        }
      });
      //获取分组
      this.$options.methods.GetGroup.bind(this)();
    },
    //添加分类
    DiseaseTypeAdd() {
      this.Group.DiseaseType.add.ifshow = true;
      this.Group.DiseaseType.add.value = "";
      this.Group.DiseaseType.error = false;
      this.Group.DiseaseType.loading2 = true;
    },
    diseaseInput() {
      this.Group.DiseaseType.add.value == ""
        ? (this.Group.DiseaseType.error = true)
        : (this.Group.DiseaseType.error = false);
    },
    //确定
    DiseaseTypeAddOK() {
      //console.log(this.Group.tactics.id )
      let url;
      let row;
      if (this.Group.DiseaseType.Alters.ifshow) {
        url = this.HOST + "/api/admin/vip/twomodifylabel";
        row = {
          id: this.Group.DiseaseType.id,
          label: this.Group.DiseaseType.add.value
        };
      } else {
        url = this.HOST + "/api/admin/vip/twoadd";
        row = {
          oi: this.Group.tactics.id,
          label: this.Group.DiseaseType.add.value
        };
      }
      if (this.Group.DiseaseType.add.value == "") {
        this.Group.DiseaseType.error = true;
        setTimeout(() => {
          this.Group.DiseaseType.loading2 = false;
          this.$nextTick(() => {
            this.Group.DiseaseType.loading2 = true;
          });
        }, 1000);
      } else {
        axios
          .post(url, row)
          .then(response => {
            //判断是否是正常状态
            if (response.status == 200) {
              if (response.data.error == 1) {
                //console.log(this.Group.tactics.value)
                this.Group.DiseaseType.loading2 = false;
                this.Group.DiseaseType.add.ifshow = false;
                this.$options.methods.TacticsValue.bind(this)(
                  this.Group.tactics.value
                );
                this.$Message.success("添加分类成功");
                this.Group.DiseaseType.Alters.ifshow = false;
              } else {
                this.$Message.info(response.data.msg)
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      // console.log(row)
    },
    //取消
    DiseaseTypeAddcancel() {},
    //修改
    AltersDisease() {
      this.Group.DiseaseType.add.value = this.Group.DiseaseType.value;
      this.Group.DiseaseType.Alters.ifshow = true;
      this.Group.DiseaseType.add.ifshow = true;
    },
    //删除分类
    DiseaseTypeDelete() {
      let DiseaseType = this.Group.DiseaseType;
      let id;
      DiseaseType.Datas.forEach((value, index) => {
        if (DiseaseType.value == value.label) {
          id = value.id;
        }
      });
      let url = this.HOST + "/api/admin/vip/tworemove";
      let ids = {
        id: id
      };
      axios
        .post(url, ids)
        .then(response => {
          //判断是否是正常状态
          if (response.status == 200 && response.data.error == 1) {
            this.$options.methods.TacticsValue.bind(this)(
              this.Group.tactics.value
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //分页
    page(val) {
      //console.log(val)
      this.table.currentpage = val;
      this.$options.methods.GetGroup.bind(this)(val);
      // this.table.pageSizeval = false
    },
    pageSize(val) {
      // this.table.pageSizeval = true
      // this.$options.methods.filteraxios.bind(this)(val)
    },
    //分组请求
    GetGroup(val) {
      let DiseaseType = this.Group.DiseaseType;

      let url;
      if (val) {
        url =
          this.HOST +
          "/api/admin/vip/threelist?oi=" +
          DiseaseType.id +
          "&p=" +
          val;
      } else {
        this.table.currentpage = 1;
        this.table.total = 0;

        url =
          this.HOST + "/api/admin/vip/threelist?oi=" + DiseaseType.id + "&p=1";
      }
      // console.log(this.table.currentpage)
      console.log(url);
      axios
        .get(url)
        .then(response => {
          //console.log(response)
          //判断是否是正常状态
          if (
            response.status == 200 &&
            response.data.error == 1 &&
            response.data.data.data
          ) {
            this.tabelShow = true;
            let data = response.data.data;
            //筛选出分组
            if (data.total) {
              //当此分类下有分组时，分类删除按钮无效
              this.Group.DiseaseType.delete.ifdelete = false;
              //
              if (!val) {
                this.table.total = data.total;
              }

              this.$options.methods.TableVoluation.bind(this)(data);
              this.$Message.success("筛选成功");
            } else {
              this.$Message.info("本分类，暂未拥有分组");
            }
            //console.log(data)
          } else {
            this.tabelShow = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //表单展示
    TableVoluation(val) {
      let table = this.table;
      if (val.total) {
        if (table.columns.length == 0) {
          let aa = [
            {
              title: "序列号",
              type: "index",
              width: 80,
              align: "center"
            },
            {
              title: "分组名",
              key: "label",

              align: "center"
              //ellipsis: true,
              //width: 60,
            },
            {
              title: "评分",
              width: 100,
              key: "score",
              align: "center"
            },
            {
              title: "操作",
              key: "age",
              align: "center",

              render: (h, params) => {
                const row = params.row;
                // console.log(row)
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "success",
                        size: "small"
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
          ];
          table.columns = aa;
          table.data = val.data;
          // console.log(table.data)
        } else {
        }
      }
    },
    //表单中的修改
    TableReviseName(row) {
      this.table.modal = true;
      this.table.params = row;
      this.table.value1 = row.label;
      this.table.value3 = parseInt(row.score);
      // console.log(JSON.stringify(this.table.value3))
      //console.log(row)
    },
    //
    TableGrade($event) {
      this.table.value1;
    },
    //点击表单修改弹出框的确定与取消
    ok(name) {
      // if (this.table.value1 && this.table.value2) {
      this.$refs[name].validate(valid => {
        // console.log(valid);
        if (valid) {
          let aa = {
            id: this.table.params.id,
            label: this.table.value1,
            score: parseInt(this.table.value3)
          };
          //console.log(aa)
          let url = this.HOST + "/api/admin/vip/threemodify";
          axios
            .post(url, aa)
            .then(response => {
              //console.log(response);
              //判断是否是正常状态
              if (response.status == 200 && response.data.error == 1) {
                this.$Message.success("修改成功");
                this.table.modal = false;
                this.$options.methods.DiseaseTypeValue.bind(this)(
                  this.Group.DiseaseType.value
                );
              } else {
                this.table.modal == true;
                this.$Message.info(response.data.msg);
                setTimeout(() => {
                  this.table.loading3 = false;
                  this.$nextTick(() => {
                    this.table.loading3 = true;
                  });
                }, 1000);
              }
            })
            .catch(error => {
              // this.$Message.error("修改分组名失败");
            });
        } else {
          this.$Message.error("加载失败");
          setTimeout(() => {
            this.table.loading3 = false;
            this.$nextTick(() => {
              this.table.loading3 = true;
            });
          }, 1000);
        }
      });

      // }
      //this.$Message.info('Clicked ok')
    },
    cancel() {},
    //点击删除分组
    signRemove(val) {
      let id = {
        id: val.row.id
      };
      let url = this.HOST + "/api/admin/vip/threeremove";
      axios
        .post(url, id)
        .then(response => {
          //判断是否是正常状态
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.$Message.success(response.data.msg);
              this.$options.methods.DiseaseTypeValue.bind(this)(
                this.Group.DiseaseType.value
              );
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(response.msg);
          }
        })
        .catch(error => {
          // this.$Message.info(error.msg);
        });
    }
  }
};
</script>
