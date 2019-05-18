<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand class="logo">ArmaForces</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- Download -->
          <b-nav-item :to="{ name: 'select-preset' }"
            active-class="active"
          >{{ $t('nav.get') }}</b-nav-item>
          <!-- Create  -->
          <b-nav-item :to="{ name: 'modset-create' }"
            active-class="active"
          >{{ $t('nav.create') }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item href="https://armaforces.com/">Main page</b-nav-item> -->
          <!-- <b-nav-item href="https://forum.armaforces.com/">Forum</b-nav-item> -->
          <SettingsDropdown></SettingsDropdown>
        </b-navbar-nav>
      </b-collapse>
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
  .logo {
    user-select: none;
  }
</style>
