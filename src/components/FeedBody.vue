<template>
    <div>
        <v-col
            cols="1"
            sm="19"
            md="10"
        ></v-col>
        
        <v-col
            cols="18"
            md="12"
        ><v-textarea
            v-model="content"
            solo
            name="input-7-4"
            label="Create New Tweet"
        ></v-textarea>
        </v-col>
        
        <v-btn
            @click="createTweet"
            color="primary"
            elevation="2"
            large
        >POST
        </v-btn>

    <FeedTweetChild v-for="tweet in alltweetData" 
    :key="tweet.tweetId"
    :username="tweet.username"
    :imageUrl="tweet.imageUrl"
    :tweetId="tweet.tweetId"
    :content="tweet.content"
    :createdAt="tweet.createdAt"/>
    </div>
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
            }     
        },
        methods: {
            createTweet() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "content" : this.content,
                    }

                }).then((response) => {
                    console.log(response);
                    this.newTweetObj = {
                        tweetId : response.data.tweetId,
                        userId : response.data.userId,
                        username : response.data.username,
                        content : response.data.content,
                        createdAt : response.data.createdAt,
                        imageUrl : response.data.imageUrl,
                    }
                    this.alltweetData.unshift(this.newTweetObj);

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveAllTweets() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
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
                    url: 'https://tweeterest.ml/api/follows',
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
    
</style>