export default {
  data() {
    return {
      page: this.$route.query.p || 1,
      search: this.$route.query.s || null,
      patients: {}
    }
  },
  head() {
    return {
      title: 'Пациенты'
    }
  },
  watch: {
    page() {
      this.get()
    }
  },
  async asyncData({ store, $axios, route, params }) {
    const patients = await $axios.$post('/api/patient/list', {
      page: route.query.p,
      search: route.query.s,
      limit: store.state.auth.user.iPatientLimit
    })
    return {
      patients
    }
  },
  methods: {
    async get() {
      this.mappingParams()
      const patients = await this.$axios.$post('/api/patient/list', {
        page: this.page,
        search: this.search,
        limit: this.$store.state.auth.user.iPatientLimit
      })
      this.$set(this, 'patients', patients)
    },
    searchKeyUp() {
      this.$set(this, 'page', 1)
      this.get()
    },
    mappingParams() {
      const query = {}
      if (this.search) {
        query.s = this.search
      }
      if (this.page > 1) {
        query.p = this.page
      }
      this.$router.push({
        path: this.$route.path,
        query
      })
    },
    openPatientModal() {
      this.$store.dispatch('patient/SET_ITEM', {
        phones: [],
        events: []
      })
      this.$root.$emit('bv::show::modal', 'PatientModal')
    }
  }
}
