import { computed, ref } from 'vue';

export function useMeetupsFilters(meetups) {
  const dateFilterOptions = [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ];

  const filter = ref({
    date: 'all',
    participation: 'all',
    search: '',
  });

  const filteredMeetups = computed(() => {
    const dateFilter = (meetup) =>
      filter.value.date === 'all' ||
      (filter.value.date === 'past' && new Date(meetup.date) <= new Date()) ||
      (filter.value.date === 'future' && new Date(meetup.date) > new Date());

    const participationFilter = (meetup) =>
      filter.value.participation === 'all' ||
      (filter.value.participation === 'organizing' && meetup.organizing) ||
      (filter.value.participation === 'attending' && meetup.attending);

    const searchFilter = (meetup) =>
      [meetup.title, meetup.description, meetup.place, meetup.organizer]
        .join(' ')
        .toLowerCase()
        .includes(filter.value.search.toLowerCase());

    return (
      meetups.value &&
      meetups.value.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup))
    );
  });

  return {
    dateFilterOptions,
    filter,
    filteredMeetups,
  };
}
