<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
        <div id="nav">
          <router-link to="/">Comformal</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/GChart">GChart</router-link> |
          <router-link to="/Chartjs">Chartjs</router-link> |
          <router-link to="/CardTest">CardTest</router-link> |
          <router-link to="/newComformal">newComformal</router-link>

        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Comformal from './views/Comformal';
import About from './views/About';
import GChart from './views/GChart';
import Chartjs from './views/Chartjs';
import CardTest from './components/CardTest';
import newComformal from './views/newComformal';

export default {
  name: 'App',
  components: {
    Comformal,
    About,
    GChart,
    Chartjs,
    CardTest,
    newComformal
  },
  data: () => ({
    //
  }),
};
</script>
