<style scoped>

</style>
<template>
    <div>
        <router-view></router-view>   
        <div style="padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #ddd">
             <send style="display: inline-block"></send> 
        </div>          
        <Tabs value="0">
            <TabPane label="发送记录" name="0">
                <div style="textAlign: right;marginBottom: 20px">                               
                    <Input v-model="sendSearch" icon="ios-search" placeholder="请输入发送者的名称" style="width: 25%;" @on-enter="smsSearch" @on-click="smsSearch"/>      
                </div>
                <Table border :columns="columns7" :data="$store.state.a.sendSms" height="520"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="$store.state.a.sendSmsTotal" :current="$store.state.a.sendSmsCurrentpage" @on-change="changePage" show-total  show-elevator></Page>
                    </div>
                </div>            
            </TabPane>
            <TabPane label="定时记录" name="1">
                <div style="textAlign: right;marginBottom: 20px">                               
                    <Input v-model="sendSearch" icon="ios-search" placeholder="请输入搜索内容" style="width: 25%;"/>      
                </div>
                <Table border :columns="columns7" :data="$store.state.a.sendSms" height="520"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="$store.state.a.sendSmsTotal" :current="$store.state.a.sendSmsCurrentpage" @on-change="changePage" show-total show-elevator></Page>
                    </div>
                </div>                 
            </TabPane>
        </Tabs>
          
  </div>
</template>
<script>
import send from "./send.vue";
import createSms from "./createSms.vue";
export default {
  components: { send, createSms },
  data() {
    return {
      sendSearch: "",
      columns7: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "短信类型",
          key: "type",
          width: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.s === 0 ? "普通短信" : "营销短信";
            return h(
              "span",
              {
                props: {
                  // type: "dot",
                }
              },
              text
            );
          }
        },
        {
          title: "短信签名",
          key: "sign",
          align: "center",
          width: 150
        },
        {
          title: "模板内容",
          key: "tpl_text"
        },
        {
          title: "发送时间",
          key: "send_time",
          align: "center",
          width: 180
        },
        {
          title: "发送用户数",
          key: "mn",
           align: "center",
          width: 100
        },
        {
          title: "计费条数",
          key: "fees",
           align: "center",
          width: 100
        },
        {
          title: "发送者",
          key: "account",
           align: "center",
          width: 100
        },
         {
          title: "失败原因",
           key: "errmsg",
           align: "center",
          width: 100
        },
        {
          title: "操作",       
          width: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "router-link",
                {
                  props: {
                    to: "/market/sms/smsDetail/"+ params.index+"/" + row._id
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
  },
   created: function() {  
    this.$store.commit("getSendSms");
    
  },
  methods: {
    //搜索框
    smsSearch(value) {
      this.$store.state.a.smsSearchVal = this.sendSearch;
      this.$store.state.a.sendSmsCurrentpage = 1;
      this.$store.commit("getSendSms");
    },

    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    changePage(value) {
      this.$store.state.a.sendSmsCurrentpage = value;
      //刷新签名列表(按照页数来请求数据)
      this.$store.commit("getSendSms");
    }
  },
  watch: {
    //监听签名的搜索框的值
    sendSearch: function(val) {
      console.log(val);
      if (val == "") {
        //为空的时候，刷新数据
        this.sendSearch = "";
        this.$store.state.a.smsSearchVal = ""; //清空搜索框的值
        this.$store.commit("getSendSms");
      } else {
      }
    }
  },
  mounted: function() {
    
    // this.$store.commit("getSendSms");
    
  }
};
</script>
