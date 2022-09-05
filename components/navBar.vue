<template>
    <section class="navbar">
        <v-card elevation="0">
            <v-card-title>
                <v-row justify="space-between" align="center">
                    <v-col>
                        <v-text-field
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
                        <v-app-bar-nav-icon @click="drawer = !drawer" class="toggle"></v-app-bar-nav-icon>
                        <v-icon large color="#64C5B1" class="search-icon">mdi-magnify</v-icon>
                        </v-row>
                    </v-col>
                    <v-row justify="end" class="sub-menu">
                        <v-menu
                        transition="slide-y-transition"
                        rounded="xl"
                        class="dropdown-profile"
                        bottom
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar 
                            class="avatar"
                            v-bind="attrs"
                            v-on="on"
                            >
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                >
                            </v-avatar>
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
                            <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                    </v-row>
                </v-row>
            </v-card-title>
        </v-card>
    </section>
</template>


<script>
export default {
    data() {
        return {
            drawer: null,
            names: 'Serge Bliss',
            items: [
                { title: 'Profile' },
                { title: 'Settings' },
                { title: 'Log out' },
            ],
        }
    },
    components: {
        navBar: 'nav-bar'
    }
}
</script>

<style scoped>
.input-field >>> .v-input__slot::before, .input-field {
  border-color: #47F6AA;
  width: 300px;
}
.dropdown-profile {
    top: 11%;
}
@media only screen and (max-width: 730px) {
    .input-field >>> .v-input__slot::before, .input-field {
        display: none !important;
    }
}
</style>