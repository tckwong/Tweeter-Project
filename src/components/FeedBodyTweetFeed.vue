<template>
    <div>
        {{ commentContent }}
        <h2>Your Tweet List</h2>
        <v-btn
            color="green"
            elevation="5"
            large
            >Nothing
        </v-btn>
        <div>
            <div class="wrapper">
                <p class="tweetItems" v-for="item, index in tweetList" :key="index">
                    <span :style="{'color': textColor}" v-html="tweetDate[index]"></span><span v-html="item"></span>----{{ item }} - {{ tweetDate[index] }}
                    <button @click.prevent="removeTweet(index)">✕</button>
                    <template>
                        <div class="text-right">
                            <div>
                            <v-btn
                                @click.prevent="upvote(index)"
                                class="ma-1"
                                text
                                icon
                                color="blue lighten-2"
                            >
                                <v-icon>mdi-thumb-up</v-icon>
                            </v-btn>
                            <span>{{ likes }}</span>
                            <v-btn
                                @click.prevent="downvote(index)"
                                class="ma-1"
                                text
                                icon
                                color="red lighten-2"
                            >
                                <v-icon>mdi-thumb-down</v-icon>
                            </v-btn>
                            </div>
                        </div>
                    </template>
                    <v-col
                    cols="12"
                    sm="6"
                    md="9"
                    >
                    <v-text-field
                        v-model="commentContent"
                        label="Write a comment"
                        placeholder="Write a comment"
                        solo
                    ></v-text-field>
                    <img id="commentIcon" @click="showComments(index)" :src="require('@/assets/speech-bubble.png')"/>
                    <!-- <v-btn
                        @click="addComment"
                        color="primary"
                        elevation="2"
                        small
                    >Submit
                    </v-btn> -->
                    </v-col>
                </p>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {

        name: "FeedBodyTweetFeed",
        props: ['testProp'],
        
        data:() => {
            return {
                textColor : "blue",
                tweetList: [],
                tweetIdArr : [],
                targetTweetID : "",
                userToken : "",
                profileUserID : "",
                currUsername: "",
                tweetContent: "",
                tweetDate : [],
                commentContent : "",
                likes: "",

            }
        },
        computed: {
            getTweet() {
                return this.$store.state.newTweetContent;
            }
        },
        methods: {
            /*~~~~~~~~~~~~~~~~~~~~~~~~~~ LIKES API CALLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            getTweetLikes() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweet-likes',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        // "tweetId" : this.tweetIdArr[index],
                    }

                }).then((response) => {
                    console.log(response);
                    

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            upvote(index) {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweet-likes',
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "tweetId" : this.tweetIdArr[index],
                    }

                }).then((response) => {
                    console.log(response);
                    console.log(this.tweetIdArr[index]);

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            downvote(index) {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweet-likes',
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "tweetId" : this.tweetIdArr[index],
                    }

                }).then((response) => {
                    console.log(response);
                    console.log(this.tweetIdArr[index]);

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },

              /*~~~~~~~~~~~~~~~~~~~~~~~~~~ TWEETS API CALLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
            retrieveUserTweets() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                        'userId' : this.profileUserID,
                    }
                }).then((response) => {
                    console.log(response);
                    // for (let i=0; i<response.data.length; i++){
                    //     const arrTweet = [];
                    //     arrTweet.push()
                    // }

                    for (let i=response.data.length-1; i>=0; i--){
                         this.tweetList.push(response.data[i].content);
                         this.tweetDate.push(response.data[i].createdAt);

                    }
                    for (let i=response.data.length-1; i>=0; i--){
                         this.tweetIdArr.push(response.data[i].tweetId); 
                    }
                }).catch((error) => {
                    console.error(error);
                })
            },
            appendTweetLst() {
                this.tweetList.unshift(this.getTweet);
            },
            removeTweet(index) {
                this.$delete(this.tweetList, index);
                this.targetTweetID = this.tweetIdArr[index];
                console.log(index,this.targetTweetID);
                this.deleteTweet();
            },
           
            deleteTweet() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data: {
                        "loginToken": this.userToken,
                        "tweetId": this.targetTweetID
                    }
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.profileUserID = getCookie.userId;
                this.currUsername = getCookie.username;
                this.tweetContent = getCookie.content;
            },
        },
        watch: {
            testProp() {
                 this.appendTweetLst();
            }
        },
        beforeMount() {
            this.getMyCookies();
        },
        mounted() {
            this.retrieveUserTweets();
            this.getTweetLikes();
        }
    }
</script>

<style>
    .tweetItems {
        border: 1px solid black;
        height: 200px;
    }
    .wrapper {
        margin-left: 10vw;
        margin-right: 10vw;
    }
    .closeBtn {
        box-shadow:inset 0px 1px 0px 0px #dcecfb;
        background:linear-gradient(to bottom, #bddbfa 5%, #80b5ea 100%);
        background-color:#bddbfa;
        border-radius:6px;
        border:1px solid #84bbf3;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:6px 24px;
        text-decoration:none;
        text-shadow:0px 1px 0px #528ecc;
    }
    .closeBtn:hover {
        background:linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
        background-color:#80b5ea;
    }
    .closeBtn:active {
        position:relative;
        top:1px;
    }
    #commentIcon {
        height: 40px;
    }
</style>