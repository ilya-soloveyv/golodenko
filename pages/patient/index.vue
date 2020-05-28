<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb>
          <b-breadcrumb-item active>Пациенты</b-breadcrumb-item>
        </b-breadcrumb>
      </b-container>
    </div>
    <b-container>
      <div id="patient-list">
        <div class="form">
          <b-row>
            <b-col>
              <b-form-group id="label-search" label-for="input-search">
                <b-form-input id="input-search" v-model="search" @keyup="searchKeyUp" type="text" placeholder="Введите ФИО или телефон пациента" autocomplete="off"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="auto">
              <b-button @click="openPatientModal" variant="primary" block>
                Добавить
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div class="list">
          <b-list-group v-if="patients.docs.length">
            <b-list-group-item v-for="(patient, patientIndex) in patients.docs" :key="patientIndex" :to="'/patient/' + patient.iPatientID">
              <b-row>
                <b-col>{{ patient.sPatientLastname }} {{ patient.sPatientFirstname }} {{ patient.sPatientMiddlename }}</b-col>
                <b-col sm="3" md="2" class="d-none d-sm-block">{{ patient.dDateBirthday }}</b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
          <div v-else class="empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#eeeeee" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
            <span>Не найдено</span>
          </div>
        </div>
        <div class="pagi">
          <b-pagination v-model="page" :total-rows="patients.total" :per-page="$auth.$state.user.iPatientLimit" aria-controls="patients_table" align="center">
            <template v-slot:first-text>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
            </template>
            <template v-slot:prev-text>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M15 18l-6-6 6-6" /></svg>
            </template>
            <template v-slot:next-text>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M9 18l6-6-6-6" /></svg>
            </template>
            <template v-slot:last-text>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
            </template>
            <template v-slot:ellipsis-text>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </template>
          </b-pagination>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" lang="scss"></style>
