<template>
    <div>
        <router-link :to="{ name: 'OtherProfilesView', params: { user: username }}">GO TO PROFILE</router-link>
        <div class="wrapper">
            <h2>{{ tweetId }} - {{ username }} - {{ createdAt }}</h2>
            <p>{{ content }}</p>
            <v-btn @click="deleteTweet" color="red" elevation="2" Small>✕</v-btn>
        </div> 
    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
    export default {
        name: 'TweetChild',
        data()  {
            return {
                userToken : "",
            }
        },
        props: {
            tweetId : Number,
            username : String,
            content: String,
            createdAt: String
        },
        methods: {
            deleteTweet() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data: {
                        "loginToken": this.userToken,
                        "tweetId": this.tweetId
                    }
                }).then((response) => {
                    console.log(response);
                    console.log("Sucessfully Deleted");
                    
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
            }
        },
        mounted() {
            this.getMyCookies();
        }
    }
</script>

<style lang="scss" scoped>
    div {
        margin-left: 10vw;
        margin-right: 10vw;
    }
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr .2fr;
    }
    v-btn {
        width: 30%;
    }
</style>