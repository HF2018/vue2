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
.sms_link li {
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
}
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

          <TabPane label="策略分类管理" name="name1">
            <div style="text-align:right;margin: 10px">
              <!-- <Input v-model="value4" icon="ios-search-strong" placeholder="Enter something..." style="width: 300px;"></Input> -->
            </div>
            <p style="border:1px solid green;"></p>
            <Row type="flex" justify="start" align="middle">
              <Col span="6">
              <h3 style="padding:10px 0px;">1、策略列表——总数：{{Group.tactics.nums}}</h3>
              </Col>
              <Col>
              </Col>
            </Row>
            <RadioGroup v-model="Group.tactics.value" type="button" @on-change="TacticsValue">
              <Radio :label="item.name" v-for="item in Group.tactics.Datas" :key="item.name"></Radio>
            </RadioGroup>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
              <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox :label="item.id" v-for="item in Group.tactics.Datas" :key="item.name">
                <span>{{item.name}}</span>
              </Checkbox>
            </CheckboxGroup>
            <Row type="flex" justify="start" align="middle">
              <Col span="6">
              <h3 style="padding:10px 0px;">2、策略下的分组——总数：{{Group.DiseaseType.nums}}</h3>
              </Col>
            </Row>
            <!-- 策略下的多选 -->
            <!-- <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
              <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox :label="item.id" v-for="item in Group.DiseaseType.Datas" :key="item.name">
                <span>{{item.name}}</span>
              </Checkbox>
            </CheckboxGroup> -->
            <p style="margin: 10px 0;text-align: right">
              <ul class="sms_link">
                <li>
                  <!-- <router-link to="/project/createPlans?ids  + checkAllGroup"> -->
                  <router-link :to="{path:'/project/createPlans', query:{ids:checkAllGroup}}">
                    创建营销方案
                  </router-link>
                </li>
              </ul>
            </p>
            <RadioGroup v-model="Group.DiseaseType.value" type="button" ref="selection" @on-change="DiseaseTypeValue">
              <Radio :label="item.name" v-for="item in Group.DiseaseType.Datas" :key="item.name"></Radio>
            </RadioGroup>
            <br>
            <div style="position:relative;margin:20px 0" v-if="tabelShow">
              <div class='notice_text'>
                <h2>你的营销目标：</h2>
              </div>
              <Table :columns="table.columns" :data="table.data" border></Table>
              <Page :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page" @on-page-size-change="pageSize"></Page>
              <Spin size="large" fix v-if="table.spinShow"></Spin>
              <Modal v-model="table.modal" title="修改分组" @on-ok="ok('table')" @on-cancel="cancel" :loading='table.loading3'>
                <Form ref="table" :model="table" :label-width="80" :rules="reviseValidate" enctype="multipart/form-data">
                  <FormItem label="分组名称：" prop="value1">
                    <Input v-model="table.value1" placeholder="请输入分组名称"></Input>
                  </FormItem>
                  <FormItem label="备注：" prop="value2">
                    <Input v-model="table.value2" placeholder="请输入内容" type="textarea" :rows="4" height="520"></Input>
                  </FormItem>
                </Form>
              </Modal>
            </div>
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
        params: "",
        loading3: true,
        total: 0,
        pageSizeval: false,
        currentpage: 1
      },
      //分组模板
      Group: {
        //营销策略
        tactics: {
          nums: 0,
          value: "", //选中
          Datas: [],
          ifNull: true //判断是否获取到内容
        },
        //疾病类型
        DiseaseType: {
          nums: 0,
          value: "",
          Datas: [],
          allvalue: [], //多选和全选
          ifNull: true //判断是否获取到内容
        }
      },
      indeterminate: true,
      checkAll: false,
      checkAllGroup: []
    };
  },
  created() {
    this.GetTactics();
    this.$Message.config({
      top: 50,
      duration: 3
    });
  },
  computed: {},
  // mounted() {},
  methods: {
    //...mapMutations(['getOne']),
    //首先获取策略列表和目标
    
    GetTactics() {
      let url = this.HOST + "/api/ploy";
      axios
        .get(url)
        .then(response => {
          console.log(response);
          //判断是否是正常状态  筛选出营销策略分类
          if (response.status == 200 && response.data.error == 1) {
            //当加载成功 则激活三个按钮
            //this.Group.tactics.ifNull = false
            // console.log(response)
            //判断是否有内容
            if (response.data.data.data) {            
              //设定默认选中值
              let tactics = this.Group.tactics;
              tactics.value = response.data.data.data[0].name;
              //tactics.id = response.data.data.data[0].id
              //赋值
              tactics.Datas = response.data.data.data;
              tactics.nums = response.data.data.total;
              //console.log(tactics.id)
              //筛选出筛选出营销策略分类
              this.$options.methods.TacticsValue.bind(this)(tactics.value);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //当营销策略选择框发生变动时
    TacticsValue(val) {
      let tactics = this.Group.tactics;
      let DiseaseType = this.Group.DiseaseType;
      let valueA;
      tactics.Datas.forEach((value, index) => {
        if (value.name == val) {
          valueA = value;
          //console.log(valueA)
          if (value.tarsets == null) {
            DiseaseType.ifNull = false;
          } else {
            DiseaseType.ifNull = true;
            this.$options.methods.pathemaClassify.bind(this)(valueA);
          }
        }
      });
    },

    //获取疾病种类
    pathemaClassify(valueA) {
      let tactics = this.Group.tactics;
      let DiseaseType = this.Group.DiseaseType;
      // console.log(valueA)
      DiseaseType.Datas = valueA.tarsets;
      DiseaseType.value = DiseaseType.Datas[0].name;
      DiseaseType.nums = valueA.tarsets.length;
      this.$options.methods.DiseaseTypeValue.bind(this)(DiseaseType.value);
    },
    //当病种筛选框发生变动时候
    DiseaseTypeValue(val) {
      // console.log(val)
      let table = this.table;
      table.columns = [];
      table.data = [];
      //筛选出选中值与tacticsDatas中匹配的值
      let DiseaseType = this.Group.DiseaseType;
      DiseaseType.value = val;

      DiseaseType.Datas.forEach((value, index) => {
        if (val == value.name) {
          //console.log(value)
          if (value.targets == null) {
            this.tabelShow = false;
            this.$Message.info("暂无数据");
          } else {
            this.tabelShow = true;
            this.$options.methods.GetGroup.bind(this)(value.targets);
          }
        }
      });

      //获取分组
    },

    //分页
    page(val) {
      this.table.currentpage = val;
      this.$options.methods.GetGroup.bind(this)(val);
    },
    pageSize(val) {
      // this.table.pageSizeval = true
      // this.$options.methods.filteraxios.bind(this)(val)
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
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      var clickId = [];
      this.Group.DiseaseType.Datas.forEach(val => {
        clickId.push(val.id);
      });
      if (this.checkAll) {
        this.checkAllGroup = clickId;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      console.log(data);
      this.checkAllGroup = data;
      if (data.length === this.Group.DiseaseType.Datas.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    //表单展现
    TableVoluation(val) {
      // console.log(val)
      let table = this.table;

      table.spinShow = true;
      if (table.columns.length == 0) {
        let aa = [
          // {
          //   title: '详情',
          //   type: 'expand',
          //   width: 60,
          //   render: (h, params) => {
          //     return h(expandRow, {
          //       props: {
          //         row: params.row
          //       }
          //     })
          //   }
          // },
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
        ];
        console.log(val);
        table.columns = aa;
        table.spinShow = false;
        table.data = val;
      } else {
        table.spinShow = false;
      }
    },
    //表单的删除按钮
    signRemove(val) {
      let id = {
        id: val.row.id
      };
      let url = this.HOST + "/api/admin/vip/targetremove";
      axios
        .post(url, id)
        .then(response => {
          //判断是否是正常状态
          if (response.status == 200 && response.data.error == 1) {
            this.$Message.success(response.data.msg);
            this.$options.methods.DiseaseTypeValue.bind(this)(
              this.Group.DiseaseType.value
            );
          }
        })
        .catch(error => {
          //this.$Message.error('删除失败')
        });
    },
    //表单中的修改(disabled)
    TableReviseName(row) {
      console.log(row);
      this.table.modal = true;
      this.table.params = row;
      this.table.value1 = row.label;
      this.table.value2 = row._rowKey;
    },
    // //点击表单修改弹出框的确定与取消
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>
