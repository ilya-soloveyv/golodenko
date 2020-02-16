import { TheMask } from 'vue-the-mask'
export default {
  middleware: 'admin',
  components: {
    TheMask
  },
  data() {
    return {}
  },
  async asyncData({ store, params }) {
    await store.dispatch('user/GET_ITEM', params)
  },
  computed: {
    user() {
      return this.$store.state.user.item
    },
    sUserName: {
      get() {
        return this.$store.state.user.item.sUserName
      },
      set(sUserName) {
        this.$store.dispatch('user/UPDATE_USERNAME', { sUserName })
      }
    },
    sUserPhone: {
      get() {
        return this.$store.state.user.item.sUserPhone
      },
      set(sUserPhone) {
        this.$store.dispatch('user/UPDATE_USERPHONE', { sUserPhone })
      }
    },
    iUserAdmin: {
      get() {
        return this.$store.state.user.item.iUserAdmin
      },
      set(iUserAdmin) {
        this.$store.dispatch('user/UPDATE_USERADMIN', { iUserAdmin })
      }
    }
  },
  methods: {
    async update() {
      const data = await this.$store.dispatch('user/UPDATE')
      let iUserID = this.user.iUserID
      if (!iUserID) {
        this.$notify({
          group: 'notify',
          type: 'success',
          duration: 2000,
          text: 'Пользователь успешно создан'
        })
        iUserID = data.create.iUserID
      } else {
        this.$notify({
          group: 'notify',
          type: 'success',
          duration: 2000,
          text: 'Пользователь успешно обновлен'
        })
      }
      this.$router.push('/user/' + iUserID)
    }
  }
}
