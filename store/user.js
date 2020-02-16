const state = () => ({
  list: [],
  item: {}
})

const getters = {}

const mutations = {
  SET_LIST(state, list) {
    state.list = list
  },
  SET_ITEM(state, user) {
    state.item = user
  },
  UPDATE_USERNAME(state, sUserName) {
    state.item.sUserName = sUserName
  },
  UPDATE_USERPHONE(state, sUserPhone) {
    state.item.sUserPhone = sUserPhone
  },
  UPDATE_USERADMIN(state, iUserAdmin) {
    state.item.iUserAdmin = iUserAdmin
  }
}

const actions = {
  async GET_LIST({ state, commit }, params) {
    const list = await this.$axios.$post('/api/user/list', params)
    commit('SET_LIST', list)
  },
  async GET_ITEM({ state, commit }, params) {
    const user = await this.$axios.$post('/api/user/item', params)
    commit('SET_ITEM', user)
  },
  UPDATE_USERNAME({ state, commit }, params) {
    commit('UPDATE_USERNAME', params.sUserName)
  },
  UPDATE_USERPHONE({ state, commit }, params) {
    commit('UPDATE_USERPHONE', params.sUserPhone)
  },
  UPDATE_USERADMIN({ state, commit }, params) {
    commit('UPDATE_USERADMIN', params.iUserAdmin)
  },
  async UPDATE({ state, commit }) {
    const user = await this.$axios.$post('/api/user/update', state.item)
    return user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
