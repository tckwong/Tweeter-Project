<template>
    <div>
      
        <h2>Your Tweet List</h2>
        <v-btn
            color="green"
            elevation="5"
            large
        >Nothing</v-btn>

        <div>
            <div class="wrapper">
               
                <p class="tweetItems" v-for="item, index in tweetList" :key="index">
                    <span :style="{'color': textColor}" v-html="tweetDate[index]"></span><span v-html="item"></span>----{{ item }} - {{ tweetDate[index] }}
                    <button @click.prevent="removeTweet(index)">✕</button>
                </p>
            
                <!-- <p>
                    <button @click.prevent="add()">Add</button> -->
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
                tweetDate : []
            }
        },
        computed: {
            getTweet() {
                return this.$store.state.newTweetContent;
            }
        },
        methods: {
            removeTweet(index) {
                this.$delete(this.tweetList, index);
                this.targetTweetID = this.tweetIdArr[index];
                console.log(index,this.targetTweetID);
                this.deleteTweet();
            },
            // add() {
            // this.tweetList.push('')
            // },
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
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.profileUserID = getCookie.userId;
                this.currUsername = getCookie.username;
                this.tweetContent = getCookie.content;
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
</style>