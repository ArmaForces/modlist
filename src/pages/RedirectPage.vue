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
const REDIRECT_TIME = 5000;
const REDIRECT_TICK = 100;

export default {
  data() {
    return {
      redirectTime: REDIRECT_TIME,
      redirectValue: REDIRECT_TIME,
      redirectTarget: 'https://armaforces.com/mod-list/select',
      interval: null,
    };
  },
  mounted() {
    this.redirectValue = this.redirectTime;
    this.interval = setInterval(this.onTick, REDIRECT_TICK);
  },
  methods: {
    onTick() {
      if (this.redirectValue <= 0) {
        clearInterval(this.interval);
        window.location = this.redirectTarget;
        return;
      }

      this.redirectValue -= REDIRECT_TICK;
    },
  },
};
</script>
