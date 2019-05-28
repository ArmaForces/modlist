<template>
  <b-button
    @click="download(prepareMods(mods))"
    size="sm"
    class="m-2"
    variant="primary"
  >
    {{ $t('download') }}
  </b-button>
</template>

<script>
import Papa from 'papaparse';
import * as mods from '@/util/mods';


export default {
  name: 'DownloadButton',
  props: {
    title: {
      type: String,
      default: '',
    },
    mods: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    prepareMods(modsArray) {
      return modsArray
        .map(x => ({
          id: x.link,
          name: x.displayname,
          is_serverside: this.toCsvBool(x.type === mods.TYPES.SERVERSIDE),
          is_optional: this.toCsvBool(x.type === mods.TYPES.CLIENTSIDE),
          is_map: this.toCsvBool(x.type === mods.TYPES.OPTIONAL),
        }));
    },
    toCsvBool: x => (x ? 'True' : 'False'),
    download(modsArray) {
      const csvText = Papa.unparse(modsArray, {
        quotes: true,
        delimiter: ';',
      });
      const templateB64 = encodeURIComponent(btoa(csvText));

      const element = document.createElement('a');
      element.setAttribute('href', `data:text/html;base64,${templateB64}`);
      element.setAttribute('download', `ArmaForces_${this.title}.csv`);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>
