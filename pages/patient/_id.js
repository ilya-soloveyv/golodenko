import { mapGetters } from 'vuex'
import PatientCard from '~/components/PatientCard'
import PatientEvents from '~/components/PatientEvents'

export default {
  data() {
    return {
      checkUpdate: false,
      loadingAddEvent: false
    }
  },
  head() {
    return {
      title: this.sPatientFullname
    }
  },
  components: {
    PatientCard,
    PatientEvents
  },
  async asyncData({ store, $axios, params }) {
    await store.dispatch('patient/GET_ITEM', params)
  },
  computed: {
    ...mapGetters({
      iPatientID: ['patient/iPatientID'],
      sPatientFullname: ['patient/sPatientFullname'],
      events: ['patient/events']
    })
  },
  methods: {
    async ADD_EVENT() {
      const offset = window.innerWidth > 991 ? -16 : -126
      this.$set(this, 'loadingAddEvent', true)
      const iEventID = await this.$store.dispatch('patient/ADD_EVENT', { iPatientID: this.iPatientID })
      this.$scrollTo('#PatientEventItem' + iEventID, 500, { offset })
      this.$notify({
        group: 'notify',
        type: 'success',
        duration: 2000,
        text: 'Событие успешно добавлено'
      })
      this.$set(this, 'loadingAddEvent', false)
    }
  }
}
