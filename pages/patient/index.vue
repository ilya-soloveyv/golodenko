<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb :items="items"></b-breadcrumb>
      </b-container>
    </div>
    <b-container>
      <!-- <div>Limit: {{ limit }}</div> -->
      <div id="patient-list">
        <div class="form">
          <b-form-group id="label-search" label-for="input-search">
            <b-form-input
              id="input-search"
              v-model="search"
              type="text"
              placeholder="Введите ФИО или телефон пациента"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="list">
          <b-table
            id="patients_table"
            :items="patients.docs"
            :fields="fields"
            striped
            hover
            small
          >
            <template v-slot:cell(sPatientFullname)="patient">
              {{ patient.item.sPatientLastname }}
              {{ patient.item.sPatientFirstname }}
              {{ patient.item.sPatientMiddlename }}
            </template>
          </b-table>
        </div>
        <div class="pagi">
          <b-pagination
            v-model="page"
            :total-rows="patients.total"
            :per-page="limit"
            aria-controls="patients_table"
            align="center"
          ></b-pagination>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      page: 1,
      search: null,
      fields: [
        {
          key: 'sPatientFullname',
          label: 'ФИО'
        },
        {
          key: 'dDateBirthday',
          label: 'Дата рождения',
          class: 'col_dDateBirthday'
        }
      ],
      items: [
        {
          text: 'Пациенты',
          active: true
        }
      ]
    }
  },
  computed: {
    patients({ $store }) {
      return $store.state.patient.list
    }
  },
  watch: {
    async page() {
      await this.$store.dispatch('patient/getPatients', {
        page: this.page,
        limit: this.limit
      })
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('patient/getPatients', {})
  }
}
</script>

<style lang="scss">
#patient-list {
  // background: red;
  height: calc(100vh - 56px - 56px);
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  .form {
    flex-shrink: 0;
  }
  .list {
    flex-grow: 1;
    overflow: auto;
  }
  .pagi {
    padding: 16px 0 0;
    flex-shrink: 0;
  }
}
.col_dDateBirthday {
  width: 150px;
}
</style>
