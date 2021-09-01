<template>
    <section>
        <v-btn 
        @click="reDirectEditProfile"
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

  <v-row justify="center">
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
  </v-row>

  <v-card
    class="mx-auto"
    max-width="80vw"
  >
    <v-img
      class="white--text align-end"
      height="200px"
        :src="require('@/assets/defaultProfile.png')"
    >
      <v-card-title style="color: black">{{ userName }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Email: {{ userEmail }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Bio: {{ userBio }}</div>

      <div></div>
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
            <h3>ID:{{ userID }}</h3>
        </section>
</template>
       
<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: "ProfileBody",
     
        data: () => {
            return {
                userID: "",
                userName: "",
                userEmail: "",
                userBio: "",

                dialog: false,
            }
        },
        computed: {
            getState() {
                return this.$store.state.currUserID;
            },
            getProfileEdits() {
                return this.$store.state.profileEdits.profileEdits;
            }
        },

        methods: {
            retrieveUserProfile() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data: {
                        'userId' : this.getState
                    }
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error(error);
                })
            },
            deleteUser() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data: {
                        "loginToken": "LIAbfvh341uNAS314",
                        "password": "ISavedChristmas"
                    }
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            reDirectEditProfile() {
                this.$router.push({ path: '/ProfileEditView' });
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userID = getCookie.userId;
                this.userName = getCookie.username;
                this.userEmail = getCookie.email;
                this.userBio = getCookie.bio;
            },
        },
        beforeMount() {
            this.getMyCookies();
        }
    }
</script>

<style lang="scss" scoped>
    section {
        background-color: rgb(184, 204, 240);
        height: 50vh;
    }

    img {
        height: 20vh;
    }
</style>