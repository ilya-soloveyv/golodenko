<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb>
          <b-breadcrumb-item to="/patient">Пациенты</b-breadcrumb-item>
          <b-breadcrumb-item v-if="iPatientID" active>{{ sPatientFullname }}</b-breadcrumb-item>
          <b-breadcrumb-item v-else active>Новый пациент</b-breadcrumb-item>
        </b-breadcrumb>
      </b-container>
    </div>
    <b-container sticky-container>
      <b-row>
        <b-col cols="3">
          <div v-sticky sticky-offset="{ top: 16, bottom: 30 }" sticky-side="both">
            <PatientCard />
            <b-button @click="ADD_EVENT" :disabled="loadingAddEvent" variant="success" block class="patientEventButtonAdd">
              <b-spinner v-if="loadingAddEvent" small type="grow"></b-spinner>
              <template v-if="loadingAddEvent">Загрузка</template>
              <template v-else>Добавить событие</template>
            </b-button>
          </div>
        </b-col>
        <b-col cols="9">
          <PatientEvents :events="events" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="./_id.js"></script>
<style src="./_id.scss" lang="scss" scoped></style>
