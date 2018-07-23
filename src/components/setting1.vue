<template>
  <div>
    <headNav></headNav>
    <div style="width:80vw;margin:0 auto;">
      <strong style="font-size:20px;color:orange;display:block;padding:10px 0px;">1、会员日</strong>
      <div>
        <Row type="flex" align="middle" class="code-row-bg">
          设置会员日 &emsp;&emsp;月：
          <Select transfer v-model="countfilters.dayMonth" multiple @on-change="day_Mouth_change" size="small" style="width:100px">
            <Option style="z-index:5" v-for="(item,index) in countfilters.Mouth" :value="item.label" :key="index">{{ item.label }}</Option>
          </Select>
          &emsp;&emsp;周：
          <Select transfer v-model="countfilters.dayWeek" multiple @on-change="day_Week_change" size="small" style="width:100px">
            <Option v-for="item in countfilters.Week" :value="item.label" :key="item.label">{{ item.label }}</Option>
          </Select>
          &emsp;&emsp;
          <Button type="success" size="small" @click="day_Mouth_Week">添加</Button>
        </Row>

        <Row type="flex" align="middle" class="code-row-bg">
          已选会员日&emsp;
          <Icon type="minus-round" color="red"></Icon>
          <Icon type="minus-round" color="red"></Icon>
          <Icon color="red" type="chevron-right"></Icon>
          &emsp;月：<span v-for="item in countfilters.CdataMouth" style="color:blue">{{item.label}} &nbsp; </span>
          &emsp;&emsp;周：<span v-for="item in countfilters.CdataWeek" style="color:blue">{{item.label}} &nbsp;</span>
        </Row>
      </div>

      <strong style="font-size:20px;color:orange;display:block;padding:10px 0px;">2、药品文件上传</strong>
      <div>

        <Row type="flex" justify="center" align="middle" class="code-row-bg">

          <Col span="12"> (1)常规药品：
          <form method="post" enctype="multipart/form-data">
            <input type="file" name="file" id="file1" />
            <Button type="primary" @click="uploadDrug1()">提交</Button>
          </form>
          </Col>
          <Col span="12">&emsp;已上传文件：
          <span v-for="(item,index) in Upload.normal" :key="index"> {{item}} |</span>
          </Col>
        </Row>

        <Row type="flex" justify="center" align="middle" class="code-row-bg">

          <Col span="12"> (2)价格药品：
          <form method="post" enctype="multipart/form-data">
            <input type="file" name="file" id="file2" />
            <Button type="primary" @click="uploadDrug2()">提交</Button>
          </form>
          </Col>
          <Col span="12"> &emsp;已上传文件：
          <span v-for="(item,index) in Upload.cheap" :key="index"> {{item}} |</span>
          </Col>
        </Row>
      </div>
    </div>

  </div>
</template>
<style scoped>
.code-row-bg {
  font-size: 16px;
  padding: 10px 0px;
  color: black;
}
li {
  list-style: none;
}
</style>

