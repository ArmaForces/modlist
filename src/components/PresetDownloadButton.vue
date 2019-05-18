<template>
  <b-dropdown split
    size="sm"
    @click="download(clientMods)"
    :text="$t('download')" class="m-2"
    variant="primary"
    split-variant="primary"
  >
    <b-dropdown-item @click="download(requiredMods)">{{ $t('mods.required') }}</b-dropdown-item>
    <b-dropdown-item @click="download(optionalMods)">{{ $t('mods.optional') }}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import moment from 'moment';
import * as Handlebars from 'handlebars/dist/handlebars';
import presetTpl from '@/util/preset.handlebars';
import * as mods from '@/util/mods';

const launcherTemplate = Handlebars.compile(presetTpl);

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
    download(modsArray) {
      const template = this.template(modsArray);
      const templateB64 = encodeURIComponent(btoa(template));

      const element = document.createElement('a');
      element.setAttribute('href', `data:text/html;base64,${templateB64}`);
      element.setAttribute('download', `ArmaForces_${this.getTitle()}.html`);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    getTitle() {
      return `${this.title}  ${moment().format('YYYY_MM_DD  HH_mm')}`;
    },
    template(modsArray) {
      return launcherTemplate({
        title: this.getTitle(),
        mods: modsArray,
      });
    },
  },
  computed: {
    clientMods() {
      return this.mods.filter(x => x.isEnabled);
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
