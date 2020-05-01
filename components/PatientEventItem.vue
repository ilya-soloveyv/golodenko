<template>
  <div :id="'PatientEventItem' + event.iEventID" class="patientEventItem">
    <b-row>
      <b-col>
        <b-card>
          <div class="header">
            <div class="dDate">
              {{ $moment(event.dDate).format('D MMMM YYYY') }}
              <span> - {{ $moment(event.dDate).format('dddd') }}</span>
            </div>
            <b-button @click="REMOVE_EVENT(event.iEventID)" :disabled="loadingRemove || loadingUpdoad" variant="danger" size="xs" class="removeEvent">
              <b-spinner v-if="loadingRemove" small type="grow"></b-spinner>
              <template v-if="loadingRemove">Удаление</template>
              <template v-else>Удалить</template>
            </b-button>
          </div>
          <b-row>
            <b-col>
              <b-form-textarea v-model="tEventText" @change="updateEventText" placeholder="Комментарий..." rows="1" max-rows="10" class="mb-3" />
            </b-col>
          </b-row>
          <b-row>
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
      if (confirm('Вы подтверждаете удаление события? Будут удалены все фотографии')) {
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
    .header {
      background: #e9ecef;
      margin: -1rem -1rem 1rem -1rem;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
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
    @media (max-width: 991px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }
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
      opacity: 0.5;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // justify-content: center;
      // border-radius: 0.5rem;
      // // padding: 0.5rem;
      // text-align: center;
      // font-size: 12px;
      // background: #e9ecef;
      // position: relative;
      // z-index: 2;
      // &::after {
      //   content: '';
      //   position: absolute;
      //   left: 0;
      //   bottom: -1rem;
      //   height: 1rem;
      //   width: 100%;
      //   background: white;
      // }
    }
    // &::before {
    //   z-index: 1;
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   right: 50%;
    //   height: 100%;
    //   width: 1px;
    //   background: #e9ecef;
    // }
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
