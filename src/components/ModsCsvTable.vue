<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t('mods.table.modname') }}</th>
        <th scope="col">{{ $t('mods.table.type') }}</th>
        <th scope="col">{{ $t('mods.table.steam_id') }}</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <!-- Add mod row -->
      <tr>
        <td>-</td>
        <td>
          <b-form-input
            size="sm"
            v-model="newmod.displayname"
          ></b-form-input>
        </td>
        <td>
          <b-form-select
            size="sm"
            v-model="newmod.type"
            :options="typesOptions"
          ></b-form-select>
        </td>
        <td>
          <b-form-input
            size="sm"
            v-model="newmod.link"
          ></b-form-input>
        </td>
        <td>
          <b-button
            size="sm"
            variant="outline-success"
            @click="addMod"
          >+</b-button>
        </td>
      </tr>
      <!-- Mods list -->
      <tr v-for="(mod, idx) in mods" :key="idx">
        <th scope="row">{{ idx+1 }}</th>
        <td>{{ mod.displayname }}</td>
        <!-- Toggle radiobutton -->
        <td>
          <b-form-select
            size="sm"
            :value="mod.type"
            @change="$emit('set-mod-type', { type: $event, id: mod.link })"
            :options="typesOptions"
          ></b-form-select>
          <!-- <b-form-checkbox
            :checked="mod.isEnabled"
            :disabled="!isOptional(mod)"
            @change="$emit('set-mod-type', { type: $event, id: mod.id })"
            name="check-button"
            switch
          ></b-form-checkbox>-->
        </td>
        <!-- Workshop link -->
        <td>
          <a
            :href="`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.link}`"
            target="_blank"
          >{{ mod.link }}</a>
        </td>
        <!-- Actions -->
        <td>
          <b-button
            size="sm"
            variant="outline-danger"
            @click="removeMod(mod)"
          >-</b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import * as mods from '@/util/mods';

export default {
  props: {
    mods: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newmod: {
        displayname: '',
        link: '',
        type: mods.TYPES.REQUIRED,
      },
    };
  },
  methods: {
    getModType(mod) {
      return mods.getModType(mod.link);
    },
    addMod() {
      this.$emit('new-mod', { ...this.newmod });
      this.newmod = { displayname: '', link: '', type: mods.TYPES.REQUIRED };
    },
    removeMod(mod) {
      this.$emit('remove-mod', mod);
    },
  },
  computed: {
    typesOptions() {
      return Object.keys(mods.TYPES)
        .map(x => mods.TYPES[x])
        .map(x => ({ value: x, text: this.$t(`mods.types.${x}`) }));
    },
  },
};
</script>
