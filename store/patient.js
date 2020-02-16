// import _trim from 'trim'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const state = () => ({
  item: {},
  default_phone: {
    iPhone: null
  }
})

const getters = {
  phones: (state) => state.item.phones,
  iPatientID: (state) => state.item.iPatientID,
  sPatientFullname: (state) => {
    const arr = []
    if (state.item.sPatientLastname) arr.push(state.item.sPatientLastname)
    if (state.item.sPatientFirstname) arr.push(state.item.sPatientFirstname)
    if (state.item.sPatientMiddlename) arr.push(state.item.sPatientMiddlename)
    return arr.join(' ', arr)
  },
  events: (state) => state.item.events
}

const mutations = {
  SET_ITEM(state, patient) {
    state.item = patient
  },
  UPDATE_LASTNAME(state, params) {
    state.item.sPatientLastname = params.sPatientLastname
  },
  UPDATE_FIRSTNAME(state, params) {
    state.item.sPatientFirstname = params.sPatientFirstname
  },
  UPDATE_MIDDLENAME(state, params) {
    state.item.sPatientMiddlename = params.sPatientMiddlename
  },
  UPDATE_DATEBIRTHDAY(state, params) {
    state.item.dDateBirthday = params.dDateBirthday
  },
  ADD_PHONE(state, params) {
    state.item.phones.push(Object.assign({}, state.default_phone))
  },
  DEL_PHONE(state, params) {
    state.item.phones.splice(params.phoneIndex, 1)
  },
  UPDATE_PHONE(state, params) {
    state.item.phones[params.phoneIndex].iPhone = params.iPhone
  },
  SET_FILES(state, params) {
    state.item.events[params.eventIndex].files = params.files
  },
  UPDATE_EVENTTEXT(state, params) {
    state.item.events[params.eventIndex].tEventText = params.tEventText
  },
  SET_EVENT(state, events) {
    state.item.events = events
  },
  REMOVE_EVENT(state, eventIndex) {
    state.item.events.splice(eventIndex, 1)
  }
}

const actions = {
  async GET_ITEM({ state, commit }, params) {
    const patient = await this.$axios.$post('/api/patient/get', params)
    commit('SET_ITEM', patient)
  },
  SET_ITEM({ state, commit }, params) {
    commit('SET_ITEM', params)
  },
  UPDATE_LASTNAME({ state, commit }, params) {
    commit('UPDATE_LASTNAME', params)
  },
  UPDATE_FIRSTNAME({ state, commit }, params) {
    commit('UPDATE_FIRSTNAME', params)
  },
  UPDATE_MIDDLENAME({ state, commit }, params) {
    commit('UPDATE_MIDDLENAME', params)
  },
  UPDATE_DATEBIRTHDAY({ state, commit }, params) {
    commit('UPDATE_DATEBIRTHDAY', params)
  },
  async UPDATE({ state, commit }, params) {
    const { patient } = await this.$axios.$post('/api/patient/update', state.item)
    commit('SET_ITEM', patient)
  },
  ADD_PHONE({ state, commit }, params) {
    commit('ADD_PHONE', params)
  },
  DEL_PHONE({ state, commit }, params) {
    commit('DEL_PHONE', params)
  },
  UPDATE_PHONE({ state, commit }, params) {
    const check = parsePhoneNumberFromString(params.iPhone, 'RU')
    if (check && check.nationalNumber) {
      params.iPhone = Number(check.nationalNumber)
      commit('UPDATE_PHONE', params)
    }
  },
  SET_FILES({ state, commit }, params) {
    commit('SET_FILES', params)
  },
  async DEL_FILES({ state, commit }, params) {
    const data = await this.$axios.$post('/api/patient/image/remove', params)
    data.eventIndex = params.eventIndex
    commit('SET_FILES', data)
  },
  UPDATE_EVENTTEXT({ state, commit }, params) {
    commit('UPDATE_EVENTTEXT', params)
  },
  async UPDATE_EVENT_TEXT({ state, commit }, params) {
    const iEventID = state.item.events[params.eventIndex].iEventID
    const tEventText = state.item.events[params.eventIndex].tEventText
    await this.$axios.$post('/api/event/textUpdate', { iEventID, tEventText })
  },
  async ADD_EVENT({ state, commit }, params) {
    const data = await this.$axios.$post('/api/event/add', params)
    commit('SET_EVENT', data.events)
    return data.event.iEventID
  },
  async REMOVE_EVENT({ state, commit }, params) {
    await this.$axios.$post('/api/event/remove', params)
    const eventIndex = state.item.events.findIndex((x) => x.iEventID === params.iEventID)
    commit('REMOVE_EVENT', eventIndex)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
