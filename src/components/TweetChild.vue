<template>
    <div>
        <!-- <h2>User {{ $route.params.userId }} </h2> -->
        <h2>{{ tweetId }} - {{ username }} - {{ createdAt }}</h2>
        <p>{{ content }}</p>


    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: 'TweetChild',
        data()  {
            return {
                userId: this.$route.params.userId,
                    tweetList: [],
                    tweetIdArr : [],
                    tweetDate : [],
                    usernamee : "",
            }
        },
        props: {
            tweetId : Number,
            username : String,
            content: String,
            createdAt: String
        },

        methods: {
            retrieveAllTweets() {
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
        },
        mounted() {
            this.retrieveAllTweets();
        }
    }
</script>

<style lang="scss" scoped>

</style>