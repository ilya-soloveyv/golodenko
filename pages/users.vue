<template>
  <div>
    <div class="breadcrumb-box">
      <b-container>
        <b-breadcrumb :items="items"></b-breadcrumb>
      </b-container>
    </div>
    <b-container>
      <h1>Пользователи</h1>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  data() {
    return {
      items: [
        {
          text: 'Пользователи',
          active: true
        }
      ]
    }
  }
}
</script>
