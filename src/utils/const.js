export default {
  DEBOUNCE_DEFAULT_TIMEOUT: 200,
  GOOGLE: {
    MAPS_API_KEY: 'AIzaSyDxGJlkwZDNR2rXy5Rg7WbGojpp91OydSU',
    MAPS_DEFAULTS: {
      zoom: 3,
      center: {
        lat: -38.95130584518068,
        lng: 149.85184374999994,
      },
      mapTypeControlOptions: {
        mapTypeIds: [
          'roadmap',
          'satellite',
          'hybrid',
          'terrain',
          'aubergine',
        ],
      },
    },
    MAPS_STYLE: 'aubergine',
  },
  HEALTH_STATUS: {
    GOOD: 1,
    WARNING: 2,
    BAD: 3,
  },
};
