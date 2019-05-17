<template>
  <div v-if="!modsets.length" style="display:flex; justify-content: center;">
    <b-spinner type="grow" variant="success" style="width: 5rem; height: 5rem;"></b-spinner>
  </div>
  <!-- Modsets List -->
  <div v-else class="row">
    <div class="col-12 d-flex justify-content-center">
      <h2>Please select modlist</h2>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <div>
        <PresetSelectButton v-for="modset in modsets" :key="modset"
          :modset="modset"
          :is-current="modset === current"
        ></PresetSelectButton>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/modsApi';
import PresetSelectButton from '@/components/PresetSelectButton';

export default {
  name: 'SelectPresetPage',
  components: { PresetSelectButton },
  data() {
    return {
      modsets: [],
      current: '',
    };
  },
  async mounted() {
    this.modsets = await api.getDownloadableModsets();
    this.current = await api.getCurrentModset();

    // current is always listed
    if (this.modsets.findIndex(m => m === this.current) === -1) {
      this.modsets.push(this.current);
    }

    console.log('current', this.current);
    console.log('downloadable', this.modsets);
  },
  computed: {
    clientMods() {
      return this.mods.filter(x => x.is_serverside !== 'True');
    },
    requiredMods() {
      return this.clientMods.filter(x => x.is_optional !== 'True');
    },
    optionalMods() {
      return this.clientMods.filter(x => x.is_optional === 'True');
    },
  },
};
</script>
