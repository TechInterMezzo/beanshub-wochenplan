import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import VClickOutside from 'v-click-outside';
import VueScrollTo from'vue-scrollto';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/de';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import store from './store';

dayjs.extend(weekOfYear);
dayjs.locale('de');

library.add(faAngleLeft, faAngleRight, faClock, faYoutube);

Vue.config.productionTip = false;

Vue.component('fa', FontAwesomeIcon);

Vue.use(Vue2TouchEvents, { swipeTolerance: 50 });
Vue.use(VClickOutside);
Vue.use(VueScrollTo);

Vue.filter('year', function(value: any) {
  return value ? dayjs(value).year().toString() : '';
});
Vue.filter('week', function(value: any) {
  return value ? dayjs(value).week().toString() : '';
});
Vue.filter('date', function(value: any) {
  return value ? dayjs(value).format('DD.MM.YYYY') : '';
});
Vue.filter('dayOfWeek', function(value: any) {
  return value ? dayjs(value).format('dddd') : '';
});
Vue.filter('time', function(value: any) {
  return value ? dayjs(value).format('HH:mm') : '';
});
Vue.filter('duration', function(value: any) {
  let hours = Math.floor(value / 3600);
  let minutes = Math.round((value % 3600) / 60);
  return (hours ? hours + ' h ' : '') + minutes + ' min';
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
