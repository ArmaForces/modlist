<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t('mods.table.modname') }}</th>
        <th scope="col">
          {{ $t('mods.table.include') }}
          <b-form-checkbox
            v-if="toggleAll"
            class="d-inline-block"
            :checked="allChecked"
            :indeterminate="isMixedState"
            @input="onCheckAll"
          ></b-form-checkbox>
        </th>
        <th scope="col">{{ $t('mods.table.steam_id') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(mod, idx) in mods" :key="idx">
        <th scope="row">{{ idx+1 }}</th>
        <td>{{ mod.name }}</td>
        <!-- Toggle radiobutton -->
        <td>
          <b-form-checkbox
            :checked="mod.isEnabled"
            :disabled="!isOptional(mod)"
            @change="toggleMod($event, mod)"
            name="check-button"
            switch
          ></b-form-checkbox>
        </td>
        <!-- Workshop link -->
        <td>
          <a :href="`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`" target="_blank">{{ mod.id }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import * as mods from '@/util/mods';

export default {
  name: 'ModsTable',
  props: {
    mods: {
      type: Array,
      default: () => [],
    },
    toggleAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      allChecked: true,
    };
  },
  methods: {
    isOptional(mod) {
      return mods.isOptional(mod);
    },
    getModState(mod) {
      if (!this.isOptional(mod)) {
        return true;
      }

      return mod.isEnabled;
    },
    toggleMod(state, mod) {
      this.$emit('update-mod-state', { enabled: state, id: mod.id });
    },
    onCheckAll(state) {
      this.mods.forEach((x) => {
        this.toggleMod(state, x);
      });

      this.allChecked = state;
    },
  },
  computed: {
    isMixedState() {
      return this.mods.some(x => x.isEnabled) && this.mods.some(x => !x.isEnabled);
    },
  },
};
</script>
