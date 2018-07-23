<style lang="less">
@import "./less/draggable-list.less";
@import "../style/less/common.less";
</style>

<template>
  <div style="margin:20px 0">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          一级
        </p>
        <Row>
          <Col span="12">
          <Card dis-hover>
            <p slot="title">
              <Icon type="ios-list"></Icon>
              仓库一：所剩条件清单(拖拽到右侧方框进行添加)
            </p>
            <div>
              <p style="border-bottom: 1px dashed #ddd;margin: 10px 0">共{{one.total}}个</p>
            </div>
            <div style="height: 360px;">

              <ul id="todoList" class="iview-admin-draggable-list">
                <li v-for="(item, index) in one.allCondition" :key="index" class="notwrap todolist-item" :data-index="index">
                  <b>{{String.fromCharCode(97+index%26)+(parseInt(index/26)==0?"":parseInt(index/26))}}. </b>{{ item.Label }}
                  <Poptip title="提示" :content="'搜索结果：'+one.onedetail" placement="right">
                    <Button @click="getbaseDetail(item.Id)">了解详情</Button>
                  </Poptip>
                </li>
              </ul>
            </div>
          </Card>
          </Col>
          <Col span="12" class="padding-left-10">
          <Card dis-hover>
            <p slot="title">
              <Icon type="ios-list-outline"></Icon>
              你的选择是：(拖拽到左侧进行删除)
            </p>
            <div style="height: 360px;">
              <ul id="doList" class="iview-admin-draggable-list" ref="doList"></ul>
            </div>
            <Input v-model="one.value1" placeholder="请填写你的计算公式"></Input>
            <p v-if="one.value1 == ''|| oneChoosedLength == 0 " style="color:#ff0000">请先在左侧选择条件，再填入你的计算公式。</p>
            <p>*计算公式的时候，内容由前面的索引号、+、-、*、/、()、%、数字组成。</p>
            <!-- <Button type="primary" @click="one.value1 != '' && oneChoosedLength != 0 ? saveGroup.modal1 = true: saveGroup.modal1 = false">保存为二级指标</Button> -->
            <Button type="primary" @click="makeOne()">保存为一级指标</Button>
          </Card>
          </Col>
          <!-- 保存指标一的对话框 -->
          <Modal v-model="saveGroup.modal1" title="保存为二级指标" :loading='saveGroup.loading1' @on-ok="ok1('saveGroup')">
            <Form ref="saveGroup" :model="saveGroup" :label-width="80" :rules="saveValidate" enctype="multipart/form-data">
              <FormItem label="名称" prop="label">
                <Input v-model="saveGroup.label" placeholder="请输入名称"></Input>
              </FormItem>
              <FormItem label="计算公式" prop="formula">
                <p>{{one.formula}}</p>
              </FormItem>
              <FormItem label="备注" prop="remark">
                <Input v-model="saveGroup.remark" placeholder="请输入备注内容" type="textarea" :rows="4"></Input>
              </FormItem>
            </Form>
          </Modal>
        </Row>
      </Card>
      </Col>
    </Row>

    <Row class="margin-top-10">
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          二级
        </p>
        <div>
          <p style="border-bottom: 1px dashed #ddd;margin: 10px 0">共{{two.total}}个</p>
        </div>
        <Row>
          <Col span="12">
          <Card dis-hover>
            <p slot="title">
              <Icon type="ios-list"></Icon>
              仓库二：所剩属性清单(拖拽到右侧方框进行添加)

            </p>
            <div style="height: 360px;">
              <ul id="shoppingList" class="iview-admin-draggable-list">
                <li v-for="(item, index) in two.allCondition" :key="index" class="notwrap todolist-item" :data-index="index">
                  <b>{{String.fromCharCode(97+index%26)+(parseInt(index/26)==0?"":parseInt(index/26))}}. </b>{{ item.label }}

                </li>
              </ul>
            </div>
          </Card>
          </Col>
          <Col span="12" class="padding-left-10">
          <Card dis-hover>
            <p slot="title">
              <Icon type="ios-list-outline"></Icon>
              你的选择是：(拖拽到左侧进行删除)
            </p>
            <div style="height: 360px;">
              <ul id="affordList" class="iview-admin-draggable-list" ref="affordList"></ul>
            </div>
            <Input v-model="two.value1" placeholder="请填写你的计算公式"></Input>
            <p>*计算公式的时候，内容由前面的索引号、+、-、*、/、()、%、数字组成。</p>
            <p v-if="two.value1 == ''|| twoChoosedLength == 0 " style="color:#ff0000">请先在左侧选择条件，再填入你的计算公式。</p>
            <Button type="primary" @click="makeTwo()">保存为二级指标</Button>

          </Card>

          <!-- 保存指标二的对话框 -->
          <Modal v-model="savetwo.modal1" title="保存为二级指标" :loading='savetwo.loading1' @on-ok="ok1('savetwo')">
            <Form ref="savetwo" :model="savetwo" :label-width="80" :rules="savetwoValidate" enctype="multipart/form-data">
              <FormItem label="名称" prop="label">
                <Input v-model="savetwo.label" placeholder="请输入名称"></Input>
              </FormItem>
              <FormItem label="计算公式" prop="formula">
                <p>{{two.formula}}</p>
              </FormItem>
              <FormItem label="备注" prop="remark">
                <Input v-model="savetwo.remark" placeholder="请输入备注内容" type="textarea" :rows="4"></Input>
              </FormItem>
            </Form>
          </Modal>
          </Col>
        </Row>
      </Card>
      </Col>

    </Row>
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          三级
        </p>
        <Row>
          <Col span="24">
          <Card dis-hover>
            <p slot="title">
              <Icon type="ios-list"></Icon>
              仓库三：所有指标
            </p>
            <div>
              <p style="border-bottom: 1px dashed #ddd;margin: 10px 0">共{{three.total}}个</p>
            </div>
            <div style="height: 360px;">
              <Table border :columns="three.columns" :data="three.allCondition" class="iview-admin-draggable-list"></Table>

            </div>
          </Card>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import axios from "axios";
