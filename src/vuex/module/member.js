const state = {
  editSignRow :'',

}

const getters = {
  editSignRow:state => state.editSignRow,

}

const mutations = {
  
  editSignRow(state, data) {
    state.editSignRow = data
  },
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
