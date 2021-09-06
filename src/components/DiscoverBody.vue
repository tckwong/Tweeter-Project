<template>
    <section>
        <div class="createTweetWrapper">
           
            <div class="noTweetMsg" v-if="alltweetData.length === 0">
                <h3>You are not currently following anyone. Click <router-link to="/DiscoverView">here</router-link> to explore some profiles.</h3>
            </div>
        </div>
        <div class="tweetsFeed">
            <DiscoverTweetChild v-for="tweet in alltweetData" 
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
import DiscoverTweetChild from './DiscoverTweetChild.vue'
    export default {
        name: 'FeedBody',
        components : {
            DiscoverTweetChild
        },
        data: () => {
            return {
                userToken: "",
                content: "",
                trigger: false,
                alltweetData: [],
                newTweetObj: {},
                followinguserIDs: [],
                allUserList : [],
                fab: false,
            }     
        },
        comoputed : {

        },
        methods: {
            retrieveAllTweets() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                }).then((response) => {
                    for (let i=0; i<response.data.length; i++){
                        this.allUserList.push(response.data[i].userId);
                    }
                    this.alltweetData = response.data;
                    this.filterFeedArr();
                }).catch((error) => {
                    console.error(error);
                })
            },
            retrieveFollowing() {
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
                // Filter Tweet list of non-following users only
                const newArrFeed = this.alltweetData.filter(tweet => !this.followinguserIDs.includes(tweet.userId));
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
                this.$store.commit('getcurrUserName', getCookie.username);
                }
            },
        beforeMount() {
            this.getMyCookies();
            this.retrieveFollowing();
        },
    }
</script>

<style lang="scss" scoped>

    #uploadImg {
        height: 40px;
        margin-left: 20px;
    }

    .noTweetMsg {
        text-align: center;
    }

    @media only screen and (min-width:1000px) {
        .createTweetWrapper {
            margin: 5vh 25vw;
        }

    }
</style>