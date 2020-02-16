<template>
  <div id="login">
    <b-form @submit.prevent="login" autocomplete="off">
      <b-form-group id="label-phone" label="Мобильный телефон" label-for="input-phone">
        <the-mask id="input-phone" v-model.number.trim="phone" mask="+7 (###) ###-##-##" type="text" class="form-control" required />
      </b-form-group>
      <b-form-group id="label-password" label="Пароль" label-for="input-password">
        <b-input id="input-password" v-model="password" type="password" required></b-input>
      </b-form-group>
      <b-alert v-if="error" variant="warning" class="mb-3" show>
        {{ error }}
      </b-alert>
      <b-button :disabled="$auth.busy" type="submit" variant="primary">
        Войти
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

export default {
  layout: 'auth',
  components: {
    TheMask
  },
  middleware({ store, redirect }) {
    if (store.state.auth.user) {
      return redirect('/')
    }
  },
  data() {
    return {
      error: null,
      phone: null,
      password: null
    }
  },
  methods: {
    login() {
      this.$set(this, 'error', null)
      return this.$auth
        .loginWith('local', {
          data: {
            phone: '7' + this.phone,
            password: this.password
          }
        })
        .catch((e) => {
          this.$set(this, 'error', 'Неверные имя или пароль')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
form {
  width: 300px;
  padding: 16px;
  border-radius: 6px;
  background: white;
}
</style>
