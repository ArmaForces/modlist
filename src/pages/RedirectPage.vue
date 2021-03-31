<template>
  <div class="row mt-5">
    <div class="col-12 d-flex justify-content-center">
      <h2>{{ $t('redirect.header') }} <a :href="redirectTarget">https://armaforces.com/</a></h2>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <span>{{ $t('redirect.redirect') }}</span>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <b-progress
        class="mt-4 w-25"
        :value="redirectValue" :max="redirectTime"
      />
    </div>
    <div class="col-12 d-flex justify-content-center">
      <b-button
        href="/#/select-preset"
        size="sm"
        class="m-2"
        variant="secondary-outline"
      >
        {{ $t('redirect.stay') }}
      </b-button>
      <b-button
        href="https://armaforces.com/mod-list/select"
        size="sm"
        class="m-2"
        variant="secondary"
        ref="redirectButton"
      >
        {{ $t('redirect.go_to_new') }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      redirectTarget: 'https://armaforces.com/mod-list/select',
    };
  },
  mounted() {
    window.location = this.redirectTarget;
  },
};
</script>
