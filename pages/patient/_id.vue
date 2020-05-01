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
        <b-col lg="3" cols="12">
          <div v-sticky class="patientCardData" sticky-offset="{ top: 16, bottom: 0 }" sticky-side="both">
            <PatientCard />
            <b-button @click="ADD_EVENT" :disabled="loadingAddEvent" variant="success" block class="patientEventButtonAdd">
              <b-spinner v-if="loadingAddEvent" small type="grow"></b-spinner>
              <template v-if="loadingAddEvent">Загрузка</template>
              <template v-else>
                <div class="d-none d-lg-block">Добавить событие</div>
                <svg class="d-lg-none" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </template>
            </b-button>
          </div>
        </b-col>
        <b-col lg="9" cols="12">
          <PatientEvents :events="events" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="./_id.js"></script>
<style src="./_id.scss" lang="scss" scoped></style>
