<template>
    <!-- Vuetify lazy render -->
    <v-lazy
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
        >
        <div class="tweetWrapper">
        <v-card
        class="mx-auto my-md-8"
        color="#6aaaff"
        dark
        width="mx-md-5"
        min-height="30vh"
        >
        <v-card-title>
            <img id="logo" src="@/assets/logo.png"/>
            <v-list-item-avatar color="grey darken-3 ml-5">
                <v-img
                    class="elevation-6"
                    alt=""
                    :src="imageUrl"
                ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title><router-link id="routerLink" :to="{ name: 'OtherProfilesView', params: { user: username }}">{{ username }}</router-link></v-list-item-title>
            </v-list-item-content>
            
                <!-- Dropdown menu from Vuetify -->
                <div class="text-center">
                <v-menu
                top
                :offset-y="offset"
                v-if="activeUser === userId"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="selectSelection(item)"
                    link
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </div>
        </v-card-title>
    
        <v-card-text class="pl-10 text-h5 font-weight-bold">
            {{ content }}
        </v-card-text>
        <v-container 
            max-height="8vh"
            max-width="20vw"
            >
            <img id="tweetImg" v-if="tweetImageUrl != null" :src="tweetImageUrl" alt="tweet image"/>
        </v-container>
        <!-- Vuetify Dialog Code Here -->
        <div id="EditCommentModal">
                <div class="text-center">
                    <!-- Vuetify modal popup for comment editting -->
                    <v-dialog
                    v-model="dialog"
                    width="500"
                    >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-1"
                        >
                        Edit tweet:
                        </v-card-title>
                        <v-card-text
                        Edit tweet below:
                        ></v-card-text>
                            <v-text-field
                            :label="tweetEditContent"
                            v-model="tweetEditContent"
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
                                @click="dialog = false; editTweet()"
                                >
                                UPDATE
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>   
                </div>
            </div>
        <!-- End of dialog -->
        <v-card-actions>
            <v-list-item class="grow">
                <v-row
                align="center"
                justify="center"
 
                >
                <!-- Embbed a button around v-icon for click-->
                <v-text-field
                    class="formInput mr-2"
                    v-model="tweetComment"
                    placeholder="Write Comment"
                    solo
                    clearable
                ></v-text-field>
                <div class="mr-10 pb-6">
                    <v-btn
                        justify="start"
                        class="mr-5 pl-0"
                        @click="createComment"
                        outlined
                        medium
                        fab
                        color="white"
                        >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </div>
        
                <div :class="{ likedDisplay: toggleLike }"> 
                        <v-icon @click="checkTweetLiked" class="mr-1">
                        mdi-thumb-up
                        </v-icon>
                </div>
                
                <span class="subheading mr-2">{{ tweetLikeCounter }}</span>
                <span class="mr-1">·</span>
                </v-row>
            </v-list-item>
        </v-card-actions>
        <v-card-actions>
              <v-expansion-panels>
                <v-expansion-panel
                v-for="(item,i) in 1"
                :key="i"
                >
                <v-expansion-panel-header @click="retrieveTweetComments">
                    Comments:
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                   <ProfileTweetComments v-for="comment in tweetCommentInfo"
                     :key="comment.commentId"
                    :commentId="comment.commentId"
                    :tweetId="comment.tweetId"
                    :username="comment.username"
                    :content="comment.content"
                    :createdAt="comment.createdAt"
                    @notifyParentDeleteComment="retrieveTweetComments"
                    @notifyParentEditComment="retrieveTweetComments"
                    />
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-actions>
        </v-card>
    </div>
    </v-lazy>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
