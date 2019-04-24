<template>
  <b-button
    variant="success"
    @click="download()"
  >
    Download - <strong>{{ title }}</strong>
  </b-button>
</template>

<script>
import moment from 'moment';
import * as Handlebars from 'handlebars/dist/handlebars';
import presetTpl from './preset.handlebars';

const launcherTemplate = Handlebars.compile(presetTpl);

export default {
  name: "Download",
  props: {
    title: {
      type: String,
      default: "",
    },
    mods: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    download() {
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/html;base64,' + encodeURIComponent(btoa(this.template)))
      element.setAttribute('download', `ArmaForces_${this.title}.html`);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  },
  computed: {
    template() {
      return launcherTemplate({
        title: `${this.title}  ${moment().format('YYYY_MM_DD  HH_mm')}`,
        mods: this.mods,
      })
    },
  }
}
</script>
