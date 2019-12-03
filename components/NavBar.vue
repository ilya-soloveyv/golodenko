<template>
  <b-container>
    <ul>
      <li>
        <nuxt-link to="/">Пациенты</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users">Пользователи</nuxt-link>
      </li>
      <!-- <li v-if="$auth.$state.loggedIn">
        <nuxt-link to="/my">My page</nuxt-link>
      </li>
      <li v-if="$auth.$state.loggedIn && $auth.$state.user.iUserAdmin">
        <nuxt-link to="/admin">Admin</nuxt-link>
      </li> -->
      <li v-if="$auth.$state.loggedIn">
        {{ $auth.$state.user.name }}
        <a @click.prevent="$auth.logout()" href="#">Logout</a>
      </li>
    </ul>
  </b-container>
</template>
