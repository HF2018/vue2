<style scoped>
.controldetail li {
  list-style: none;
}
.sms_link li {
  background-color: #fff;
  color: #2d8cf0;
  height: 40px !important;
  line-height: 40px !important;
  margin-right: 10px;
  border: none !important;
  padding: 0;
  list-style: none;
  float: left;
}
.sms_link {
  background-color: transparent;
  clear: both;
  overflow: hidden;
}
.sms_link li a {
  color: #fff;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #2d8cf0;
}
.sms_link li a.router-link-active {
  border: 1px solid #2d8cf0 !important;
}
.smsSetting .ivu-tabs {
  overflow: visible;
  opacity: 1;
}
</style>

<template>
  <div>
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
      <BreadcrumbItem to="/project/plans">营销方案</BreadcrumbItem>
      <BreadcrumbItem to="">创建方案</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',fontSize: '14px',color: '#495060'}">
      <div style="border: 1px solid #DDD;padding: 2em 1em;border-radius: 4px;">
        <Form ref="SavePacket" :model="SavePacket" :label-width="100" :rules="saveValidate" enctype="multipart/form-data" class="smsSetting">
          <FormItem label="营销目标" prop="aimcheck">
            <!-- <Input v-model="SavePacket.label" placeholder="请输入名称"></Input> -->
            <!-- <Select v-model="SavePacket.aimcheck" multiple placeholder="请搜索选择，可以多选" filterable>
              <Option v-for="(item,index) in SavePacket.allaims" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select> -->
            <Select v-model="SavePacket.aimcheck" placeholder="请搜索选择" filterable clearable>
              <Option v-for="(item,index) in aims" :value="item.id" :key="index">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="方案名称" prop="label">
            <Input v-model="SavePacket.label" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="用药方案" prop="drugProject">
            <Input v-model="SavePacket.drugProject" placeholder="请输入内容" type="textarea" :rows="4"></Input>
          </FormItem>
          <!-- <FormItem label="会员优先分配" prop="order">
            <Select v-model="SavePacket.order" multiple placeholder="请搜索选择，可以多选" filterable>
              <Option v-for="(item,index) in SavePacket.orders" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem> -->
          <!-- <FormItem label="操作流程">
                        <p style="font-weight: bold">具体操作流程：</p>
                        <ul class="controldetail">
                            <li>1、确定营销目标；</li>
                            <li>2、短信、微信发优惠券及免费复查HP；</li>
                            <li>3、到店引导注册微信公众号，员工端或顾客端录入会员健康档案，便于后期微信营销；</li>
                            <li>4、根据患者情况组合搭配用药，并记录患者购药信息等；</li>
                            <li>5、根据1/2/3级诊断生成电脑自动匹配方案；</li>
                            <li>6、定时推送优惠信息及活动、相关健康资讯；</li>
                            <li>7、跟踪管理患者病情发展情况，动态录入用药、生活习惯等信息；</li>
                            <li style="color:#ff0000">注：HP筛查、健康档案录入、患者回访等需集中培训。</li>
                        </ul>
                    </FormItem> -->

          <FormItem label="维系方式配置">

            <Tabs type="card">
              <TabPane label="短信维系">
                <smsSetting></smsSetting>
              </TabPane>
              <TabPane label="电话维系">
                <!-- <phoneSetting></phoneSetting> -->
              </TabPane>
              <TabPane label="微信维系">微信维系</TabPane>
            </Tabs>
          </FormItem>
          <FormItem style="text-align:right">
            <Button type="primary" @click="handleSubmit('SavePacket')">保存</Button>
            <Button type="ghost" @click="handleReset('SavePacket')" style="margin-left: 8px">清空</Button>
          </FormItem>
        </Form>
      </div>
      <!-- <div style="border-bottom:1px solid #ddd;padding:20px 0">
        <h2 style="color:#495060;font-size:16px">维系方式选择</h2>
         <Tabs type="card" style="height: 200px">
            <TabPane label="短信维系">
              <smsSetting></smsSetting>
            </TabPane>
            <TabPane label="短信维系">
              <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
            </TabPane>
            <TabPane label="电话维系">电话维系</TabPane>
            <TabPane label="微信维系">微信维系</TabPane>
          </Tabs>
      </div> -->

    </Content>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import smsSetting from "./smsSetting.vue";
export default {
  components: { smsSetting },
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
      //所有的目标
      aims: [],
      //得到目标的ids
      tmpIds: "",
      //保存分组储存值
      SavePacket: {
        label: "",
        aimcheck: "", //选择的目标(用id在配合)
        allaims: "", //所有目标（下拉框数据）
        drugProject: "",
        order: [],
        orders: ["重要会员", "次要会员"]
      },
      //表单验证
      saveValidate: {
        label: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        aimcheck: [
          {
            required: true,
            type: "array",
            message: "请选阵你的营销目标",
            trigger: "blur"
          }
        ],
        drugProject: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // this.$store.commit("GetTactics");
    this.GetTactics();
  },
  methods: {
    //得到已有的目标（分好类的）
    GetTactics() {
      let url = this.HOST + "/api/target";
      this.$axios
        .get(url)
        .then(response => {
          console.log(response);
          //判断是否是正常状态  筛选出营销策略分类
          if (response.status == 200) {
            if (response.data.error == 1) {
              if (response.data.data.data != null) {
                this.aims = response.data.data.data;//所有的目标
                 var tmp = null;
                tmp = this.$route.params.params; //从会员中心的匹配方案中进来         
                  //提前已经选好的,从会员中心的匹配方案中进入
                  if (tmp != null) {
                    this.SavePacket.aimcheck = tmp.id;
                  }               
              } else {
                this.$Message.info("暂无数据");
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
            alert(error.response.data);
            // console.log(error.response.data);
            // console.log(error.response.status);
          } else if (error.request) {
            // console.log(error.request);
          } else {
          }
          // console.log(error.config);
        });
    },
   
    //提交表单
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //清空表单
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
