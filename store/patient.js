const state = () => ({
  list: []
})

const mutations = {
  setPatients(state, patients) {
    state.list = patients
  }
}

const actions = {
  async getPatients({ state, commit }, params) {
    const patients = await this.$axios.$post('/api/patient/list', params)
    commit('setPatients', patients)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
