<template>
  <v-app>
      <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-card elevation="2" outlined class="rounded-xl main-card">
                <v-row class="inner-row">
                    <v-col md="8" lg="8" sm="8">
                        <v-row class="mt-5">
                            <!-- <v-img
                            :src="require('~/assets/k-cash.png')"
                            class="logo-img"
                            contain
                            height="30"
                            /> -->
                        </v-row>
                        <v-row align="center" justify="space-around">
                            <v-card elevation="0" class="rounded-xl inner-card">
                                <v-card-title primary-title class="justify-center">
                                    <h2>Login </h2>
                                </v-card-title>
                                <v-row justify="center" v-if="form_error">
                                    <div class="form_errors">{{form_error}}</div>
                                </v-row>
                                <validation-observer ref="form" class="px-3">
                                        <v-card-text  class="text-center">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <v-text-field 
                                                filled
                                                prepend-inner-icon="mdi-email"
                                                class="input-field"
                                                label="Email" 
                                                clearable
                                                :error="errors[0] ? true : false"
                                                v-model="email"
                                                flat
                                                ></v-text-field>
                                            </validation-provider>
                                            <validation-provider rules="required" v-slot="{ errors }">
                                            <v-text-field
                                            prepend-inner-icon="mdi-lock-outline"
                                            :append-icon=" show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'"
                                            @click:append="showPassword"
                                            v-model="password"
                                            class="input-field"
                                            :error="errors[0] ? true : false"
                                            label="Password"
                                            filled
                                            flat
                                            ></v-text-field>
                                            </validation-provider>
                                        <h3>Forgot password?</h3>
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <v-btn 
                                        class="justify-center auth-btn"
                                        rounded
                                        large
                                        :loading='sending'
                                        :disabled='sending'
                                        @click="login"
                                        >SIGN IN</v-btn>
                                    </v-card-actions>
                                </validation-observer>
                            </v-card>
                        </v-row>
                    </v-col>
                    <v-col class="side-card-login" md="4" lg="4" sm="4">
                        <img src="assets/icon.png" alt="" srcset="">
                        <v-row align="center" justify="center" class="side-row">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <!-- <v-btn 
                            class="justify-center signup auth-btn"
                            rounded
                            large
                            to="/signup"
                            >SIGN UP</v-btn> -->
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
export default {
  name: 'App',
  data() {
      return {
        password: '',
        email: '',
        show: false,
        sending: false,
        form_error: ''
      }
  },
  methods: {
      showPassword() {
          this.show = !this.show
      },
      login() {
        this.sending = true;
        this.$axios.post('https://cooperative-management.herokuapp.com/api/auth/login',
                {
                email:this.email,
                password:this.password
            },
            {
                headers: {
                'Content-Type': 'application/json'
                }
            }
            )
        .then (res => {
            if(res.data.userType === '2') {
                // this.$store.commit('updateAuthenticated', true)
                localStorage.setItem('token', JSON.stringify(res.data.token));
                this.$router.push('/home');
            } else {
                this.$toast.errors("You are not Authorized")
            }
        }).catch (errors => {
            console.log(errors)
            // this.form_error = errors.response.data.message;
        })
          .finally(() => {
            this.password = '';
            this.sending = false;
          })
      },
      submit() {
      this.$refs.form.validate().then(res => {
        if (res) {
          this.login()
        }
      })
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  layout: 'authentication'

};
</script>

<style scoped>
.input-field :deep() .v-input__slot::before, .input-field {
    border-style: none !important;
}

</style>