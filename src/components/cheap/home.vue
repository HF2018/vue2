<template>
    <div>
        <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
            <BreadcrumbItem to="/">营销方式</BreadcrumbItem>
            <BreadcrumbItem>优惠券</BreadcrumbItem>
        </Breadcrumb>
        <div :style="{margin: '0 0 24px 0',textAlign:'left'}" >
            
        </div>
        <div :style="{padding: '24px', minHeight: '280px', background: '#fff',textAlign:'center',fontSize:'14px'}">
            <p :style="{ width: '60%', margin: '0 auto' }">
                <Input v-model="cheapCode" size="large" icon="ios-search" placeholder="请输入优惠码" @on-enter="cheapSearch" @on-click="cheapSearch"/>
                <p :style="{textAlign:'center',fontSize:'14px',margin:'10px'}">当前输入了<Button type="ghost" :style="{fontSize:'16px'}">{{cheapCode.length}}</Button>位验证码</p>
                <p :style="{textAlign:'center',fontSize:'16px',margin:'10px',color:'#ff0000'}">{{cheapError}}</p>
                <p :style="{textAlign:'center',fontSize:'16px',margin:'10px',color:'#ff0000'}">{{errorText}}</p>
                <div v-show="cheapShow">
                    <p>短信内容：{{cheapInfros.split('{')[0]}}</p>
                    <ul :style="{listStyle:'none',margin:'10px'}">
                        <li v-for="val in cheapParam" :key="val.id">{{val}}</li>
                       
                    </ul>
                </div>
                
            </p>     
        </div>     
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      cheapCode: "",
      cheapError: "",
      cheapShow: false,//优惠信息的显示与影藏
      errorText: '',//验证码无效的原因
      cheapInfros: '',//返回来的优惠信息
      cheapParam:[],
    };
  },
  methods: {
    //优惠码查询
    cheapSearch() {
      let _this = this;
      var data_all = new FormData();
      data_all.append("discode", _this.cheapCode);
      //验证输入框为6位数字
      if (_this.cheapCode == "") {
        _this.$Message.info("请输入你的验证码");
        return false;
      } else if (!/(^[0-9]\d*$)/.test(_this.cheapCode)) {
        //是否为正数
        _this.$Message.info("请输入正确的验证码");
        return false;
      } else if (_this.cheapCode.length != 6) {
        //是否为正数
        _this.$Message.info("请输入6位有效数字");
        return false;
      } else {//成功
        var a = this.HOST + "/api/sms/discode/verify";
        _this.$axios
          .post(a, data_all)
          .then(response => {
            console.log(response);
            if(response.status == 200){
                if(response.data.error == 1){//可以使用
                _this.cheapShow = true;
                _this.errorText = '';
                _this.cheapInfros = response.data.data;
                _this.cheapParam = response.data.data.split('{')[1].split(',');
                }else if(response.data.error == 2){//失败的原因
                 _this.cheapShow = false;
                    _this.errorText = response.data.msg;
                }
            }else{

            }
          })
          .catch(error => {
            // console.log(error);
          });
      }
    }
  },
  watch: {
    //监听验证码输入框的验证
    cheapCode: function(val) {
      let _this = this;
      if (val == "") {
        _this.cheapError = "请输入你的验证码";
          _this.cheapShow = false;
      } else if (!/(^[0-9]\d*$)/.test(val)) {
        _this.cheapError = "请输入有效的6位数字";
          _this.cheapShow = false;
      } else if (val.length != 6) {
        _this.cheapError = "请输入6位有效数字";
          _this.cheapShow = false;
      } else {
        _this.cheapError = "";
          _this.cheapShow = false;
      }
    }
  }
};
</script>
