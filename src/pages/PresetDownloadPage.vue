<template>
  <b-tabs class="container">
    <!-- Optional tab -->
    <b-tab pills>
      <template slot="title">
        {{ $t('mods.optional') }}
        <b-badge pill variant="secondary">
          {{ optionalMods.filter(x => x.isEnabled).length }}/{{ optionalMods.length }}
        </b-badge>
      </template>
      <ModsTable :mods="filter(optionalMods)" @update-mod-state="enableMod"></ModsTable>
    </b-tab>
    <!-- Required tab -->
    <b-tab>
      <template slot="title">
        {{ $t('mods.required') }}
        <b-badge pill variant="secondary">
          {{ requiredMods.length }}
        </b-badge>
      </template>
      <ModsTable :mods="filter(requiredMods)"></ModsTable>
    </b-tab>
    <!-- Searchbar -->
    <template slot="tabs">
      <li class="nav-item align-self-center ml-auto">
        <b-form-input v-model="search"
          size="sm"
          class="mr-sm-2 d-md-block d-none"
          :placeholder="$t('search')"
        ></b-form-input>
      </li>
      <li class="nav-item align-self-center">
        <DownloadButton
          :mods="clientMods"
          :title="modset"
        ></DownloadButton>
      </li>
    </template>
  </b-tabs>
</template>

<script>
import * as api from '@/api/modsApi';
import * as mods from '@/util/mods';
import ModsTable from '@/components/ModsTable';
import DownloadButton from '@/components/PresetDownloadButton';

export default {
  name: 'PresetDownloadPage',
  components: { ModsTable, DownloadButton },
  props: {
    modset: { type: String, default: '' },
  },
  data() {
    return {
      search: '',
      mods: [],
    };
  },
  async mounted() {
    this.getModset(this.modset);
  },
  methods: {
    async getModset(modset) {
      const parsedData = await api.getModsetData(modset);
      this.mods = this.prepareMods(parsedData.data);
      this.parsingErrors = parsedData.errors;
    },
    prepareMods(modsArray) {
      return modsArray
        .map(x => ({
          ...x,
          isEnabled: !mods.isOptional(x) || mods.isEnabled(x.id),
        }));
    },
    enableMod($event) {
      console.log('update mod state', $event);
      mods.setEnabled($event.id, $event.enabled);
      this.mods = this.prepareMods(this.mods);
    },
    filter(modsArr) {
      return modsArr.filter(m => m.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
    },
  },
  computed: {
    clientMods() {
      return mods.filterClient(this.mods);
    },
    requiredMods() {
      return mods.filterRequired(this.clientMods);
    },
    optionalMods() {
      return mods.filterOptional(this.clientMods);
    },
  },
};
</script>

