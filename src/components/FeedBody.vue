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
        
    <FeedBodyTweetFeed :testProp="trigger"/>

    <TweetChild v-for="tweet in alltweetData" 
    :key="tweet.tweetId" 
    :username="tweet.username" 
    :tweetId="tweet.tweetId" 
    :content="tweet.content"
    :createdAt="tweet.createdAt"/>

    <button @click="retrieveAllTweets">RETRIEVE ALL TWEETS</button>
    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
import FeedBodyTweetFeed from './FeedBodyTweetFeed.vue'
import TweetChild from './TweetChild.vue'
    export default {
        name: 'FeedBody',
        components : {
            FeedBodyTweetFeed,
            TweetChild
        },
        data: () => {
            return {
                userToken: "",
                content: "",
                trigger: false,
                alltweetData: [],

            }     
        },
        methods: {
            // testFn() {
            //     $refs.FeedBodyTweetFeed.retrieveUserTweets();
            //     this.$children[0].retrieveUserTweets();
            // },
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
                    this.trigger = !this.trigger
                    this.$store.commit('getNewTweet', response.data.content);
                        

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
                    params: {
                       
                    }
                }).then((response) => {
                  
                    this.alltweetData = response.data;
                    console.log(this.alltweetData);
            
                }).catch((error) => {
                    console.error(error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                }
            },
        beforeMount() {
            this.getMyCookies();
        }
    }
</script>

<style lang="scss" scoped>
    
</style>