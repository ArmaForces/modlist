<template>
  <b-container>
    <b-row>
      <b-form-file
        v-model="htmlFile"
        :state="Boolean(htmlFile)"
        accept=".html"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-row>
    <b-row>
      <pre>
        {{ 'sadf'  }}
      </pre>
    </b-row>
  </b-container>
</template>

<script>
import readFile from '@/util/readFile';
import htmlToMods from '@/util/htmlToMods';

export default {
  data() {
    return {
      htmlFile: null,
      html: '',
      mods: [],
    };
  },
  methods: {
    escape,
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
      this.mods = htmlToMods(this.html);
    },
  },
};
</script>