export default {
  name: "draggable-list",
  data() {
    //输入不能为空
    const inputValue = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      saveValidate: {
        label: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ]
      },
      savetwoValidate: {
        label: [
          {
            validator: inputValue,
            trigger: "change"
          }
        ]
      },
      value2: "",
      //一级
      one: {
        allCondition: [],
        total: 0,
        // value1: "(a1-c2)/3",
        value1: "",
        formula: [], //组成一级的公式
        ids: [], //组成一级的条件组的id
        choosed: [],
        formula_id: [], //提交到后台的公式
        onedetail: "" //基础条件的了解详情的结果
      },
      two: {
        allCondition: [],
        total: 0,
        // value1: "(a1-c2)/3",
        value1: "",
        formula: [], //组成二级的公式
        ids: [], //组成二级的条件组的id
        choosed: [],
        formula_id: [] //提交到后台的公式
      },
      three: {
        allCondition: [],
        total: 0,
        columns: [
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "名称",
            key: "label"
          },
          {
            title: "公式",
            key: "formula_id"
          },
          {
            title: "计算结果",
            key: "formula_value"
          }
        ]
      },
      //保存为二级指标的模态框
      savetwo: {
        label: "",
        remark: "",
        loading1: true,
        modal1: false
      },
      //保存为指标2
      saveGroup: {
        label: "",
        remark: "",
        loading1: true,
        modal1: false
      },
      todoArray: [
        {
          content: "上一会计期间有效会员数"
        },
        {
          content: "本会计期间有效会员数"
        },
        {
          content: "60天消费2次以上的会员数"
        },
        {
          content: "总有效消费会员数"
        },
        {
          content: "本会计期间有消费的会员数"
        },
        {
          content: "上一会计期间有消费的会员数"
        },
        {
          content: "封装更多图表"
        },
        {
          content: "增加更多人性化功能"
        }
      ],
      doArray: [],
      shoppingList: [
        { name: "会员活跃度" },
        { name: "有效会员增长率" },
        { name: "有效会员回头率" },
        { name: "会员流失率" },
        { name: "酱汁腊肉" },
        { name: "松花小肚" },
        { name: "白丸子" },
        { name: "红丸子" },
        { name: "汆丸子" },
        { name: "蒸熊掌" },
        { name: "蒸羊羔" },
        { name: "蒸鹿尾" },
        { name: "梅菜扣肉" },
        { name: "四喜丸子" },
        { name: "酒酿萝卜皮" },
        { name: "红烧胖大海" },
        { name: "连年有鱼" }
      ],
      affordList: []
    };
  },
  created() {
    this.getallBase();
    this.getOneall();
    this.getTwoall();
  },
  computed: {
    //选择的第一级的个数
    oneChoosedLength: function() {
      return this.$refs.doList.children.length;
    },
    //选择的第一级的个数
    twoChoosedLength: function() {
      return this.$refs.affordList.children.length;
    },
  
   
  },
  //   watch: {
  //     //监听签名的搜索框的值
  //     oneChoosedLength: function(val) {
  //       this.one.choosedlength =  this.$refs.doList.children.length;
  //     }
  //   },

  mounted() {
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    let vm = this;
    let todoList = document.getElementById("todoList");
    Sortable.create(todoList, {
      group: {
        name: "list",
        pull: true
      },
      animation: 120,
      ghostClass: "placeholder-style",
      fallbackClass: "iview-admin-cloned-item",
      onRemove(event) {
        vm.doArray.splice(
          event.newIndex,
          0,
          vm.todoArray[event.item.getAttribute("data-index")]
        );
      }
    });
    let doList = document.getElementById("doList");
    Sortable.create(doList, {
      group: {
        name: "list",
        pull: true
      },
      sort: false,
      filter: ".iview-admin-draggable-delete",
      animation: 120,
      fallbackClass: "iview-admin-cloned-item",
      onRemove(event) {
        vm.doArray.splice(event.oldIndex, 1);
      }
    });
    let shoppingList = document.getElementById("shoppingList");
    Sortable.create(shoppingList, {
      group: {
        name: "list",
        pull: true
      },
      animation: 120,
      ghostClass: "placeholder-style",
      fallbackClass: "iview-admin-cloned-item",
      onRemove(event) {
        vm.affordList.splice(
          event.newIndex,
          0,
          vm.shoppingList[event.item.getAttribute("data-index")]
        );
      }
    });
    let affordList = document.getElementById("affordList");
    Sortable.create(affordList, {
      group: {
        name: "list",
        pull: true
      },
      sort: false,
      filter: ".iview-admin-draggable-delete",
      animation: 120,
      fallbackClass: "iview-admin-cloned-item",
      onRemove(event) {
        vm.affordList.splice(event.oldIndex, 1);
      }
    });
  },
  methods: {
    //创建一级指标的弹出框
    makeOne() {
      this.one.value1 != "" && this.oneChoosedLength != 0
        ? (this.saveGroup.modal1 = true)
        : (this.saveGroup.modal1 = false);
      this.one.formula = this.one.value1.split("");
      this.one.formula_id = this.one.value1.split(""); //匹配的id
      var stringformula = [];
      var tmp = this.one.value1;
    
      stringformula = this.one.value1.replace(/\W/g, " ").split(" ");
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
          console.log(val);
          var tmpindex = -1;
          tmpindex = val.charCodeAt() - 97 + 26 * parseInt(val[1]);
           if(tmpindex < this.one.allCondition.length){
           tmp = tmp.replace(val, this.one.allCondition[tmpindex].Label);
          }
          
          
        });
      var ids = [];
      qq
        .filter(function(item) {
          return item.length == 1;
        })
        .forEach(val => {
          console.log(val);
          var _Idindex;
          var tmpindex = -1;
          tmpindex = val.charCodeAt() - 97;
          console.log(tmpindex);
          this.one.formula_id.forEach((a, index) => {
            if (a == val) {
              _Idindex = {
                _index: index,
                name: val,
                _tmpindex: tmpindex
              };
              ids.push(_Idindex);
            }
          });
          console.log(ids);
          if(tmpindex < this.one.allCondition.length){
            tmp = tmp.replace(val, this.one.allCondition[tmpindex].Label);
          }
          
        
        });
        var tmp_id = tmp;
        this.one.allCondition.forEach(element => {
          tmp_id = tmp_id.replace(element.Label, element.Id);
        });
        console.log(tmp_id)
      //替换为ID
      ids.forEach(val => {
        this.one.formula_id[val._index] = this.one.allCondition[
          val._tmpindex
        ].Id;
      });
      console.log(tmp);
      this.one.formula = tmp;
      this.one.formula_id = tmp_id;
    },
    //为二级的模态框
    makeTwo() {
      this.two.value1 != "" && this.two.total != 0
        ? (this.savetwo.modal1 = true)
        : (this.savetwo.modal1 = false);
      this.two.formula = this.two.value1.split("");
      this.two.formula_id = this.two.value1.split("");
      var stringformula = [];
      var tmp = this.two.value1;
      stringformula = this.two.value1.replace(/\W/g, " ").split(" ");
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
          console.log(val);
          var tmpindex = -1;
          tmpindex = val.charCodeAt() - 97 + 26 * parseInt(val[1]);
          tmp = tmp.replace(val, this.two.allCondition[tmpindex].label);
        });
      var ids = [];
      qq
        .filter(function(item) {
          return item.length == 1;
        })
        .forEach(val => {
          console.log(val);
          var _Idindex;
          var tmpindex = -1;
          tmpindex = val.charCodeAt() - 97;
          console.log(tmpindex);
          this.two.formula_id.forEach((a, index) => {
            if (a == val) {
              _Idindex = {
                _index: index,
                name: val,
                _tmpindex: tmpindex
              };
              ids.push(_Idindex);
            }
          });
          console.log(ids);
          tmp = tmp.replace(val, this.two.allCondition[tmpindex].label);
          //  tmp_ids = tmp_ids.replace(val, this.one.allCondition[tmpindex].Id);
        });
      //替换为ID
      ids.forEach(val => {
        this.two.formula_id[val._index] = this.two.allCondition[
          val._tmpindex
        ].id;
      });
      console.log(tmp);
      this.two.formula = tmp;
      // stringformula = this.two.value1.replace(/\W/g, " ").split("");
      // console.log(stringformula);
      // var qq = [];
      // stringformula.forEach((val, index) => {
      //   if (val != " ") {
      //     //记录在公式中出现的字母以及其位置
      //     var ww = {
      //       _index: index,
      //       name: val
      //     };
      //     qq.push(ww);
      //   }
      // });
      // console.log(qq);
      // qq.forEach(val => {
      //   this.two.formula[val._index] = this.two.allCondition[
      //     val.name.charCodeAt() - 97
      //   ].label; //收藏公式当中的文字显示
      //   this.two.formula_id[val._index] = this.two.allCondition[
      //     val.name.charCodeAt() - 97
      //   ].id; //收藏公式当中的Id
      // });
      // this.two.formula = this.two.formula.toString().replace(/,/g, "");
    },
    //得到所有的基本值列表
    getallBase() {
      var a = this.HOST + "/api/norm";
      axios({
        method: "get",
        url: a
      }).then(response => {
        console.log(response);
        // this.$Message.success(response.data.msg);
        if (response.status == 200) {
          if (response.data.error == 1) {
            if (response.data.data.total != 0) {
              this.one.allCondition = response.data.data.data;
              this.one.total = response.data.data.total;
            }
          } else {
            this.$Message.info("暂无数据");
          }
        }
      });
    },
    //得到第一级的所有的基本组列表
    getOneall() {
      var a = this.HOST + "/api/norm/onelevel";
      axios({
        method: "get",
        url: a
      }).then(response => {
        console.log(response);
        // this.$Message.success(response.data.msg);
        if (response.status == 200) {
          if (response.data.error == 1) {
            if (response.data.data.total != 0) {
              this.two.allCondition = response.data.data.data;
              this.two.total = response.data.data.total;
            }
          } else {
            this.$Message.info("暂无数据");
          }
        }
      });
    },
    //得到第二级的所有的指标列表
    getTwoall() {
      var a = this.HOST + "/api/norm/twolevel";
      axios({
        method: "get",
        url: a
      }).then(response => {
        console.log(response);
        // this.$Message.success(response.data.msg);
        if (response.status == 200) {
          if (response.data.error == 1) {
            if (response.data.data.total != 0) {
              this.three.allCondition = response.data.data.data;
              this.three.total = response.data.data.total;
              var e = [];     
              this.three.allCondition.forEach((val, index) => {
                 e.push(val)
              });
               console.log(e);
               console.log(e[0].formula_id);
              e.forEach(val => {  
                console.log(val.formula_id)
              })
               this.three.allCondition = e;
              console.log(this.three.allCondition);
             
        
            }
          } else {
            this.$Message.info("暂无数据");
          }
        }
      });
    },
    ok1(name) {
      console.log(name);
      this.$refs[name].validate(valid => {
        // console.log(valid);

        if (valid) {
          if (name == "saveGroup") {
            //创建第一级指标
            let a = this.HOST + "/api/norm/onelevel";
            let b = {
              label: this.saveGroup.label,
              formula_id: this.one.formula_id,
              remark: this.saveGroup.remark
            };
            axios
              .post(a, b)
              .then(response => {
                if (response.status == 200 && response.data.error == 1) {
                  this.saveGroup.modal1 = false;
                  this.$Message.success(response.data.msg);
                  this.getOneall();
                } else {
                  this.saveGroup.modal1 == true;
                  this.$Message.info(response.data.msg);
                  setTimeout(() => {
                    this.saveGroup.loading1 = false;
                    this.$nextTick(() => {
                      this.saveGroup.loading1 = true;
                    });
                  }, 1000);
                }
              })
              .catch(error => {
                this.$Message.info("保存失败");
              });
          } else if (name == "savetwo") {
            let a = this.HOST + "/api/norm/twolevel";
            let b = {
              label: this.savetwo.label,
              formula_id: this.two.formula_id,
              remark: this.savetwo.remark
            };
            axios
              .post(a, b)
              .then(response => {
                if (response.status == 200 && response.data.error == 1) {
                  this.savetwo.modal1 = false;
                  this.$Message.success(response.data.msg);
                  // this.getOneall();
                } else {
                  this.savetwo.modal1 == true;
                  this.$Message.info(response.data.msg);
                  setTimeout(() => {
                    this.savetwo.loading1 = false;
                    this.$nextTick(() => {
                      this.savetwo.loading1 = true;
                    });
                  }, 1000);
                }
              })
              .catch(error => {
                this.$Message.info("保存失败");
              });
          }
        }
      });
    },
    //点击基础计算字段的了解详情
    getbaseDetail(id) {
      var a = this.HOST + "/api/norm/value?id=" + id;
      axios({
        method: "get",
        url: a
      }).then(response => {
        // console.log(response);
        // this.$Message.success(response.data.msg);
        if (response.status == 200) {
          if (response.data.error == 1) {
            this.one.onedetail = response.data.count;
          } else {
            this.$Message.info("暂无数据");
          }
        }
      });
    }
  }
};
</script>
