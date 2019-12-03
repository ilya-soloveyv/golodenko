<template>
  <div>
    <h1>Login</h1>
    <b-form @submit.prevent="login">
      <b-form-group
        id="label-email"
        label="Электронная почта"
        label-for="input-email"
      >
        <b-input
          ref="phone"
          v-model.number.trim="phone"
          class="form-control"
        ></b-input>
      </b-form-group>
      <b-form-group
        id="label-password"
        label="Пароль"
        label-for="input-password"
      >
        <b-input
          id="input-password"
          v-model="password"
          type="password"
          required
        ></b-input>
      </b-form-group>
      <b-alert v-if="error" variant="warning" class="mb-3" show>
        {{ error }}
      </b-alert>
      <b-button :disabled="$auth.busy" type="submit" variant="primary">
        Login
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      error: null,
      phone: '79037876601',
      password: 'qwerty'
    }
  },
  methods: {
    login() {
      this.$set(this, 'error', null)
      return this.$auth
        .loginWith('local', {
          data: {
            phone: this.phone,
            password: this.password
          }
        })
        .catch((e) => {
          this.$set(this, 'error', e)
        })
    }
  }
}
</script>
