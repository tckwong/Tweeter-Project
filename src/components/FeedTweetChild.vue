<template>
    <div class="tweetWrapper">
        <v-card
        class="mx-auto"
        color="#6aaaff"
        dark
        max-width="50vw"
        min-height="30vh"
        >
        <v-card-title>
            <img id="logo" src="@/assets/logo.png"/>
            <span class="text-h6 font-weight-light">{{ createdAt }} <v-btn @click="deleteTweet" color="red" elevation="2" Small>✕</v-btn></span>
        </v-card-title>
    
        <v-card-text class="text-h5 font-weight-bold">
            {{ content }}
        </v-card-text>

        <v-card-actions>
        <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
            <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title><router-link class="routerLink" :to="{ name: 'OtherProfilesView', params: { user: username }}">{{ username }}</router-link></v-list-item-title>
            </v-list-item-content>
            
            <v-row
            align="center"
            justify="end"
            >
            <!-- Embed a button around v-icon for click-->
        
            <v-text-field
                class="formInput mr-8"
                v-model="tweetComment"
                label="Comment"
                placeholder="Comment"
                solo
            ></v-text-field>
            <div class="mr-3">
                <img id="commentIcon" @click="createComment" :src="require('@/assets/speech-bubble.png')"/>
            </div>
     
            <div :class="{ likedDisplay: toggleLike }"> 
                    <v-icon @click="checkTweetLiked" class="mr-1">
                    mdi-thumb-up
                    </v-icon>
            </div>
            
            <span class="subheading mr-2">{{ tweetLikeCounter }}</span>
            <span class="mr-1">·</span>
        
            <button @click="retrieveUserId" class="myButton">Follow</button>
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

                </v-expansion-panel-header>
                <v-expansion-panel-content>
                   <TweetComments v-for="comment in tweetCommentInfo"
                    :key="comment.commentId"
                    :commentId="comment.commentId"
                    :tweetId="comment.tweetId"
                    :username="comment.username"
                    :content="comment.content"
                    :createdAt="comment.createdAt"/>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-actions>
        </v-card>
        <!-- <transition name="fade" appear>
                <div class="modal-overlay" v-if="showModal"></div>
            </transition> -->
    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
import TweetComments from './TweetComments.vue'
    export default {
        name: 'FeedTweetChild',
        components: {
            TweetComments
        },
        data:() => {
            return {
                activeUser: "",
                userToken : "",
                currUserId: "",
                tweetLikeCounter: "",
                toggleLike: false,
                toggleModal: false,
                tweetComment: "",
                newCommentObj: {},
                tweetCommentInfo: [],
            }
        },
        props: {
            tweetId : Number,
            username : String,
            content: String,
            createdAt: String
        },
        methods: {
            showModal() {
                this.toggleModal = !this.toggleModal;
                console.log(this.toggleModal);
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
                        "tweetId": this.tweetId
                    }
                }).then((response) => {
                    console.log(response);
                    console.log("Sucessfully Deleted");
                    
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveUserId() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
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
                    url: 'https://tweeterest.ml/api/follows',
                    method: 'POST',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken": this.userToken,
                        "followId": this.currUserId
                    }
                }).then((response) => {
                    console.log(response);
                    
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            /* API CALL FOR TWEET LIKES*/
            upvoteTweet() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweet-likes',
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
                    url: 'https://tweeterest.ml/api/tweet-likes',
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
                    url: 'https://tweeterest.ml/api/tweet-likes',
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
                    console.log("Tweet unliked");

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            /* -------------Tweet Comments APIs---------------------*/
            retrieveTweetComments() {
                axios.request({
                    url: 'https://tweeterest.ml/api/comments',
                    method: 'GET',                                                                                                                                                              
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                        "tweetId" : this.tweetId,
                    }
                }).then((response) => {
                    console.log(response);
                    this.tweetCommentInfo = response.data;
    
                }).catch((error) => {
                    console.error(error);
                })
            },
            createComment() {
                axios.request({
                    url: 'https://tweeterest.ml/api/comments',
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
                    console.log(response);
                    this.newCommentObj = {
                        commentId : response.data.commentId,
                        tweetId : response.data.tweetId,
                        username : response.data.username,
                        content : response.data.content,
                        createdAt : response.data.createdAt,
                    }
                    this.tweetCommentInfo.push(this.newCommentObj);
                    console.log(this.tweetCommentInfo);

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
    .tweetWrapper {
        margin-bottom: 3vh;
    }
    v-btn {
        width: 30%;
    }
    .myButton {
	box-shadow:inset 0px -3px 7px 0px #29bbff;
	background:linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
	background-color:#2dabf9;
	border-radius:3px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	padding:9px 23px;
	text-decoration:none;
	text-shadow:0px 1px 0px #263666;
}
.routerLink {
    text-decoration: none;
    color: azure;
    font-weight: bold;
}
.myButton:hover {
	background:linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
	background-color:#0688fa;
}
.myButton:active {
	position:relative;
	top:1px;
}

.likedDisplay {
    transform: scale(1.2);
    filter: invert(100%);
}
#commentIcon {
    cursor: pointer;
    height: 40px;
}

.fade-enter-active
.fade-leave-active {
transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.modal-overlay {
    background-color: rgba(0,0,0,0.3);
    height: 100vh;
}
.modal {
    display: none;
}
#logo {
    height: 40px;
}
</style>