<template>
    <v-navigation-drawer
      absolute
      width="21%"
      permanent
      class="nav-drawer"
      v-model="drawer"
      app
    >
      <v-list-item >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <router-link 
        v-for="([icon, text, goto], i) in items"
        :key="i"
        :to="goto">

        <v-list-item link>
          <v-list-item-icon >
            <v-icon color="#64C5B1">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="nav-text">{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      items: [
        ['mdi-home-outline', 'Overview', '/k-cash'],
        ['mdi-speedometer', 'Activities', '/activities'],
        ['mdi-account-supervisor-circle-outline', 'Users', '/users'],
        ['mdi-help-circle-outline', 'Support', '/support'],
        ['mdi-cogs', 'Settings', '/settings'],
      ],
    }),
  }
</script>

<style scoped>
a {
  text-decoration: none;
  color: #0B0B0A;
}

</style>
