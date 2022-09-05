<template>
    <section>
        <v-tab>
            <v-badge
              color="pink"
              :content="counter"
              :value="counter"
              left
              overlap
            >
                <v-menu
                transition="slide-y-transition"
                class="dropdown-profile"
                bottom
                >
                <template v-slot:activator="{ on, attrs }">
                <v-icon size="30" v-bind="attrs" v-on="on" @click="notifications" >mdi-bell-ring-outline</v-icon>
                </template>
                    <v-card elevation="2">
                        <v-card-title>Notifications</v-card-title>
                        <v-card-text class="notification-items">
                            <v-list v-for="[names, group_name, group_id], i in data" :key="i">
                                <v-list-item>
                                    <v-avatar 
                                        class="avatar"
                                        >
                                            <img
                                                src="~assets/profile.jpg"
                                                alt="Kelly"
                                            >
                                        </v-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="text-wrap">
                                            <b>{{names}}</b> has invited you to join <b>{{group_name}}</b> saving group
                                        </v-list-item-title>
                                        
                                    </v-list-item-content>
                                    <v-list-item-action  >
                                        <v-btn  
                                        @click="showInvitation(group_id)" 
                                        elevation="0" 
                                        color="#22AA68" 
                                        small 
                                        outlined>View</v-btn>
                                </v-list-item-action>
                                </v-list-item>
                                <v-divider inset></v-divider>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-badge>
          </v-tab>
    </section>
</template>

<script>
export default {
    data() {
        return {
            counter: '',
            phone: '',
            data: [],
        }
    },
    methods: {
        getPhone() {
            let phone_number = localStorage.getItem('token');
            phone_number = JSON.parse(phone_number);
            this.phone = phone_number.phoneNumber;
            this.notificationsCounter();
        },
        async notificationsCounter() {
            await this.$axios.post(
                'http://localhost:8080/notificationsCounter',
                {
                    phone_number: this.phone
                }
            ).then(res => {
                this.counter = res.data;
            })
        },
        async notifications() {
            await this.$axios.post(
                'http://localhost:8080/notifications',
                {
                    phone_number: this.phone
                }
            ).then(res => {
                let data = res.data
                var output = data.map(function(obj) {
                    return Object.keys(obj).map(function(key) { 
                        return obj[key];
                    });
                });
                // let result = data.map(group_name => group_name.group_name);
                this.data = output
                this.clearSeen();
            })
        },
        async clearSeen() {
            await this.$axios.post(
                'http://localhost:8080/clearSeen',
                {
                    phone_number: this.phone,
                }
            ).then(res => {
                console.log(res.data)
                this.counter = 0;
            })
        },
        showInvitation(id) {
            this.$router.push('/joinGroup');
            localStorage.setItem('group_id', id);
        }
    },
    components: {
        notificationTab: 'notification-tab'
    },
    mounted() {
    //   this.getPhone();
    }
}
</script>

<style scoped>
.v-tab {
    margin-top: 12%;
}
.v-menu__content {
    margin-top: 3%;
    width: 35%;
    box-shadow: 0.5px;
    background: blue;
}
.v-card__title {
    background: radial-gradient(#24B56F, #22AA68);
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
}
.notification-items {
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.v-list-item__content {
    margin-left: 5%;
}
.view-all{
    background: blueviolet;
}
.v-btn {
    color: #333190;
    font-size: medium;
}
.space {
    width: 10%;
}
@media only screen and (max-width: 1090px) {
.v-menu__content {
    margin-top: 5%;
    width: 40%;
}
}
@media only screen and (max-width: 786px) {
.v-menu__content {
    margin-top: 6%;
    width: 60%;
}
}
@media only screen and (max-width: 540px) {
.v-menu__content {
    margin-top: 8%;
    width: 80%;
}
}
@media only screen and (max-width: 410px) {
.v-menu__content {
    margin-top: 10%;
    width: 100%;
}
}
</style>