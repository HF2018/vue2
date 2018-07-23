<template>
  <div>
    <Tabs value="name1">
        <TabPane label="公有分组模板" name="name1">
          <Table :columns="columns1" :data="data1" border ></Table>
        </TabPane>
        <TabPane label="我的分组" name="name2">标签二的内容</TabPane>
        <TabPane label="定制模板" name="name3">标签三的内容</TabPane>
    </Tabs>
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
      columns1: [
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
                      // this.editSign(params.index);
                      // this.modal1 = true;
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
                      // this.signRemove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  }
};
</script>
