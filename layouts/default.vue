<template>
  <div class="main">
    <NavBar />
    <nuxt />
    <PatientModal />
    <UserModal />
    <client-only>
      <notifications group="notify" position="top center" />
    </client-only>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'
import PatientModal from '~/components/PatientModal'
import UserModal from '~/components/UserModal'
export default {
  components: {
    NavBar,
    PatientModal,
    UserModal
  },
  head: {
    script: [{ src: '/js/main.js' }]
  }
}
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}
</style>
