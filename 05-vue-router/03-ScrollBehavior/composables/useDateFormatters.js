const formatAsLocalDate = (timestamp) => new Date(timestamp).toLocaleDateString(navigator.language, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const formatAsIsoDate = (timestamp) => new Date(timestamp).toISOString().substr(0, 10);

export function useDateFormatters() {
  return {
    formatAsLocalDate,
    formatAsIsoDate,
  };
}