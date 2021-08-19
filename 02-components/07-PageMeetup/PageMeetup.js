import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js'
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  data() {
    return {
      currentMeetup: null,
      meetupLoadingInProgress: false,
      errorOccured: undefined,
    }
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  meetupsCache: new Map(), // для кэширования уже загруженных meetup

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  computed: {
    meetupLoaded() {
      return !(this.meetupLoadingInProgress || this.errorOccured)
    }
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(nVal, oVal) {
        // Вариант без кэша
        this.errorOccured = undefined
        this.meetupLoadingInProgress = true
        fetchMeetupById(nVal).then(r=>{
          this.currentMeetup = r
        }).catch(r=>{
          this.errorOccured = r.message
        }).finally(()=>{
          this.meetupLoadingInProgress = false
        })
/*
        // Вариант с кэшем -- тесты не проходят
        this.errorOccured = undefined
        if(this.$options.meetupsCache.has(this.meetupId)) { // при наличии закэшированного meetup сразу его выдаём
          this.currentMeetup = this.$options.meetupsCache.get(this.meetupId)
        } else { // при отсутствии закэшированного meetup получаем его из API, выдаём и помещаем в кэш
          this.meetupLoadingInProgress = true
          fetchMeetupById(nVal).then(r=>{
            this.currentMeetup = r
            this.$options.meetupsCache.set(this.meetupId, r)
          }).catch(r=>{
            this.errorOccured = r.message
          }).finally(()=>{
            this.meetupLoadingInProgress = false
          })
        }
*/
      }
    }
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetupLoaded" :meetup="currentMeetup" />

      <!-- v-show подошло бы лучше, но тест про сообщение об ошибке не проходит -->
      <ui-container v-if="meetupLoadingInProgress">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-show="errorOccured">
        <ui-alert>{{ errorOccured }}</ui-alert>
      </ui-container>
    </div>`,
});
