<style scoped>
li {
  list-style: none;
}
</style>

<template>
  <div>
    <!-- <headNav></headNav> -->
    <div style="width:80vw;margin:0 auto;background:#fff;">
      <div style="width:100%;height:100%;" v-if="$route.params.index == 0">
        <Select v-model="choosedStore" style="width:200px;margin:10px 0;" filterable>
          <Option v-for="(item,index) in allStore" :value="item" :key="index">{{ item }}</Option>
        </Select>
        <Button type="primary" @click="getFormula(choosedStore)">查看</Button>
        <div style="position:relative">
          <div name="myChart1" style="width: 100%;height: 500px;border:1px solid orange;">暂无数据</div>
          <Spin size="large" fix v-if="hasShow"></Spin>
        </div>
      </div>

      <div style="width:80vw;" v-if="$route.params.index == 2">
        <Select v-model="choosedStore" style="width:200px;margin:10px 0;" filterable>
          <Option v-for="(item,index) in allStore" :value="item" :key="index">{{ item }}</Option>
        </Select>
        <Button type="primary" @click="getFormula(choosedStore)">查看</Button>
        <div style="position:relative;width:80vw;display: flex;flex-wrap:wrap ">
          <!-- <div name="myChart2_2" style="width:80vw;height:400px;">aaaa</div> -->
          <div v-for="(itemA,indexA) in this.index3_1" :value="itemA" :key="indexA" style="width:36vw;margin-top:5%;">
            <div name="myChart2_1" style="height:400px;">暂无数据</div>
            <div style="width:260px;margin:0 auto;">
              <li v-for="(item,index) in itemA.title" :value="item" :key="index">
                <p> {{item.name}}: {{itemA.data[index]}}</p>
                <Progress :percent="itemA.percent[index]"></Progress>
              </li>
            </div>
          </div>
          <Spin size="large" fix v-if="hasShow"></Spin>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
// import headNav from './headNav.vue'

