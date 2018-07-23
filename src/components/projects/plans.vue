<style scoped>
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
  color: #2d8cf0 !important;
  border: 1px solid #2d8cf0 !important;
}
</style>
<template>
  <div>
    <!-- 添加营销方案 -->
    <!-- <div style="padding-bottom: 15px; margin: 15px 0; border-bottom: 1px solid #ddd">
      <createPlans></createPlans>
    </div> -->
    <Breadcrumb :style="{margin: '20px 0',textAlign:'left'}">
      <BreadcrumbItem to="/project/plans">营销方案</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',fontSize: '14px',color: '#495060'}">
      <div style="padding-bottom: 15px; margin: 15px 0; border-bottom: 1px solid #ddd">
        <ul class="sms_link">
          <li>
            <router-link to="/project/createPlans">
              创建营销方案
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <h2 style="color:#495060;font-size:16px; margin:0 0 15px 0">已创建的营销方案</h2>
        <Row v-show="plansShow">
          <Col span="5" v-for="(site,index) in sites" offset="1" style=" marginBottom: 20px" :key="index">
          <div @click="link(site.id)">
            <!-- <router-link :to=plansDetail > -->
            <Card>
              <p slot="title">方案1 标题为 {{ site.name }}</p>
              <p>{{ site.remark }}</p>
              <p>{{ site.remark }}</p>
              <p>{{ site.remark }}</p>

            </Card>
            <!-- </router-link>                    -->
          </div>

          </Col>
        </Row>

      </div>
    </Content>
  </div>
</template>
<script>
import createPlans from "./createPlans.vue";
// import pDetails from "./plansDetail.vue";
export default {
  components: { createPlans },
  data() {
    return {
      modal1: false,
      plansShow: true,
      sites: [
        { id: 1, name: "Runoob", remark: "东方决定是否还记得" },
        { id: 2, name: "Google", remark: "反反复复烦烦烦" },
        { id: 3, name: "fdff", remark: "反对反对法会更好" },
        { id: 4, name: "Taobao", remark: "就回家回家" },
        { id: 5, name: "订单", remark: "同意同意他" }
      ]
    };
  },
  updated() {
    // if (this.dd == "") {
    //   return true;
    // } else {
    //   return false;
    // }
  },
  mounted() {},
  computed: {
    getIndex: function() {
      return this.$route.params;
    },
    plansDetail: function() {
      const detail = "/project/d/" + this.$route.params.id + "/" + this.dd;
      return detail;
    }
  },
  methods: {
    link(db) {
      this.dd = db;
      this.plansShow = false;
      //  this.$router.push(this.plansDetail +'/'+ db)//把内容传给商品详情的页面
      this.$router.push("/project/d/" + this.$route.params.id + "/" + this.dd); //把内容传给商品详情的页面
      //  this.$router.go('/user')//把内容传给商品详情的页面
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>
