<template>
  <div>
    <b-modal id="UserModal" :hide-footer="true" size="sm" title="Создание пользователя">
      <b-form @submit.prevent="update" autocomplete="off">
        <b-form-group id="label-sUserName" label="Имя" label-for="input-sUserName">
          <b-form-input id="input-sUserName" v-model.trim="sUserName" required />
        </b-form-group>
        <b-form-group id="label-sUserPhone" label="Мобильный телефон" label-for="input-sUserPhone">
          <the-mask :value="sUserPhone" mask="+7 (###) ###-##-##" type="text" class="form-control" required />
        </b-form-group>
        <b-button :disabled="checkSendCode" variant="success" block type="submit">Отправить код подтверждения</b-button>
      </b-form>
      <!-- <pre>{{ $store.state.patient.item }}</pre> -->
    </b-modal>
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
      sUserName: null,
      sUserPhone: null,
      iPatientPhoneCode: null
    }
  },
  computed: {
    checkSendCode() {
      return true
    }
  },
  methods: {
    async update() {}
  }
}
</script>
