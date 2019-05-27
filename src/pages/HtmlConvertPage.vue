<template>
  <div class="container">
    <div class="row">
      <div class="col-">
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
            <b-badge pill variant="secondary">{{ mods.length }}</b-badge>
          </template>
          <ModsCsvTable
            :mods="filter(mods)"
            @set-mod-type="setModType"
            @new-mod="addMod"
            @remove-mod="removeMod"
          ></ModsCsvTable>
        </b-tab>
        <!-- Default optional tab -->
        <b-tab pills>
          <template slot="title">
            {{ $t('mods.default_optional') }}
            <b-badge pill variant="secondary">{{ 10 }}/{{ 10 }}</b-badge>
          </template>
          Default optionals here
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
            <CsvDownloadButton :mods="mods"></CsvDownloadButton>
          </li>
        </template>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import readFile from '@/util/readFile';
import htmlToMods from '@/util/htmlToMods';
import * as mods from '@/util/mods';
import ModsCsvTable from '@/components/ModsCsvTable';
import CsvDownloadButton from '@/components/CsvDownloadButton';

export default {
  components: { ModsCsvTable, CsvDownloadButton },
  data() {
    return {
      htmlFile: null,
      html: '',
      mods: [],
      search: '',
    };
  },
  methods: {
    escape,
    prepareMods(modsArray) {
      return Array.from(modsArray).map(x => ({
        ...x,
        type: mods.getModType(x.link),
      }));
    },
    setModType($event) {
      console.log('update mod state', $event);
      mods.setModType($event.id, $event.type);
      this.mods = this.prepareMods(this.mods);
    },
    filter(modsArr) {
      return modsArr.filter(
        m =>
          m.displayname.toLowerCase().indexOf(this.search.toLowerCase()) !== -1,
      );
    },
    addMod(mod) {
      this.mods.unshift(mod);
      this.$forceUpdate();
    },
    removeMod(mod) {
      const idx = this.mods.findIndex(x => x.link === mod.link);
      this.mods.splice(idx, 1);
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
      this.mods = this.prepareMods(modsArray);
    },
  },
};
</script>
