<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <div class="container">
          <b-navbar-brand class="logo" href="https://armaforces.com">
            ArmaForces
          </b-navbar-brand>
          <b-navbar-nav>
            <!-- Download -->
            <b-nav-item :to="{ name: 'select-preset' }"
              active-class="active"
            >{{ $t('nav.get') }}</b-nav-item>
            <!-- Tools -->
            <b-nav-item-dropdown
              :text="$t('nav.tools')"
              :to="'/tools'"
              active-class="active"
            >
              <b-dropdown-item :to="{ name: 'tools-create' }" active-class="font-weight-bold">
                {{ $t('nav.create') }}
              </b-dropdown-item>
              <b-dropdown-item :to="{ name: 'tools-convert' }" active-class="font-weight-bold ">
                {{ $t('nav.convert') }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item href="https://armaforces.com/">Main page</b-nav-item> -->
            <!-- <b-nav-item href="https://forum.armaforces.com/">Forum</b-nav-item> -->
            <SettingsDropdown></SettingsDropdown>
          </b-navbar-nav>
      </div>
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
