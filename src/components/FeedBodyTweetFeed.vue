<template>
    <div>
        <h2>Your Tweet List</h2>
        <v-btn
            @click="retrieveUserTweets"
            color="green"
            elevation="5"
            large
        >Generate Your Tweets</v-btn>

        <div class="wrapper">
            <div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

    export default {

        name: "FeedBodyTweetFeed",
        props: {
            userID: Number,
        },
        // data:() => {
        //     return {
                
        //     }
            
        // },
        computed: {
            // getState() {
            //     return this.$store.state.currUserID;
            // },
        },

        methods: {
            retrieveUserTweets() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data: {
                        'userId' : '1160'
                    }
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error(error);
                })
            },
        },
    }
</script>

<style scoped>
    .wrapper {
        margin-left: 10vw;
        margin-right: 10vw;
        border: 1px solid black;
        height: 800px;
    }
</style>