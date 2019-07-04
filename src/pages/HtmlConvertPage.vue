<template>
  <Loader v-if="!defaultClientside.length"></Loader>
  <!-- Content -->
  <div v-else class="container">
    <div class="row justify-content-center py-3">
      <div class="col-6">
        <b-form-file
          v-model="htmlFile"
          :state="Boolean(htmlFile)"
          accept=".html"
          :placeholder="$t('choose_file')"
          :drop-placeholder="$t('drop_file')"
        ></b-form-file>
      </div>
    </div>
    <div class="row">
      <b-tabs class="col">
        <!-- Yours tab -->
        <b-tab>
          <template slot="title">
            {{ $t('mods.yours') }}
            <b-badge pill variant="secondary">{{ userMods.length }}</b-badge>
          </template>
          <ModsCsvTable
            :mods="filter(userMods)"
            @set-mod-type="setModType"
            @new-mod="addMod"
            @remove-mod="removeMod"
          ></ModsCsvTable>
        </b-tab>
        <!-- Default optional tab -->
        <b-tab pills>
          <template slot="title">
            {{ $t('mods.default_clientside') }}
            <b-badge
              pill
              variant="secondary"
            >
              {{ defaultClientside.filter(x => x.isEnabled).length }}/{{ defaultClientside.length }}
            </b-badge>
          </template>
          <ModsTable
            :mods="filter(defaultClientside)"
            @update-mod-state="enableDefaultClientside"
          ></ModsTable>
        </b-tab>
        <!-- Searchbar -->
        <template slot="tabs">
          <li class="nav-item align-self-center ml-auto">
            <b-form-input
              v-model="search"
              :placeholder="$t('search')"
              size="sm"
              class="mr-sm-2 d-md-block d-none"
            ></b-form-input>
          </li>
          <li class="nav-item align-self-center">
            <CsvDownloadButton :mods="allMods"></CsvDownloadButton>
          </li>
        </template>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/modsApi';
import readFile from '@/util/readFile';
import htmlToMods from '@/util/htmlToMods';
import * as mods from '@/util/mods';
import ModsCsvTable from '@/components/ModsCsvTable';
import CsvDownloadButton from '@/components/CsvDownloadButton';
import Loader from '@/components/Loader';
import ModsTable from '@/components/ModsTable';

export default {
  components: { ModsCsvTable, CsvDownloadButton, Loader, ModsTable },
  data() {
    return {
      htmlFile: null,
      html: '',
      userMods: [],
      search: '',
      defaultClientside: [],
    };
  },
  async mounted() {
    const defaultClientside = await api.getDefaultClientside();
    this.defaultClientside = defaultClientside.map(x => ({
      ...x,
      isEnabled: true,
    }));
  },
  methods: {
    escape,
    prepareUserMods(modsArray) {
      return Array.from(modsArray).map(x => ({
        ...x,
        type: mods.getModType(x.link),
      }));
    },
    setModType($event) {
      console.log('update mod type', $event);
      mods.setModType($event.id, $event.type);
      this.userMods = this.prepareUserMods(this.userMods);
    },
    enableDefaultClientside($event) {
      console.log('update optional state', $event);
      const mod = this.defaultClientside.find(x => x.id === $event.id);
      mod.isEnabled = $event.enabled;
      this.$forceUpdate();
    },
    filter(modsArr) {
      return modsArr.filter(
        (m) => {
          const name = m.displayname || m.name;
          return name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
        });
    },
    addMod(mod) {
      this.userMods.unshift(mod);
      this.$forceUpdate();
    },
    removeMod(mod) {
      const idx = this.userMods.findIndex(x => x.link === mod.link);
      this.userMods.splice(idx, 1);
    },
  },
  computed: {
    allMods() {
      const optionals = this.defaultClientside
        .filter(x => x.isEnabled)
        .map(x => ({
          displayname: x.name,
          link: x.id,
          type: 'clientside',
        }));

      return Array.concat(this.userMods, optionals);
    },
  },
  watch: {
    async htmlFile() {
      if (!this.htmlFile) {
        this.html = '';
        return;
      }

      this.html = await readFile(this.htmlFile);
    },
    async html() {
      const modsArray = await htmlToMods(this.html);
      this.userMods = this.prepareUserMods(modsArray);
    },
  },
};
</script>
