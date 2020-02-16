<template>
  <div v-if="file.iEventID" class="image">
    <div class="imgSpinner">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <a :href="SELECTEL_WEB + '/' + file.iEventID + '/original/' + file.sFileName" target="_blank">
      <img v-lazy="SELECTEL_WEB + '/' + file.iEventID + '/preview/' + file.sFileName" />
    </a>
    <div @click="DEL_FILES(file)" v-if="!loadingRemoveFile" class="imgRemove">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
    <div v-if="loadingRemoveFile" class="loadingRemoveFile">
      <b-spinner variant="danger"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default() {
        return {
          iEventID: false
        }
      }
    },
    eventIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loadingRemoveFile: false
    }
  },
  computed: {
    SELECTEL_WEB() {
      return process.env.SELECTEL_WEB
    }
  },
  methods: {
    async DEL_FILES(file) {
      // this.$emit('loading-remove-file', { loading: true })
      this.$set(this, 'loadingRemoveFile', true)
      await this.$store.dispatch('patient/DEL_FILES', {
        eventIndex: this.eventIndex,
        file
      })
      // this.$emit('loading-remove-file', { loading: false })
      this.$set(this, 'loadingRemoveFile', false)
      this.$notify({
        group: 'notify',
        type: 'success',
        duration: 2000,
        text: 'Файл успешно удален'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  background: #f9f9f9;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:hover {
    .imgRemove {
      display: flex;
    }
  }
  .imgSpinner {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 0 0.2rem #007bff;
    }
  }
  .imgRemove {
    z-index: 3;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: white;
    padding: 0.5rem;
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .loadingRemoveFile {
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
