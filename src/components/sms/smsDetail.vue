<style scoped>
.notice_text {
  text-align: left;
  border-radius: 4px;
  padding: 2px 10px;
  line-height: 18px;
  background: #f0f0f0;
  /* border: 1px solid #ddd; */
  font-size: 14px;
  padding-bottom: 10px;
  margin-top: 10px;
}
.notice_text ul {
  clear: both;
  overflow: hidden;
  margin: 10px 0;
}
.notice_text ul li {
  float: left;
  list-style: none;
  color: #999;
  margin-right: 10px;
}
.notice_text ul li span {
  color: #000;
}
</style>
<template>
    <div>
        <router-link to="/market/sms/sendSms">发送短信与历史记录 > </router-link>
        <span>短信详情</span>
        <div class='notice_text'>
            <ul>   
                <li>短信签名：<span>{{currentModal.sign}}</span></li>
                <li>短信类型：<span>{{currentModal.type == 1?'营销短信':'普通短信'}}</span></li>
                <li>发送时间：<span>{{currentModal.send_time}}</span></li>
                <li>发送用户数：<span>{{currentModal.mn}}</span></li>
                <li>计费条数：<span>{{currentModal.fees}}</span></li>
                <li>发送者：<span>{{currentModal.account}}</span></li>
            </ul>
            <p style="color: #999;margin: 0 0 10px 0">发送失败的原因：<span style="color:#000">{{currentModal.errmsg}}</span></p>
            <p style="color: #999">模板内容：<span style="color:#000">{{currentModal.tpl_text}}</span></p>
        </div>
        <div style="textAlign: right;margin: 20px 0">                              
            <Input v-model="sendDetailSearch" icon="ios-search" placeholder="请输入电话号码" style="width: 25%;"  @on-enter="detailSearch" @on-click="detailSearch"/>   
        </div>
        <div>
            <Table border :columns="columns7" :data="sendDetail" height="520"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="sendDetailTotal" :current="sendDetailCurrent" @on-change="changePage" show-total  show-elevator></Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      sendDetail: [], //发送详情的数据
      sendDetailTotal: 0, //发送详情的总数据
      sendDetailCurrent: 1, //发送详情的当前页面
      sendDetailId: null, //发送详情的id
      sendDetailSearch: "", //发送详情的搜索值
      columns7: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "手机号码",
          key: "mobile",
          width: 120,
          align: "center"
        },
        {
          title: "发送内容",
          key: "content"
        },
        {
          title: "计费条数",
          key: "fee",
          width: 100,
          align: "center"
        },
        {
          title: "接收时间",
          key: "user_receive_time",
          width: 100,
          align: "center"
        },
        {
          title: "接收状态",
          key: "report_status",
          width: 100,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color = row.report_status === "SUCCESS" ? "#19BE6B" : "red";
            const text = row.report_status === "SUCCESS" ? "成功" : "失败";
            return h(
              "span",
              {
                props: {},
                style: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "状态描述",
          key: "description",
          width: 100,
          align: "center"
        }
      ]
    };
  },
  methods: {
    //得到发送记录的详情数据
    getSendDetail() {
      let _this = this;
      var a = this.HOST +
        "/api/sms/send/detail?p=" +
        _this.sendDetailCurrent +
        "&g=" +
        _this.sendDetailId +
        "&w=" +
        _this.sendDetailSearch;
      _this
        .$axios({
          method: "get",
          url: a
        })
        .then(function(response) {
          console.log(response);
          if (response.status == 200) {
            if (response.data.error == 1) {
              _this.sendDetail = response.data.data.data; //总数据
              _this.sendDetailTotal = response.data.data.total; //总条数
            }else{
                console.log(22)
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //搜索框
    detailSearch(value) {
      let _this = this;
      //验证输入的值是否为空
      if (_this.sendDetailSearch == "") {
        _this.$Message.info("请输入正确的电话号码");
        return false;
      } else if (!/(^[0-9]\d*$)/.test(_this.sendDetailSearch)) {
        //是否为正数
        _this.$Message.info("请输入正确的电话号码");
        return false;
      }
      _this.sendDetailCurrent = 1;
      _this.getSendDetail();
    },
    changePage(value) {
      let _this = this;
      _this.sendDetailCurrent = value;
      _this.getSendDetail();
    }
  },
  watch: {
    //监听详情的搜索框的值
    sendDetailSearch: function(val) {
      if (val == "") {
        //为空的时候，刷新数据
        this.sendDetailSearch = "";
        this.getSendDetail();
      } else {
      }
    }
  },
  beforeCreate: function() {
    var b = this.HOST + "/api/sms/send/refresh";
    this.$axios
      .get(b)
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  created: function() {
    let _this = this;
    _this.sendDetailId = _this.$route.params.id; //获得当前详情的分组Id
    // console.log(this.$route.params.id)
    _this.getSendDetail();
  },
  computed: {
    currentModal: function() {
      //当前详情的模板信息
      return this.$store.state.a.sendSms[this.$route.params.index];
    }
  },
  mounted: function() {}
};
</script>