export default {
  // components: { headNav },
  data() {
    return {
      index1_params: '',
      index1: [{ dataA: [], titleA: [], dataB: [], titleB: [] }],
      index3_1: [
        { data: [], title: [], percent: [] },
        { data: [], title: [], percent: [] },
        { data: [], title: [], percent: [] }
      ],
      index3_2: [{ dataA: [], titleA: [], dataB: [], titleB: [] }],
      label: '',
      indexNum: '',
      //门店的选择
      choosedStore: '',
      allStore: [],
      allformulas: [],
      hasShow: true,

      allStrings: [], //可以计算数量的字段
      wholeResult: [] //所有总的计算信息（总消费金额，总人数，总客单价，总客单价）
    }
  },
  created() {
    this.getStore()
    //this.$route.params.index == 0 ? '' : this.getList()//获得总人数，总消费数，总购买次数
  },
  mounted() {},
  methods: {
    get_echarts_datas() {
      let params = this.$route.params.params
      //console.log(this.allformulas)

      if (this.$route.params.index == 0) {
        this.label = params.label
        this.allformulas.forEach(value => {
          if (
            value.label.indexOf('率') != -1 ||
            value.label.indexOf('占比') != -1 ||
            value.label.indexOf('度') != -1
          ) {
            this.index1[0].titleB.push(value.label)
            let num = eval(value.expression.join().replace(/,/g, ''))
              .toString()
              .slice(0, 6)
            this.index1[0].dataB.push((num * 100).toFixed(2))
          } else {
            this.index1[0].titleA.push(value.label)
            let num = eval(value.expression.join().replace(/,/g, ''))
              .toString()
              .slice(0, 6)
            this.index1[0].dataA.push(num)
          }
        })
        this.$options.methods.index1_echarts.bind(this)()
        // console.log('ccc')
      } else if (this.$route.params.index == 2) {
        this.label = params.label
        this.allformulas.forEach(value => {
          let num = eval(value.expression.join().replace(/,/g, ''))
            .toString()
            .slice(0, 6)
          if (value.label.indexOf('重要') != -1) {
            if (value.label.indexOf('价值') != -1) {
              let aa = { name: value.label }
              // let percent
              this.index3_1[0].title.push(aa)
              this.index3_1[0].data.push(num)

              if (value.label.indexOf('人数') != -1) {
                this.wholeResult.forEach(val => {
                  if (val.name == 'total_vips') {
                    let percent = num / val.result * 100
                    this.index3_1[0].percent.push(
                      parseFloat(percent.toFixed(2))
                    )
                  }
                })
              } else if (value.label.indexOf('金额') != -1) {
                this.wholeResult.forEach(val => {
                  if (val.name == 'total_rmb') {
                    let percent = num / val.result * 100
                    this.index3_1[0].percent.push(
                      parseFloat(percent.toFixed(2))
                    )
                  }
                })
              } else if (value.label.indexOf('次数') != -1) {
                this.wholeResult.forEach(val => {
                  if (val.name == 'total_times') {
                    let percent = num / val.result * 100
                    this.index3_1[0].percent.push(
                      parseFloat(percent.toFixed(2))
                    )
                  }
                })
              }

              // console.log(percent)
            } else if (value.label.indexOf('保持') != -1) {
              let aa = { name: value.label }
              this.index3_1[1].title.push(aa)
              this.index3_1[1].data.push(num)
              if (value.label.indexOf('人数') != -1) {
                this.wholeResult.forEach(val => {
                  if (val.name == 'total_vips') {
                    let percent = num / val.result * 100
                    this.index3_1[1].percent.push(
                      parseFloat(percent.toFixed(2))
                    )
                  }
                })
              } else if (value.label.indexOf('金额') != -1) {
                this.wholeResult.forEach(val => {
                  if (val.name == 'total_rmb') {
                    let percent = num / val.result * 100
                    this.index3_1[1].percent.push(
                      parseFloat(percent.toFixed(2))
                    )
                  }
                })
              } else if (value.label.indexOf('次数') != -1) {
                this.wholeResult.forEach(val => {
                  if (val.name == 'total_times') {
                    let percent = num / val.result * 100
                    this.index3_1[1].percent.push(
                      parseFloat(percent.toFixed(2))
                    )
                  }
                })
              }
            }
          } else if (value.label.indexOf('次要') != -1) {
            let aa = { name: value.label }
            this.index3_1[2].title.push(aa)
            this.index3_1[2].data.push(num)
            if (value.label.indexOf('人数') != -1) {
              this.wholeResult.forEach(val => {
                if (val.name == 'total_vips') {
                  let percent = num / val.result * 100
                  this.index3_1[2].percent.push(parseFloat(percent.toFixed(2)))
                }
              })
            } else if (value.label.indexOf('金额') != -1) {
              this.wholeResult.forEach(val => {
                if (val.name == 'total_rmb') {
                  let percent = num / val.result * 100
                  this.index3_1[2].percent.push(parseFloat(percent.toFixed(2)))
                }
              })
            } else if (value.label.indexOf('次数') != -1) {
              this.wholeResult.forEach(val => {
                if (val.name == 'total_times') {
                  let percent = num / val.result * 100
                  this.index3_1[2].percent.push(parseFloat(percent.toFixed(2)))
                }
              })
            }
          } else if (value.label.indexOf('占比') != -1) {
            this.index3_2[0].titleA.push(value.label)
            this.index3_2[0].dataA.push((num * 100).toFixed(2))
          } else {
            this.index3_2[0].titleB.push(value.label)
            this.index3_2[0].dataB.push(num)
          }
        })
        // let datas = this.index3_1
        // datas.forEach((val,index)=>{
        //   let max2 = val.data.sort(function(a, b) {
        //   return b - a
        //   })[0]
        //   console.log(max2)
        // })
        this.index3_1.forEach((value, index) => {
          var max = Math.max.apply(null, value.data)
          value.title.forEach((val, index) => {
            val.max = max
          })
        })

        //console.log(this.index3_1[0].data.sort().reverse()[0])
        // this.index3_1.forEach((value,index)=>{
        //   value.title.forEach((val,index)=>{
        //     val.max =  value.data.sort().reverse()[0]
        //   })
        // })
        //console.log(this.index3_1)
        this.$options.methods.index3_echarts.bind(this)()
      }
    },
    index1_echarts() {
      let pa = function(params) {
        var newParamsName = '' // 最终拼接成的字符串
        var paramsNameNumber = params.length // 实际标签的个数
        var provideNumber = 5 // 每行能显示的字的个数
        var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
        /**
         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
         */
        // 条件等同于rowNumber>1
        if (paramsNameNumber > provideNumber) {
          /** 循环每一行,p表示行 */
          for (var p = 0; p < rowNumber; p++) {
            var tempStr = '' // 表示每一次截取的字符串
            var start = p * provideNumber // 开始截取的位置
            var end = start + provideNumber // 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p == rowNumber - 1) {
              // 最后一次不换行
              tempStr = params.substring(start, paramsNameNumber)
            } else {
              // 每一次拼接字符串并换行
              tempStr = params.substring(start, end) + '\n'
            }
            newParamsName += tempStr // 最终拼成的字符串
          }
        } else {
          // 将旧标签的值赋给新标签
          newParamsName = params
        }
        //将最终的字符串返回
        return newParamsName
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementsByName('myChart1')[0]
      )
      let x1_datas = this.index1[0].titleA
      let x2_datas = this.index1[0].titleB
      let y1_datas = this.index1[0].dataA
      let y2_datas = this.index1[0].dataB
      // 绘制图表
      myChart.setOption({
        title: {
          show: true,
          text: this.label,
          left: '10',
          padding: [15, 0]
        },
        grid: {
          // height: '400',
          // width: '300',
          y: 100,
          y2: 130
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        },
        //提示框
        tooltip: {
          show: true,
          formatter: '{b}:{c}',
          trigger: 'item'
        },
        legend: {
          show: 'false'
          //data: ['正常值']
        },
        //坐标轴指示器
        axisPointer: {
          show: false
        },
        xAxis: [
          {
            name: 'x',
            type: 'category',
            data: x1_datas,
            nameTextStyle: {
              color: '#CD00CD',
              fontSize: '22'
            },
            axisLine: {
              lineStyle: {
                color: '#CD00CD'
              }
            },
            // axisLabel:{
            //   color:'blue'
            // },
            // axisLine: {
            //   symbol:['none', 'arrow']
            // }

            position: 'bottom',
            //offset: '30',
            //splitNumber: 2,
            axisLabel: {
              //formatter: pa
              rotate: '30'
            },
            nameGap: 50,
            nameRotate: -30
          },
          {
            type: 'category',
            data: x2_datas,
            nameTextStyle: {
              color: 'black',
              fontSize: '22'
            },
            position: 'top',
            // offset:'10',//x轴 偏移
            //splitNumber: 2,
            axisLabel: {
              //formatter: pa
              rotate: '30'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'y1',
            axisLine: {
              lineStyle: {
                color: '#CD00CD'
              }
            },
            //interval: 0.1,
            axisLabel: {
              formatter: '{value} '
            },
            nameTextStyle: {
              color: '#CD00CD',
              fontSize: '22'
            },
            nameRotate: -30
          },
          {
            type: 'value',
            name: 'y2',
            //interval: 0.1,
            axisLabel: {
              formatter: '{value}% '
            },
            nameTextStyle: {
              color: 'black',
              fontSize: '22'
            },
            nameRotate: -30
          }
        ],
        series: [
          {
            //name: '正常值',
            type: 'line',
            lineStyle: {
              color: '#CD00CD'
            },
            data: y1_datas,
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true //线条是否平滑
          },
          {
            //name: '正常值',
            type: 'line',
            data: y2_datas,
            tooltip: {
              formatter: '{b}:{c}%'
            },
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1
          }
        ]
      })
      this.hasShow = false
    },
    index3_echarts() {
      // 基于准备好的dom，初始化echarts实例
      for (let i = 0; i < this.index3_1.length; i++) {
        let myChart2_1 = this.$echarts.init(
          document.getElementsByName('myChart2_1')[i]
        )
        let colors = ['#FDCEB3', '#BAC9FF', '#B8EED0']
        let bb = { value: this.index3_1[i].data }
        let option = {
          title: {
            text: null
          },
          grid: {},
          tooltip: {
            show: true
          },
          legend: { enabled: false },
          //backgroundColor: '#161627',
          radar: {
            nameGap: 15, //距离
            radius: 80, //大小
            //  name:{
            //   lineHeight:5
            //  },
            shape: 'circle',
            //分为几个圈显示
            //splitNumber: 10,
            indicator: this.index3_1[i].title,
            name: {
              textStyle: {
                color: '#333'
              }
            },
            //圈与圈的内容展示
            splitArea: {
              show: false
            },
            //圈的线条
            splitLine: {
              lineStyle: {
                color: [colors[i]]
              }
            },
            //外接线
            axisLine: {
              lineStyle: {
                color: colors[i]
              }
            }
          },
          series: [
            {
              name: '',
              type: 'radar',
              data: [bb],
              symbolSize: 3,
              symbol: 'circle',
              //填充色
              areaStyle: {
                normal: {
                  color: colors[i],
                  opacity: 0.4
                }
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: colors[i],
                  opacity: 0.8
                }
              },
              //拐点样式
              itemStyle: {
                normal: {
                  color: colors[i]
                }
              },
              label: {
                show: false,
                formatter: '{c}'
              }
            }
          ]
        }
        // 绘制图表
        myChart2_1.setOption(option)
        //myChart2_2.setOption(option)
      }

      let i = 0
      let x1_datas = this.index3_2[i].titleA
      let x2_datas = this.index3_2[i].titleB
      let y1_datas = this.index3_2[i].dataA
      let y2_datas = this.index3_2[i].dataB
      let myChart2_2 = this.$echarts.init(
        document.getElementsByName('myChart2_2')[0]
      )
      let option = {
        // 标题
        title: {
          // text: 'Bar',
          // top: 50,
          // backgroundColor: 'orange'
        },
        //全局字体样式
        textStyle: {},
        // 工具箱
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          },
          right: 50
        },
        // 图例
        legend: {
          //data: ['销量', '销量2']
        },
        //直角坐标系内绘图网格 可以设置多个直角坐标系
        grid: {
          containLabel: true
        },
        //提示框
        tooltip: {
          show: true,
          formatter: '{b}:{c}',
          trigger: 'item'
        },
        //坐标轴指示器
        axisPointer: {
          show: false
        },
        // x轴
        xAxis: [
          {
            // name: 'x',
            type: 'category',
            data: x2_datas
            // nameTextStyle: {
            //   color: 'red',
            //   fontSize: '22'
            // },
            //position: 'bottom',
            //offset: '30',
            //splitNumber: 2,
            // axisLabel: {
            //   //formatter: pa
            //   rotate: '30'
            // }
          },
          {
            // name: 'x',
            type: 'category',
            data: x1_datas
            // nameTextStyle: {
            //   color: 'red',
            //   fontSize: '22'
            // },
            //position: 'bottom',
            //offset: '30',
            //splitNumber: 2,
            // axisLabel: {
            //   //formatter: pa
            //   rotate: '30'
            // }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'y1',

            //interval: 0.1,
            axisLabel: {
              formatter: '{value} '
            },
            nameTextStyle: {
              color: 'red',
              fontSize: '22'
            }
          },
          {
            type: 'value',
            name: 'y2',
            max: 100,
            //interval: 0.1,
            axisLabel: {
              formatter: '{value}% '
            },
            nameTextStyle: {
              color: 'red',
              fontSize: '22'
            }
          }
        ],
        series: [
          {
            //name: '正常值',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: y2_datas,
            // barWidth: '30',
            // barGap: '10%',
            tooltip: {
              formatter: '{b}:{c}'
            },
            label: {
              show: true,
              position: 'top',
              distance: 10
            },
            itemStyle: {
              color: '#FF7F24'
            },
            smooth: true
            // markPoint:{
            //   symbol:'diamond',
            //   symbolSize:100,
            //   symbolOffset:[0, '50%'],
            //   itemStyle:{
            //     borderColor:'red'
            //   }
            // }
          },
          {
            //name: '正常值',
            type: 'line',
            // step: 'start',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: y1_datas,
            lineStyle: {
              color: '#FF6347'
            },
            tooltip: {
              formatter: '{b}:{c}%'
            },
            // label: {
            //   show: true,
            //   position: 'top',
            //    formatter:'{b} \n {c}',
            //   // offset:[10,-10],
            //   // rotate:'10'
            // },
            barWidth: '20',
            barGap: '30%',
            markLine: {
              silent: false
            }
          }
        ]
      }
      myChart2_2.setOption(option)
    },
    //得到门店列表
    getStore() {
      var a = this.HOST + '/api/store'
      this.$axios
        .get(a)
        .then(response => {
          // console.log(response)
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data != null) {
                this.allStore = response.data.data
                this.allStore.unshift('全部')

                this.choosedStore = this.allStore[0]

                this.$options.methods.getFormula.bind(this)()
              } else {
              }
            } else {
              this.$Message.info(response.data.msg)
            }
          } else {
            this.$Message.info(response.data.msg)
          }
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data)
          } else if (error.request) {
          } else {
          }
        })
    },
    //获得可以已经创建的计算指标
    getFormula() {
      this.hasShow = true
      var a
      if (this.choosedStore == this.allStore[0]) {
        a = this.HOST + '/api/formula?store=' + ''
      } else {
        a = this.HOST + '/api/formula?store=' + this.choosedStore
      }

      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data.data != null) {
                this.allformulas = response.data.data.data
                if (this.allformulas.expression != null) {
                  this.allformulas.forEach(val => {
                    if (
                      val.expression
                        .join()
                        .replace(/,/g, '')
                        .indexOf('100/100.0') != -1
                    ) {
                      //有百分数出现
                      val.result =
                        (
                          eval(val.expression.join().replace(/,/g, '')) * 100
                        ).toFixed(2) + '%'
                    } else {
                      val.result = eval(val.expression.join().replace(/,/g, ''))
                    }
                  })
                }
                if (this.$route.params.index == 0) {
                  this.$options.methods.get_echarts_datas.bind(this)()
                } else {
                  this.$options.methods.getList.bind(this)()
                }

                this.hasShow = false
                // this.data1 = this.allformulas;
              } else {
                this.hasShow = false
                this.allformulas = []
              }
            } else {
              this.$Message.info(response.data.msg)
              this.hasShow = false
            }
          } else {
            this.$Message.info(response.data.msg)
            this.hasShow = false
          }
        })
        .catch(function(error) {
          if (error.response) {
            // if (error.response.data.error == 3) {
            //   alert(error.response.data);
            // }
            alert(error.response.data)
            this.hasShow = false
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            this.hasShow = false
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            this.hasShow = false
            alert(error.message)
          }
          // console.log(error.config);
        })
    },

    // re() {
    //   this.$router.go(-1)
    // },
    //获得可以计算数量的字段列表
    getList() {
      let a = this.HOST + '/api/calc'
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data != null) {
                this.allStrings = response.data.data
                let keys = [] //所有可以计算的字段，键值
                for (var p in this.allStrings) {
                  keys.push(p)
                }
                let b = null
                let url = this.HOST + '/api/calc?store=' + ''
                // this.wholeResult = [];//结果
                //let tmp = {}
                keys.forEach(val => {
                  b = {
                    store: '',
                    expression: [
                      {
                        which: val,
                        multerms: []
                      }
                    ]
                  }
                  //tmp.name = val
                  this.$axios
                    .post(url, b)
                    .then(response => {
                      if (response.status == 200) {
                        if (response.data.error == 1) {
                          if (response.data.data != null) {
                            //tmp.result =

                            // result = result.concat(response.data.data);
                            this.wholeResult.push({
                              name: val,
                              result: response.data.data[0]
                            }) //

                            if (this.wholeResult.length == keys.length) {
                              //console.log('1',this.wholeResult.length)
                              this.$options.methods.get_echarts_datas.bind(
                                this
                              )()
                            }
                          }
                        }
                      }
                    })
                    .catch(function(error) {
                      if (error.response) {
                        alert(error.response.data)
                      } else if (error.request) {
                        // console.log(error.request);
                      } else {
                      }
                      // console.log(error.config);
                    })
                })
              } else {
              }
            } else {
              this.$Message.info(response.data.msg)
            }
          } else {
            this.$Message.info(response.data.msg)
          }
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data)
          } else if (error.request) {
          } else {
          }
        })
    }
  }
}
</script>
