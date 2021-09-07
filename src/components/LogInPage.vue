<template>
    <section>
        <!-- Vuetify form field inputs used for user login and registration -->
        <div class="wrapper">
            <img id="logo" src="@/assets/logo.png"/>
            <h1>Log In</h1>

            <v-card
            class="d-flex justify-center mb-6 mt-4"
            style="background-color:#6a8bf8"
            min-height="30vh"
            >
                <v-col
                sm="8"
                md="8"
                lg="6"
                class="pa-2"
                outlined
                tile
                >
                    <v-text-field
                        class="formInput mt-5"            
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
                    <p id="errorMsg" :class="{ activatedErrorMsg: errMsgActive }">Invalid username/ password combination.</p>
                    <v-btn
                        @click="loginUser"
                        color="primary"
                        elevation="2"
                        large
                        class="mr-2 mt-2"
                    >Log In
                    </v-btn>
                    |
                    <!-- MODAL VUETIFY CODE -->
                    <template>
                        <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="600px"
                        >   
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            class="ml-2 mt-2"
                            elevation="2"
                            large
                            >
                            NEW USER
                            </v-btn>
                        </template>
                        <v-form  ref="registerForm">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">User Profile Registration</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                        >
                                            <v-text-field
                                            label="Username*"
                                            v-model="username"
                                            :counter="12"
                                            :rules="[rules.required, rules.noSpaces]"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                            label="Email*"
                                            v-model="email"
                                            :rules="[rules.required, rules.noSpaces]"
                                            required
                                            >
                                            </v-text-field>
                                        </v-col>
                                        <p>Tell us something unique about yourself!</p>
                                        <v-col cols="12">
                                            <v-text-field
                                            label="Bio*"
                                            v-model="bio"
                                            clearable
                                            :counter="200"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                        >
                                            <v-text-field
                                            label="Profile Picture URL"
                                            v-model="imageUrl"
                                            clearable
                                            :rules="[rules.noSpaces]"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                        >
                                            <v-text-field
                                            label="Profile Banner URL"
                                            v-model="bannerUrl"
                                            clearable
                                            :rules="[rules.noSpaces]"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        >
                                        <v-menu
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="birthdate"
                                                    label="Birthdate*"
                                                    elevation="15"
                                                    prepend-icon="mdi-calendar"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    :rules="[rules.required]"
                                                    required
                                                    show-adjacent-months
                                                    color="primary"
                                                    header-color="primary"
                                                ></v-text-field>
                                            </template>
                                                <v-date-picker
                                                    v-model="birthdate"
                                                ></v-date-picker>
                                        </v-menu>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                            label="Password*"
                                            :type="show1 ? 'text' : 'password'"
                                            required
                                            v-model="password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required, rules.min]"
                                            hint="At least 8 characters"
                                            counter
                                            @click:append="show1 = !show1"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    @click="formValidation"
                                    color="blue darken-1"
                                    text
                                >
                                    Register
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-form>
                        </v-dialog>
                    </template>
                </v-col>
            </v-card>
        </div>
        <p :class="{ registerUserMsg: registerMsg }">Sucessfully Registered!</p>
    </section>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {
        name: "LogInPage",
        data: () => {
            return {
                dialog: false,
                errMsgActive : true,
                registerMsg : true,
                usrNameInput : "",
                pwdInput : "",
                username : "",
                email : "",
                bio : "",
                birthdate : null,
                picker: null,
                password : "",
                imageUrl :"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                bannerUrl : "@/assets/logo.png",
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                    noSpaces: v => (v || '').indexOf(' ') < 0 || 'No spaces allowed',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    max: v => v.length <= 12 || 'Max 12 characters',
                },
            }
        },
        methods : {
            formValidation() {
                if(this.$refs.registerForm.validate()){
                    this.registerUser();
                }else{
                console.log("Required fields not met");
                }
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
                        "imageUrl": this.imageUrl,
                        "bannerUrl": this.bannerUrl,
                    }
                }).then(() => {
                    this.dialog = false;
                    this.registerMsg = false;  
                }).catch((error) => {
                    console.error(error);
                })
            },
            async retrieveUsers() {
                await axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
               
                }).then(() => {

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
                    cookies.set('loginData', response.data, { expires: 1 });
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
        font-weight: bold;
        text-align: center;
    }
    #logo {
        margin-top: 8vh;
        height: 10vh;
    }
    #errorMsg {
        color: red;
    }
    .activatedErrorMsg {
        display: none;
        
    }
    .registerUserMsg {
        display: none;
        color: rgb(84, 207, 84)
    }
    @media only screen and (min-width:700px) {
        .wrapper {
            margin: 0 20vw;
        }
    }
    @media only screen and (min-width:1100px) {
        .wrapper {
            margin: 0 30vw;
        }
    }
    
</style>
