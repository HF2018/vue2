<template>
  <div>
    <h2>分组列表选择</h2>
    <span>
      <Button type="ghost">一组</Button>
    </span>
    <span>
      <Button type="ghost">二组</Button>
    </span>
    <span>
      <Button type="ghost">二组</Button>
    </span>
    <span>
      <Button type="ghost">二组</Button>
    </span>
    <h2>筛选属性</h2>
    <div>消费属性:
      <span>
        <Button type="ghost">一组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
    </div>
    <div>销售属性:
      <span>
        <Button type="ghost">一组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
    </div>
    <div>商品属性:
      <span>
        <Button type="ghost">一组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
      <span>
        <Button type="ghost">二组</Button>
      </span>
    </div>
    <h2>筛选条件综合：</h2>
    <span>
      <Button type="ghost">一组</Button>
    </span>
    <span>
      <Button type="ghost">二组</Button>
    </span>
    <div style="text-align: center">
      <Button type="primary" size="large">筛选</Button>
      <Button type="primary" size="large">清空</Button>
    </div>
    <div>
      <Button type="primary" size="large" @click="handleRender">保存分组</Button>
      <Table :columns="columns1" :data="data1"></Table>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      value: "",
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
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
  },
  methods: {
    handleRender() {
      this.$Modal.confirm({
        render: h => {
          // return h('Input', {
          //     props: {
          //         value: this.value,
          //         autofocus: true,
          //         placeholder: '请输入你的分组名称'
          //     },
          //     on: {
          //         input: (val) => {
          //             this.value = val;
          //         }
          //     }
          // }, ['p','ddd'
          //        ]
          // )

          return h("div", [
            h("Input", {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: "请输入你的分组名称"
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
            }),
            h("Input", {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: "请输入营销类型"
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
            }),
            h("Input", {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: "请输入疾病类型"
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
            }),
            h(
              "Input",
              {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: "请输入备注",
                  type: "textarea"
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
            )
          ]);
        }
      });
    }
  }
};
</script>
