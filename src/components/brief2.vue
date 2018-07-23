<template>
    <div>
        <Spin v-if="allPro.length == 0"></Spin>
        <div :style="{padding: '24px',height: '100%', background: '#fff',fontSize: '14px',color: '#495060',width: '80%',margin:'0 auto'}">  
            <div id="myChart" style="width:80vw;margin:0 auto;">
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="7" v-for="(item,index) in allPro" :key="index" style="text-align:center;background:#EECFA1;height:200px;margin:10px 10px;">
                    <div @click="aa(item,index)">
                        <h2 style="padding-top:80px;">{{item.label}}</h2>
                        <h6>{{item.label}}</h6>
                    </div>

                    </Col>
                </Row>
            </div>
        </div>

    </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  //   components: { headNav },
  data() {
    return {
      allPro: [], //得到的数据分类
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },
      systems: [{ h2: "", h6: "" }],
      params: {
        titles: [],
        datas: []
      }
    };
  },
  created() {
    this.getClasslist(); //获得计算指标的分类
  },
  mounted() {},
  methods: {
    getClasslist() {
      var a = this.HOST + "/api/normtype";
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              // let num = eval(value.expression.join().replace(/,/g, ''))
              if (response.data.data.data != null) {
                this.allPro = response.data.data.data;
                console.log(this.allPro);
              }
            } else {
              this.$Message.info("大分类中暂无数据");
            }
          } else {
            this.$Message.info(response.data.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.data.error == 3) {
              alert("客户端出错");
            }
          } else if (error.request) {
            alert("服务器无响应");
          } else {
          }
        });
    },
    aa(item, index) {
      if (item.child == null) {
        this.$Message.info("暂无数据");
      } else {
        this.$router.push({
          name: "charts",
          params: { params: item, index: index }
        });
      }
    }
  }
};
</script>
