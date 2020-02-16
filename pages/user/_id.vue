<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb>
          <b-breadcrumb-item to="/user">Пользователи</b-breadcrumb-item>
          <b-breadcrumb-item v-if="user.iUserID" active>{{ user.sUserName }}</b-breadcrumb-item>
          <b-breadcrumb-item v-else active>Новый пользователь</b-breadcrumb-item>
        </b-breadcrumb>
      </b-container>
    </div>
    <b-container>
      <b-row class="justify-content-sm-center">
        <b-col cols="4">
          <b-form @submit.prevent="update" method="POST" autocomplete="off">
            <b-form-group id="label-sUserName" label="Ваше имя" label-for="input-sUserName">
              <b-form-input id="input-sUserName" v-model.trim="sUserName" required />
            </b-form-group>
            <b-form-group id="label-sUserPhone" label="Мобильный телефон" label-for="input-sUserPhone">
              <the-mask id="input-sUserPhone" :disabled="user.iUserID" v-model.number.trim="sUserPhone" mask="+7 (###) ###-##-##" type="text" class="form-control" required />
            </b-form-group>
            <b-form-group id="label-iUserAdmin" v-if="user.iUserID" label="Доступ суперадмина" label-for="input-iUserAdmin">
              <b-form-checkbox id="input-iUserAdmin" v-model="iUserAdmin" name="input-iUserAdmin" switch>
                <template v-if="iUserAdmin">Одобрено</template>
                <template v-else>Запрещено</template>
              </b-form-checkbox>
            </b-form-group>
            <b-button type="submit" variant="primary">Сохранить</b-button>
          </b-form>
        </b-col>
      </b-row>
      <!-- <pre>{{ user }}</pre> -->
    </b-container>
  </div>
</template>

<script src="./_id.js"></script>
<style src="./_id.scss" lang="scss" scoped></style>
