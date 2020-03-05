<template>
  <div :id="'PatientEventItem' + event.iEventID" class="patientEventItem">
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col>
              <b-form-textarea v-model="tEventText" @change="updateEventText" placeholder="Комментарий..." rows="1" max-rows="10" class="mb-3" />
            </b-col>
            <b-col md="auto">
              <b-button @click="REMOVE_EVENT(event.iEventID)" :disabled="loadingRemove || loadingUpdoad" variant="light" class="removeEvent">
                <b-spinner v-if="loadingRemove" small type="grow"></b-spinner>
                <template v-if="loadingRemove">Удаление</template>
                <template v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </template>
              </b-button>
            </b-col>
            <b-col cols="12">
              <ul class="filesList">
                <li v-for="(file, fileIndex) in event.files" :key="fileIndex" class="preview-img-list">
                  <PatientEventItemFile :file="file" :eventIndex="eventIndex" @loading-remove-file="childRemoveFile" />
                </li>
                <li v-show="!loadingUpdoad">
                  <dropzone :id="'dropzone_' + event.iEventID" :options="options" />
                </li>
                <li v-if="loadingUpdoad">
                  <div class="spinner">
                    <b-spinner variant="primary"></b-spinner>
                  </div>
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="2">
        <div class="dDate">
          <span>
            {{ $moment(event.dDate).format('D MMMM YYYY') }}
            {{ $moment(event.dDate).format('dddd') }}
          </span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import '~/assets/scss/dropzone.scss'
import PatientEventItemFile from '~/components/PatientEventItemFile'
export default {
  components: {
    Dropzone,
    PatientEventItemFile
  },
  props: {
    event: {
      type: Object,
      default() {
        return {
          iEventID: false,
          files: []
        }
      }
    },
    eventIndex: {
      type: Number,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      loadingUpdoad: false,
      loadingRemove: false,
      options: {
        url: '/api/patient/upload',
        uploadMultiple: true,
        parallelUploads: 64,
        paramName: 'files',
        timeout: 35 * 60 * 1000,
        dictDefaultMessage: 'Перетяните файлы для загрузки или нажмите для выбора файлов',
        createImageThumbnails: false,
        addedfile: (files) => {},
        processingmultiple: () => {
          this.$set(this, 'loadingUpdoad', true)
        },
        sendingmultiple: (files, xhr, formData) => {
          formData.append('iEventID', this.event.iEventID)
          formData.append('eventIndex', this.eventIndex)
        },
        successmultiple: (files, data) => {
          const params = {
            files: data.files,
            eventIndex: this.eventIndex
          }
          this.$store.dispatch('patient/SET_FILES', params)
          this.$set(this, 'loadingUpdoad', false)
          const notifyText = files.length === 1 ? 'Файл успешно загружен' : 'Файлы успешно загружены'
          this.$notify({
            group: 'notify',
            type: 'success',
            duration: 1000,
            text: notifyText
          })
        }
      }
    }
  },
  computed: {
    SELECTEL_WEB() {
      return process.env.SELECTEL_WEB
    },
    images() {
      const arr = []
      this.event.files.forEach((file, i) => {
        arr.push({
          src: this.SELECTEL_WEB + '/' + file.iEventID + '/original/' + file.sFileName,
          w: file.iFileWidth,
          h: file.iFileHeight
        })
      })
      return arr
    },
    tEventText: {
      get() {
        return this.$store.state.patient.item.events[this.eventIndex].tEventText
      },
      set(tEventText) {
        this.$store.dispatch('patient/UPDATE_EVENTTEXT', { eventIndex: this.eventIndex, tEventText })
      }
    }
  },
  methods: {
    async REMOVE_EVENT(iEventID) {
      if (confirm('fasdfad')) {
        this.$set(this, 'loadingRemove', true)
        await this.$store.dispatch('patient/REMOVE_EVENT', { iEventID })
        this.$set(this, 'loadingRemove', false)
        this.$notify({
          group: 'notify',
          type: 'success',
          duration: 2000,
          text: 'Событие успешно удалено'
        })
      }
    },
    childRemoveFile(params) {
      this.$set(this, 'loadingRemove', params.loading)
    },
    async updateEventText() {
      await this.$store.dispatch('patient/UPDATE_EVENT_TEXT', { eventIndex: this.eventIndex })
    }
  }
}
</script>

<style lang="scss" scoped>
.patientEventItem {
  position: relative;
  margin-bottom: 1rem;
  .removeEvent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-body {
    padding: 1rem;
  }
  textarea {
    border: none;
    padding: 0;
    border-radius: 0;
  }
  ul.filesList {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    li {
      position: relative;
      padding-top: 100%;
      .dropzone {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
      }
      .spinner {
        background: #fff7db;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #ffe175;
        border-radius: 0.5rem;
        .text-primary {
          color: #ffe175 !important;
        }
      }
    }
  }
  .dDate {
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      padding: 0.5rem;
      text-align: center;
      font-size: 12px;
      background: #e9ecef;
      position: relative;
      z-index: 2;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1rem;
        height: 1rem;
        width: 100%;
        background: white;
      }
    }
    &::before {
      z-index: 1;
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      height: 100%;
      width: 1px;
      background: #e9ecef;
    }
  }
  &:last-child {
    .dDate {
      &::before {
        display: none;
      }
    }
  }
  &.added {
    background-color: red;
  }
}
</style>
