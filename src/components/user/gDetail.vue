<template>
  <div>
    <Tabs value="name1" type="card">
        
        <TabPane label="价格驱动" name="name1">
          <div style="text-align:right;margin: 10px">
            <Input v-model="value4" icon="ios-search-strong" placeholder="Enter something..." style="width: 300px;"></Input>
          </div>
           <Table :columns="columns2" :data="data1" border ></Table>
        </TabPane>
        <!-- <TabPane label="专业驱动" name="name2">
          <div style="text-align:right;margin: 10px">
            <Input v-model="value4" icon="ios-search-strong" placeholder="Enter something..." style="width: 300px;"></Input>
          </div>
           <Table :columns="columns2" :data="data2" border ></Table>
        </TabPane> -->
    </Tabs>
    <router-view></router-view>
  </div>
</template>
<style>

</style>
<script>
// import './css/GroupedIndex.css'
// import axios from 'axios'
// import store from '@/vuex/store'

export default {
  data() {
    return {
      value4:'',
      columns2: [
          {
          title: "驱动类型",
          key: "q_type",
          width: 100
        },
        {
          title: "营销类型",
          key: "m_type",
          width: 100
        },
         {
          title: "疾病类型",
          key: "sick_type",
          width: 100
        },
        {
          title: "名称",
          key: "name",
          width: 100
        },

        {
          title: "备注",
          key: "address"
        },
        {
          title: "操作",
          key: "age",
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              //  h(
              //   "router-link",
              //   {
              //     props: {
              //       to: "/user/gList/gDetail/"+ params.index
              //       // v-model: 'Modal1',
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         // this.editSign(params.index);
              //         // this.modal1 = true;
              //       }
              //     }
              //   },
              //   "了解详情"
              // ),
              // h(
              //   "router-link",
              //   {
              //     props: {
              //       to: "/user/cGroup/fastSearch"
              //       // v-model: 'Modal1',
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         // this.editSign(params.index);
              //         // this.modal1 = true;
              //       }
              //     }
              //   },
              //   "添加条件"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.handleRender(params.index);
                    }
                  }
                },
                "修改"
              ),
              //  h(
              //   "router-link",
              //   {
              //     props: {
              //        to: "/market/sms/sendSms"
              //     },
              //      style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         // this.signRemove(params.index);
              //       }
              //     }
              //   },
              //   "会员维系"
              // ),
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
              ),
               h(
                "Icon",
                {
                  props: {
                    type: "ios-download-outline",
                    size: "large"
                  },
                  style: {
                    fontSize: "25px",
                     marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      // this.signRemove(params.index);
                    }
                  }
                },
                "导出数据"
              ),
              //  h(
              //   "router-link",
              //   {
              //     props: {
              //        to: "/user/gList/mPlans/"+ params.index
              //     },
              //      style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         // this.signRemove(params.index);
              //       }
              //     }
              //   },
              //   "营销方案"
              // ),
            ]);
          }
        }
      ],
      data1: [
        {
          m_type:'赢回',
          sick_type:'HP慢性病',
          q_type:'价格驱动',
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
           m_type:'赢回',
          sick_type:'HP慢性病',
            q_type:'价格驱动',
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
           m_type:'赢回',
          sick_type:'HP慢性病',
            q_type:'价格驱动',
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
           m_type:'赢回',
          sick_type:'HP慢性病',
            q_type:'价格驱动',
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
       data2: [
        {
          m_type:'赢回',
          sick_type:'HP慢性病',
          q_type:'专业驱动',
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
           m_type:'赢回',
          sick_type:'HP慢性病',
            q_type:'专业驱动',
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
           m_type:'赢回',
          sick_type:'HP慢性病',
            q_type:'专业驱动',
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
           m_type:'赢回',
          sick_type:'HP慢性病',
            q_type:'专业驱动',
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    handleRender () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h("div", [
            h(
              "Input",
              {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: '请输入你的分组名称'
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    // this.editSign(params.index);
                    // this.modal1 = true;
                  }
                }
              },
              "重新搜索"
            ),
            h(
              "Input",
              {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: '请输入备注',
                  type:"textarea"
                },
                style: {
                  marginTop: "5px"
                },
                on: {
                  click: () => {
                    // this.editSign(params.index);
                    // this.modal1 = true;
                  }
                }
              },
              "重新搜索"
            ),
          ]);
                    }
                })
            }
  }
};
</script>
