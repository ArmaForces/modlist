import Vue from 'vue';
import Router from 'vue-router';
import ModsetCreate from '@/components/ModsetCreate';
import PresetSelectPage from '@/pages/PresetSelectPage';
import PresetDownloadPage from '@/pages/PresetDownloadPage';
import ToolsPage from '@/pages/ToolsPage';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/select-preset' },
    {
      path: '/create',
      name: 'modset-create',
      component: ModsetCreate,
    },
    {
      path: '/select-preset',
      name: 'select-preset',
      component: PresetSelectPage,
    },
    {
      path: '/download/:modset',
      name: 'download-preset',
      component: PresetDownloadPage,
      props: true,
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolsPage,
    },
  ],
});
