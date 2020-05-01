<template>
  <div>
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
  }
}
</script>
