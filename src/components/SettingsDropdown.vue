<template>
  <b-dropdown size="md" variant="link"
    toggle-class="text-decoration-none"
    no-caret
    :dropleft="true"
  >
    <template slot="button-content">⚙</template>
    <b-dropdown-item @click="clearStorage()">{{ $t('settings.clear') }}</b-dropdown-item>
    <b-dropdown-item @click="switchLang()">{{ $i18n.locale }}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SettingsDropdown',
  computed: {
    nextLang() {
      return this.$i18n.locale === 'en' ? 'pl' : 'en';
    },
  },
  methods: {
    clearStorage() {
      /* eslint-disable no-alert */
      if (confirm(this.$t('settings.clear_confirm'))) {
        localStorage.clear();
        location.reload();
      }
    },
    switchLang() {
      this.$i18n.locale = this.nextLang;
      localStorage.setItem('lang', this.$i18n.locale);
    },
  },
};
</script>

