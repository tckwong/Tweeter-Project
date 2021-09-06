<template>
    <section>
        <div class="profileCard">
             <v-img
            class="white--text align-end"
            height="200px"
            :src="bannerUrl">
            </v-img>
        <header>
            <div class="avatar">
                <img class="profilePic" :src="imageUrl" alt="Profile Picture" />
            </div>
        </header>
        <!-- Vuetify Edit Button to edit user information -->
            <div class="editMenuBar">
                <v-btn   
                v-if="userProfileId === loggedUserId && editBtnTgl === false" 
                @click="editBtnTgl = true"
                color="blue darken-1"
                text
                class="editBtn mt-2"
                >
                Edit Profile
                </v-btn>
                 <v-btn   
                v-if="userProfileId === loggedUserId && editBtnTgl === true" 
                @click="editBtnTgl = false"
                color="blue darken-1"
                text
                class="editBtn mt-2"
                >
                Cancel Edits
                </v-btn>
                <v-btn   
                    v-if="editBtnTgl === true"
                    @click="patchProfile"
                    color="blue darken-1"
                    class="mt-2"
                    text
                    >
                    Submit Changes
                </v-btn>
                <v-card-actions v-if="editBtnTgl">
                  
                    <!-- Open delete conditional dialog -->
                    <template>
                    <div class="text-center">
                        <v-dialog
                        v-model="dialog"
                        width="500"
                        >
                        <template v-slot:activator="{ on, attrs }">
                              <v-btn
                        @click="deleteProfileTgl = true"
                        color="red"
                        text
                          v-bind="attrs"
                            v-on="on"
                    >DELETE PROFILE
                    </v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                            Privacy Policy
                            </v-card-title>

                            <v-card-text>
                            <!-- DELETE CONDITIONAL -->
                                <h2 v-if="deleteProfileTgl">Please note that this action is irreversible. Please enter your password: </h2>
                                <v-text-field
                                    color="blue"
                                    v-if="deleteProfileTgl"
                                    v-model="pwdInput"
                                    solo
                                    ></v-text-field>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="deleteUser"
                            >
                                Delete
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </div>
                    </template>
                    
                </v-card-actions>
            </div>
  
        <h3 id="profileUser">{{ userName }}</h3>
        <div class="desc">
            <!-- Birthdate card -->
            <p v-if="editBtnTgl === false">Birthdate: {{ birthdate }}</p>
            <p v-if="editBtnTgl === false">Email: {{ userEmail }}</p>
            <p v-if="editBtnTgl === false">Bio: {{ userBio }}</p>
    <v-container>
    <v-row>
        <v-col
        cols="12"
        sm="4"
    >   
        <p v-if="editBtnTgl" >Birthdate:</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        :value="birthdate"
        v-model="birthdate"
        width="200px"
        background-color="#6573d0"
        ></v-text-field>
        <p v-if="editBtnTgl" >Email:</p>
        <v-text-field
        v-if="editBtnTgl" 
        solo
        clearable
        background-color="#6573d0"
        :value="userEmail"
        v-model="userEmail">
        </v-text-field>
        <p v-if="editBtnTgl" >username:</p>
        <v-text-field
        v-if="editBtnTgl"
        solo
        clearable
        background-color="#6573d0"
        :value="userName"
        v-model="userName"
        ></v-text-field>
        </v-col>
    
        <v-col>
        <p v-if="editBtnTgl" >Bio:</p>
        <v-text-field
        v-if="editBtnTgl"
        solo
        clearable
        background-color="#6573d0"
        :value="userBio"
        v-model="userBio"
        ></v-text-field>
        <p v-if="editBtnTgl" >Profile Picture URL:</p>
        <v-text-field
        v-if="editBtnTgl"
        solo
        clearable
        background-color="#6573d0"
        :value="imageUrl"
        v-model="imageUrl"
        ></v-text-field>
        <p v-if="editBtnTgl" >Banner Picture URL:</p>
        <v-text-field
        v-if="editBtnTgl"
        solo
        clearable
        background-color="#6573d0"
        :value="bannerUrl"
        v-model="bannerUrl"
        ></v-text-field>
  </v-col>
      </v-row>
    </v-container>
        </div>
        <div class="foot">
            <div id="flexWrapper">
                <div>
                    <h2>Followers:</h2><h1>{{ numFollowers }}</h1> 
                </div>
                <div>
                    <h2>Following:</h2><h1>{{ numFollowing }}</h1> 
                </div>    
            </div>
            
        </div>

        <div>
            <p>
                <ProfileTweets v-for="tweet in userTweetData" 
                :key="tweet.tweetId"
                :username="tweet.username"
                :imageUrl="tweet.userImageUrl"
                :tweetId="tweet.tweetId"
                :userId="tweet.userId"
                :content="tweet.content"
                :tweetImageUrl="tweet.tweetImageUrl"
                :createdAt="tweet.createdAt"
                @notifyParentEditTweet="retrieveUserTweets"
                @notifyParentDeleteTweet="retrieveUserTweets"
                />
            </p>
        </div>
        <!-- Vuetify Back-to-top scroll -->
        <v-container
        class="scroll-y"
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex xs12>
          <v-btn
            v-scroll="scrolltoTop"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="primary"
            @click="toTop"
          >
            <v-icon>^</v-icon>
          </v-btn>
      </v-flex>
          
        </v-layout>
      </v-container>
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
                imageUrl: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                bannerUrl: null,
                pwdInput: "",
                dialog: false,      
                editBtnTgl: false,
                deleteProfileTgl: false,
                userTweetData: [],
                newTweetObj: {},
                followinguserIDs: [],
                numFollowers: "",
                numFollowing: "",
                imageList: [],
                userImageLst : {},
                fab: false,
            }
        },
        methods: {
            async getAllUserInfo() {
                await axios.request({
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
                    this.imageUrl = response.data[0].imageUrl;
                    this.bannerUrl = response.data[0].bannerUrl;
 
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
                        "username" : this.userName,
                        "imageUrl" : this.imageUrl,
                        "bannerUrl" : this.bannerUrl
                    }

                }).then(() => {
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
                    this.dialog = false;
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
                    this.userTweetData = response.data;
                    for (let i=0; i<response.data.length; i++){
                        this.userImageLst = {
                        usrName : response.data[i].username,
                        userImageUrl : response.data[i].userImageUrl,
                    };
                        this.imageList.push(this.userImageLst);
                    }
                    this.sendImageList();
                    if(response.data.length != 0) {
                        this.filterFeedArr();
                    }
                    
                }).catch((error) => {
                    console.error(error);
                })
            },
            sendImageList() {
                this.$store.commit('getImageList', this.imageList);
            },
            retrieveAllFollowers() {
                axios.request({
                    url: 'https://tweeterest.ml/api/follows',
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                       "userId" : this.userProfileId,
                    }
                }).then((response) => {
                    for (let i=0; i<response.data.length; i++){
                        this.followinguserIDs.push(response.data[i].userProfileId);
                    }
                    this.numFollowing = response.data.length;
                    this.retrieveUserTweets();
                }).catch((error) => {
                    console.error(error);
                })
            },
            getNumFollowers() {
                axios.request({
                    url: 'https://tweeterest.ml/api/followers',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    params: {
                        "userId": this.userProfileId,
                    }
               
                }).then((response) => {
                    this.numFollowers = response.data.length;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            filterFeedArr() {
                const newArrFeed = this.userTweetData.filter(tweet => this.followinguserIDs.includes(tweet.userProfileId));
                newArrFeed.sort(function(x,y){
                    return new Date(y.createdAt) - new Date(x.createdAt);
                })
                this.userTweetData = newArrFeed;
            },
            scrolltoTop (e) {
                if (typeof window === 'undefined') return
                const top = window.pageYOffset || e.target.scrollTop || 0
                this.fab = top > 20
                },
                toTop () {
                this.$vuetify.goTo(0)
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.loggedUserId = getCookie.userId;
            },
        },
        beforeMount() {
            this.getMyCookies();
        },
        async mounted() {
            await this.getAllUserInfo();
            this.retrieveUserTweets();
            this.retrieveAllFollowers();
            this.getNumFollowers();
        },
    }
</script>

<style Lang="scss" scoped>
    section {
        background-color: rgb(137, 170, 233);
        height: 100vh;
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
    #flexWrapper {
        display: flex;
        justify-content: center;
        line-height: 75px;
    }
    #flexWrapper > div {
        padding: 0 5vw;
    }
    .avatar {
        overflow: hidden;
    }
    .profilePic {
        object-fit: cover;
        height: inherit;
        width: inherit;
    }

</style>