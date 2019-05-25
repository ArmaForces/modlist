import Vue from 'vue';
import Router from 'vue-router';
import ModsetCreate from '@/components/ModsetCreate';
import {
  HtmlConvertPage,
  PresetDownloadPage,
  PresetSelectPage,
  ToolsPage,
} from '@/pages';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/select-preset' },
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
      component: ToolsPage,
      children: [
        {
          path: '/tools/convert',
          name: 'tools-convert',
          component: HtmlConvertPage,
        },
        {
          path: '/tools/create',
          name: 'tools-create',
          component: ModsetCreate,
        },
      ],
    },
  ],
});
