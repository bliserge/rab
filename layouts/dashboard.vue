<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      app
      style="backgroupnd: #3F4D67"
    >
      <v-list-item >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Post Harvest
          </v-list-item-title>
          <v-list-item-subtitle>
            Managing Agriculture Yield
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <nuxt-link 
        v-for="([icon, text, goto], i) in items"
        :key="i"
        :to="goto"
        @click="setActiveItem(i)"
        class="itemDiv" :id="'item'+i"
        >

        <v-list-item link >
          <v-list-item-icon >
            <v-icon color="#64C5B1">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title >{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app  elevation="0" color="#ffffff">

      <v-row justify="space-between" align="center">
        <v-app-bar-nav-icon @click="drawer = !drawer" class="toggle"></v-app-bar-nav-icon>
        <v-menu
        transition="slide-y-transition"
        rounded="xl"
        class="dropdown-profile"
        bottom
        :close-on-content-click="false"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-icon 
            large 
            color="#64C5B1" 
            class="search-icon"
            v-bind="attrs"
            v-on="on">
            mdi-magnify</v-icon>
            </template>

            <!-- <v-card>
              <v-text-field
              prepend-inner-icon="mdi-magnify"
              v-model="searchKeyWord"
              rounded
              outlined
              placeholder="Search"
              dense
              ></v-text-field>
            </v-card> -->
        </v-menu>
        <v-col>
            <!-- <v-text-field
            prepend-inner-icon="mdi-magnify"
            v-model="searchKeyWord"
            rounded
            outlined
            placeholder="Search"
            dense
            class="input-field"
            ></v-text-field>
            <v-spacer />
            <v-row>
            </v-row> -->
        </v-col>
        <v-row justify="end" class="sub-menu">
            <v-menu
            transition="slide-y-transition"
            rounded="xl"
            class="dropdown-profile"
            bottom
            >
            <template v-slot:activator="{ on, attrs }">
              <v-badge
              bordered
              bottom
              color="deep-purple accent-4"
              dot
              offset-x="10"
              offset-y="10"
            >
                <v-avatar 
                class="avatar"
                v-bind="attrs"
                v-on="on"
                >
                    <img
                        src="~assets/profile.png"
                        alt="mg"
                    >
                </v-avatar>
              </v-badge>
            </template>
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            welcome Again
                        </v-list-item-subtitle>
                        <v-list-item-title>
                            {{ names }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
                <router-link
                v-for="(item, i) in profile_items"
                :key="i"
                :to="item.goto"
                
                >
                <v-list-item
                link
                
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                </router-link>
                <v-list-item
                link
                >
                <v-list-item-title @click="logout">Logout</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
        </v-row>
    </v-row>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
        drawer: null,
        searchKeyWord: '',
        names: 'Serge Bliss',
        items: [
        ['mdi-home-outline', 'Dashboard', '/home'],
        ],
        profile_items: [
        ]
      
    }),
    methods: {
      logout() {
            localStorage.clear();
            this.$router.push('/login')
        },
        setActiveItem(index){
        this.activeIndex=index
        let n = document.getElementsByClassName('itemDiv');
        for (let i = 0; i < n.length; i++) {
          n[i].classList.remove('active')
        }
        let x = document.getElementById("item"+index);
        x.classList.add("active");
      },
    },
    mounted() {
      this.setActiveItem(0);
    }
  }
</script>

<style scoped>
a {
  text-decoration: none;
  color: #0B0B0A;
}
main {
  max-width: 100% !important;
  background-color: #f6f6f6ec;
}
.input-field >>> .v-input__slot::before, .input-field {
  border-color: #47F6AA;
  width: 300px;
}
.dropdown-profile {
    top: 11%;
}
.v-menu__content {
    margin-top: 4%;
    width: 20%;
}
.active {
  background: powderblue;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);
}   
@media only screen and (max-width: 730px) {
    .input-field >>> .v-input__slot::before, .input-field {
        display: none !important;
    }
}
</style>