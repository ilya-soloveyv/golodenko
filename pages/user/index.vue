<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb :items="items"></b-breadcrumb>
      </b-container>
    </div>
    <b-container>
      <b-list-group class="mb-3">
        <b-list-group-item v-for="(user, userIndex) in users" :key="userIndex" :to="'/user/' + user.iUserID">
          <b-row>
            <b-col>{{ user.sUserName }}</b-col>
            <b-col md="auto">
              <b-badge v-if="user.iUserAdmin" variant="success">Администратор</b-badge>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <b-button to="/user/0" variant="primary">Добавить пользователя</b-button>
    </b-container>
  </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" lang="scss" scoped></style>
