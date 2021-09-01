<template>
    <section>
        <!-- Vuetify form field inputs used for user login and registration -->
        {{ birthdate }}
        <div class="wrapper">
            <img id="logo" src="@/assets/logo.png"/>
            <h1>Log In</h1>

            <v-card  
            class="d-flex justify-center mb-6"
            style="background-color:#6a8bf8"
            >
            <v-col
            sm="1"
            md="5"
            class="pa-2"
            outlined
            tile
            >
            <v-text-field
                class="formInput"            
                v-model="usrNameInput"
                label="Email"
                placeholder="Email"
                solo
            ></v-text-field>
            
            <v-text-field
                v-model="pwdInput"
                label="Password"
                placeholder="Password"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                solo
            ></v-text-field>
            <p :class="{ activatedErrorMsg: errMsgActive }">Invalid username/ password combination.</p>
            <v-btn
                @click="loginUser"
                color="primary"
                elevation="2"
                large
            >Log In
            </v-btn>
            
            </v-col>
            </v-card>
        </div>
        <!-- Vuetify form fields for user registration -->
        <h2>Register Below:</h2>
        <div id="registerWrapper">
            <v-text-field
                v-model="username"
                label="Username"
                placeholder="Username"
            ></v-text-field>

            <v-text-field
                v-model="email"
                label="E-mail"
                required
            ></v-text-field>
                <v-text-field
                v-model="bio"
                :counter="200"
                label="bio"
                required
            ></v-text-field>
       
        <v-row>
        <v-spacer></v-spacer>
        <v-col
        cols="12"
        sm="6"
        md="4"
        >
        <v-menu
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="birthdate"
                label="Birthdate"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker
            v-model="birthdate"
            ></v-date-picker>
        </v-menu>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>

            <v-col
            cols="1"
            sm="6"
            ><v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>
            </v-col>
            <v-btn
                @click="registerUser"
                text
                color="primary"
                >Register
            </v-btn>
        </div>
    </section>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {
        name: "LogInPage",
        data: () => {
            return {
                errMsgActive : true,
                usrNameInput : "",
                pwdInput : "",
                username : "",
                email : "",
                bio : "",
                birthdate : null,
                password : "", 
                show1: false,
                show2: true,
                show3: false,
                show4: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
            }
        },
        methods : {
            printKey() {
                console.log(process.env.VUE_APP_API_KEY);
            },
            registerUser() {
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "username": this.username,
                        "email": this.email,
                        "bio": this.bio,
                        "birthdate": this.birthdate,
                        "password": this.password,
                        // "imageUrl": "https://unsplash.com/photos/DCVMd_NOpro/download?force=true&w=640",
                        // "bannerUrl": "https://i.picsum.photos/id/223/1080/640.jpg?hmac=1zRXJhkXy6EdeYC-WYatZnnmpkqINeYTiJ4-74E6t1o"
                    }
                }).then((response) => {
                    console.log(response);

                }).catch((error) => {
                    console.error(error);
                    // this.activateErrorMsg();
                })
            },
            async retrieveUsers() {
                await axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error(error);
                })
            },
            
            loginUser() {
                axios.request({
                    url: 'https://tweeterest.ml/api/login',
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "email": this.usrNameInput,
                        "password": this.pwdInput
                    }
                }).then((response) => {
                    console.log(response);
                    cookies.set('loginData', response.data);
                    this.$store.commit('getcurrUserID', response.data.userId);
                    this.$store.commit('getcurrUserEmail', response.data.email);

                    this.$store.dispatch('getTokenAsync', response.data.loginToken)
                    this.$router.push({ name: 'FeedView' });
            
                }).catch((error) => {
                    console.error("There was an error: " + error);
                    this.errMsgActive = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    body {
        background-color: azure;
        text-align: center;
    }
    div {
        text-align: center;
    }
    h1 {
        text-transform: uppercase;
    }
    p {
        color: red;
        font-weight: bold;
    }
    .wrapper {
        margin: 0 15vw;
    }
    #registerWrapper {
        margin-left: 15vw;
        margin-right: 15vw;
    }
    #logo {
        margin-top: 8vh;
        height: 10vh;
    }
    .activatedErrorMsg {
        display: none;
    }
</style>
