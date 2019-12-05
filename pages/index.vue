<template>
  <span>Loading...</span>
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect('/patient')
  }
}
</script>
