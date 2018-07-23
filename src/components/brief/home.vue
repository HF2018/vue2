<style scoped>
.tmps {
  cursor: pointer;
  text-align: center;
  background: #fff;
  height: 200px;
  margin: 10px 10px;
  box-shadow: 2px 3px 10px #ddd;
  border-radius: 4px;
}
.tmps:hover {
  box-shadow: 0px 0px 10px #666;
}
</style>
<template>
  <div>
    <Spin v-if="spinShow == true" size="large" fix></Spin>
    <div :style="{padding: '24px',height: '100%',fontSize: '14px',color: '#495060',width: '80%',margin:'0 auto'}">
      <div id="myChart" style="width:80vw;margin:0 auto;">
        <Row type="flex" justify="center" class="code-row-bg">
          <Col span="7" v-for="(item,index) in allPro" :key="index" class='tmps'>
          <div @click="Jump_charts(item,index)">
            <h2 style="padding-top:80px;">{{item.label}}</h2>
            <h6>{{item.label}}</h6>
          </div>

          </Col>
        </Row>
      </div>
      <div style="width: '80%',margin:'0 auto'}" v-if="failShow == true">加载失败，点击
        <Button type="primary" @click="getClasslist()">刷新</Button>试一下</div>
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
  //   components: { headNav },
  data() {
    return {
      allPro: [], //得到的数据分类
      spinShow: false, //加载的图案
      failShow: false, //加载失败，重新进行加载的内容的显示
      params: {
        titles: [],
        datas: []
      }
    }
  },
  created() {
    this.getClasslist() //获得计算指标的分类
  },
  mounted() {
    this.$Message.config({
      top: 70,
      duration: 3
    })
  },
  methods: {
    getClasslist() {
      this.spinShow = true
      var a = this.HOST + '/api/normtype'
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              // let num = eval(value.expression.join().replace(/,/g, ''))
              if (response.data.data.data != null) {
                this.allPro = response.data.data.data
                //console.log(this.allPro)
                this.spinShow = false
              }
            } else {
              this.$Message.info(response.data.msg)
              this.spinShow = false
            }
          } else {
            this.$Message.info(response.data.msg)
            this.spinShow = false
          }
        })
        .catch(function(error) {
          if (error.response) {
            this.spinShow = false
            this.failShow = true
            alert(error.response.data)
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            this.spinShow = false
            this.failShow = true
            // console.log(error.request);
          } else {
            this.spinShow = false
            this.failShow = true
            alert(error.message)
          }
          // console.log(error.config);
        })
    },
    Jump_charts(item, index) {
      // console.log(item)
      // console.log(index)
      if (item.child == null) {
        this.$Message.destroy()
        this.$Message.info('暂无数据')
      } else {
        this.$router.push({
          name: 'charts',
          params: { params: item, index: index }
        })
      }
    }
  }
}
</script>
