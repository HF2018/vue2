<template>
  <div>
    <headNav></headNav>
    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
  </div>
</template>
<script>
import headNav from "./headNav.vue";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  components: { headNav },
  data() {
    return {
      allPro: [] //得到的数据分类
      // onelabel: [1, 2, 3, 4] //会员满意度的标签
    };
  },
  created() {
    this.getClasslist(); //获得计算指标的分类
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      var option = {
        title: {
          text: "会员满意度",
          subtext: "真实数据",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["西凉", "益州", "兖州", "荆州", "幽州"]
          // data: "onelabel"
          // //   formatter(params) {
          // //       console.log(params)
          // //   }
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "幽州",
                label: {
                  normal: {
                    formatter: [
                      "{title|{b}}{abg|}",
                      "  {weatherHead|天气}{valueHead|天数}{rateHead|占比}",
                      "{hr|}",
                      "  {Sunny|}{value|202}{rate|55.3%}",
                      "  {Cloudy|}{value|142}{rate|38.9%}",
                      "  {Showers|}{value|21}{rate|5.8%}"
                    ].join("\n"),
                    backgroundColor: "#eee",
                    borderColor: "#777",
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      title: {
                        color: "#eee",
                        align: "center"
                      },
                      abg: {
                        backgroundColor: "#333",
                        width: "100%",
                        align: "right",
                        height: 25,
                        borderRadius: [4, 4, 0, 0]
                      },
                      Sunny: {
                        height: 30,
                        align: "left",
                        backgroundColor: {
                          // image: weatherIcons.Sunny
                        }
                      },
                      Cloudy: {
                        height: 30,
                        align: "left",
                        backgroundColor: {
                          // image: weatherIcons.Cloudy
                        }
                      },
                      Showers: {
                        height: 30,
                        align: "left",
                        backgroundColor: {
                          // image: weatherIcons.Showers
                        }
                      },
                      weatherHead: {
                        color: "#333",
                        height: 24,
                        align: "left"
                      },
                      hr: {
                        borderColor: "#777",
                        width: "100%",
                        borderWidth: 0.5,
                        height: 0
                      },
                      value: {
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "left"
                      },
                      valueHead: {
                        color: "#333",
                        width: 20,
                        padding: [0, 20, 0, 30],
                        align: "center"
                      },
                      rate: {
                        width: 40,
                        align: "right",
                        padding: [0, 10, 0, 0]
                      },
                      rateHead: {
                        color: "#333",
                        width: 40,
                        align: "center",
                        padding: [0, 10, 0, 0]
                      }
                    }
                  }
                }
              },
              { value: 535, name: "荆州" },
              { value: 510, name: "兖州" },
              { value: 634, name: "益州" },
              { value: 735, name: "西凉" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      if (this.allPro.length != 0) {
        myChart.setOption(option);
      }
    },
    getClasslist() {
      var a = this.HOST + "/api/normtype";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);

          if (response.status == 200) {
            if (response.data.error == 1) {
              //   this.allPro = null;
              if (response.data.data.data != null) {
                this.allPro = response.data.data.data;
                var ww = [];
                this.allPro.forEach(val => {
                  ww.push(343);
                });
                // ww.forEach(val=>{
                //     this.onelabel.push(val)
                // })
                // this.onelabel = ww
                console.log(this.onelabel);
                // var ee = {
                //     label:this.allPro.label,
                //     ids: this.allPro.ids,
                //     id: this.allPro.id,
                //     child: this.allPro.child
                // }
                //  console.log(ee)
                // ee.child.forEach(val => {
                //     console.log(val.expression.join())
                //     // val.result = eval(val.expression.join().replace(/,/g, ""));
                // });
                // console.log(ee);
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
            console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            alert("服务器无响应");
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            // alert("发送请求出错");
          }
          // console.log(error.config);
        });
    }
  }
};
</script>
