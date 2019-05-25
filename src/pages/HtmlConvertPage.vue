<template>
  <b-container>
    <div class="row">
      <div class="col-auto">
        <b-form-file
          v-model="htmlFile"
          :state="Boolean(htmlFile)"
          accept=".html"
          :placeholder="$t('choose_file')"
          :drop-placeholder="$t('drop_file')"
        ></b-form-file>
      </div>
      <div class="col-auto ml-auto">
        <CsvDownloadButton :mods="mods"></CsvDownloadButton>
      </div>
      <div class="col-auto">
        <b-form-input
          v-model="search"
          :placeholder="$t('search')"
        ></b-form-input>
      </div>
    </div>
    <div class="row">
      <ModsCsvTable
        :mods="filter(mods)"
        @set-mod-type="setModType"
        @new-mod="addMod"
        @remove-mod="removeMod"
      ></ModsCsvTable>
    </div>
  </b-container>
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
      return modsArr.filter(m =>
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
    html() {
      const modsArray = htmlToMods(this.html);
      this.mods = this.prepareMods(modsArray);
    },
  },
};
</script>
