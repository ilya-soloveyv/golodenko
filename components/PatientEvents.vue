<template>
  <div>
    <PatientEventItem v-for="(event, eventIndex) in events" :key="eventIndex" :event="event" :eventIndex="eventIndex" />
  </div>
</template>

<script>
import PatientEventItem from '~/components/PatientEventItem'
export default {
  components: {
    PatientEventItem
  },
  props: {
    events: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
