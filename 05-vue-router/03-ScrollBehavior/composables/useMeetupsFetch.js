import { onMounted, ref } from 'vue';
import { fetchMeetups } from '../api';

export function useMeetupsFetch() {
  const meetups = ref(null);

  onMounted(() => {
    fetchMeetups().then((receivedMeetups) => {
      meetups.value = receivedMeetups;
    });
  });

  return {
    meetups,
  };
}
