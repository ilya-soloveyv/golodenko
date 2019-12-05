<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb :items="items"></b-breadcrumb>
      </b-container>
    </div>
    <!-- <h1 class="title">
      <b-container>
        Настройки профиля
      </b-container>
    </h1> -->
    <b-container>
      <b-form @submit.prevent="update" method="POST" autocomplete="off">
        <b-row class="justify-content-sm-center">
          <b-col cols="4">
            <b-form-group
              id="label-sUserName"
              label="Ваше имя"
              label-for="input-sUserName"
            >
              <b-form-input
                id="input-sUserName"
                v-model="user.sUserName"
                required
              />
            </b-form-group>
            <b-form-group
              id="label-sUserPhone"
              label="Мобильный телефон"
              label-for="input-sUserPhone"
            >
              <the-mask
                id="input-sUserPhone"
                v-model.number.trim="user.sUserPhone"
                mask="+7 (###) ###-##-##"
                type="text"
                class="form-control"
                required
              />
            </b-form-group>
            <b-button type="submit" variant="primary">Сохранить</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
  components: {
    TheMask
  },
  data() {
    return {
      items: [
        {
          text: 'Настройка профиля',
          active: true
        }
      ]
    }
  },
  computed: {
    user: ({ $store }) => Object.assign({}, $store.state.auth.user)
  },
  methods: {
    async update() {
      await this.$axios.$post('/api/profile/update', { user: this.user })
      await this.$auth.fetchUser()
    }
  }
}
</script>
