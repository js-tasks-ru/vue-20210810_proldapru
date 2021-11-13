<template>
  <div class="page-meetup">
    <template v-if="meetup">
      <meetup-cover :title="meetup.title" :image="meetup.image" />

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h2>{{ meetup.title }}</h2>
            <p>
              <router-link :to="{ name: 'meetup.description', params: { meetupId } }">Description</router-link>
            </p>
            <p>
              <router-link :to="{ name: 'meetup.agenda', params: { meetupId } }">Agenda</router-link>
            </p>
            <router-view :meetup="meetup" />
          </div>
          <div class="meetup__aside">
            <!-- ... -->
          </div>
        </div>
      </ui-container>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

import UiContainer from '../components/UiContainer';
import UiAlert from '../components/UiAlert';
import MeetupCover from '../components/MeetupCover';
import { fetchMeetup } from '../api';

export default {
  name: 'PageMeetup',

  components: { MeetupCover, UiAlert, UiContainer },

  setup(props) {
    const meetup = ref(null)

    const setMeetup = (meetupObject) => { meetup.value = meetupObject }

    onBeforeRouteUpdate((to, from) => {
      console.log('from setup guard', to, from)
      if (to.params.meetupId !== from.params.meetupId) {
        meetup.value = null;
        return fetchMeetup(to.params.meetupId)
          .then((meetupObject) => {
            meetup.value = meetupObject;
            //this.setMeetup(meetup);
          })
          .catch(() => ({ name: 'meetups' }));
      }
      return true;
    })

    return {
      meetup,
      setMeetup,
     }
  },

  // аналога для этого guard нет в Composition API
  beforeRouteEnter(to) {
    return fetchMeetup(to.params.meetupId)
      .then((meetupObject) => {
        return (vm) => {
          vm.setMeetup(meetupObject);
        };
      })
      .catch(() => ({ name: 'meetups' }));
  },

/*
   beforeRouteUpdate(to, from) {
    console.log(to, from)
    if (to.params.meetupId !== from.params.meetupId) {
      this.meetup = null;
      return fetchMeetup(to.params.meetupId)
        .then((meetup) => {
          this.setMeetup(meetup);
        })
        .catch(() => ({ name: 'meetups' }));
    }
    return true;
  },
*/

  props: {
    meetupId: {
      type: String,
      required: true,
    },
  },

/*
  data() {
    return {
      meetup: null,
    };
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    },
  },
*/
};
</script>

<style scoped>
.page-meetup {
  background-color: var(--white);
}

.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
