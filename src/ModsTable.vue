<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Modname</th>
        <th scope="col">Include?</th>
        <th scope="col">Steam ID</th>
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
            @change="$emit('update-mod-state', { enabled: $event, id: mod.id })"
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
import * as mods from './mods'

export default {
  name: "EffectiveMods",
  props: {
    mods: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    isOptional(mod) {
      return mods.isOptional(mod)
    },
    getModState(mod) {
      if (!this.isOptional(mod))
        return true

      return mod.isEnabled
    }
  }
}
</script>