<script>
import headNav from './headNav.vue'
import axios from 'axios'
import store from '@/vuex/store'
export default {
  components: { headNav },
  data() {
    return {
      countfilters: {
        dayMonth: '', //选中的月（汉化）
        dataMouth: [], //选中的月

        dayWeek: '', //选中的周 （汉化）
        dataWeek: [], //选中的周

        Week: [],
        Mouth: [],

        vip_days_Ok: [], //最终选中值 整合

        CdataWeek: [], //获取选中的周 （汉化）
        CdataMouth: [] //获取选中的月（汉化）
      },
      Upload: {
        normal: ['1号表格', '2号表格'],
        cheap: ['1号表格', '2号表格']
      }
    }
  },
  store,
  created() {
    this.Mouth_Week()
    this.Get_Mouth_Week()
    this.Upload_relations()
  },
  methods: {
    //
    Mouth_Week() {
      for (let i = 1; i < 32; i++) {
        let bb = { label: i + '号', num: 'm' + i }
        this.countfilters.Mouth.push(bb)
      }
      let aa = [
        { label: '周一', num: 'w1' },
        { label: '周二', num: 'w2' },
        { label: '周三', num: 'w3' },
        { label: '周四', num: 'w4' },
        { label: '周五', num: 'w5' },
        { label: '周六', num: 'w6' },
        { label: '周日', num: 'w0' }
      ]
      this.countfilters.Week = aa
    },
    //周
    day_Week_change(val) {
      //console.log(this.countfilters.dayWeek)
      let aa = []
      this.countfilters.Week.forEach((value, index) => {
        let valueA = value
        val.forEach((value, index) => {
          if (valueA.label == value) {
            aa.push(valueA.num)
          }
        })
      })
      this.countfilters.dataWeek = aa
    },
    //月
    day_Mouth_change(val) {
      let aa = []
      this.countfilters.Mouth.forEach((value, index) => {
        let valueA = value
        val.forEach((value, index) => {
          if (valueA.label == value) {
            aa.push(valueA.num)
          }
        })
      })
      this.countfilters.dataMouth = aa
    },
    //组合
    day_Mouth_Week() {
      this.countfilters.vip_days_Ok = []
      let show = false
      if (this.countfilters.dataMouth[0] || this.countfilters.dataWeek[0]) {
        show = true
      }
      if (show) {
        this.countfilters.dataMouth.forEach(value => {
          this.countfilters.vip_days_Ok.push(value)
        })

        this.countfilters.dataWeek.forEach(value => {
          this.countfilters.vip_days_Ok.push(value)
        })
        let aa = {
          value: this.countfilters.vip_days_Ok
        }
        let url = this.HOST + '/api/vipdays'
        axios
          .post(url, aa)
          .then(response => {
            console.log(response)
            this.$options.methods.Get_Mouth_Week.bind(this)()
          })
          .catch(response => {})
      }
      //this.$store.commit('vip_days_Ok',this.countfilters.vip_days_Ok)
      // console.log( JSON.stringify(this.countfilters.vip_days_Ok))
    },
    //得到已选择的会员日
    Get_Mouth_Week() {
      this.countfilters.CdataWeek = []
      this.countfilters.CdataMouth = []
      let url = this.HOST + '/api/vipdays'
      axios
        .get(url)
        .then(response => {
          this.countfilters.Week.forEach(value => {
            if (response.data.data.indexOf(value.num) != -1) {
              let a = {
                label:value.label
              }
              this.countfilters.CdataWeek.push(a)
            }
          })
          this.countfilters.Mouth.forEach(value => {
            if (response.data.data.indexOf(value.num) != -1) {
              let a = {
                label:value.label
              }
              this.countfilters.CdataMouth.push(a)
            }
          })
        })
        .catch(response => {})
        console.log(this.countfilters.CdataWeek)
        let aa = []
        this.countfilters.CdataWeek.forEach(value=>{
         
           console.log(value)
        })
     
      
     
      //console.log(StringUtils.join(this.countfilters.CdataWeek))
    },
    //上传正常药品
    uploadDrug1() {
      let url = this.HOST + '/api/drug'
      var data = new FormData()
      data.append('drug', document.getElementById('file1').files[0])
      axios
        .post(url, data)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.$Message.success('提交成功')
            }
          }
        })
        .catch(response => {})
    },
    //上传便宜药品
    uploadDrug2() {
      let url = this.HOST + '/api/cheap'
      var data = new FormData()
      data.append('drug', document.getElementById('file2').files[0])
      axios
        .post(url, data)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.$Message.success('提交成功')
            }
          }
        })
        .catch(response => {})
    },
    //获取药品数据
    Upload_relations() {
      let url = this.HOST + '/api/drug'
      let url2 = this.HOST + '/api/cheap'
      // axios
      //   .all([
      //     axios.get(url2)
      //     //axios.get(url2)
      //   ])
      //   .then(
      //     axios.spread(function(aa) {
      //       // 上面两个请求都完成后，才执行这个回调方法
      //       console.log(aa)
      //       // console.log(reposResp.data)
      //     })
      //   )

      // axios
      //   .get(url)
      //   .then(response => {
      //     if (response.status == 200) {
      //       if (response.data.error == 1) {
      //         console.log(response)
      //       }
      //     }
      //   })
      //   .catch(response => {})

      axios
        .get(url2)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              console.log(response)
            }
          }
        })
        .catch(response => {})
    }
  }
}
</script>
