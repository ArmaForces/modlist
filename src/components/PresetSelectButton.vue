<template>
  <b-button
      block
      v-b-tooltip.hover.right.d500="isCurrent ? 'Modset used currently on server' : ''"
      :variant="isCurrent ? 'primary' : 'secondary'"
      class="text-capitalize text-white"
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

