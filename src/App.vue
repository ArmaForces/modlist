<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">ArmaForces Modlist</a>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <form class="form-inline my-2 my-lg-0">
          <b-form-select v-model="selectedModset" :options="modsets"></b-form-select>
          <b-button
            variant="success"
            :disabled="!mods.length"
            @click="$refs.launcherHtml.download()"
          >Download</b-button>
        </form>
      </div>
    </nav>
    <div class="container">
      <!-- Parsing errors -->
      <div v-if="parsingErrors.length">
        Errors:
        <ul>
          <li v-for="(error, idx) in parsingErrors" :key="idx">
            <strong>L{{error.row}}</strong>: {{ error.message }}
          </li>
        </ul>
      </div>
      <!-- Mods -->
      <main v-if="selectedModset">
        <b-tabs card v-if="mods.length">
          <b-tab title="Optional">
            <!-- Optional mods table -->
            <ModsTable
              key="optional"
              :mods="optionalMods"
              @update-mod-state="enableMod"
            ></ModsTable>
          </b-tab>
          <b-tab title="Required">
            <!-- Required mods table -->
            <ModsTable
              key="required"
              :mods="requiredMods"
            ></ModsTable>
          </b-tab>
        </b-tabs>
        <div v-else style="display:flex; justify-content: center;">
          <b-spinner
            type="grow"
            variant="success"
            style="width: 5rem; height: 5rem;"
          ></b-spinner>
        </div>
      </main>
      <div v-else style="display:flex; justify-content: center;">
        <h2>Please select modlist</h2>
      </div>
    </div>
    <!-- Template -->
    <div v-show="false" v-if="selectedModset">
      <LauncherTemplate ref="launcherHtml"
        :title="selectedModset"
        :mods="mods.filter(x => x.isEnabled)"
      ></LauncherTemplate>
    </div>
  </div>
</template>

<script>
import LauncherTemplate from './LauncherTemplate'
import ModsTable from './ModsTable'
import * as api from './api'
import * as mods from './mods'

export default {
  name: 'app',
  components: { LauncherTemplate, ModsTable },
  data () {
    return {
      selectedModset: null,
      modsets: [],
      mods: [],
      parsingErrors: [],
    }
  },
  async mounted() {
    const modsets = await api.getDownloadableModsets()
    let modsetOptions = [{ value: null, text: 'Please select some modset' }]
      .concat(
        modsets.map(x => ({ value: x, text: x }))
      )

    this.modsets = modsetOptions
  },
  methods: {
    async getModset(modset) {
      const parsedData = await api.getModsetData(modset)
      this.mods = this.prepareMods(parsedData.data)
      this.parsingErrors = parsedData.errors
    },
    prepareMods(modsArray) {
      return modsArray
        .map(x => ({
          ...x,
          isEnabled: !mods.isOptional(x) || mods.isEnabled(x.id)
        }))
    },
    enableMod($event) {
      console.log('update mod state', $event)
      mods.setEnabled($event.id, $event.enabled)
      this.mods = this.prepareMods(this.mods)
    }
  },
  watch: {
    selectedModset(val) {
      this.mods = []
      this.getModset(val)
    }
  },
  computed: {
    clientMods() {
      return this.mods.filter(x => x.is_serverside !== 'True')
    },
    requiredMods() {
      return this.clientMods.filter(x => x.is_optional !== 'True')
    },
    optionalMods() {
      return this.clientMods.filter(x => x.is_optional === 'True')
    }
  }
}
</script>
