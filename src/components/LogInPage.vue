<template>
    <body>
        <div>
            <h1>Log In</h1>
            <!-- <v-row
                @click="registerUser"
                align="center"
                justify="space-around"
            > -->
            <v-btn
                @click="retrieveUsers"
                text
                color="primary"
            >
                Retrieve Users
            </v-btn>
            <!-- </v-row> -->
        
            <v-col
            cols="12"
            sm="6"
            md="3"
            >
            <v-text-field
                v-model="usrNameInput"
                label="Username"
                placeholder="Username"
                solo
            ></v-text-field>
            
            <v-text-field
                v-model="pwdInput"
                label="Password"
                placeholder="Password"
                solo
            ></v-text-field>
            </v-col>

            <v-btn
                @click="loginUser"
                color="primary"
                elevation="2"
                large
            >Log In
            </v-btn>
        </div>
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
            
            <v-text-field
                v-model="birthdate"
                :counter="12"

                label="birthdate"
                required
            ></v-text-field>

            <v-col
            cols="12"
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
    </body>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {
        name: "LogInPage",
        data: () => {
            return {
                usrNameInput : "",
                pwdInput : "",
                username : "",
                email : "",
                bio : "",
                birthdate : "",
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
                    // this.$store.commit([{
                    //     type: 'getcurrUserID',
                    //     payload: response.data.userID,
                    // }, {
                    //     type: 'getcurrUserName',
                    //     payload: response.data.username,
                    // }]);

                    this.$store.dispatch('getTokenAsync', response.data.loginToken)
                    this.$router.push({ name: 'FeedView' });
            
                }).catch((error) => {
                    console.error("There was an error: " + error);
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
    #registerWrapper {
        margin-left: 15vw;
        margin-right: 15vw;
    }
  
</style>
