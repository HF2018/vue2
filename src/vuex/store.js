import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);
// axios.defaults.baseURL = '/api'
import member from './module/member';
const api = '/api';

const state = {
    count: 1,
    a: 3,
    todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
    ],
    exampleSign: [],//签名模板数据
    exampleSignTotal: 0,//签名模板的数据总条数
    signCurrentpage: 1,//签名模板的当前页码
    signCurrentClass: 1,//签名模板的当前类型（示例（1）、我的（2））
    searchVal: '',//签名的搜索框的值
    smsType: 0,//签名与短信内容的切换//短信签名（0）,短信内容（1）
    sendSms: [],//所有的发送短信的数据
    sendSmsTotal: 0,//所有的发送短信的总条数
    sendSmsCurrentpage: 1,//发送记录的当前页码
    smsSearchVal: '',//发送短信的搜索值
    isLogin: false,//检测是否登录，
    //登录的验证和拦截
    user: {},
    token: '',
    title: '',
    //会员中心的创建分组
    //第一级
    one: {
        allPro: [],
        currentOne: '',
        total: 0,
        currentPage: 1,
    },
    //第二级
    two: {
        allPro: [],
        currentTwo: '',
        total: 0,
        currentPage: 1,
    },
    //目标匹配方案
    aim: {
        nums: 0,
        value: "", //选中
        datas: [],
        ifNull: true //判断是否获取到内容
    }

};
const mutations = {
    add(state, n) {
        state.count += n;
    },
    reduce(state) {
        state.count -= 1;
    },
    //登录
    get() {

    },
    login: (state) => {
        console.log(document.cookie);
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");

        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            console.log(arr)
            console.log(arr[0])
            var cookieName = 's'
            if (cookieName == arr[0]) {
                state.token = arr[1]
                console.log(arr[1])
                console.log('state.token+' + state.token)
                // return arr[1];

            }
        }
        // return "";
    },
    loginout: (state) => {
        // localStorage.removeItem('token');
        state.token = null
    },
    loginTitle: (state, data) => {
        state.title = data;
    },
    //得到签名或者短信内容的列表
    getSignList(state) {
        var url = ['sign', 'tpl'];
        var a = "/api/api/sms/" + url[state.smsType] + "/list?p=" + state.signCurrentpage + "&w=" + state.searchVal + "&g=" + state.signCurrentClass;
        axios({
            method: 'get',
            url: a,
        })
            .then(function (response) {
                console.log(response)
                state.exampleSignTotal = response.data.data.total; //数据总条数
                state.exampleSign = response.data.data.data; //数据总条数
            })
            .catch(function (err) {
                console.log(err)
            })

    },
    //得到发送记录的数据
    getSendSms(state) {
        var a = "/api/api/sms/send/list?p=" + state.sendSmsCurrentpage + "&w=" + state.smsSearchVal;
        axios({
            method: 'get',
            url: a,
        })
            .then(function (response) {
                console.log(response)
                state.sendSms = response.data.data.data; //总数据
                state.sendSmsTotal = response.data.data.total;//总条数

            })
            .catch(function (err) {
                console.log(err)
            })
    },

    //会员中心的创建分组
    //得到第一级
    getOne(state) {
        var a = api + "/api/admin/vip/onelist?p=" + state.one.currentPage;
        axios({
            method: 'get',
            url: a,
        })
            .then(response => {
                console.log(response);
                // this.$Message.success(response.data.msg);
                if (response.status == 200 && response.data.error == 1) {
                    if (response.data.data.total != 0) {
                        state.one.allPro = response.data.data.data;
                        state.one.allPro.forEach(element => {
                            element['two_checked'] = [];
                        });
                        state.one.total = response.data.data.total;
                        state.one.currentOne = response.data.data.data[0].label;
                        // commit('getTwo');
                        var choosedOne;
                        if (state.one.allPro.length != 0) {
                            state.one.allPro.forEach(value => {
                                if (value.label == state.one.currentOne) {
                                    choosedOne = value;
                                }
                            });
                            var a = api + "/api/admin/vip/twolist?oi=" + choosedOne.id + "&p=0"
                            // + state.two.currentPage;
                            axios({
                                method: 'get',
                                url: a,
                            })
                                .then(response => {
                                    console.log(response);
                                    // this.$Message.success(response.data.msg);
                                    if (response.status == 200 && response.data.error == 1) {
                                        if (response.data.data.total != 0) {
                                            state.two.allPro = response.data.data.data;
                                            state.two.currentTwo = response.data.data.data[0].id
                                            state.two.total = response.data.data.total;
                                        }
                                    }
                                })
                                .catch(response => { });
                        }

                    }
                    // console.log(state.one.allPro)
                }
            })
            .catch(response => { });
    },
    //匹配方案中得到已有的目标（分好类的）
    GetTactics() {
        let url = api + "/api/target";
        axios
            .get(url)
            .then(response => {
                console.log(response);
                //判断是否是正常状态  筛选出营销策略分类
                if (response.status == 200 && response.data.error == 1) {
                    //当加载成功 则激活三个按钮
                    //this.Group.tactics.ifNull = false
                    // console.log(response)
                    //判断是否有内容
                    if (response.data.data.data) {
                        //设定默认选中值
                        let tactics = state.aim;
                        tactics.value = response.data.data.data[0].label;
                        //赋值
                        tactics.datas = response.data.data.data;
                        tactics.nums = response.data.data.total;
                        console.log(tactics)
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    },


};
const getters = {
    count: function (state) {
        return state.count += 100;
    },
    getOne(state) {
        return state.one;
    }

};
const actions = {
    getOne(context) {
        context.commit('getOne');
    },
    addAction(context) {
        context.commit('add', 10);
        // setTimeOut(()=>{context.commit(reduce)},3000);
        // console.log('我比reduce提前执行');
    },
    reduceAction({ commit }) {
        commit('reduce')

    },
    saveForm(context) {
        // context.commit('add', 10);
        console.log('getSignList')
        //  
    }
};
const moduleA = {
    state, mutations, getters, actions
}
export default new Vuex.Store({
    // state,mutations,getters,actions
    modules: {
        a: moduleA,
        member
    }
});