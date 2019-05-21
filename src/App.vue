<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand class="logo">ArmaForces</b-navbar-brand>
        <b-navbar-nav>
          <!-- Download -->
          <b-nav-item :to="{ name: 'select-preset' }"
            active-class="active"
          >{{ $t('nav.get') }}</b-nav-item>
          <!-- Create  -->
          <b-nav-item :to="{ name: 'modset-create' }"
            active-class="active"
          >{{ $t('nav.create') }}</b-nav-item>
          <!-- Tools -->
          <b-nav-item :to="{ name: 'tools' }"
            active-class="active"
          >{{ $t('nav.tools') }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item href="https://armaforces.com/">Main page</b-nav-item> -->
          <!-- <b-nav-item href="https://forum.armaforces.com/">Forum</b-nav-item> -->
          <SettingsDropdown></SettingsDropdown>
        </b-navbar-nav>
    </b-navbar>
    <main class="container-fluid pt-2">
      <router-view/>
    </main>
  </div>
</template>

<script>
import SettingsDropdown from '@/components/SettingsDropdown';

export default {
  name: 'App',
  components: { SettingsDropdown },
};
</script>

<style lang="scss">
  html, body, #app {
    height: 100%;
  }

  #app > nav {
    height: 56px;
  }

  #app > main {
    overflow-y: scroll;
    height: calc(100% - 56px);
  }

  .logo {
    user-select: none;
  }
</style>
