<style scoped>
li {
  list-style: none;
}
</style>

<template>
  <div>
    <!-- <headNav></headNav> -->
    <div style="width:80vw;margin:0 auto;background:#fff;">
      <Select v-model="choosedStore" style="width:200px;margin:10px 0;" filterable>
        <Option v-for="(item,index) in allStore" :value="item" :key="index">{{ item }}</Option>
      </Select>
      <Button type="primary" @click="getClasslist()">查看</Button>
      <div style="position:relative;" v-if="$route.params.index == 0">
        <div name="myChart0" style="width:80vw;height:80vh;" @click="aa($event)">暂无数据</div>
        <Spin size="large" fix v-if="hasShow"></Spin>
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
      index0: [],
      title0: [],
      label: '',
      indexNum: '',
      //门店的选择

      choosedStore: '',
      allStore: [],
      hasShow: true,

      allPro: []
    }
  },
  created() {
    this.getStore()
    //this.get_echarts_datas()
    //this.$route.params.index == 0 ? '' : this.getList()//获得总人数，总消费数，总购买次数
  },
  mounted() {
    //this.index0_echarts()
  },
  methods: {
    get_echarts_datas() {
      this.title0 = []
      this.index0 = []

      let params = this.$route.params.params
      let index = this.$route.params.index
      // console.log(index)
      this.allPro[index].child.forEach(val => {
        this.index0.push({
          value: eval(val.expression.join().replace(/,/g, '')),
          name: val.label
        })
        this.title0.push(val.label)
      })
      this.$options.methods.index0_echarts.bind(this)()
    },
    index0_echarts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementsByName('myChart0')[0]
      )
      //['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
      // 绘制图表
      myChart.setOption({
        title: {
          text: '驱动力分析效果图',
          x: 'center',
           textStyle:{
            fontSize:'28'
          },
         
        },
        color: ['#61A0A8', '#C23531'],
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{b} : {c} ({d}%)'
        // },
        legend: {
          orient: 'vertical',
          left: '100px',
          top: '80px',
          data: this.title0
        },
        series: [
          {
            name: '驱动力2',
            type: 'pie',
            radius: '45%',
            center: ['50%', '35%'],
            data: this.index0,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                formatter: ['{valueHead|{b}: {c} ({d}%)}'].join('\n'),
                backgroundColor: 'rgba(3, 3, 3, 0.7)',
                borderRadius: 4,
                rich: {
                  valueHead: {
                    color: '#fff',
                    padding:[ 10 ,20 ,10 ,20],
                    verticalAlign: 'middle',
                    align: 'center',
                    fontSize:'15',
                  }
                }
              }
            }
          }
        ]
      })
      this.hasShow = false
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
                // this.$options.methods.getFormula.bind(this)()
                this.$options.methods.getClasslist.bind(this)()
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
    getClasslist() {
      this.hasShow = true
      var a
      if (this.choosedStore == this.allStore[0]) {
        a = this.HOST + '/api/normtype'
      } else {
        a = this.HOST + '/api/normtype?store=' + this.choosedStore
      }

      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              // let num = eval(value.expression.join().replace(/,/g, ''))
              if (response.data.data.data != null) {
                this.allPro = response.data.data.data
                this.$options.methods.get_echarts_datas.bind(this)()
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
          console.log(error)
        })
    },
    aa(e) {
       console.log(this.$route.params.params)
    }
  }
}
</script>
