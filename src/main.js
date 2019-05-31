// js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import App from './App';
import router from './router';
import translations from './translations';
// scss
import './main.scss';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(BootstrapVue);

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages: translations,
});

const AppClass = Vue.extend(App);
/* eslint-disable no-new */
new AppClass({
  i18n,
  router,
}).$mount('#app');

// Enable Sentry in production mode
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://d8b4dcf8d4e5451ba30f11e382278bda@sentry.io/1471961',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}
