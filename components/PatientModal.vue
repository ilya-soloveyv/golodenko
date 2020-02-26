<template>
  <div>
    <b-modal id="PatientModal" :hide-footer="true" size="sm" title="Карточка пациента">
      <b-form @submit.prevent="update" autocomplete="off">
        <b-form-group id="label-sPatientLastname" label="Фамилия" label-for="input-sPatientLastname">
          <b-form-input id="input-sPatientLastname" v-model.trim="sPatientLastname" />
        </b-form-group>
        <b-form-group id="label-sPatientFirstname" label="Имя" label-for="input-sPatientFirstname">
          <b-form-input id="input-sPatientFirstname" v-model.trim="sPatientFirstname" required />
        </b-form-group>
        <b-form-group id="label-sPatientMiddlename" label="Отчество" label-for="input-sPatientMiddlename">
          <b-form-input id="input-sPatientMiddlename" v-model.trim="sPatientMiddlename" />
        </b-form-group>
        <b-form-group label="Телефоны">
          <b-input-group v-for="(phone, phoneIndex) in phones" :key="phoneIndex" class="mb-1">
            <the-mask :value="phone.iPhone" @keypress.native="updatePhone($event, phoneIndex)" @keyup.native="updatePhone($event, phoneIndex)" @change.native="updatePhone($event, phoneIndex)" mask="+7 (###) ###-##-##" type="text" class="form-control" required />
            <b-input-group-append>
              <b-button @click="DEL_PHONE(phoneIndex)" variant="danger" class="delPhone">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-button @click.prevent="ADD_PHONE" size="sm" variant="primary">Добавить телефон</b-button>
        </b-form-group>
        <b-form-group id="label-dDateBirthday" label="Дата рождения" label-for="input-dDateBirthday">
          <the-mask :value="dDateBirthday" @change.native="updateDateBirthday($event)" mask="##.##.####" type="text" class="form-control" />
          <!-- <client-only>
            <date-picker v-model="dDateBirthday" :language="ru" :full-month-name="true" :monday-first="true" format="d MMMM yyyy" input-class="form-control" />
          </client-only> -->
        </b-form-group>
        <b-button :disabled="checkUpdate" variant="success" type="submit">Сохранить</b-button>
      </b-form>
      <!-- <pre>{{ $store.state.patient.item }}</pre> -->
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ru } from 'vuejs-datepicker/dist/locale'
import { TheMask } from 'vue-the-mask'
import moment from 'moment'
export default {
  components: {
    TheMask
  },
  data() {
    return {
      ru,
      checkUpdate: false
    }
  },
  computed: {
    ...mapGetters({
      iPatientID: ['patient/iPatientID'],
      sPatientFullname: ['patient/sPatientFullname'],
      phones: ['patient/phones']
    }),
    sPatientLastname: {
      get() {
        return this.$store.state.patient.item.sPatientLastname
      },
      set(sPatientLastname) {
        this.$store.dispatch('patient/UPDATE_LASTNAME', { sPatientLastname })
      }
    },
    sPatientFirstname: {
      get() {
        return this.$store.state.patient.item.sPatientFirstname
      },
      set(sPatientFirstname) {
        this.$store.dispatch('patient/UPDATE_FIRSTNAME', { sPatientFirstname })
      }
    },
    sPatientMiddlename: {
      get() {
        return this.$store.state.patient.item.sPatientMiddlename
      },
      set(sPatientMiddlename) {
        this.$store.dispatch('patient/UPDATE_MIDDLENAME', { sPatientMiddlename })
      }
    },
    dDateBirthday: {
      get() {
        const dDateBirthday = this.$store.state.patient.item.dDateBirthday || null
        return moment(dDateBirthday).format('DD.MM.YYYY')
      }
    }
  },
  methods: {
    async update() {
      this.$set(this, 'checkUpdate', true)
      await this.$store.dispatch('patient/UPDATE')
      this.$set(this, 'checkUpdate', false)
      this.$router.push('/patient/' + this.iPatientID)
      this.$root.$emit('bv::hide::modal', 'PatientModal')
      this.$notify({
        group: 'notify',
        type: 'success',
        duration: 2000,
        text: 'Успешно обновлено'
      })
    },
    ADD_PHONE() {
      this.$store.dispatch('patient/ADD_PHONE', {})
    },
    DEL_PHONE(phoneIndex) {
      this.$store.dispatch('patient/DEL_PHONE', { phoneIndex })
    },
    updatePhone(event, phoneIndex) {
      this.$store.dispatch('patient/UPDATE_PHONE', {
        iPhone: event.target.value,
        phoneIndex
      })
    },
    updateDateBirthday(event) {
      const value = moment(event.target.value, 'DD.MM.YYYY')
      const dDateBirthday = value._isValid ? moment(value).format('YYYY-MM-DD') : null
      this.$store.dispatch('patient/UPDATE_DATEBIRTHDAY', { dDateBirthday })
    }
  }
}
</script>

<style lang="scss" scoped>
.delPhone {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
