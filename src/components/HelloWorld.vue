
<template>
    <div>
        <h1>微信营销</h1>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.a.count}}</h3>
        <!-- <h3>{{$store.state.a}}</h3>  -->
        <h3>{{count}}</h3>
        <button @click="$store.commit('add',10)">+</button>
        <button @click="reduce">-</button>
        <p>
            <button @click="addAction">+++++</button>
            <button @click="reduceAction">------</button>
        </p>
        <!-- <Tabs value="name1"> -->
        <Tabs v-model="a">
            <TabPane label="标签一" name="name1">标签一的内容</TabPane>
            <TabPane label="标签二" name="name2">标签二的内容</TabPane>
            <!-- <TabPane v-for='(item,index) in name' :label="item" :name="index" :key="index">{{item}}</TabPane> -->
        </Tabs>
    </div>
</template>
    <script>
// import store from '@/vuex/store'
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "Hello Vuex",
      name:['标签1','标签二','标签三',],
     a:'name2'
    };
  },
  // computed:mapState({
  //         count:state => state.count  //理解为传入state对象，修改state.count属性
  // }),
  computed: {
    // ...mapState(["count"]),
    // ...mapGetters(["count"]),//每次得到数据前加100
    count() {
      return this.$store.state.a.count;
    }
  },
  // computed:mapState(["count"])
  methods: {
    ...mapMutations(["add", "reduce"]),
    ...mapActions(["addAction", "reduceAction"])
  }
};
</script>