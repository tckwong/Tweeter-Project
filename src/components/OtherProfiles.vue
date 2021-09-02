<template>
    <section>
       
  <v-card
    class="mx-auto"
    max-width="80vw"
  >
    <v-btn   
        v-if="userProfileId === loggedUserId" 
        @click="editBtnTgl = true"
        color="blue darken-1"
        text
        class="editBtn"
        >
        Edit Profile
    </v-btn>
    <v-btn   
        v-if="editBtnTgl === true" 
        @click="patchProfile"
        color="blue darken-1"
        text
        elevation="5"
        >
        Submit Changes
    </v-btn>

    <!-- <v-img
      class="white--text align-end"
      height="200px"
        :src="require('@/assets/defaultProfile.png')"
    >
      <v-card-title style="color: black">{{ userName }}</v-card-title>
    </v-img> -->

    <!-- <v-card-subtitle class="pb-0">
        <p v-if="editBtnTgl === false">Email: {{ userEmail }}</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="userEmail"
        v-model="userEmail"

        ></v-text-field>
    </v-card-subtitle> -->
    
    <!-- <v-card-text class="text--primary">
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
    </v-card-text> -->
    <v-card-actions v-if="editBtnTgl">
      <v-btn
        @click="deleteProfileTgl = true"
        color="red"
        text
      >DELETE PROFILE
      </v-btn>
      <span v-if="deleteProfileTgl">Please note that this action is irreversible. Please enter your password: </span>
      <v-text-field
        v-if="deleteProfileTgl"
        solo
        clearable
        v-model="pwdInput"
        ></v-text-field>
        <v-btn
        @click="deleteUser"
        v-if="deleteProfileTgl"
        color="red"
        text
      >SUBMIT
      </v-btn>
    </v-card-actions>
  </v-card>
            <h3>ID:{{ userProfileId }}</h3>
        <div class="profileCard">
             <v-img
        class="white--text align-end"
        height="200px"
            :src="require('@/assets/logo.png')"
        >
    </v-img>
        <header>
            <div class="avatar">
            <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="Allison Walker" />
            </div>
        </header>
        
        <h3>{{ userName }}</h3>
        <div class="desc">
            <!-- Birthdate card -->
             <p v-if="editBtnTgl === false">Birthdate: {{ birthdate }}</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="birthdate"
        v-model="birthdate"
        ></v-text-field>
            <p v-if="editBtnTgl === false">Email: {{ userEmail }}</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="userEmail"
        v-model="userEmail"

        ></v-text-field>

           <p v-if="editBtnTgl === false">Bio: {{ userBio }}</p>
            <v-text-field
            v-if="editBtnTgl"
            solo
            clearable
            :value="userBio"
            v-model="userBio"
            ></v-text-field>
        </div>
        <div class="foot">
            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum mollitia asperiores ipsam nihil doloremque rerum quas harum veniam tenetur voluptate!</h2>
            <p v-if="dataReady">
                <ProfileTweets v-for="tweet in userTweetData" 
                :key="tweet.tweetId"
                :username="tweet.username"
                :imageUrl="tweet.imageUrl"
                :tweetId="tweet.tweetId"
                :content="tweet.content"
                :createdAt="tweet.createdAt"/>
            </p>
        </div>
        </div>
    </section>
   
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
import ProfileTweets from './ProfileTweets.vue'
import '../css/generalStyle.scss'

    export default {
        name: 'OtherProfiles',
        components: {
            ProfileTweets
        },
        data() {
            return {
                profile: this.$route.params.user,
                userToken: "",
                userProfileId: "",
                loggedUserId: "",
                isLoggedIn: false,
                userName: "",
                userEmail: "",
                userBio: "",
                birthdate: "",
                pwdInput: "",
                dialog: false,      
                editBtnTgl: false,
                deleteProfileTgl: false,
                userTweetData: [],
                dataReady: false,
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
                    // console.log(response);
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
            deleteUser() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data: {
                        "loginToken": this.userToken,
                        "password": this.pwdInput,
                    }
               
                }).then(() => {
                     this.$router.push({ path: '/' });
              
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveUserTweets() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                        "userId" : this.userProfileId,
                    }
                }).then((response) => {
                    console.log(response);
                    this.userTweetData = response.data;
                    // this.filterFeedArr();
                }).catch((error) => {
                    console.error(error);
                })
            },
            // filterFeedArr() {
            //     const newArrFeed = this.alltweetData.filter(tweet => this.followinguserIDs.includes(tweet.userId));
            //     newArrFeed.sort(function(x,y){
            //         return new Date(y.createdAt) - new Date(x.createdAt);
            //     })
               
            //     this.alltweetData = newArrFeed;
            // },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.loggedUserId = getCookie.userId;
            },
        },
        async created() {
            await this.getAllUserInfo();
            this.dataReady = true;
        },
      
        beforeMount() {
            this.getMyCookies();
        },
        mounted() {
            this.retrieveUserTweets();
        },
    }
</script>

<style Lang="scss" scoped>

    section {
        background-color: rgb(137, 170, 233);
        height: 100vh;
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
    .editBtn {
        box-shadow: 3px 3px 3px cornflowerblue;
    }
    
    
</style>