import ProfileTweetComments from './ProfileTweetComments.vue'
import '../css/tweetStyle.scss'

    export default {
        name: 'ProfileTweets',
        components: {
            ProfileTweetComments
        },
        data:() => {
            return {
                activeUser: "",
                userToken : "",
                currUserId: "",
                tweetLikeCounter: "",
                toggleLike: false,
                toggleModal: false,
                tweetEditContent: "",
                tweetComment: "",
                newCommentObj: {},
                tweetCommentInfo: [],
                items: [
                    { title: 'Edit Tweet' },
                    { title: 'Delete Tweet' },
                ],
                offset: true,
                dialog: false,
            }
        },
        props: {
            tweetId : Number,
            username : String,
            content: String,
            createdAt: String,
            imageUrl: String,
            userId: Number,
            tweetImageUrl: String,
        },
        methods: {
            selectSelection(item) {
                switch (item.title) {
                    case 'Edit Tweet':
                    this.dialog = true;
                    break
                    case 'Delete Tweet':
                    this.deleteTweet();
                    break
                }
            },
            editTweet() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/tweets',
                    method: 'PATCH',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "tweetId" : this.tweetId,
                        "content" : this.tweetEditContent,
                    }

                }).then(() => {
                    this.$emit('notifyParentEditTweet', "");

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            deleteTweet() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/tweets',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data: {
                        "loginToken": this.userToken,
                        "tweetId": this.tweetId
                    }
                }).then(() => {
                    this.$emit('notifyParentDeleteTweet', "");
                   
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveUserId() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/users',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
             
                }).then((response) => {
                    const found = response.data.find(user => user.username === this.username);
                    this.currUserId = found.userId;
                    this.followUser();
                }).catch((error) => {
                    console.error(error);
                })
            },
            /* ~~~~~~~~~~FOLLOW API CALLS ~~~~~~~~~~~~~~~*/
            followUser() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/follows',
                    method: 'POST',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken": this.userToken,
                        "followId": this.currUserId
                    }
                }).then(() => {           
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            /* API CALL FOR TWEET LIKES*/
            upvoteTweet() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/tweet-likes',
                    method: 'POST',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                            "loginToken": this.userToken,
                            "tweetId": this.tweetId,
                    }
                }).then(() => {
                    this.tweetLikeCounter += 1;
                    this.toggleLike = true;
                    
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            checkTweetLiked() {
                if(this.toggleLike === false){
                    this.upvoteTweet();
                }else {
                    this.deleteTweetLike();
                }
            },
            retrieveAllLikes() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/tweet-likes',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data: {
                         "tweetId": this.tweetId,
                    }
                }).then((response) => {
                    const countLikes = response.data.filter(element => element.tweetId === this.tweetId).length;
                    this.tweetLikeCounter = countLikes;
                    for (let i=0; i<response.data.length; i++){
                        if (response.data[i].userId === this.activeUser && response.data[i].tweetId === this.tweetId) {
                            this.toggleLike = true;
                            return;
                        }
                    }  
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            deleteTweetLike() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/tweet-likes',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data: {
                        "loginToken": this.userToken,
                        "tweetId": this.tweetId,
                    }

                }).then(() => {
                    this.toggleLike = false;
                    this.tweetLikeCounter -= 1;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            /* -------------Tweet Comments APIs---------------------*/
            retrieveTweetComments() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/comments',
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                        "tweetId" : this.tweetId,
                    }
                }).then((response) => {
                    this.tweetCommentInfo = response.data;
                    this.sortTweetComments();
    
                }).catch((error) => {
                    console.error(error);
                })
            },
            sortTweetComments() {
                this.tweetCommentInfo.sort(function(x,y){
                    return new Date(y.createdAt) - new Date(x.createdAt);
                })
            },
            createComment() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/comments',
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "tweetId" : this.tweetId,
                        "content" : this.tweetComment,
                    }

                }).then((response) => {
                    this.newCommentObj = {
                        commentId : response.data.commentId,
                        tweetId : response.data.tweetId,
                        username : response.data.username,
                        content : response.data.content,
                        createdAt : response.data.createdAt,
                    }
                    this.tweetCommentInfo.unshift(this.newCommentObj);
                    this.tweetComment = "";

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.activeUser = getCookie.userId;
                
            },
        },
        mounted() {
            this.getMyCookies();
            this.retrieveAllLikes();
        }
    }
</script>

<style lang="scss" scoped>
   
</style>