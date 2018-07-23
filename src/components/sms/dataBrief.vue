
<style scoped>
.databrief .datanum{
    background-color: #92c1f3;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 50%;
    /* text-align: center; */
    display: inline-block;
    font-size: 36px;
    color: #000
}
.databrief b{
    font-size: 18px
}
</style>

<template>
    <div>
        <div class="databrief">
            <Row :gutter="16">
                <Col span="6" :style="{background:'#fff',textAlign: 'center',borderRight:'1px solid #ddd'}">
                    <b>今天</b>
                    <p style="margin: 10px 0">发送短信条数</p>
                    <p >
                        <span class="datanum">33</span>条     
                    </p>
                </Col>
                <Col  span="6" :style="{background:'#fff',textAlign: 'center',borderRight:'1px solid #ddd'}">
                    <b>今天</b>
                    <p style="margin: 10px 0">计费总条数</p>
                    <p >
                        <span class="datanum">33</span>条     
                    </p>
                </Col>
                <Col  span="6" :style="{background:'#fff',textAlign: 'center',borderRight:'1px solid #ddd'}">
                    <b>今天</b>
                    <p style="margin: 10px 0">发送成功率</p>
                    <p >
                        <span class="datanum">44</span>%     
                    </p>
                </Col>
                <Col span="5" :style="{marginRight:'10px',textAlign:'center'}">
                    <router-link to="/market/sms/failReason">
                        <Row>
                            <Col span="24">
                                <Icon type="ios-medkit-outline" :style="{fontSize:'80px',}"></Icon>
                                <p style="margin:20px 0 0 0">短信发送失败数据诊断</p>
                            </Col>    
                        </Row>
                    </router-link>
                    
                </Col>
            </Row>
            <Tabs type="card" :style="{margin:'40px 0'}">
                <!-- <TabPane label="今天">
                   
                </TabPane>
                <TabPane label="昨天">昨天</TabPane> -->
                <TabPane label="近7天">
                     <div id="myChart" :style="{width: '90%', height: '500px'}"></div>
                </TabPane>
                <TabPane label="近10天">
                    <div id="myChart1" :style="{width: '90%', height: '500px'}"></div>
                </TabPane>
                <TabPane label="近20天">
                     <div id="myChart2" :style="{width: '90%', height: '500px'}"></div>
                </TabPane>
                <TabPane label="近30天">
                     <div id="myChart3" :style="{width: '90%', height: '500px'}"></div>
                </TabPane>
                <TabPane label="请选择日期">
                     <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
                </TabPane>
            </Tabs>
            <router-view></router-view>
        </div>
       
    </div>
</template>
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      let myChart1 = echarts.init(document.getElementById('myChart1'))
      let myChart2 = echarts.init(document.getElementById('myChart2'))
      let myChart3 = echarts.init(document.getElementById('myChart3'))
      var option = {
    title: {
        text: '发送的短信条数',
        subtext: '单位（条）'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: '#2d8cf0'
        }, {
            gt: 6,
            lte: 8,
            color: '#2d8cf0'
        }, {
            gt: 8,
            lte: 14,
            color: '#2d8cf0'
        }, {
            gt: 14,
            lte: 17,
            color: '#2d8cf0'
        }, {
            gt: 17,
            color: '#2d8cf0'
        }]
    },
    series: [
        {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
                data: [ [{
                    name: '早高峰',
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '晚高峰',
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
        }
    ]
};
 myChart.setOption(option);
 myChart1.setOption(option);
 myChart2.setOption(option);
 myChart3.setOption(option);
      // 绘制图表
    //   myChart.setOption({
    //      title: {
    //     text: '短信发送条数',
    //     subtext: '单位（条）'
    // },
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'cross'
    //     }
    // },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    // xAxis:  {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    // },
    // yAxis: {
    //     type: 'value',
    //     axisLabel: {
    //         formatter: '{value} 条'
    //     },
    //     axisPointer: {
    //         snap: true
    //     }
    // },
    // visualMap: {
    //     show: false,
    //     dimension: 0,
    //     pieces: [{
    //         lte: 6,
    //         color: '#2d8cf0'
    //     }, {
    //         gt: 6,
    //         lte: 8,
    //         color: '#2d8cf0'
    //     }, {
    //         gt: 8,
    //         lte: 14,
    //         color: '#2d8cf0'
    //     }, {
    //         gt: 14,
    //         lte: 17,
    //         color: '#2d8cf0'
    //     }, {
    //         gt: 17,
    //         color: '#2d8cf0'
    //     }]
    // },
    // series: [
    //     {
    //         name:'用电量',
    //         type:'line',
    //         smooth: true,
    //         data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
    //         markArea: {
    //             data: [ [{
    //                 name: '早高峰',
    //                 xAxis: '07:30'
    //             }, {
    //                 xAxis: '10:00'
    //             }], [{
    //                 name: '晚高峰',
    //                 xAxis: '17:30'
    //             }, {
    //                 xAxis: '21:15'
    //             }] ]
    //         }
    //     }
    // ]
    //   });
    }
  },
  
//    mounted(){
//        //登陆请求
//        var a = this.HOST + '/api/login'
//        var b = {"account":"dog","pwd":"123",'code':'1112'}
//         this.$axios.post(a,b)
//             .then(function(response) {
//                 console.log(response);
            
                
//             })
//             .catch(function(error) {
//                 console.log(error);
//             });
//     }
}
</script>