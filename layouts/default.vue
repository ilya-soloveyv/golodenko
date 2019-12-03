<template>
  <b-container>
    <NavBar />
    <nuxt />
  </b-container>
</template>

<script>
import NavBar from '~/components/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>
