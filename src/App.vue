<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">ArmaForces Modlist</a>

      <div>

      </div>
    </nav>
    <div class="container">
      <section v-if="mods.length" class="d-flex justify-content-between">
          <!-- Change button -->
          <b-button
            @click="selectedModset = null"
          >
            &lt; change modset
          </b-button>
          <!-- Download button -->
          <Download ref="launcherHtml"
            :title="selectedModset"
            :mods="clientMods.filter(x => x.isEnabled)"
          ></Download>
      </section>
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
          <b-tab>
            <template slot="title">
              Optional
              <b-badge pill variant="secondary">
                {{ optionalMods.filter(x => x.isEnabled).length }}/{{ optionalMods.length }}
              </b-badge>
            </template>
            <!-- Optional mods table -->
            <ModsTable
              key="optional"
              :mods="optionalMods"
              @update-mod-state="enableMod"
            ></ModsTable>
          </b-tab>
          <b-tab>
            <template slot="title">
              Required
              <b-badge pill variant="secondary">
                {{ requiredMods.length }}
              </b-badge>
            </template>
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
      <!-- Modset selection -->
      <div v-else class="row">
        <div class="col-12 d-flex justify-content-center">
          <h2>Please select modlist</h2>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <div>
            <b-button block v-for="modset in modsets" :key="modset"
              v-b-tooltip.hover.right.d500="modset === current ? 'Modset used currently on server' : ''"
              @click="selectedModset = modset"
              :variant="modset === current ? 'primary' : 'secondary'"
              class="text-capitalize"
            >
              {{ modset }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Download from './Download'
import ModsTable from './ModsTable'
import * as api from './api'
import * as mods from './mods'

export default {
  name: 'app',
  components: { Download, ModsTable },
  data () {
    return {
      selectedModset: null,
      modsets: [],
      mods: [],
      current: '',
      parsingErrors: [],
    }
  },
  async mounted() {
    this.modsets = await api.getDownloadableModsets()
    this.current = await api.getCurrentModset()
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
      if (val)
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
