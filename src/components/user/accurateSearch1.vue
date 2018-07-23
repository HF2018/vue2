<style scoped>
.countproperty {
  color: #495060;
  font-size: 14px;
}
.countproperty p {
  margin: 12px 0;
}
.everyMOdal {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
.clear {
  overflow: hidden;
  clear: both;
}
</style>
<template>
  <div>
    <div class="everyMOdal">
      <h2 style="color:#495060;font-size:16px">创建条件</h2>
      <div>
        <div class="clear">
          <p style="text-indent:2em;padding:4px 0;float:left ">*你可以在基本筛选条件和已创建的条件中随机组合，生成新的条件。</p>
          <div style="float:right;width:30%">
            <div>
              请选择数据库：
              <p>
                <Select v-model="Upload.DataBase.value" style="width:100px">
                  <Option v-for="(item,index) in Upload.DataBase.datas" :value="item" :key="index">{{ item }}</Option>
                </Select>
              </p>
              <br>
              <Button type="primary" icon="ios-search" @click="Upload_modal()">点击查看药品</Button>
              <Modal v-model="Upload.model" :closable="false" width="80vw">
                <p> 请选择相关性(默认全部)：</p>
                <Row type="flex" justify="center">
                  <CheckboxGroup v-model="Upload.relations.Data" @on-change="Upload_relations">
                    <Checkbox v-for="(item,index) in Upload.relations.Datas" :label="item" :key="index">{{index+1}}、{{item}}</Checkbox>
                  </CheckboxGroup>
                </Row>
                <p style="border:1px solid red;margin:20px 0px;"></p>
                <br>
                <Row type="flex" justify="start" :gutter="16" class="code-row-bg">

                  <Col span="7">
                  <Card style="background:#dddee1" v-if="Upload.Card.CardData1.length>0">
                    <CheckboxGroup v-model="Upload.Card.MCardDatas1" @on-change="Upload_Card1">
                      <Checkbox v-for="(item,index) in Upload.Card.CardData1" :label="item.label" :key="index">{{index+1}}、{{item.label}}</Checkbox>
                    </CheckboxGroup>
                  </Card>
                  <p v-else>数据库暂无数据...</p>
                  </Col>
                  <Col span="7">
                  <Card style="background:#dddee1" v-show="Upload.Card.CardData2.length>0">
                    <div v-for="(itemA,index) in Upload.Card.CardData2" :key="index">
                      {{index+1}}、{{itemA.label}}
                      <CheckboxGroup v-model="Upload.Card.MCardDatas2" @on-change="Upload_Card2">
                        <Checkbox v-for="(item,index) in itemA.middles" :label="item.label" :key="index">{{index+1}}、{{item.label}}</Checkbox>
                      </CheckboxGroup>
                    </div>
                  </Card>
                  </Col>
                  <Col v-show="Upload.Card.CardData3.length>0" span="7">
                  <Card style="background:#dddee1">
                    <div v-for="(itemA,index) in Upload.Card.CardData3" :key="index">
                      {{index+1}}、{{itemA.label}}
                      <CheckboxGroup v-model="Upload.Card.MCardDatas3" @on-change="Upload_Card3">
                        <Checkbox v-for="(item,index) in itemA.smalls" :label="item.label" :key="index">{{index+1}}、{{item.label}}</Checkbox>
                      </CheckboxGroup>
                    </div>
                  </Card>
                  </Col>
                </Row>
                <Row v-if="Upload.filter.total">
                  <ul style="color:orange">
                    <h2 style="text-align:center;">筛选结果</h2>
                    总数：{{Upload.filter.total}}
                    <br>
                  </ul>
                  <ul style="display:flex;list-style: none;overflow:auto;padding-bottom:30px;">
                    <li v-for="(item,index) in Upload.filter.datas" :key="index" style="font-size:16px;padding-right:3px;writing-mode:tb-rl;color:#00CD00;">
                      <em style="writing-mode: lr-tb ;">{{index+1}}</em>{{item}}</li>
                  </ul>
                </Row>
                <div slot="footer">
                  <Button type="error" size="large" @click="Upload_modal_cancel">关闭</Button>
                  <Button type="primary" size="large" @click="Upload_modal_OK">添加筛选条件</Button>
                </div>
              </Modal>
              <p style="line-height:50px;">
                <RadioGroup v-model="Upload.cheap.uploads" :value="Upload.cheap.uploads" @on-change="Upload_cheap_show">
                  <Radio label="是"></Radio>
                  <Radio label="否"></Radio>
                </RadioGroup>
                <InputNumber v-if="Upload.cheap.uploads == '是'" size="small" :max="0.9" :min="0" :step="0.1" v-model="Upload.cheap.value" @on-change="Upload_cheap_show"></InputNumber>
                引入价格药品
              </p>
              <p>
                <RadioGroup v-model="subtract.show_value" @on-change="filter_subtract_ifshow">
                  <Radio label="是"></Radio>
                  <Radio label="否"></Radio>
                </RadioGroup>
                需要差值功能
              </p>
            </div>
          </div>
        </div>
        <div v-if="drug4ill.l">
          <br>
          <p style="border:1px solid red"></p>
          <br>
          <Row :gutter="26">
            <Col span="8"> 一级：
            </Col>
            <Col span="8"> 二级：
            </Col>
            <Col span="8"> 三级：
            </Col>
          </Row>
          <br>
          <Row :gutter="16">
            <Col span="7">
            <Card style="background:#dddee1" v-if="drug4ill.l">
              <p v-for="(item,index) in drug4ill.l" :key="index">{{index+1}}.{{item}}</p>
              <!-- <p v-for="(item,index) in Upload.CardData1" @click="Upload_Card1(item,index)" :key="item.label">{{index+1}}、{{item.label}}</p> -->
            </Card>
            <p v-else>数据库暂无数据...</p>
            </Col>
            <Col span="7">
            <Card style="background:#dddee1" v-show="drug4ill.m">
              <p v-for="(item,index) in drug4ill.m" :key="index">{{index+1}}.{{item}}</p>
              <!-- <p v-for="(item,index) in Upload.CardData2" @click="Upload_Card2(item,index)" :key="item.label">{{index+1}}、{{item.label}}</p> -->
            </Card>
            </Col>
            <Col span="7" v-show="drug4ill.s">
            <Card style="background:#dddee1">
              <p v-for="(item,index) in drug4ill.s" :key="index">{{index+1}}.{{item}}</p>
              <!-- <p v-for="(item,index) in Upload.CardData3" @click="Upload_Card3(item,index)" :key="item.label">{{index+1}}、{{item.label}}</p> -->
            </Card>
            </Col>
          </Row>
        </div>
        <br>
        <h2 v-if="created.editSure">对已创建的条件
          <span style="color: #ff0000">{{created.editCurrentinfro.label}}</span>进行编辑更新</h2>
        <h3 style="color:#495060;text-indent:3em">基本筛选条件:</h3>
        <Form ref="formDynamic" :model="conditions.formDynamic" :label-width="80">
          <FormItem v-for="(Oitem, index) in conditions.formDynamic.items" v-if="Oitem.status" :key="index" :prop="'items.' + index + '.value'">
            <Row>
              <!-- <span style="display:flex"> -->
              <Col span="5">
              <span style="width: 10%">请选择类型：</span>
              <Select v-model="Oitem.valueA" filterable style="width:90%;display:inline-block" @on-change="cityListModel(index,$event)">
                <Option v-for="(item,index) in conditions.cityList" :value="item.name" :key="index">{{ item.name }}</Option>
              </Select>
              </Col>
              <Col span="5">
              <div v-if="Oitem.conditionShow">
                <span style="width: 10%">请选择条件：</span>
                <Select v-model="Oitem.valueB" :disabled="Oitem.disable" style="width:90%;display:inline-block" @on-change="cityTermModel(index,$event)">
                  <Option v-for="(item,index) in conditions.formDynamic.Bfilterdatas[index]" :value="item.label" :key="index">{{ item.label }}</Option>
                </Select>
              </div>
              </col>
              <Col span="7">
              <div v-if="Oitem.text">
                <span style="width: 10%">请输入内容：</span>
                <Input placeholder="请输入内容" v-model="Oitem.TextValue" @on-change="cityValueModel(index, $event)" clearable style="width: 90%"></Input>
              </div>
              <div v-else-if="Oitem.date">
                <span style="width: 10%">请输入时间：</span>
                <p></p>
                <DatePicker :value="Oitem.dateValue1" @on-change="cityDateValue1(index,$event)" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                至
                <DatePicker :value="Oitem.dateValue2" @on-change="cityDateValue2(index,$event)" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                <!-- <DatePicker @on-change="cityDateValue(index,$event)" :value="Oitem.dateValue" type="daterange" format="yyyy-MM-dd" placement="bottom-end" placeholder="Select date" style="width: 90%"></DatePicker> -->
                <!-- <DatePicker type="daterange" placement="bottom-end" :start-date="new Date(1991, 4, 14)" placeholder="Select date" style="width: 200px"></DatePicker> -->
              </div>
              <div v-else>
                <span style="width: 10%">请输入数字：</span>
                <InputNumber :min="0" :step="1" @on-change="cityValueModel(index,$event)" :value="Oitem.TNValue" style="width: 90%"></InputNumber>
              </div>
              </col>
              <Col span="5">
              <span style="width: 10%">与/或/非：</span>
              <Select v-model="Oitem.valueC" style="width:90%" @on-change="AndOr(index,$event)">
                <Option v-for="(item,index) in conditions.andOr" :key="index" :value="item.title">{{item.title}}</Option>
              </Select>
              </col>
              <Col span="2">
              <span style="width: 10%">&nbsp;</span>
              <div style="width:90%">
                <Button type="warning" @click="handleRemove(index)">删除</Button>
              </div>
              </col>
            </Row>
          </FormItem>

          <FormItem v-if="subtract.ifshow">
            <h3>差值计算</h3>
            <Row>
              <Col span="3">
              <span style="width: 10%">类型：</span>
              <Input placeholder="业务时间" disabled style="width: 100px"></Input>
              </Col>
              <Col span="8">
              <div>
                <span style="width: 10%">请输入时间：</span>
                <br>
                <DatePicker type="daterange" :value="subtract.data1" @on-change="filter_subtract_data1" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
              </div>
              </Col>
              <Col span="3">
              <span style="width: 10%">类型：</span>
              <Input placeholder="业务时间" disabled style="width: 100px"></Input>
              </Col>
              <Col span="8">
              <div>
                <span style="width: 10%">请输入时间：</span>
                <br>
                <DatePicker type="daterange"  :value="subtract.data2" @on-change="filter_subtract_data2" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem style="text-align:center">
            <Row>
              <Col span="20">
              <Button type="dashed" long @click="handleAdd" icon="plus-round">添加搜索</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem style="text-align:center">
            <Row>
              <Col span="20">
              <Button type="primary" @click="handleSubmit()" @keyup.enter="handleSubmit()">筛&nbsp;&nbsp;选</Button>
              <Button type="ghost" @click="handleReset()" style="margin-left: 8px">重&nbsp;&nbsp;置</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <div style="text-align:right">
          <Button type="success" size="large" @click="SavePackets(true)">保&nbsp;&nbsp;存</Button>
        </div>
      </div>
    </div>
    <!-- 已创建的条件 -->
    <div style="border-bottom:1px solid #ddd;padding:20px 0">
      <h2 style="color:#495060;font-size:16px">已创建的条件</h2>
      <div style="textAlign: right">
        <Input icon="ios-search" placeholder="请输入条件名称" style="width: 25%;" />
      </div>
      <div style="margin:10px 0">
        <span>共{{created.total}}个条件</span>
      </div>
      <Checkbox :indeterminate="created.indeterminate" :value="created.checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
      <span>
        <Button type="warning" @click='deleteCreated()'>删除</Button>
      </span>
      <CheckboxGroup v-model="created.checked" @on-change="checkAllGroupChange">
        <Checkbox :label="item.label" v-for="(item,index) in created.checkAllGroup" :key="index">
          <span>{{item.label}}</span>
          <Button size="small" @click="getCreatedClick(index,item)">编辑</Button>
        </Checkbox>
      </CheckboxGroup>
    </div>
    <!-- 计算条件 -->
    <div style="border-bottom:1px solid #ddd;margin:20px 0">
      <h2 style="color:#495060;font-size:16px">计算条件：</h2>
      <div class="countproperty">
        <p>1.近
          <InputNumber @on-change="Lately_Month_Terms" :value="countfilters.dynamic_period_month" :min="0"></InputNumber>个月产生消费记录的人</p>
        <p>2.占消费总额的
          <InputNumber @on-change="Proportion_Terms" :value="countfilters.odlrankcalc" :min="0" :step="0.1"></InputNumber>%的消费排名</p>
        <p>3.设置会员日 &emsp;&emsp;调用全局会员日：
          <RadioGroup v-model="countfilters.vip_days" :value="countfilters.vip_days" @on-change="Mvip_data_show">
            <Radio label="是"></Radio>
            <Radio label="否"></Radio>
          </RadioGroup>
        </p>
      </div>

    </div>
    <!-- 指标计算 -->
    <calculate @checkOne='handleSubmit()' :multerms='multerms.multerms'></calculate>
    <!-- 保存分组 -->
    <div style="text-align:right;margin:10px 0">
      <Modal v-model="SavePacket.modal" :title="SavePacket.title" @on-ok="ok('SavePacket')" :loading='SavePacket.loading1'>

        <Form ref="SavePacket" :model="SavePacket" :label-width="80" :rules="saveValidate" enctype="multipart/form-data">
          <FormItem label="分组名称" prop="label">
            <Input v-model="SavePacket.label" placeholder="请输入分组名称"></Input>
          </FormItem>
          <FormItem label="保存为" prop="save_type">
            <RadioGroup v-model="SavePacket.save_type">
              <Radio label="1">
                <span>复合条件</span>
              </Radio>
              <Radio label="2">
                <span>分类分级</span>
              </Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="评分类型" prop="evaluate_type" v-if="SavePacket.save_type == 2">
            <RadioGroup v-model="SavePacket.evaluate_type" @on-change='getScoreType'>
              <Radio label="score">
                <span>分数</span>
              </Radio>
              <Radio label="level">
                <span>等级</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="评分" prop="score" v-if="SavePacket.save_type == 2">
            <!-- <InputNumber  v-model="SavePacket.score" placeholder="请输入分数" :style="{'width':'100%'}"></InputNumber> -->
            <Input v-model="SavePacket.score" placeholder="请输入等级,例如：A、B、C" v-if="SavePacket.evaluate_type == 'level'"></Input>
            <InputNumber v-model="SavePacket.score" v-if="SavePacket.evaluate_type == 'score'" placeholder="请输入数字" style="width:100%"></InputNumber>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="SavePacket.remark" placeholder="请输入该组的备注内容" type="textarea" :rows="4"></Input>
          </FormItem>

        </Form>
      </Modal>

    </div>
    <div style="position:relative" v-show="SavePacket.tableShow">
      <Spin size="large" fix v-if="table.spinShow"></Spin>
      <h2 style="color:#495060;font-size:16px">筛选的结果：</h2>
      <p></p>
      <i-table v-if="PageShow" height="550" stripe border :columns="columns" :data="typedata"></i-table>
      <Page v-if="PageShow" :total="table.total" size="small" placement="top" :current="table.currentpage" show-elevator show-sizer show-total @on-change="page" @on-page-size-change="pageSize"></Page>
      <p v-if="!PageShow">没有数据</p>
    </div>

  </div>

</template>
<script>
import axios from 'axios'
import store from '@/vuex/store'
import { formatDate } from './date.js'
import calculate from './calculate.vue'
export default {
  components: { calculate },
  store,
  data() {
    //输入不能为空
    const inputValue = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      //表单验证
      saveValidate: {
        label: [
          {
            validator: inputValue,
            trigger: 'blur'
          }
        ],

        score: [
          {
            validator: inputValue,
            trigger: 'change'
          }
        ],
        valueP: [
          {
            validator: inputValue,
            trigger: 'change'
          }
        ],
        evaluate_type: [
          {
            validator: inputValue,
            trigger: 'change'
          }
        ]
      },
      //已创建的条件
      created: {
        indeterminate: true,
        checkAll: false,
        checked: [], //选中的项
        checkAllGroup: [],
        total: 0, //总条目数
        checkedInfo: [], //被选中完整信息
        checkeddata: [], //被点击的组
        selectedshow: false,
        selectedData: [],
        editSure: false, //是否点击了编辑
        editCurrentinfro: null //点击的编辑的当前项的所欲信息
      },
      //药品
      Upload: {
        model: false,
        //HP等
        relations: {
          Datas: [], //展现
          Data: [] //选中
        },
        //已存在的内容
        Card: {
          CardData1: [], //一级展现
          CardData2: [], //二级展现
          CardData3: [], //三级展现
          CardDatas1: [], //一级选中
          CardDatas2: [], //二级选中
          CardDatas3: [], //三级选中
          MCardDatas1: [], //一级绑定
          MCardDatas2: [], //二级绑定
          MCardDatas3: [] //三级绑定
        },
        //根据药品条件筛选出的药品
        filter: {
          datas: [],
          total: ''
        },
        //是否引入价格药品文件
        cheap: {
          uploads: '否', //判断 是与否
          value: 0
        },
        //数据库选择
        DataBase: {
          datas: ['1号数据库', '2号数据库', '3号数据库'],
          value: ''
        }
      },
      drug4ill: {}, //药品选择内容条件
      drug4illOK: {}, //药品选择内容条件OK
      cheap_drug_term: {},
      //可以计算数量的字段
      count: {
        Computable: '', //单选与v-modal的绑定
        allString: [], //可以计算的所有字段
        searchResult: '', //查询出来的结果
        ComputableText: '', //展现在用户端的字段名称
        modal: false,
        loading1: true,
        label: ''
      },
      //表单
      columns: [],
      //表单
      typedata: [],
      //分页是否展示
      PageShow: false,
      //保存分组储存值
      SavePacket: {
        tableShow: true, //表格的显示与影藏
        title: '保存分组',
        modal: false,
        appear: false,
        valueM: '',
        valueP: '',
        label: '',
        valuePlace: '',
        Market: [],
        Pathema: [],
        loading1: true,
        score: 0,
        evaluate_type: 'score', //评分的类型
        save_type: '1' //保存的类型
      },
      //计算条件
      allcount: [],
      //用户输入的计算条件
      countfilters: {
        dynamic_period_month: 0,
        odlrankcalc: 0,
        rankcalc: 0,
        vip_days: '否', //是否引入会员日
        vip_days_Ok: [] //会员日
      },
      //
      conditions: {
        formDynamic: {
          //每行显示的内容
          items: [],
          //找到当前选中的类型
          Afilterdatas: [],
          //当前选中类型的条件
          Bfilterdatas: [],
          DateValueFilter: []
        },
        //获得的初始筛类型
        cityList: [],
        andOr: [{ title: '与', label: '$and' }, { title: '或', label: '$or' }]
      },
      //差值
      subtract: {
        ifshow: true,
        show_value: '否',
        reduceitem: {}, //条件
        data1:[],
        data2:[],
      },
      //时间框筛选条件
      DateFilter: [],
      //其他框筛选条件
      filter: {
        filters: []
      },
      //最终筛选条件
      cityfilter: {
        //top
        items: [],
        //bottom
        caitems: []
      },
      //最终获取条件
      multerms: {},
      filters: {},
      table: {
        total: 0,
        title: [],
        pageSizeval: false,
        //筛选时的加载中...
        spinShow: false,
        currentpage: 1
      },
      //setclass中的编辑
      setClass: {
        Edit_show: false
      }
    }
  },
  created() {
    //全局配置提示框
    this.$Message.config({
      top: 100,
      duration: 3
    })
    this.fastdatas()
    this.handleAdd()
    this.Mvip_data_show() //是否获取到全局会员日
    this.Upload_cheap_show() //是否加入便宜药品
    this.filter_subtract_ifshow() //是否加入计算差值
      this.getCountCondition() //基本的计算条件
    this.getCreatedCondition() //获得已创建的条件列表
  },
  mounted() {
    //全局配置提示框
    this.$Message.config({
      top: 100,
      duration: 3
    })
  },
  computed: {},
  watch: {},
  methods: {
    //是否加入计算差值筛选条件
    filter_subtract_ifshow(val) {
      this.subtract.reduceitem = {}
      if (this.subtract.show_value == '否') {
        this.subtract.ifshow = false
      } else {
        this.subtract.ifshow = true
      }
    },
    filter_subtract_data1(val) {
      this.subtract.data1 = val
      let bb = [
        {
          field: 'i',
          name: '业务时间',
          relation: '$and',
          term: {
            label: '大于',
            rule: '$gte',
            value: 1
          }
        },
        {
          field: 'i',
          name: '业务时间',
          relation: '$and',
          term: {
            label: '小于',
            rule: '$lte',
            value: 1
          }
        }
      ]
      this.subtract.reduceitem.minuend = bb
      let aa = []
      val.forEach(value => {
        let date = new Date(value)
        let newdate = date
          .setDate(date.getDate())
          .toString()
          .slice(0, 10)
        aa.push(newdate)
      })
      aa.forEach((val, index) => {
        this.subtract.reduceitem.minuend[index].term.value = parseFloat(val)
      })
    },
    filter_subtract_data2(val) {
       this.subtract.data2 = val
      let bb = [
        {
          field: 'i',
          name: '业务时间',
          relation: '$and',
          term: {
            label: '大于',
            rule: '$gte',
            value: 1
          }
        },
        {
          field: 'i',
          name: '业务时间',
          relation: '$and',
          term: {
            label: '小于',
            rule: '$lte',
            value: 1
          }
        }
      ]
      this.subtract.reduceitem.subtractor = bb
      let aa = []
      val.forEach(value => {
        let date = new Date(value)
        let newdate = date
          .setDate(date.getDate())
          .toString()
          .slice(0, 10)
        aa.push(newdate)
      })
      aa.forEach((val, index) => {
        this.subtract.reduceitem.subtractor[index].term.value = parseFloat(val)
      })
    },
    Vip_Detail(val) {
      this.$router.push({
        name: 'vipDetail',
        params: { params: val, cityList: this.conditions.cityList }
      })
    },
    //是否引入价格药品为筛选条件
    Upload_cheap_show() {
      if (this.Upload.cheap.uploads == '是' && this.Upload.cheap.value > 0) {
        this.cheap_drug_term.rule = '$gte'
        this.cheap_drug_term.value = this.Upload.cheap.value.toString()
      } else {
        this.cheap_drug_term.rule = {}
      }
    },
    //是否添加全局会员日为筛选条件
    Mvip_data_show(val) {
      if (this.countfilters.vip_days == '是') {
        let url = this.HOST + '/api/vipdays'
        axios
          .get(url)
          .then(response => {
            this.countfilters.vip_days_Ok = response.data.data
          })
          .catch(response => {})
      } else {
        this.countfilters.vip_days_Ok = []
      }
    },
    //打开药品弹出框
    Upload_modal() {
      this.Upload_relations()
      this.Upload.model = true

      this.Upload.Card.CardData1 = []
      this.Upload.Card.CardData2 = []
      this.Upload.Card.CardData3 = []
      this.Upload.Card.MCardDatas1 = []
      this.Upload.Card.MCardDatas2 = []
      this.Upload.Card.MCardDatas3 = []

      this.Upload.filter.datas = []
      this.Upload.filter.total = ''
      this.Upload.relations.Data = []
    },
    //得到药品列表
    Upload_relations(val) {
      this.drug4illOK = {}
      let url = this.HOST + '/api/drug'
      if (val) {
        let aa = ''
        val.forEach(value => {
          aa += '?r=' + value
        })
        url += aa
        this.drug4illOK.r = val
      }
      //获取数据库中的药品种类
      axios
        .get(url)
        .then(response => {
          //console.log(response)
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data.class.length > 0) {
                this.Upload.Card.CardData1 = response.data.data.class
              }
              if (response.data.data.relations.length > 0) {
                this.Upload.relations.Datas = response.data.data.relations
              }
            }
          }
        })
        .catch(response => {})
    },
    Upload_Card1(val) {
      this.Upload.Card.CardData2 = []
      this.Upload.Card.CardData3 = []
      this.Upload.Card.MCardDatas2 = []
      this.Upload.Card.MCardDatas3 = []
      this.Upload.Card.CardData1.forEach(value => {
        if (val.indexOf(value.label) != -1) {
          this.Upload.Card.CardData2.push(value)
        }
      })
      this.drug4illOK.l = val
      this.drug4illOK.m = []
      this.drug4illOK.s = []
    },
    Upload_Card2(val) {
      this.Upload.Card.CardData3 = []
      this.Upload.Card.MCardDatas3 = []
      this.Upload.Card.CardData2.forEach(value => {
        value.middles.forEach(value => {
          if (val.indexOf(value.label) != -1) {
            this.Upload.Card.CardData3.push(value)
          }
        })
      })
      this.drug4illOK.m = val
      this.drug4illOK.s = []
    },
    Upload_Card3(val) {
      this.drug4illOK.s = val
    },
    Upload_modal_OK() {
      this.drug4ill = this.drug4illOK
      this.Upload.model = true
      this.Upload_Card_filter()
      //console.log(this.drug4illOK)
    },
    Upload_modal_cancel() {
      this.Upload.model = false

      //this.$Message.warning("点击了取消，并未添加进筛选内容");
    },
    //药品筛选
    Upload_Card_filter() {
      let url = this.HOST + '/api/drug/filter'
      axios
        .post(url, this.drug4illOK)
        .then(response => {
          this.Upload.filter.datas = response.data.data.data
          this.Upload.filter.total = response.data.data.total
        })
        .catch(response => {})
    },
    //获得已创建的条件列表
    getCreatedCondition() {
      let url = this.HOST + '/api/tplterms'
      axios
        .get(url)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.created.checkAllGroup = response.data.data.data
              this.created.total = response.data.data.total
              //console.log(this.created.checkAllGroup)
            }
          }
        })
        .catch(response => {})
    },
    getCreatedClick(index, item) {
      console.log(item)
      this.created.editCurrentinfro = item
      let Group = this.created.checkAllGroup
      this.created.checkeddata = Group[index]
      this.created.editSure = true //点击了编辑按钮
      if (item.multerms[0]) {
        this.$options.methods.Edit_router.bind(this)(item)
      }
    },
    Edit_setClass() {
      if (this.$route.params.params) {
        let item = this.$route.params.params
        if (item.multerms[0]) {
          this.setClass.Edit_show = true
          this.$options.methods.Edit_router.bind(this)(item)
        }
      }
    },
    Edit_router(item) {
      this.$options.methods.handleReset.bind(this)('1')
      this.countfilters.odlrankcalc = this.countfilters.dynamic_period_month = 0
      //对已选择组进行查找赋值
      //1、—计算条件

      if (item.multerms[0].caitems.length > 0) {
        item.multerms[0].caitems.forEach(value => {
          let valueA = value
          if (value.field == 'dynamic_period_month') {
            this.countfilters.dynamic_period_month = parseInt(value.value)
          } else if (value.field == 'rankcalc') {
            this.countfilters.odlrankcalc = parseFloat(value.value * 100)
            this.$options.methods.Proportion_Terms.bind(this)(
              this.countfilters.odlrankcalc
            )
          }
        })
      }
      
      //2、差值条件
      if(item.multerms[0].reduceitem != {}){
        this.subtract.show_value = '是'
        this.filter_subtract_ifshow()
        if(item.multerms[0].reduceitem.minuend[0]){
          let date1 = []
          item.multerms[0].reduceitem.minuend.forEach(val=>{
              date1.push(formatDate(new Date(val.term.value * 1000), 'yyyy-MM-dd'))
          })
          this.filter_subtract_data1(date1)
        }
         if(item.multerms[0].reduceitem.subtractor[0]){
           let date2 = []
            item.multerms[0].reduceitem.subtractor.forEach(val=>{
                date2.push(formatDate(new Date(val.term.value * 1000), 'yyyy-MM-dd'))
            })
            this.filter_subtract_data2(date2)
         }
         
      }


      //3、—筛选条件
      let form = this.conditions.formDynamic
      let TextTerms = []
      let aa = []
      item.multerms[0].items.forEach(value => {
        aa.push(value)
      })
      let dates = []
      aa.forEach(value => {
        if (value.type == 'date') {
          dates.push(value)
        } else {
          TextTerms.push(value)
        }
      })

      for (let i = 0; i < dates.length - 1; i++) {
        if (dates[i].field == dates[i + 1].field) {
          let bb = dates[i]
          let newdate = []
          let value1 = dates[i].term.value
          let value2 = dates[i + 1].term.value

          newdate.push(formatDate(new Date(value1 * 1000), 'yyyy-MM-dd'))
          newdate.push(formatDate(new Date(value2 * 1000), 'yyyy-MM-dd'))
          bb.term.value = newdate
          TextTerms.push(bb)
        }
      }
      //  console.log(TextTerms)
      if (TextTerms.length > 0 && TextTerms.length < 1) {
        this.$options.methods.handleReset.bind(this)()
      } else if (TextTerms.length > 1) {
        for (let i = 0; i < TextTerms.length - 1; i++)
          this.$options.methods.handleAdd.bind(this)()
      }

      TextTerms.forEach((value, index) => {
        let valueA = value
        this.$options.methods.cityListModel.bind(this)(index, valueA.name)
        if (valueA.relation == '$and') {
          form.items[index].valueC = '与'
        } else {
          form.items[index].valueC = '或'
        }

        // console.log( valueA.name)

        this.$options.methods.AndOr.bind(this)(index, form.items[index].valueC)
        form.items[index].valueB = valueA.term.label

        // console.log( valueA.term.label)
        this.$options.methods.cityTermModel.bind(this)(
          index,
          form.items[index].valueB
        )

        if (valueA.type == 'text') {
          form.items[index].TextValue = valueA.term.value
          this.$options.methods.cityValueModel.bind(this)(
            index,
            valueA.term.value
          )
        } else if (value.type == 'num') {
          form.items[index].TNvalue = valueA.term.value
          this.$options.methods.cityValueModel.bind(this)(
            index,
            valueA.term.value
          )
        } else {
          let aa = valueA.term.value
          this.$options.methods.cityDateValue1.bind(this)(index, aa[0])
          this.$options.methods.cityDateValue2.bind(this)(index, aa[1])
        }
      })
    },
    //1、获取初始筛选条件
    fastdatas() {
      let url = this.HOST + '/api/item'
      axios
        .get(url)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.conditions.cityList = response.data.data
              console.log(this.conditions.cityList)
              if (this.$route.params.params) {
                this.$options.methods.Edit_setClass.bind(this)()
              }
            } else {
              this.$Message.error(response.data.msg)
            }
          } else {
            this.$Message.warning('服务器请求出错...')
          }
        })
        .catch(error => {
          this.$Message.warning('服务器请求出错...')
        })
    },
    //添加的条件json
    addfilters(index) {
      let form = this.conditions.formDynamic
      this.filter.filters.push({
        id: form.items[index].id,
        field: '',
        name: '',
        relation: '',
        term: { label: '', value: '', rule: '' }
      })
    },
    addDates(index) {
      let form = this.conditions.formDynamic
      let Id = form.items[index].id
      let aa = {
        bb: [
          {
            id: form.items[index].id,
            field: '',
            name: '',
            relation: '',
            term: { label: '', value: '', rule: '' }
          },
          {
            id: form.items[index].id,
            field: '',
            name: '',
            relation: '',
            term: { label: '', value: '', rule: '' }
          }
        ],
        id: form.items[index].id
      }
      this.DateFilter.push(aa)
    },
    //当类型框发生变化时
    cityListModel(index, $event) {
      if ($event) {
        this.SavePacket.appear = true
        let form = this.conditions.formDynamic
        let Index = index
        let Id = form.items[Index].id
        let DateFilter = this.DateFilter
        form.items[index].valueA = $event

        //当类型框发生变动 则删除条件中所有id相同的对象
        if (this.DateFilter[0]) {
          for (let i = DateFilter.length - 1; i >= 0; i--) {
            if (DateFilter[i].id == Id) {
              DateFilter.splice(i, 1)
            }
          }
        }
        if (this.filter.filters[0]) {
          let l = this.filter.filters.length
          for (let i = l - 1; i >= 0; i--) {
            if (this.filter.filters[i].id == Id) {
              this.filter.filters.splice(i, 1)
            }
          }
        }
        //console.log(this.filter.filters)
        //当类型框不为空
        form.items[index].disable = false
        //赋值
        this.conditions.cityList.forEach(value => {
          let valueA = value
          if (valueA.name == $event) {
            form.Afilterdatas[Index] = valueA
            form.items[Index].type = valueA.type
          }
        })

        let newdate = form.Afilterdatas[Index]
        form.Bfilterdatas[Index] = newdate.terms

        let valueB

        if (form.items[Index].valueB == '') {
          // console.log('vvv')
          //console.log( form.Bfilterdatas[Index])
          valueB = form.items[Index].valueB = form.Bfilterdatas[Index][0].label
          //console.log( valueB)
        } else {
          valueB = form.items[Index].valueB

          //  console.log('vvvv')
        }

        // console.log( 'valueB')
        let valueC
        if (form.items[Index].valueC) {
          valueC = form.items[Index].valueC
        } else {
          valueC = form.items[Index].valueC = this.conditions.andOr[0].title
        }

        //console.log(valueC)
        let TextValue = form.items[Index].TextValue
        let TNValue = form.items[Index].TNValue
        // console.log( TNValue)
        let dateValue = form.items[Index].dateValue
        //console.log(form.items[Index])

        if (newdate.type !== 'date') {
          form.items[Index].conditionShow = true
          this.$options.methods.addfilters.bind(this)(Index)
          this.$options.methods.cityTermModel.bind(this)(Index, valueB)
          if (newdate.type == 'text') {
            this.$options.methods.cityValueModel.bind(this)(Index, TextValue)
          } else {
            this.$options.methods.cityValueModel.bind(this)(Index, TNValue)
          }
          this.$options.methods.AndOr.bind(this)(Index, valueC)

          if (newdate.type == 'text') {
            form.items[Index].text = 1
            form.items[Index].date = 0
          } else if (newdate.type == 'num') {
            form.items[Index].date = 0
            form.items[Index].text = 0
          }
        } else {
          form.items[Index].conditionShow = false
          form.items[Index].date = 1
          form.items[Index].text = 0
          this.$options.methods.addDates.bind(this)(Index)
          //console.log('aaa')

          if (dateValue) {
            this.$options.methods.cityDateValue.bind(this)(Index, dateValue)
          }
          this.$options.methods.AndOr.bind(this)(Index, valueC)
        }

        this.filter.filters.forEach(value => {
          if (value.id == Id) {
            value.field = newdate.field
            value.type = newdate.type
            value.name = $event
          }
        })
        DateFilter.forEach(value => {
          if (value.id == Id) {
            value.bb.forEach(value => {
              value.field = newdate.field
              value.type = newdate.type
              value.name = $event
            })
          }
        })
      }
      //
      //console.log(DateFilter)
      //console.log(this.filter.filters)
    },
    //当条件框发生变动时
    cityTermModel(index, $event) {
      // console.log($event)
      //console.log(this.filter.filters[index])

      this.SavePacket.appear = true
      let form = this.conditions.formDynamic
      if ($event) {
        form.Bfilterdatas[index].forEach(value => {
          let valueA = value
          if (valueA.label == $event) {
            this.filter.filters.forEach(value => {
              if (value.id == form.items[index].id) {
                value.term.rule = valueA.rule
                value.term.label = $event
              }
            })
          }
        })
      }
    },
    //当text+num框发生变动
    cityValueModel(index, $event) {
      this.SavePacket.appear = true
      let form = this.conditions.formDynamic
      let Id = form.items[index].id
      if ($event && $event != 0) {
        this.filter.filters.forEach(value => {
          if (value.id == Id) {
            if (form.items[index].type == 'text') {
              //form.items[index].TextValue = $event
              value.term.value = form.items[index].TextValue
            } else {
              form.items[index].TNValue = $event
              value.term.value = form.items[index].TNValue
            }
          }
        })
      }
    },
    //当时间框发生变动
    cityDateValue1(index, $event) {
      console.log($event)
      let form = this.conditions.formDynamic
      let Index = index
      let Id = form.items[Index].id
      form.items[index].dateValue1 = $event

      this.DateFilter.forEach((value, index) => {
        if (value.id == Id) {
          let date = new Date($event)
          let newdate = date
            .setDate(date.getDate())
            .toString()
            .slice(0, 10)
          value.bb[0].term.value = parseInt(newdate)
          value.bb[0].term.rule = form.Afilterdatas[Index].terms[0].rule
          value.bb[0].term.label = form.Afilterdatas[Index].terms[0].label
        }
      })
    },
    cityDateValue2(index, $event) {
      let form = this.conditions.formDynamic
      let Index = index
      let Id = form.items[Index].id
      form.items[index].dateValue2 = $event

      this.DateFilter.forEach((value, index) => {
        if (value.id == Id) {
          let date = new Date($event)
          let newdate = date
            .setDate(date.getDate())
            .toString()
            .slice(0, 10)
          value.bb[1].term.value = parseInt(newdate)
          value.bb[1].term.rule = form.Afilterdatas[Index].terms[1].rule
          value.bb[1].term.label = form.Afilterdatas[Index].terms[1].label
        }
      })
      //console.log( this.DateFilter)
    },
    //每行最后一个选择框 and/or
    AndOr(index, $event) {
      // console.log( $event)
      let form = this.conditions.formDynamic
      let Id = form.items[index].id
      this.conditions.andOr.forEach(value => {
        let valueA = value
        if ($event == valueA.title) {
          if (form.Afilterdatas[index].type !== 'date') {
            this.filter.filters.forEach(value => {
              if (value.id == Id) {
                value.relation = valueA.label
              }
              //console.log( this.filter.filters)
            })
          } else {
            this.DateFilter.forEach(value => {
              if (value.id == Id) {
                value.bb.forEach(value => {
                  value.relation = valueA.label
                })
              }
            })
          }
        }
      })
      //console.log( this.conditions.andOr)
    },
    //2、获得基础的计算条件
    getCountCondition() {
      var a = this.HOST + '/api/caitem'
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200 && response.data.error == 1) {
            this.allcount = response.data.data
            // console.log(this.allcount);
          } else {
            this.$Message.info(response.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //2、获取可以计算数量的字段
    getComputableString() {
      var a = this.HOST + '/api/norm/count_item'
      this.$axios
        .get(a)
        .then(response => {
          if (response.status == 200 && response.data.error == 1) {
            this.count.allString = response.data.data
            // console.log(this.allcount);
          } else {
            this.$Message.info(response.data.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //得到可以计算数量的字段的文字显示（单选的时候）
    getComputableText(val) {
      this.count.searchResult = ''
      this.handleSubmit()
      this.count.allString.forEach(item => {
        if (item.aggre == val) {
          this.count.ComputableText = item.label
        }
      })
    },
    //计算条件 1
    Lately_Month_Terms($event) {
      this.countfilters.dynamic_period_month = $event
    },
    //计算条件 2
    Proportion_Terms($event) {
      this.countfilters.odlrankcalc = $event
      this.countfilters.rankcalc = $event / 100
    },
    //点击筛选 最后精确获取到筛选条件
    handleSubmit() {
      //表单筛选出的title清空
      this.table.title = []
      //表单筛选出的数据清空
      this.columns = []
      this.typedata = []
      //获取筛选的条件
      let condition = this.conditions.formDynamic
      let form = this.conditions.formDynamic
      //console.log(this.filter.filters)
      this.cityfilter.items = []
      let filtersShow = false
      let ff = false
      if (this.filter.filters.length > 0) {
        filtersShow = true
        this.filter.filters.forEach(value => {
          this.cityfilter.items.push(value)
          //判断所有条件框是否有空
          value.term.value == ''
            ? ((ff = true), this.$Message.info('请填写所有input框'))
            : (ff = false)
        })
      } else {
        this.cityfilter.items = []
      }

      //当时间条件不为空 则添加
      if (this.DateFilter[0]) {
        this.DateFilter.forEach((value, index) => {
          let valueD = value
          valueD.bb.forEach((value, index) => {
            if (value.term.value != '') {
              this.cityfilter.items.push(value)
            }
          })
        })
      }

      if (this.subtract.ifshow) {
        this.cityfilter.reduceitem = this.subtract.reduceitem
      }
      //console.log(this.cityfilter.items);

      //计算条件综合
      let cafilters = [
        {
          field: '',
          value: ''
        },
        {
          field: '',
          value: ''
        },
        {
          field: '',
          value: ''
        }
      ]
      if (!this.countfilters.vip_days_Ok) {
        this.countfilters.vip_days_Ok = ''
      }
      let aa = [
        this.countfilters.dynamic_period_month.toString(),
        this.countfilters.vip_days_Ok,
        this.countfilters.rankcalc.toString()
      ]

      cafilters.forEach((value, index) => {
        value.field = this.allcount[index].field
        value.value = aa[index]
      })
      for (let i = cafilters.length - 1; i >= 0; i--) {
        if (
          cafilters[i].field == 'dynamic_period_month' ||
          cafilters[i].field == 'rankcalc'
        ) {
          if (cafilters[i].value == 0) {
            cafilters.splice(i, 1)
          }
        } else {
          if (cafilters[i].value == '') {
            cafilters.splice(i, 1)
          }
        }
      }
      this.cityfilter.caitems = cafilters
      this.cityfilter.drug4ill = this.drug4ill
      //console.log(this.cityfilter.drug4ill)
      let cheap_drug = false
      if (this.cheap_drug_term.rule == '$get') {
        this.cityfilter.cheap_drug_term = this.cheap_drug_term
        cheap_drug = true
      }
      //console.log(this.cityfilter)
      // if (this.cityfilter.items) {
      //   if (!ff) {
      //     this.filters = this.cityfilter
      //     // console.log(this.filters)
      //     this.SavePacket.appear = true
      //   }
      // } else {
      //   this.filters = this.cityfilter
      //   this.SavePacket.appear = true
      // }
      this.multerms.multerms = []
      if (!ff && filtersShow) {
        this.multerms.multerms.push(this.cityfilter)
      } else if (
        this.drug4ill != {} ||
        this.DateFilter[0] ||
        this.subtract.ifshow ||
        cafilters[0] ||
        cheap_drug
      ) {
        this.multerms.multerms.push(this.cityfilter)
      }
      if (this.created.selectedshow) {
        if (this.created.checkedInfo.length != 0) {
          this.created.checkedInfo.forEach(val => {
            val.multerms.forEach(item => {
              this.multerms.multerms.push(item)
            })
          })
        }
      }

      console.log(this.multerms)
      this.$options.methods.filteraxios.bind(this)()
    },
    //获取到筛选条件后 正式开始筛选
    filteraxios(val) {
      //传给后台的计算条件
      // var cafilters = this.allcount;

      //表单筛选出的title清空

      this.table.title = []
      //表单筛选出的数据清空
      this.columns = []
      this.typedata = []
      let filterurl
      let url
      //let filter = this.Group.filter
      //添加可以计算数量的字段
      this.filters.aggre = this.count.Computable

      //当可以计算数量的字段不为空(可以计算数量的搜索)
      if (this.filters.aggre != '') {
        url = this.HOST + '/api/norm/read'
        this.SavePacket.tableShow = false
        //点击筛选按钮 出现加载框
        this.table.spinShow = false
      } else {
        //基本搜索
        //当选中了分组框执行gsfilter
        //点击筛选按钮 出现加载框
        this.SavePacket.tableShow = true //表单展现
        this.table.spinShow = true //加载动态图展示
        // if (filter.filterShow) {
        //   //当点击了分组时执行
        //   // filterurl =
        //   //   this.HOST + "/api/admin/vip/ploy/illnesskind/mgroup/gsfilter";
        // } else {
        //当未选中分组框执行filter
        filterurl = this.HOST + '/api/filter'
        //}
        //当页码与每页显示条数未发生改变执行
        if (val) {
          //改变每页显示条数
          if (this.table.pageSizeval) {
            this.table.currentpage = 1
            url = filterurl + '?p=1&item=' + val
          } else {
            //改变页码
            this.table.currentpage = val
            url = filterurl + '?p=' + val + '&item=10'
          }
        } else {
          //默认页码1与每页显示10条
          this.table.currentpage = 1
          url = filterurl + '?p=1&item=10'
        }
      }

      axios
        .post(url, this.multerms)
        .then(response => {
          if (response.status == 200) {
            if (response.data.error == 1) {
              console.log(response)
              //计算数量的极端的搜索结果
              if (url == this.HOST + '/api/norm/read') {
                this.count.searchResult = response.data.count
              } else {
                if (response.data.data.data) {
                  //是否显示表单等
                  this.PageShow = true
                  //如果没有点击分页  则获取总数量
                  if (!val) {
                    this.table.total = response.data.data.total
                  }
                  this.typedata = response.data.data.data
                  //console.log(this.typedata)
                  //转换时间戳
                  this.typedata.forEach((value, index) => {
                    if (value.hasOwnProperty('lb')) {
                      let date = formatDate(
                        new Date(value.lb * 1000),
                        'yyyy-MM-dd'
                      )
                      // var date = new Date(parseInt(value.lb) * 1000)
                      //   .toLocaleString()
                      //   .replace(/年|月/g, "-")
                      //   .replace(/日/g, " ");
                      value.lb = date
                      // console.log(date)
                    }
                  })

                  //筛选表头 当返回数据中 再类型选择框中存在 则放入table.title中 作为表头
                  this.conditions.cityList.forEach((value, index) => {
                    if (this.typedata[0].hasOwnProperty(value.field)) {
                      this.table.title.push(value)
                    }
                  })
                  //console.log(this.table.title)
                  //根据表头 匹配显示内容
                  this.table.title.forEach((value, index) => {
                    //console.log(value)
                    if (this.columns.length == 0) {
                      let cc = {
                        title: '序列号',
                        type: 'index',
                        width: 100,
                        align: 'center',
                        fixed: 'left',
                        align: 'center'
                      }
                      let aa = {
                        title: value.name,
                        key: value.field,
                        fixed: 'left',
                        align: 'center',
                        width: 100
                      }
                      let bb = {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                          const row = params.row
                          return h('div', [
                            h(
                              'a',
                              {
                                style: {
                                  color: 'blue'
                                },
                                on: {
                                  click: () => {
                                    this.Vip_Detail(params.row)
                                    //console.log(params)
                                  }
                                }
                              },
                              '查看详情'
                            )
                          ])
                        }
                      }
                      this.columns.unshift(aa)
                      this.columns.push(bb)
                      this.columns.unshift(cc)
                    } else {
                      let aa = {
                        title: value.name,
                        key: value.field,
                        align: 'center',
                        minWidth: 100
                      }
                      this.columns.unshift(aa)
                    }
                    // console.log(this.columns)
                  })
                  this.table.spinShow = false
                  this.$Message.success('筛选成功')
                } else {
                  this.PageShow = false
                  this.$Message.success('数据库暂无数据')
                  this.table.spinShow = false
                }
              }
            } else {
              this.PageShow = false
              this.table.spinShow = false
              this.$Message.info('没有内容')
            }
          } else {
            this.table.spinShow = false
            //console.log('response.data.msg')
            this.$Message.info('服务器出现错误')
          }
          //console.log(this.columns);
        })
        .catch(error => {
          this.table.spinShow = false
          console.log(error)
          this.$Message.error(error)
        })
    },
    //重置
    handleReset(val) {
      if (!val) {
        this.created.editSure = false
        this.setClass.Edit_show = false
      }
      let condition = this.conditions.formDynamic
      condition.items = []
      this.filter.filters = []
      condition.Afilterdatas = []
      condition.Bfilterdatas = []
      this.DateFilter = []
      this.$options.methods.handleAdd.bind(this)()
      //console.log(this.filter)
    },
    //添加
    handleAdd() {
      let Id =
        Math.random()
          .toString()
          .substr(2, 5) + Date.now().toString(36)
      let form = this.conditions.formDynamic
      form.items.push({
        valueA: '',
        valueB: '',
        valueC: '',
        TNValue: 0,
        TextValue: '',
        dateValue1: '',
        dateValue2: '',
        status: 1,
        text: 0,
        date: 0,
        conditionShow: true,
        disable: true,
        id: Id,
        type: ''
      })
      form.Afilterdatas.push({})
      form.Bfilterdatas.push({})
    },
    //删除
    handleRemove(index) {
      let condition = this.conditions.formDynamic
      if (condition.items.length == 1) {
        this.$options.methods.handleReset.bind(this)()
      } else {
        let Id = condition.items[index].id
        for (let i = this.filter.filters.length - 1; i >= 0; i--) {
          if (this.filter.filters[i].id == Id) {
            this.filter.filters.splice(i, 1)
          }
        }
        for (let i = this.DateFilter.length - 1; i >= 0; i--) {
          if (this.DateFilter[i].id == Id) {
            this.DateFilter.splice(i, 1)
          }
        }
        condition.items.splice(index, 1)
        condition.Afilterdatas.splice(index, 1)
        condition.Bfilterdatas.splice(index, 1)
      }
      // console.log(this.DateFilter)
      // console.log(this.filter.filters)
      // console.log( this.cityfilter.filters)
    },
    //表单
    page(val) {
      this.table.pageSizeval = false
      this.$options.methods.filteraxios.bind(this)(val)
    },
    pageSize(val) {
      this.table.pageSizeval = true
      this.$options.methods.filteraxios.bind(this)(val)
    },
    Markets(val) {
      this.SavePacket.valueM = val
      this.SavePacket.Market.forEach((value, index) => {
        if (value.label == val) {
          let oi = value.id
          //console.log(oi)
          let url = this.HOST + '/api/admin/vip/ploy/illnesskind/list?oi=' + oi
          axios
          axios
            .get(url)
            .then(response => {
              if (response.status == 200 && response.data.error == 1) {
                // this.SavePacket.Pathema = response.data.data.data;
                response.data.data.data == null
                  ? (this.SavePacket.Pathema = [])
                  : (this.SavePacket.Pathema = response.data.data.data)
              } else {
                this.$Message.info(response.data.msg)
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    //基本的保存分组
    SavePackets(nodesc) {
      // console.log(this.$route.params.params)
      this.SavePacket.label = ''
      this.SavePacket.evaluate_type = 'score'
      this.SavePacket.score = 0

      this.SavePacket.modal = true
      if (this.setClass.Edit_show) {
        this.SavePacket.title = '编辑分组'
        this.SavePacket.label = this.$route.params.params.label
        this.SavePacket.save_type = '2'
        this.SavePacket.evaluate_type = this.$route.params.params.rank_type
        if (this.SavePacket.evaluate_type == 'score') {
          this.SavePacket.score = parseFloat(this.$route.params.params.value)
        } else {
          this.SavePacket.score = this.$route.params.params.value
        }
      } else if (this.created.editSure) {
        this.SavePacket.title = '编辑分组'
        this.SavePacket.label = this.created.editCurrentinfro.label
      } else {
        this.SavePacket.title = '保存分组'
      }
      this.handleSubmit()
    },
    // 芙蓉改过
    //保存复合条件增加
    ok(name) {
      if (this.setClass.Edit_show) {
        let url = this.HOST + '/api/rankterms'
        let aa = {
          id: this.$route.params.params.id,
          label: this.SavePacket.label,
          rank_type: this.SavePacket.evaluate_type,
          value: '',
          multerms: this.$route.params.params.multerms
        }
        if (this.SavePacket.evaluate_type == 'score') {
          aa.value = this.SavePacket.score.toString()
        } else {
          aa.value = this.SavePacket.score
        }
        console.log(aa)
        axios
          .put(url, aa)
          .then(response => {
            this.SavePacket.modal = false
            this.SavePacket.loading1 = false
            console.log(response)
          })
          .catch(response => {})
      } else {
        //为保存为计算指标的基础条件的确定提交
        if (name == 'count') {
          let cc = {
            label: this.count.label,
            aggre: this.count.Computable,
            filters: this.filters.filters
          }
          let count_url = this.HOST + '/api/norm'
          axios
            .post(count_url, cc)
            .then(response => {
              if (response.status == 200) {
                if (response.data.error == 1) {
                  this.count.modal = false
                  this.$Message.success(response.data.msg)
                } else {
                  this.count.modal == true
                  this.$Message.info(response.data.msg)
                  setTimeout(() => {
                    this.count.loading1 = false
                    this.$nextTick(() => {
                      this.count.loading1 = true
                    })
                  }, 1000)
                }
              }
            })
            .catch(response => {
              this.$Message.info('失败')
            })
        } else {
          // console.log(this.SavePacket.save_type);
          let url = ''
          if (this.SavePacket.save_type == 1) {
            //1为复合条件,2为分类分级
            url = this.HOST + '/api/tplterms'
          } else if (this.SavePacket.save_type == 2) {
            url = this.HOST + '/api/rankterms'
          }
          // console.log(url)
          //为基本保存分组的确定（保存复合条件）
          let aa = {}
          //判定为新建的保存，还是编辑的更新
          this.$refs[name].validate(valid => {
            // console.log(valid);
            if (valid) {
              //通过验证
              //新建的保存按钮
              if (this.created.editSure == false) {
                aa = {
                  label: this.SavePacket.label,
                  multerms: this.multerms.multerms,
                  rank_type: this.SavePacket.evaluate_type,
                  // value: JSON.stringify(this.SavePacket.score)
                  value: ''
                }
                if (this.SavePacket.evaluate_type == 'score') {
                  aa.value = this.SavePacket.score.toString()
                  // aa.value = this.SavePacket.score;
                } else {
                  aa.value = this.SavePacket.score
                }
                axios
                axios
                  .post(url, aa)
                  .then(response => {
                    if (response.status == 200 && response.data.error == 1) {
                      this.SavePacket.modal = false
                      if (this.SavePacket.save_type == 1) {
                        this.getCreatedCondition()
                      }
                      this.$Message.success(response.data.msg)
                    } else {
                      this.SavePacket.modal == true
                      this.$Message.info(response.data.msg)
                      setTimeout(() => {
                        this.SavePacket.loading1 = false
                        this.$nextTick(() => {
                          this.SavePacket.loading1 = true
                        })
                      }, 1000)
                    }
                  })
                  .catch(error => {
                    this.$Message.info('服务器获取失败')
                  })
              } else if (this.created.editSure == true) {
                //编辑的更新
                aa = {
                  label: this.SavePacket.label,
                  multerms: this.multerms.multerms,
                  id: this.created.editCurrentinfro.id
                }
                axios
                axios
                  .put(url, aa)
                  .then(response => {
                    if (response.status == 200 && response.data.error == 1) {
                      this.SavePacket.modal = false
                      if (this.SavePacket.save_type == 1) {
                        this.getCreatedCondition()
                      }
                      this.$Message.success(response.data.msg)
                    } else {
                      this.SavePacket.modal == true
                      this.$Message.info(response.data.msg)
                      setTimeout(() => {
                        this.SavePacket.loading1 = false
                        this.$nextTick(() => {
                          this.SavePacket.loading1 = true
                        })
                      }, 1000)
                    }
                  })
                  .catch(error => {
                    this.$Message.info('服务器获取失败')
                  })
              }
            } else {
              setTimeout(() => {
                this.SavePacket.loading1 = false
                this.$nextTick(() => {
                  this.SavePacket.loading1 = true
                })
              }, 1000)
            }
          })
          // console.log(aa)
        }
      }
    },
    //汪的
    //得到分数的类型
    getScoreType(val) {
      //1位等级。2为分数
      //level位等级。score为分数
      if (val == 'level') {
        this.SavePacket.score = ''
      } else if (val == 'score') {
        this.SavePacket.score = 0
      }
    },
    //已创建的条件的全选
    handleCheckAll() {
      // console.log(val)
      if (this.created.indeterminate) {
        // console.log(this.created.indeterminate)
        this.created.checkAll = false
      } else {
        this.created.checkAll = !this.created.checkAll
      }
      this.created.indeterminate = false
      if (this.created.checkAll) {
        var checkname = []
        this.created.checkAllGroup.forEach(val => {
          checkname.push(val.label)
        })
        this.created.checked = checkname
        this.created.checkedInfo = this.created.checkAllGroup
      } else {
        this.created.checked = []
      }
    },
    //不全选
    checkAllGroupChange(data) {
      if (data.length > 0) {
        this.created.selectedshow = true
        //console.log(this.created.checkAllGroup)
        this.created.checkAllGroup.forEach((value, index) => {
          if (value.label == data) {
            this.created.selectedDada = value
          }
        })
      }

      if (this.created.checkedInfo.length < data.length) {
        this.created.checkAllGroup.forEach(item => {
          if (data[data.length - 1] == item.label) {
            this.created.checkedInfo.push(item)
            // item.multerms.forEach(val => {
            //   this.multerms.multerms.push(val);
            // });
          }
        })
      } else {
        //取消了一个
        this.created.checkedInfo = this.created.checkedInfo.filter(item => {
          return data.indexOf(item.label) >= 0
        })
      }

      if (data.length === this.created.checkAllGroup.length) {
        this.created.indeterminate = false
        this.created.checkAll = true
      } else if (data.length > 0) {
        this.created.indeterminate = true
        this.created.checkAll = false
      } else {
        this.created.indeterminate = false
        this.created.checkAll = false
      }
    },
    //删除已创建的条件
    deleteCreated() {
      if (this.created.checkedInfo.length != 0) {
        var tmpId = []
        var url = this.HOST + '/api/tplterms'
        this.created.checkedInfo.forEach(val => {
          tmpId.push(val.id)
        })
        axios
          .delete(url, { data: { ids: tmpId } })
          .then(response => {
            //判断是否是正常状态
            if (response.status == 200) {
              if (response.data.error == 1) {
                this.getCreatedCondition()
                this.created.checked = []
                this.$Message.success(response.data.msg)
              } else {
                this.$Message.info(response.data.msg)
              }
            }
          })
          .catch(error => {})
      } else {
        this.$Message.info('请先选择你要删除的条件')
      }
    }
  }
}
</script>
