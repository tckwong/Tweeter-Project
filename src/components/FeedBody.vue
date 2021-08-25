<template>
    <div>
        <h1>Feed Body</h1>
        <!-- <button @click="getMyCookies">RetrieveCookie</button> -->
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
            <v-btn
            @click="logOutUser"
            color="red"
            elevation="2"
            large
        >Log Out
        </v-btn>

    <FeedBodyTweetFeed :testProp="trigger"/>
    
         <v-btn
            ref="FeedBodyTweetFeed"
            @click="testFn"
            color="primary"
            elevation="2"
            large
        >TESTING
        </v-btn>
    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
import FeedBodyTweetFeed from './FeedBodyTweetFeed.vue'

    export default {
        name: 'FeedBody',
        components : {
            FeedBodyTweetFeed
        },
        data: () => {
            return {
                userToken: "",
                content: "",
                trigger: false
            }     
        },
        computed: {
          
        },
        methods: {
            testFn() {
                // $refs.FeedBodyTweetFeed.retrieveUserTweets();
                this.$children[0].retrieveUserTweets();
            },
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

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            logOutUser() {
                axios.request({
                    url: 'https://tweeterest.ml/api/login',
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        "loginToken" : this.userToken,
                    }

                }).then(() => {
                    console.log("LOGGED OUT SUCCESSFUL");
                    cookies.remove('loginData');
                    this.$store.dispatch('removeToken', "");
                    this.$router.push({ name: 'LoginView' });

                }).catch((error) => {
                    console.error("There was an error: " +error);
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