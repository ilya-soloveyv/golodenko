export default {
  middleware: 'admin',
  data() {
    return {
      items: [
        {
          text: 'Пользователи',
          active: true
        }
      ]
    }
  },
  async asyncData({ store, $axios, params }) {
    await store.dispatch('user/GET_LIST', params)
  },
  computed: {
    users() {
      return this.$store.state.user.list
    }
  },
  methods: {
    userAdd() {
      this.$root.$emit('bv::show::modal', 'UserModal')
    }
  }
}
