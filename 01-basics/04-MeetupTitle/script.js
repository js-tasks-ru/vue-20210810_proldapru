import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
createApp({
  data() {
    return {
      meetups: [
        {id: 1, title: null},
        {id: 2, title: null},
        {id: 3, title: null},
        {id: 4, title: null},
        {id: 5, title: null},
      ],
      currentMeetupId: 1,
      currentMeetupTitle: ''
    }
  },
  watch: {
    currentMeetupId: {
      immediate: true,
      handler(nVal, oVal) {
        // Находим индекс элемента массива meetups с текущим идентификатором
        let index = this.meetups.findIndex(x=>x.id == nVal)
        if(this.meetups[index].title) { // при наличии закэшированного title сразу его выдаём
          this.currentMeetupTitle = this.meetups[index].title;
        } else { // при отсутствии закэшированного title получаем его из API, выдаём и помещаем в кэш
          this.currentMeetupTitle = 'Wait a second...'

          fetchMeetupById(nVal).then(r=>{
            this.currentMeetupTitle = this.meetups[index].title = r.title
          }).catch(r=>{
            this.currentMeetupTitle = 'An error occurred'
          })
        }
      }
    }
  }
}).mount('#app')
