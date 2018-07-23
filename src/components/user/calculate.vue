
<style scoped>
.clear {
  clear: both;
  overflow: hidden;
}
#shoppingList li:nth-child(3n + 2) {
  margin: 0 1%;
}
#shoppingList li {
  float: left;
  width: 32%;
  list-style: none;
}
</style>
<template>
  <div>
    <div style="border-bottom:1px solid #ddd;margin:20px 0;padding: 0 0 20px 0">
      <h2 style="color:#495060;font-size:16px">指标计算：</h2>
      <div class="countproperty">
        <!-- 计算字段 -->
        <div>
          <Row style="position:relative">
            <Col span="2">
            <p style="font-size: 14px">计算字段</p>
            </Col>
            <Col span="22">
            <RadioGroup v-model="checkedone" type="button">
              <Radio v-for="(value, key, index) in allStrings" :label="key" :key="index">
                <span>{{value}}</span>
              </Radio>
            </RadioGroup>
            <Button type="success" @click="checkOne()">计算</Button>
            <Button @click="clearAll" style="margin: 0 20px ">清空</Button>
            <div>
              <p style="color:#ff0000;font-size:14px;margin:10px 0">计算结果：{{calculateResult}}
              </p>
              <p style="text-align:right">

                <Button type="success" @click="saveCalculated()">保存为计算指标</Button>
              </p>
              <Spin v-if="spinShow" size="large" fix>计算中，请等候.....</Spin>
            </div>
            </Col>
          </Row>

        </div>
        <!-- 已创建的计算指标 -->
        <Row>
          <Col span="2">
          <p style="font-size: 14px">已创建的计算指标</p>
          </Col>
          <Button type="primary" @click="getFormula" v-if='showFormulas'>查看计算指标</Button>
          <Col span="22" v-if="!showFormulas">
          <div>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
              <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
              <Button type="warning" @click="deleteFormula()" :disabled='checkAllGroup.length == 0' style="margin: 0 20px 0 0">删除</Button>
              <Button type="success" :disabled='checkAllGroup.length == 0' @click="addClass">添加到指标分类</Button>
            </div>
            <div>
              <div>
                <Spin v-if="hasShow" size="large" fix></Spin>
              </div>
              <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox v-for="(item,index) in allformulas" :label="item.id" :key="index">
                  <span>{{item.label}}</span>
                  <b>
                    {{item.result}} {{item.visible == false?"不可见":"可见"}}
                    <!-- {{item.expression.join().replace(/,/g,"")}} -->
                  </b>
                  <Button size="small" @click='editFormula(item)'>编辑</Button>
                </Checkbox>
              </CheckboxGroup>
              <p v-if="allformulas.length == 0">暂无数据</p>
              <p style="border-bottom: 1px solid #e9e9e9;margin:6px 0 0 0"></p>
              <ul id="shoppingList" class="iview-admin-draggable-list clear">
                <li v-for="(item, index) in allformulas" :key="index" :data-index="index">
                  <b style="color:#ff0000;font-size:16px">{{String.fromCharCode(97+index%26)+(parseInt(index/26)==0?"":parseInt(index/26))}}. </b>{{ item.label }}
                  <b>
                    {{item.result}} {{item.visible == false?"不可见":"可见"}}
                  </b>
                </li>
              </ul>

            </div>
            <Row style="margin:10px 0">
              <Col span='20'>
              <Input v-model="formulaInput" placeholder="请填写你的计算公式" icon="close-circled" @on-click='clearFormula()'></Input>
              </Col>
              <Col span="4">
              <Button type="success" @click="checkOne()">计算</Button>
              </Col>
            </Row>
            <p>*计算公式的时候，内容由前面的索引号、+、-、*、/、()、.、%、数字组成。</p>
            <p style="color:#ff0000;font-size: 14px">计算结果：{{formulaResult}}</p>
          </div>

          </Col>
        </Row>
        <!-- 指标分类 -->
        <div style="color:#495060;font-size:14px;padding: 0 0 20px 0;margin:20px 0;border-bottom:1px solid #ddd;">
          <h2 style="color:#495060;font-size:16px">指标分类</h2>
          <div class="allproperty">
            <div>
              <Checkbox :indeterminate="classOne.indeterminate" :value="classOne.checkAll" @click.prevent.native="calhandleCheckAll()">全选</Checkbox>
              <Button type="warning" @click="deleteclass()" :disabled='calcheckAllGroup.length == 0'>删除</Button>

            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding: 10px 0">
              <b>所有分类:</b>
              <div style="display:inline-block">
                <!-- <CheckboxGroup v-model="classOne.checkAllGroup" @on-change="checkAllGroupChange(1,classOne.checkAllGroup)"> -->
                <CheckboxGroup v-model="calcheckAllGroup" @on-change="calcheckAllGroupChange">
                  <Checkbox v-for="(item,index) in allPro" :key="index" :style="{margin: '10px 0'}" :label="item.label"></Checkbox>
                </CheckboxGroup>
              </div>
              <div style="display:inline-block">
                <Input v-model="classinputValue" placeholder="请输入分类名称" icon="ios-plus-outline" @on-enter='creatClass' @on-click='creatClass'></Input>

                <!-- <InputNumber v-model="classinputValue" placeholder="请输入分类名称" icon="ios-plus-outline" @on-change='creatClass'></InputNumber> -->
              </div>
            </div>
            <b style="margin: 10px 0;display: block">归类：</b>
             <Spin size="large" v-if="showClass">加载中，请等候.....</Spin>
            <Tabs type="card" v-model="calculateSingle" @on-click='getClassSingle(calculateSingle)' :style="{margin: '10px 0'}">
              <TabPane v-for="(item,index) in allPro" :key="index" :label='item.label' :name="item.label">
                <Tag v-for="(site,index) in item.child" :key="index" :name="site.id" closable @on-close="handleClose1">
                  {{site.label}}
                  <b>{{site.visible == false ? '不可见': '可见'}}</b>
                </Tag>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

    </div>
    <!-- 保存为计算指标 -->
    <div style="text-align:right;margin:10px 0">

      <Modal v-model="SavePacket.modal" :title="SavePacket.title" @on-ok="ok('SavePacket')" :loading='SavePacket.loading1'>
        <Form ref="SavePacket" :model="SavePacket" :label-width="80" :rules="saveValidate" enctype="multipart/form-data">
          <FormItem label="名称" prop="label">
            <Input v-model="SavePacket.label" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="计算字段" prop="" v-if="checkedone != ''">
            <p>{{calString}}</p>
          </FormItem>
          <FormItem label="结果" prop="">
            <p>
              <span style="color: #ff0000;margin: 0 4em 0 0" v-if="formulaInput == ''">{{calculateResult}}</span>
              <span style="color: #ff0000;margin: 0 4em 0 0" v-if="formulaInput != ''">{{formulaResult}}</span>
            </p>
            <Spin v-if="spinShow" size="large" fix>计算中，请等候.....</Spin>
          </FormItem>
          <FormItem label="公式" prop="" v-if="formulaInput != ''">
            <p>{{calculateTmp}}</p>
          </FormItem>
          <FormItem label="用户是否可见" prop="visible">
            <RadioGroup v-model="SavePacket.visible">
              <Radio label="true">
                <span>是</span>
              </Radio>
              <Radio label="false">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="SavePacket.remark" placeholder="请输入该组的备注内容" type="textarea" :rows="4"></Input>
          </FormItem>

        </Form>
      </Modal>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import fastSearchVue from './fastSearch.vue';
