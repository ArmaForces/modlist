<template>
  <Loader v-if="!modsets.length"></Loader>
  <!-- Modsets List -->
  <div v-else class="row">
    <div class="col-12 d-flex justify-content-center">
      <h2>{{ $t('mods.select') }}</h2>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <div class="container d-flex flex-wrap justify-content-center">
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
import Loader from '@/components/Loader';

export default {
  name: 'SelectPresetPage',
  components: { PresetSelectButton, Loader },
  data() {
    return {
      modsets: [],
      current: '',
    };
  },
  async mounted() {
    const promises = [
      api.getDownloadableModsets(),
      api.getCurrentModset(),
    ];

    [this.modsets, this.current] = await Promise.all(promises);

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
