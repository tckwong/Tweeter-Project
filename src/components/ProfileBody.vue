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
        <h1>Profile</h1>
        <h3>ID:{{ userID }}</h3>
       
        <img :src="require('@/assets/defaultProfile.png')"/>
        <p>Name: {{ userName }}</p>
        <p>Email: {{ userEmail }}</p>
        <p>Bio: {{ userBio }}</p>
        <h2>{{ getProfileEdits }}</h2>
        <h2>{{ getState }}</h2>
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
        margin-left: 10vw;
        margin-right: 10vw;
    }

    img {
        height: 20vh;
    }
</style>