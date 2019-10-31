<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">SANDBOX</span>
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="pr-5">
        <v-btn text><router-link to="/ble">BLE</router-link></v-btn>
        <v-btn text><router-link to="/centered">CEN</router-link></v-btn>
      </v-toolbar-items>
      <v-switch @change="toggle" class="mt-6"></v-switch>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
  }),
  methods:{
    toggle(){      
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  mounted() {
    //this.$vuetify.theme.dark = this.showdark;
  }
};
</script>
