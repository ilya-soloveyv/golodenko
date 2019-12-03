<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand>CRM</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" active-class="active" exact>Пациенты</b-nav-item>
          <b-nav-item
            v-if="$auth.$state.user.iUserAdmin"
            to="/users"
            active-class="active"
          >
            Пользователи
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$auth.$state.loggedIn" class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              {{ $auth.$state.user.sUserName }}
            </template>
            <b-dropdown-item to="/profile" active-class="active">
              Профиль
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="$auth.logout()">
              Выйти
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