// import func from './vue-temp/vue-editor-bridge';
// import func from "./vue-temp/vue-editor-bridge";
export default {
  props: ["multerms"],
  data() {
    //输入不能为空
    const inputValue = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      //计算字段展示的单选
      checkedone: "",
      calculateResult: "0", //计算结果
      spinShow: false, //单选的加载按钮
      allStrings: [], //可以计算数量的字段列表
      //已创建的计算指标的字段
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [], //被选择的项
      allformulas: [], //已经创建的计算指标
      hasShow: false, //已创建的展示列表的等待
      formulaInput: "", //填写的计算公式
      formula_id: [], //传给后台的公式值
      classinputValue: "", //指标分类的输入框
      allPro: [], //已有的指标计算的所有分类
      calcheckAllGroup: [], //已有的指标计算的分类的已选择（多选）
      calculateSingle: "", //已有的指标计算的分类的已选择（单选）
      formulaResult: "0", //公式的计算结果
      showFormulas: true, //查看已创建的计算指标
      showClass: true,//查看计算指标的已有的归类
      classOne: {
        indeterminate: true,
        checkAll: false,
        checkedinfo: [], //指标计算分类的多选的全部信息（后台数据）
        singleInfo: null //指标计算进行归类的点击切换，当前点击的项
      },
      //编辑计算指标
      editShow: false,
      editCurrent: null, //编辑点击的当前项

      //组合成的筛选条件
      mulCondition: [],
      //保存分组储存值
      SavePacket: {
        modal: false,
        label: "",
        loading1: true,
        title: "保存计算指标",
        visible: "false"
      },
      //客户端的公式
      calculateTmp: "",
      //表单验证
      saveValidate: {
        label: [
          {
            validator: inputValue,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
     //全局配置提示框
    this.$Message.config({
      top: 100,
      duration: 3
    })
    this.getList(); //获得可以计算数量的字段列表
    // this.getFormula(); //获得已经创建的计算指标列表
    this.getClasslist(-1); //获得计算指标的分类
  },
  computed: {
    // 保存计算指标的模态框的计算字段的中文显示
    calString: function() {
      var text = ""; //用户的中文字段
      var stringTmp = this.allStrings; //英文的
      if (this.checkedone == "total_rmb") {
        text = stringTmp["total_rmb"];
      } else if (this.checkedone == "total_times") {
        text = stringTmp["total_times"];
      } else if (this.checkedone == "total_vips") {
        text = stringTmp["total_vips"];
      } else if (this.checkedone == "whole_avg") {
        text = stringTmp["whole_avg"];
      }
      // console.log(stringTmp)
      return text;
    }
  },
  methods: {
    //获得可以计算数量的字段列表
    getList() {
      var a = this.HOST + "/api/calc";
      this.$axios
        .get(a)
        .then(response => {
          // console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data != null) {
                this.allStrings = response.data.data;
              } else {
              }
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            // if (error.response.data.error == 3) {
            //   alert(error.response.data);
            // }
            alert(error.response.data);
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);

            // alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //获得可以已经创建的计算指标
    getFormula() {
      this.showFormulas = false;
      this.hasShow = true;
      var a = this.HOST + "/api/formula";
      this.$axios
        .get(a)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data.data != null) {
                this.allformulas = response.data.data.data;
                // if(this.allformulas.expression != null){
                this.allformulas.forEach(val => {
                  if (val.expression.join().replace(/,/g, "").indexOf("100/100.0") != -1) {
                    //有百分数出现
                    val.result = (eval(val.expression.join().replace(/,/g, ""))*100).toFixed(2) + "%";
                  } else {
                    val.result = eval(val.expression.join().replace(/,/g, ""));
                  }
                });
                // }
                console.log(this.allformulas);
                this.hasShow = false;
              } else {
                this.hasShow = false;
                this.allformulas = [];
              }
            } else {
              this.$Message.info(response.data.msg);
              this.hasShow = false;
            }
          } else {
            this.$Message.info(response.data.msg);
            this.hasShow = false;
          }
        })
        .catch(function(error) {
          if (error.response) {
            // if (error.response.data.error == 3) {
            //   alert(error.response.data);
            // }
            alert(error.response.data);
            this.hasShow = false;
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            this.hasShow = false;
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);
            this.hasShow = false;
            alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //得到计算指标已有的分类
    getClasslist(type) {
      var a = this.HOST + "/api/normtype";
      this.$axios
        .get(a)
        .then(response => {
          // console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.allPro = [];
              if (response.data.data.data != null) {
                this.allPro = response.data.data.data;
                this.total = response.data.data.total;
                this.classOne.singleInfo = null;
                this.showClass = false;
                if (type == -1) {
                  //第一次渲染页面
                  this.calculateSingle = response.data.data.data[0].label;
                  this.classOne.singleInfo = response.data.data.data[0];
                } else {
                  //其他情况
                  this.calculateSingle = type;
                  // console.log(this.allformulas);
                  this.allPro.forEach(val => {
                    if (val.label == this.calculateSingle) {
                      this.classOne.singleInfo = val;
                    }
                  });
                }
              }else{
                 this.$Message.info('暂无数据');
                    this.showClass = false;
              }
            } else {
              this.$Message.info(response.data.msg);
                 this.showClass = false;
            }
          } else {
             this.$Message.info(response.data.msg);
            this.showClass = false;
          }
        })
        .catch(function(error) {
          if (error.response) {
            // alert(error.response.data);
             this.showClass = false;
          } else if (error.request) {
             this.showClass = false;
          } else {
             this.showClass = false;
            // alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //匹配输入的公式的Id
    makeTwo() {
      //中文转换为英文的输入符号
      this.formulaInput = this.charsintoChinese(this.formulaInput);
      var inputvalue = this.charsintoChinese(this.formulaInput).replace(
        /%/g,
        "/100.0"
      );
      this.formula_id = inputvalue.split("");
      var stringformula = [];
      var tmp = this.charsintoChinese(this.formulaInput).replace(
        /%/g,
        "/100.0"
      );
      stringformula = inputvalue.replace(/\W/g, " ").split(" ");
      var qq = []; //匹配出来的字母（因子）
      stringformula.forEach((val, index) => {
        if (val != "" && "1234567890".indexOf(val[0]) == -1) {
          qq.push(val);
        }
      });
      qq
        .filter(function(item) {
          return item.length == 2;
        })
        .forEach(val => {
          var tmpindex = -1;
          tmpindex = val.charCodeAt() - 97 + 26 * parseInt(val[1]);
          tmp = tmp.replace(val, this.allformulas[tmpindex].label);
        });
      var ids = [];
      qq
        .filter(function(item) {
          return item.length == 1;
        })
        .forEach(val => {
          var _Idindex;
          var tmpindex = -1;
          tmpindex = val.charCodeAt() - 97;
          this.formula_id.forEach((a, index) => {
            if (a == val) {
              _Idindex = {
                _index: index,
                name: val,
                _tmpindex: tmpindex
              };
              ids.push(_Idindex);
            }
          });
          tmp = tmp.replace(val, this.allformulas[tmpindex].label);
          //  tmp_ids = tmp_ids.replace(val, this.one.allCondition[tmpindex].Id);
        });
      //tmp为客户端看到的公式
      this.calculateTmp = tmp;
      //替换为ID
      ids.forEach(val => {
        this.formula_id[val._index] = this.allformulas[val._tmpindex].id;
      });
    },
    //指标计算的清空
    clearAll() {
      this.checkedone = "";
      this.calculateResult = "0";
    },
    //移除掉已经归类的指标计算
    handleClose1(event, name) {
      console.log(name);
      var closeindex = -1;
      console.log(this.classOne.singleInfo);
      if (this.classOne.singleInfo.child != null) {
        this.classOne.singleInfo.child.forEach((val, index) => {
          if (val.id == name) {
            closeindex = index;
          }
        });
        this.classOne.singleInfo.child.splice(closeindex, 1);
      }
      this.addClass();
    },
    //计算结果
    checkOne() {
      // this.mulCondition = [];
      this.spinShow = true;
      this.$emit("checkOne");
      var b = null;
      this.$nextTick(site => {
        this.mulCondition = this.multerms;
        console.log(this.multerms);
        console.log(this.mulCondition);
        if (this.checkedone == "") {
          if (this.formulaInput != "") {
            b = {
              expression: [
                {
                  which: this.checkedone,
                  multerms: this.mulCondition
                }
              ]
            };
          } else {
            this.$Message.info("请在指标计算中的计算字段里选择你要计算的字段");
            return false;
          }
        } else {
          b = {
            expression: [
              {
                which: this.checkedone,
                multerms: this.mulCondition
              }
            ]
          };
        }

        var a = this.HOST + "/api/calc";
        //计算指标
        // 加入计算公式
        if (this.formulaInput != "") {
          b.expression = [];
          this.checkedone = "";
          this.makeTwo();
          var ss = this.formula_id;
          ss.forEach(val => {
            b.expression.push(val);
          });
        }
        console.log(b);

        this.$axios
          .post(a, b)
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              if (response.data.error == 1) {
                if (response.data.data != null) {
                  var result = response.data.data;

                  //当为公式计算的结果的时候
                  if (this.formulaInput != "") {
                    this.formulaResult = eval(result.join().replace(/,/g, ""));
                    this.formulaResult =
                      eval(this.formulaResult * 100).toFixed(2) + "%";
                  } else {
                    this.calculateResult = eval(
                      result.join().replace(/,/g, "")
                    );
                  }
                  console.log(this.formulaInput);
                  // this.calculateResult = this.formulaInput
                  this.spinShow = false;
                } else {
                }
              } else {
                this.spinShow = false;
                this.$Message.info(response.data.msg);
              }
            } else {
              this.$Message.info(response.data.msg);
            }
          })
          .catch(function(error) {
            // this.spinShow = false;
            if (error.response) {
              // if (error.response.data.error == 3) {
              //   alert(error.response.data);
              // }
              alert(error.response.data);
              // this.spinShow = false;
              // console.log(error.response.data);
              // console.log(error.response.status);
            } else if (error.request) {
              // console.log(error.request);
            } else {
              // console.log("Error", error.message);
              // this.spinShow = false;
              alert(error.message);
            }
            // console.log(error.config);
          });
      });
    },

    //清楚公式的input框
    clearFormula() {
      this.formulaInput = "";
      this.calculateResult = "0";
      this.formulaResult = "0";
    },
    //经公式输入框的中文输入码转换为英文的
    charsintoChinese(inputval) {
      // 中文的单,双引号转换为英文的
      var tmp = inputval.replace(/\‘|\’/g, "'").replace(/\“|\”/g, '"');
      //中括号和大括号转换为英文的
      tmp = tmp
        .replace(/\【/g, "[")
        .replace(/\】/g, "]")
        .replace(/\{/g, "{")
        .replace(/\}/g, "}");
      //逗号转换
      tmp = tmp.replace(/，/g, ",");
      //括号
      tmp = tmp.replace(/\（/g, "(").replace(/\）/g, ")");
      return tmp;
      // console.log(tmp)
    },
    //编辑已创建的计算指标
    editFormula(item) {
      console.log(item);
      this.editCurrent = item;
      this.editShow = true;
      this.SavePacket.modal = true;
      this.SavePacket.title = "编辑计算指标";
      this.SavePacket.label = item.label;
      this.SavePacket.visible = JSON.stringify(item.visible);
      this.calculateResult = item.result;
      this.checkedone = "";
      this.calculateTmp = "无";
    },
    //计算字段的全选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
        this.allformulas.forEach(val => {
          this.checkAllGroup.push(val.id);
        });
      } else {
        this.checkAllGroup = [];
      }
    },
    //计算字段的多选
    checkAllGroupChange(data) {
      console.log(data);
      if (data.length === this.allformulas.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      // console.log( this.allformulas)
      // this.allformulas.forEach(item => {
      //   if (item.label == data[data.length - 1]) {
      //     this.classOne.checkedinfo.push(item);
      //   }
      // });
      // console.log(this.classOne.checkedinfo)
    },
    //保存为计算指标的弹出框
    saveCalculated() {
      this.mulCondition = [];
      this.SavePacket.label = "";
      this.SavePacket.visible = "false";
      this.SavePacket.title = "保存计算指标";
      this.calculateResult = "0";
      this.editShow = false;
      // this.calculateResult = '无'
      if (this.checkedone == "") {
        //选择计算字段
        if (this.formulaInput != "") {
          this.SavePacket.modal = true;
          this.mulCondition = this.multerms;
          this.makeTwo();
          this.checkOne();
        } else {
          this.SavePacket.modal = false;
          this.$Message.info("请在指标计算中的计算字段里选择你要计算的字段");
        }
      } else {
        this.SavePacket.modal = true;
        this.mulCondition = this.multerms;
        this.makeTwo();
        this.checkOne();
      }
    },
    //删除已创建的计算指标
    deleteFormula() {
      //   console.log(this.checkAllGroup);
      let url = this.HOST + "/api/formula";
      this.$axios
        .delete(url, { data: { ids: this.checkAllGroup } })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.getFormula();
              this.$Message.success(response.data.msg);
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            // if (error.response.data.error == 3) {
            //   alert(error.response.data);
            // }
            alert(error.response.data);
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);

            alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //保存为计算指标
    ok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //通过验证
          let url = this.HOST + "/api/formula";
          //当编辑已创建的计算指标
          if (this.editShow) {
            var ff = {
              id: this.editCurrent.id,
              label: this.SavePacket.label,
              visible: JSON.parse(this.SavePacket.visible)
            };
            this.$axios
              .patch(url, { id: ff.id, label: ff.label, visible: ff.visible })
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  if (response.data.error == 1) {
                    this.$Message.success(response.data.msg);
                    this.SavePacket.modal = false;
                    this.getFormula();
                  } else {
                    this.$Message.info(response.data.msg);
                  }
                } else {
                  this.$Message.info(response.data.msg);
                }
              })
              .catch(function(error) {
                if (error.response) {
                  alert(error.response.data);
                  // console.log(error.response.data);
                  // console.log(error.response.status);
                } else if (error.request) {
                  // console.log(error.request);
                } else {
                  // console.log("Error", error.message);
                  alert(error.message);
                }
                // console.log(error.config);
              });
          } else {
            //计算指标
            // 加入计算公式
            var aa = null;
            aa = {
              label: this.SavePacket.label,
              visible: JSON.parse(this.SavePacket.visible),
              expression: [
                {
                  which: this.checkedone,
                  multerms: this.mulCondition
                }
              ]
            };
            //当保存公式计算下来的指标
            if (this.formulaInput != "") {
              aa.expression = [];
              this.checkedone = "";
              this.makeTwo();
              var ss = this.formula_id;
              ss.forEach(val => {
                aa.expression.push(val);
              });
            }

            this.$axios
              .post(url, aa)
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  if (response.data.error == 1) {
                    this.$Message.success(response.data.msg);
                    this.SavePacket.modal = false;
                    this.getFormula();
                  } else {
                    this.$Message.info(response.data.msg);
                  }
                } else {
                  this.$Message.info(response.data.msg);
                }
              })
              .catch(function(error) {
                if (error.response) {
                  alert(error.response.data);
                  // console.log(error.response.data);
                  // console.log(error.response.status);
                } else if (error.request) {
                  // console.log(error.request);
                } else {
                  // console.log("Error", error.message);
                  alert(error.message);
                }
                // console.log(error.config);
              });
          }
        } else {
          setTimeout(() => {
            this.SavePacket.loading1 = false;
            this.$nextTick(() => {
              this.SavePacket.loading1 = true;
            });
          }, 1000);
        }
      });
    },
    // 指标计算
    //创建指标分类
    creatClass() {
      // console.log(this.classinputValue);
      var url = this.HOST + "/api/normtype";
      this.$axios
        .post(url, { label: this.classinputValue })
        .then(response => {
          //判断是否是正常状态
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              this.getClasslist(-1);
              this.calcheckAllGroup = [];
              this.classOne.checkAll = false;
              this.$Message.success(response.data.msg);
              this.classinputValue = "";
            } else {
              this.$Message.info(response.data.msg);
            }
          } else {
            this.$Message.info(msg);
          }
        })
        .catch(function(error) {
          if (error.response) {
            // if (error.response.data.error == 3) {
            //   alert(error.response.data);
            // }
            alert(error.response.data);
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // console.log("Error", error.message);

            alert(error.message);
          }
          // console.log(error.config);
        });
    },
    //指标计算的分类的全选
    calhandleCheckAll(val) {
      var tmp = this.classOne;
      if (tmp.indeterminate) {
        tmp.checkAll = false;
      } else {
        tmp.checkAll = !tmp.checkAll;
      }
      tmp.indeterminate = false;
      if (tmp.checkAll) {
        var checkname = [];
        this.allPro.forEach(val => {
          checkname.push(val.label);
        });
        this.calcheckAllGroup = checkname;
        tmp.checkedinfo = this.allPro;
      } else {
        this.calcheckAllGroup = [];
        tmp.checkedinfo = [];
      }
    },
    //指标计算的分类的多选
    //分类分级的多选框的选择
    calcheckAllGroupChange(data) {
      var tmp = this.classOne;
      tmp.singleInfo = null;
      // this.allPro.forEach(item => {
      //   if (item.label == data[data.length - 1]) {
      //     tmp.singleInfo = item;
      //   }
      // });
      if (data.length === this.allPro.length) {
        tmp.indeterminate = false;
        tmp.checkAll = true;
      } else if (data.length > 0) {
        tmp.indeterminate = true;
        tmp.checkAll = false;
      } else {
        tmp.indeterminate = false;
        tmp.checkAll = false;
      }
      // this.allPro.forEach(item => {
      //   if (item.label == data[data.length - 1]) {
      //     tmp.checkedinfo.push(item);
      //   }
      // });
      // console.log(tmp.checkedinfo)
    },
    //将已创建的计算指标添加到指标分类中
    addClass() {
      let url = this.HOST + "/api/normtype";
      var tmpId = [];
      console.log(this.classOne.singleInfo);
      console.log(this.checkAllGroup);
      if (this.allPro.length != 0) {
        if (
          this.checkAllGroup.length != 0 ||
          this.classOne.singleInfo.child != null
        ) {
          //添加选择的
          this.checkAllGroup.forEach(val => {
            tmpId.push(val);
          });
          //添加原来已有的
          if (this.classOne.singleInfo.child != null) {
            this.classOne.singleInfo.child.forEach(val => {
              tmpId.push(val.id);
            });
          }
          this.$axios
            .put(url, {
              ids: tmpId,
              id: this.classOne.singleInfo.id,
              label: this.classOne.singleInfo.label
            })
            .then(response => {
              //判断是否是正常状态
              if (response.status == 200) {
                if (response.data.error == 1) {
                  this.$Message.success(response.data.msg);
                  var ww = this.calculateSingle; //保存当前点击的项
                  this.getClasslist(ww);
                  this.classOne.checkedinfo = [];
                  this.classOne.checkAll = false;
                  this.calcheckAllGroup = [];
                  this.checkAllGroup = [];
                  this.checkAll = false;
                } else {
                  this.$Message.info(response.data.msg);
                }
              } else {
                this.$Message.info(msg);
              }
            })
            .catch(function(error) {
              if (error.response) {
                // if (error.response.data.error == 3) {
                //   alert(error.response.data);
                // }
                alert(error.response.data);
                // console.log(error.response.data);
                // console.log(error.response.status);
              } else if (error.request) {
                // console.log(error.request);
              } else {
                // console.log("Error", error.message);

                alert(error.message);
              }
              // console.log(error.config);
            });
        } else {
          this.$Message.info("请先选择你要添加的内容");
        }
      } else {
        this.$Message.info("请先创建你的指标分类");
      }
    },
    //得到指标计算的分类的单选项
    getClassSingle(data) {
      console.log(data);
      var tmp = this.classOne;
      tmp.singleInfo = null;
      this.allPro.forEach(item => {
        if (item.label == data) {
          tmp.singleInfo = item;
        }
      });
      console.log(tmp.singleInfo);
      // tmp.current = tmp.singleInfo;
      // tmp.copydisabled = tmp.singleInfo.children != null ? false : true;
    },

    //删除已有的指标计算分类
    deleteclass() {
      let url = this.HOST + "/api/normtype";
      var tmp = this.classOne;
      var tmpId = [];
      if (tmp.checkedinfo.length != 0) {
        tmp.checkedinfo.forEach(val => {
          tmpId.push(val.id);
        });
        axios
          .delete(url, { data: { ids: tmpId } })
          .then(response => {
            //判断是否是正常状态
            console.log(response);
            if (response.status == 200) {
              if (response.data.error == 1) {
                this.getClasslist(-1);
                this.calcheckAllGroup = [];
                tmp.checkedinfo = [];
                tmp.checkAll = false;
                this.$Message.success(response.data.msg);
              } else {
                this.$Message.info(response.data.msg);
              }
            } else {
              this.$Message.info(msg);
            }
          })
          .catch(function(error) {
            // this.spinShow = false;
            if (error.response) {
              // if (error.response.data.error == 3) {
              //   alert(error.response.data);
              // }
              alert(error.response.data);
              // this.spinShow = false;
              // console.log(error.response.data);
              // console.log(error.response.status);
            } else if (error.request) {
              // console.log(error.request);
            } else {
              // console.log("Error", error.message);
              // this.spinShow = false;
              alert(error.message);
            }
            // console.log(error.config);
          });
      } else {
        this.$Message.info("请先选择你要删除的内容");
      }
    }
  }
};
</script>
