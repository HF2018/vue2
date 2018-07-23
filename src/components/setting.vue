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
          &emsp;月：
          <span v-for="item in countfilters.CdataMouth" style="color:blue">{{item.label}} &nbsp; </span>
          &emsp;&emsp;周：
          <span v-for="item in countfilters.CdataWeek" style="color:blue">{{item.label}} &nbsp;</span>
        </Row>
      </div>

      <strong style="font-size:20px;color:orange;display:block;padding:10px 0px;">2、药品文件上传</strong>
      <div>

        <Row type="flex" justify="center" align="middle" class="code-row-bg">

          <Col span="12"> (1)疾病分类分级文件
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

          <Col span="12"> (2)价格敏感性商品：
          <form method="post" enctype="multipart/form-data">
            <input type="file" name="file" id="file2" />
            <Button type="primary" @click="uploadDrug2()">提交</Button>
          </form>
          </Col>
          <Col span="12"> &emsp;已上传文件：
          <span v-for="(item,index) in Upload.cheap" :key="index"> {{item}} |</span>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" class="code-row-bg">

          <Col span="12"> (2)采购价文件：
          <form method="post" enctype="multipart/form-data">
            <input type="file" name="file" id="file3" />
            <Button type="primary" @click="uploadDrug3()">提交</Button>
          </form>
          </Col>
          <Col span="12"> &emsp;已上传文件：
          <span v-for="(item,index) in Upload.cheap" :key="index"> {{item}} |</span>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" class="code-row-bg">

          <Col span="12"> 测试：
        

            <input type="file" name="file" id="file4" @change="uploadDrug4" />


          </Col>
          <Col span="12"> &emsp;已上传文件：
          <span v-for="(item,index) in Upload.cheap" :key="index"> {{item}} |</span>
          </Col>
        </Row>
      </div>

      <strong style="font-size:20px;color:orange;display:block;padding:10px 0px;">3、门店片区操作</strong>

      <div style="border-bottom:1px solid #ddd;padding:20px 0">
        <h3 style="color:#495060;">已创建的片区</h3>
        <div style="margin:10px 0">
          <span>共{{store_zone.zone.total}}个片区</span>
        </div>
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
          <Checkbox :indeterminate="store_zone.ZoneCheckAll.indeterminate" :value="store_zone.ZoneCheckAll.checkAll" @click.prevent.native="ZonehandleCheckAll">全选</Checkbox>
          <Button type="error" :disabled="!store_zone.ZoneCheckAll.checkAllGroup[0]" @click="DeleteZone()">删除</Button>
        </div>

        <CheckboxGroup v-model="store_zone.ZoneCheckAll.checkAllGroup" @on-change="ZonecheckAllGroupChange">
          <Checkbox v-for="(item,index) in store_zone.zone.ZoneDatas.data" :label="item.label" :key="index">
            <span>{{item.label}}</span>
            <Input v-if="store_zone.amend.IfClickAmend && index == store_zone.amend.index" v-model="store_zone.amend.name" placeholder="请输入片区名" style="width: 10vw" @on-click="found_icon"></Input>
            <Button v-if="store_zone.amend.IfClickAmend?( index != store_zone.amend.index ):true" size="small" @click="amend_zone_name(index)">
              <Icon type="compose" style="font-size:16px;color:blue"></Icon>
            </Button>
            <Button v-if="store_zone.amend.IfClickAmend && index == store_zone.amend.index" size="small" @click="amend_zone_Ok">
              <Icon type="checkmark-round" style="font-size:14px;color:green"></Icon>
            </Button>
          </Checkbox>
        </CheckboxGroup>
      </div>

      <h3 style="color:#495060;padding:10px 0px;">分区 —— 1、门店选择</h3>
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="store_zone.StoreCheckAll.indeterminate" :value="store_zone.StoreCheckAll.checkAll" @click.prevent.native="StorehandleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="store_zone.StoreCheckAll.checkAllGroup" @on-change="StorecheckAllGroupChange">
        <Checkbox v-for="(item,index) in store_zone.store.datas" :key="index" :label="(index+1) + '、' + item"></Checkbox>
      </CheckboxGroup>

      <br>
      <p v-if="this.store_zone.StoreCheckAll.checkAllGroup.length>0">
        <strong style="padding:0px 10px;font-size:14px;">分区 —— 2、选择执行方式：</strong>
        <RadioGroup v-model="store_zone.FoundOrAdd.select" @on-change="FoundOrAdd_change">
          <Radio label="创建新的片区"></Radio>
          <Radio label="添加至已有片区"></Radio>
        </RadioGroup>
      </p>
      <br>
      <p v-if="store_zone.FoundOrAdd.FoundIf">
        <strong style="padding:0px 10px;font-size:14px;">分区 —— 3、输入片区名称：</strong>
        <Input v-model="store_zone.zone.name" icon="ios-plus-outline" placeholder="请输入片区名" style="width: 10vw" @on-click="found_icon"></Input>
      </p>
      <p v-if="store_zone.FoundOrAdd.AddIf">
        <strong style="padding:0px 10px;font-size:14px;">分区 —— 3、选择已有片区：</strong>
        <Select v-model="store_zone.ZoneAddStore.datas" style="width:160px">
          <Option v-for="(item,index) in store_zone.zone.ZoneDatas.data" :value="item.label" :key="index">{{ item.label }}</Option>
        </Select>
        <Button type="success" @click="store_add_zone" :disabled="store_zone.ZoneAddStore.datas == '' ">添加</Button>
      </p>
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
      //会员日
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
      //药品文件上传
      Upload: {
        normal: ['1号表格', '2号表格'],
        cheap: ['1号表格', '2号表格']
      },
      //药店分区
      store_zone: {
        store: {
          datas: []
        },

        //片区datas + 新建片区input
        zone: {
          name: '',
          ZoneDatas: [],
          total: 0
        },
        //修改片区名
        amend: {
          id: '',
          name: '',
          index: '',
          stores: [],
          IfClickAmend: false
        },

        //保存至已有片区
        ZoneAddStore: {
          datas: []
        },

        //保存片区选择
        FoundOrAdd: {
          select: '',
          FoundIf: false,
          AddIf: false
        },

        //全选与单选
        StoreCheckAll: {
          indeterminate: true,
          checkAll: false,
          checkAllGroup: []
        },
        //全选与单选
        ZoneCheckAll: {
          indeterminate: true,
          checkAll: false,
          checkAllGroup: []
        }
      }
    }
  },
  store,
  created() {
    this.Mouth_Week()
    this.Get_Mouth_Week()
    this.Upload_relations()
    this.gain_store()
    this.gain_zone()
  },
  methods: {
    //1
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
            //console.log(response)
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
                label: value.label
              }
              this.countfilters.CdataWeek.push(a)
            }
          })
          this.countfilters.Mouth.forEach(value => {
            if (response.data.data.indexOf(value.num) != -1) {
              let a = {
                label: value.label
              }
              this.countfilters.CdataMouth.push(a)
            }
          })
        })
        .catch(response => {})
    },

    //2

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
    //上传便宜药品
    uploadDrug3() {
      let url = this.HOST + '/api/cost'
      var data = new FormData()
      data.append('drug', document.getElementById('file3').files[0])
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
              //console.log(response)
            }
          }
        })
        .catch(response => {})
    },

    //3
    ZonehandleCheckAll() {
      let zoneAll = this.store_zone.ZoneCheckAll
      if (zoneAll.indeterminate) {
        zoneAll.checkAll = false
      } else {
        zoneAll.checkAll = !zoneAll.checkAll
      }
      zoneAll.indeterminate = false

      if (zoneAll.checkAll) {
        let aa = []
        this.store_zone.zone.ZoneDatas.data.forEach(val => {
          aa.push(val.label)
        })
        zoneAll.checkAllGroup = aa
      } else {
        zoneAll.checkAllGroup = []
      }
    },
    ZonecheckAllGroupChange(data) {
      let zone = this.store_zone.ZoneCheckAll
      if (data.length === this.store_zone.zone.ZoneDatas.length) {
        zone.indeterminate = false
        zone.checkAll = true
      } else if (data.length > 0) {
        zone.indeterminate = true
        zone.checkAll = false
      } else {
        zone.indeterminate = false
        zone.checkAll = false
      }
    },
    DeleteZone() {
      let zoneAll = this.store_zone.ZoneCheckAll
      let data = []
      this.store_zone.zone.ZoneDatas.data.forEach(value => {
        zoneAll.checkAllGroup.forEach(val => {
          if (value.label == val) {
            data.push(value.id)
          }
        })
      })
      if (data[0]) {
        let url = this.HOST + '/api/area'
        let ids = {
          ids: data
        }
        //获取数据库中的门店
        axios
          .delete(url, { data: ids })
          .then(response => {
            response.data.error == 1 ? this.gain_zone() : ''
            zoneAll.checkAllGroup = []
          })
          .catch(response => {})
      }

      // console.log(zoneAll.checkAllGroup)
      // console.log(data)
    },

    StorehandleCheckAll() {
      let storeAll = this.store_zone.StoreCheckAll
      if (storeAll.indeterminate) {
        storeAll.checkAll = false
      } else {
        storeAll.checkAll = !storeAll.checkAll
      }
      storeAll.indeterminate = false

      if (storeAll.checkAll) {
        storeAll.checkAllGroup = this.store_zone.store.datas
      } else {
        storeAll.checkAllGroup = []
      }
    },
    StorecheckAllGroupChange(data) {
      this.store_zone.FoundOrAdd.select = ''
      this.store_zone.FoundOrAdd.FoundIf = false
      this.store_zone.FoundOrAdd.AddIf = false
      this.store_zone.zone.name = ''
      this.store_zone.ZoneAddStore.datas = ''

      let store = this.store_zone.StoreCheckAll
      if (data.length === this.store_zone.store.datas.length) {
        store.indeterminate = false
        store.checkAll = true
      } else if (data.length > 0) {
        store.indeterminate = true
        store.checkAll = false
      } else {
        store.indeterminate = false
        store.checkAll = false
      }
    },
    //获取门店
    gain_store() {
      let url = this.HOST + '/api/store'
      //获取数据库中的门店
      axios
        .get(url)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.store_zone.store.datas = response.data.data
            }
          }
        })
        .catch(response => {})
    },
    //获取分区
    gain_zone() {
      let url = this.HOST + '/api/area'
      //获取数据库中的门店
      axios
        .get(url)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.store_zone.zone.ZoneDatas = response.data.data
              this.store_zone.zone.total = response.data.data.total
              console.log(this.store_zone.zone.ZoneDatas)
            }
          }
        })
        .catch(response => {})
    },
    //修改分区名
    amend_zone_name(index) {
      this.store_zone.amend.IfClickAmend = true
      this.store_zone.amend.index = index
      this.store_zone.zone.ZoneDatas.data.forEach((val, index) => {
        if (index == this.store_zone.amend.index) {
          this.store_zone.amend.name = val.label
          this.store_zone.amend.id = val.id
          this.store_zone.amend.id = val.id
          this.store_zone.amend.stores = val.stores
        }
      })
    },
    amend_zone_Ok() {
      let url = this.HOST + '/api/area'
      let datas = {
        id: this.store_zone.amend.id,
        label: this.store_zone.amend.name,
        stores: this.store_zone.amend.stores
      }
      //获取数据库中的门店
      axios
        .put(url, datas)
        .then(response => {
          response.data.error == 1 ? console.log(response) : ''
          this.store_zone.amend.IfClickAmend = false
          this.$options.methods.gain_zone.bind(this)()
        })
        .catch(response => {})
    },
    //选择新增还是添加
    FoundOrAdd_change(val) {
      let store = this.store_zone.FoundOrAdd
      store.FoundIf = false
      store.AddIf = false
      this.store_zone.zone.name = ''
      this.store_zone.ZoneAddStore.datas = ''
      if (val) {
        val == '创建新的片区' ? (store.FoundIf = true) : (store.AddIf = true)
      }
    },
    //新建片区icon
    found_icon() {
      let store = this.store_zone
      if (store.name != '') {
        let url = this.HOST + '/api/area'
        let data = {
          label: store.zone.name,
          stores: store.StoreCheckAll.checkAllGroup
        }
        axios
          .post(url, data)
          .then(response => {
            this.$options.methods.gain_zone.bind(this)()
             this.$Message.success('新建成功')
          })
          .catch(error => {})
      }
    },
    //添加至已有分区
    store_add_zone() {
      let newzone
      this.store_zone.zone.ZoneDatas.data.forEach(value => {
        if (this.store_zone.ZoneAddStore.datas == value.label) {
          newzone = value
        }
      })
      console.log(newzone)
      let url = this.HOST + '/api/area'
      let data = {
        id: '',
        label: '',
        stotrs: []
      }
      //获取数据库中的门店
      axios
        .put(url, newzone)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              console.log(response)
               this.$Message.success('添加成功')
            }
          }
        })
        .catch(response => {})
    },
    uploadDrug4(e) {
      let url = this.HOST + '/api/drug'
      var data = new FormData()
      data.append('drug', e.target.files[0])
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
    }
  }
}
</script>
