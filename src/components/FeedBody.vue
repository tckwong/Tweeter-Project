<template>
    <section>
        <div class="tweetWrapper">
             <v-card
                class=" mx-auto my-10"
                color="#6aaaff"
                dark
                max-width="90vw"
                min-height="20vh"
                >
                <v-col
                    sm="10"
                    md="10"
                ></v-col>
                
                <v-col
                    sm="10"
                    md="12"
                ><v-textarea
                    v-model="content"
                    solo
                    clearable
                    name="input-7-4"
                    rows="1"
                    row-height="15"
                    label="Post an idea"
                ></v-textarea>
                </v-col>
                <template>
                    <img @click="dialog = true" id="uploadImg" src="@/assets/uploadImg.png"/>
                    <!-- Add tweet image modal popup -->
                        <v-dialog
                            v-model="dialog"
                            width="500"
                            >
                            <v-card>
                                <v-card-title class="text-h5 grey lighten-1"
                                >
                                Add image URL Below:
                                </v-card-title>
                                <v-card-text
                                Post new comment below:
                                ></v-card-text>
                                    <v-text-field
                                    placeholder="Image Url"
                                    v-model="tweetImageUrl"
                                    solo
                                    color="black"
                                    background-color="#6573d0"
                                    clearable
                                    ></v-text-field>
                                    <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false;"
                                    >
                                        Submit
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>  
                </template>
                <v-btn
                    class="mr-4 px-10 float-right my-0"
                    @click="createTweet"
                    color="primary"
                    elevation="2"
                    large
                >POST
                </v-btn>
                        
            </v-card>
            <div class="noTweetMsg" v-if="alltweetData.length === 0">
                <h3>You are not currently following anyone. Click <router-link to="/DiscoverView">here</router-link> to explore some profiles.</h3>
            </div>
        </div>
    
        <div class="tweetsFeed">
            <FeedTweetChild v-for="tweet in alltweetData" 
            :key="tweet.tweetId"
            :username="tweet.username"
            :imageUrl="tweet.userImageUrl"
            :tweetId="tweet.tweetId"
            :userId="tweet.userId"
            :content="tweet.content"
            :tweetImageUrl="tweet.tweetImageUrl"
            :createdAt="tweet.createdAt"/>
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
    </section>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
import FeedTweetChild from './FeedTweetChild.vue'
    export default {
        name: 'FeedBody',
        components : {
            FeedTweetChild
        },
        data: () => {
            return {
                userToken: "",
                content: "",
                trigger: false,
                alltweetData: [],
                newTweetObj: {},
                followinguserIDs: [],
                fab: false,
                dialog : false,
                tweetImageUrl: null,
            }     
        },
        methods: {
            createTweet() {
                axios.request({
                    url: "https://tweeterproject.ml/api/tweets",
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "content" : this.content,
                        "imageUrl" : this.tweetImageUrl,
                    }

                }).then((response) => {
                    this.newTweetObj = {
                        tweetId : response.data.tweetId,
                        userId : response.data.userId,
                        username : response.data.username,
                        content : response.data.content,
                        createdAt : response.data.createdAt,
                        userImageUrl : response.data.userImageUrl,
                        tweetImageUrl : response.data.imageUrl,
                    }
                    this.alltweetData.unshift(this.newTweetObj);
                    this.content = "";

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveAllTweets() {
                axios.request({
                    url: "https://tweeterproject.ml/api/tweets",
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                }).then((response) => {
                    this.alltweetData = response.data;
                    this.filterFeedArr();
                }).catch((error) => {
                    console.error(error);
                })
            },
            retrieveAllFollowers() {
                axios.request({
                    url: "https://tweeterproject.ml/api/follows",
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                       userId: this.userId,
                    }
                }).then((response) => {
                    for (let i=0; i<response.data.length; i++){
                        this.followinguserIDs.push(response.data[i].userId);
                    }
                    this.retrieveAllTweets();
                }).catch((error) => {
                    console.error(error);
                })
            },
            filterFeedArr() {
                const newArrFeed = this.alltweetData.filter(tweet => this.followinguserIDs.includes(tweet.userId));
                newArrFeed.sort(function(x,y){
                    return new Date(y.createdAt) - new Date(x.createdAt);
                })
               
                this.alltweetData = newArrFeed;
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
                this.userId = getCookie.userId;
                }
            },
        beforeMount() {
            this.getMyCookies();
        },
        mounted() {
            this.retrieveAllFollowers();
        }
    }
</script>

<style lang="scss" scoped>

    #uploadImg {
        height: 40px;
        margin-left: 20px;
        cursor: pointer;
    }

    .noTweetMsg {
        text-align: center;
    }

    @media only screen and (min-width:1000px) {
        .tweetWrapper {
            margin: 5vh 25vw;
        }

    }
</style>