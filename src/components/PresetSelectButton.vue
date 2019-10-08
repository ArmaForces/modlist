<template>
  <b-button
      block
      v-b-tooltip.hover.right.d500="isCurrent ? $t('nav.current') : ''"
      :variant="isCurrent ? 'primary' : 'secondary'"
      class="text-capitalize text-white w-25 m-2"
      :class="{ 'font-weight-bold': isCurrent }"

      :to="{ name: 'download-preset', params: { modset, },}"
    >{{ modset }}</b-button>
</template>

<script>
export default {
  props: {
    modset: {
      type: String,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

