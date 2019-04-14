<template>
  <div id="launcher-template">
  <html>
    <head>
      <meta name="arma:Type" content="preset" />
      <meta name="arma:PresetName" :content="`ArmaForces - ${title}`" />
      <meta name="generator" content="ArmaForces - https://www.armaforces.pl/" />
      <title>{{ title }}</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <h1>ArmaForces Mods - <strong>{{ title }}</strong></h1>
      <p class="before-list">
        <em>Drag this file to Arma 3 Launcher or open it Mods / Preset / Import.</em>
      </p>
      <div class="mod-list">
        <table>

          <tr v-for="mod in mods" :key="mod.id" data-type="ModContainer">
            <td data-type="DisplayName">{{ mod.name }}</td>
            <td>
              <span class="from-steam">Steam</span>
            </td>
            <td>
              <a :href="`http://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`" data-type="Link">http://steamcommunity.com/sharedfiles/filedetails/?id={{ mod.id }}</a>
            </td>
          </tr>

        </table>
      </div>
      <div class="footer">
        <span>Created by ArmaForces Modlist page</span>
      </div>
    </body>
  </html>
  </div>
</template>

<script>
export default {
  name: "LauncherTemplate",
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
        return `<?xml version="1.0" encoding="utf-8"?>\n${this.$el.innerHTML}`
      },

  }
}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    color: #fff;
    background: #000;
  }

  body, th, td {
    font: 95%/1.3 Roboto, Segoe UI, Tahoma, Arial, Helvetica, sans-serif;
  }

  td {
      padding: 3px 30px 3px 0;
  }

  h1 {
      padding: 20px 20px 0 20px;
      color: white;
      font-weight: 200;
      font-family: segoe ui;
      font-size: 3em;
      margin: 0;
  }

  em {
      font-variant: italic;
      color:silver;
  }

  .before-list {
      padding: 5px 20px 10px 20px;
  }

  .mod-list {
      background: #222222;
      padding: 20px;
  }

  .footer {
      padding: 20px;
      color:gray;
  }

  .whups {
      color:gray;
  }

  a {
      color: #D18F21;
      text-decoration: underline;
  }

  a:hover {
      color:#F1AF41;
      text-decoration: none;
  }

  .from-steam {
      color: #449EBD;
  }

  .from-local {
      color: gray;
  }
</style>
