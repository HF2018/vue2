<template>
  <div>
       <p>
          <Breadcrumb separator=">">
              <BreadcrumbItem :to=plansDetail>所有方案</BreadcrumbItem>
              <BreadcrumbItem>方案详情</BreadcrumbItem>
          </Breadcrumb>
          <router-view></router-view>
         
        </p>
      <h1>{{aboutMsg}}</h1>
      <h1>{{aboutMsg}}</h1>
      <h1>{{dd}}</h1>
      <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  data () {
      return {
          aboutMsg: '方案详情',
          dd: '请问具体内容和排版呢？初步设定为图文组合，但是排版需要正规的编辑，初步设定用富文本编辑'
      }
  },
  mounted() {

      if (this.dd == "") {
        return true;
      } else {
        return false;
      }
    
  },
   computed: {
    plansDetail: function() {
      // const detail = "/user/gList/mPlans/" + this.$route.params.id;
      // return detail;
    }
  },
  methods: {
      
  }
}
</script>
