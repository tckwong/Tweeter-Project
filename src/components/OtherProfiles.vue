<template>
    <section>
        <v-btn 
        class="mx-2"
        fab
        dark
        large
        color="cyan"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>

  <!-- <v-row justify="center">
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
        >
          Edit Profile
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
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
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> -->

  <v-card
    class="mx-auto"
    max-width="80vw"
  >
    <v-btn   
        v-if="userProfileId === loggedUserId" 
        @click="editBtnTgl = true"
        color="blue darken-1"
        text
        >
        Edit
    </v-btn>
    <v-btn   
        v-if="editBtnTgl === true" 
        @click="patchProfile"
        color="blue darken-1"
        text
        >
        Submit Changes
    </v-btn>

    <v-img
      class="white--text align-end"
      height="200px"
        :src="require('@/assets/defaultProfile.png')"
    >
      <v-card-title style="color: black">{{ userName }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
        <p v-if="editBtnTgl === false">Email: {{ userEmail }}</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="userEmail"
        v-model="userEmail"

        ></v-text-field>
    </v-card-subtitle>
    
    <v-card-text class="text--primary">
        <p v-if="editBtnTgl === false">Birthdate: {{ birthdate }}</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="birthdate"
        v-model="birthdate"
        ></v-text-field>

        <p v-if="editBtnTgl === false">Bio: {{ userBio }}</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="userBio"
        v-model="userBio"
        ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
            <h3>ID:{{ userProfileId }}</h3>
        </section>
   
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
    export default {
        name: 'OtherProfiles',
        data() {
            return {
                profile: this.$route.params.user,
                userProfileId: "",
                loggedUserId: "",
                isLoggedIn: false,
                userName: "",
                userEmail: "",
                userBio: "",
                birthdate: "",
                dialog: false,
                
                editBtnTgl: false,
                emailEditTgl: false,
                usernameEditTgl: false,
                bioEditTgl: false,

            }
        },
        methods: {
            getAllUserInfo() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
               
                }).then((response) => {
                    const found = response.data.find(user => user.username === this.$route.params.user );
                    this.userProfileId = found.userId;
                    this.getUserProfile();
                }).catch((error) => {
                    console.error(error);
                })
            },
            getUserProfile() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                        userId: this.userProfileId
                    }
               
                }).then((response) => {
                    console.log(response);
                    this.userName = response.data[0].username;
                    this.userEmail = response.data[0].email;
                    this.birthdate = response.data[0].birthdate;
                    this.userBio = response.data[0].bio;

                }).catch((error) => {
                    console.error(error);
                })
            },
            patchProfile() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'PATCH',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "email" : this.userEmail,
                        "birthdate" : this.birthdate,
                        "bio" : this.userBio,
                    }

                }).then((response) => {
                    console.log(response);
                    location.reload();

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.loggedUserId = getCookie.userId;
            },
        },
        mounted() {
            this.getAllUserInfo();
        },
        beforeMount() {
            this.getMyCookies();
        }
    }
</script>

<style scoped>
    section {
        background-color: rgb(184, 204, 240);
        height: 60vh;
    }
    img {
        height: 20vh;
    }
    .icon {
        display: inline-block;
        height: 30px;
        width: 30px;
    }
    input {
        border: 1px solid black;
    }
    v-img {
        display: inline-block;
    }
    .v-text-field {
        max-width: 20vw;
    }
</style>