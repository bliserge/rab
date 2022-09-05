<template>
  <v-app>
    <v-app-bar
      absolute
      color="#64C5B1"
      dark
      shrink-on-scroll
      prominent
      scroll-target="#scrolling-techniques"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

      <ul v-for="([item, goto], i) in items" :key="i">
        <li><router-link :to="goto">{{item}} </router-link></li>
      </ul>

    </v-app-bar>
    <v-sheet
      id="scrolling-techniques"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        ['home', '/'],
        ['About Us', '/'],
        ['Conact Us', '/'],
        ['Login', '/login']
      ]
    }
  },
  layout: 'default'
}
</script>

<style scoped>
ul {
  
  list-style: none;
}
ul li {
  font-size: large;
  font-weight: 300;
}
a {
  text-decoration: none !important;
  color: white !important;
  margin-top: 5%;
}
</style>