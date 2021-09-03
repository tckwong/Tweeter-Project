<template>
    <div class="tweetWrapper">
        <v-card
        class="mx-auto my-md-8"
        color="#6aaaff"
        dark
        width="mx-md-5"
        max-width="90vw"
        min-height="30vh"
        >
        <v-card-title>
            <img id="logo" src="@/assets/logo.png"/>
            <v-list-item-avatar color="grey darken-3 ml-5">
            <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
            </v-list-item-avatar>
             <v-list-item-content>
            <v-list-item-title><router-link class="routerLink pl-3" :to="{ name: 'OtherProfilesView', params: { user: username }}">{{ username }}</router-link></v-list-item-title>
            </v-list-item-content>
            <span class="text-h6 font-weight-light">{{ createdAt }}</span>
            
            <!-- Dropdown menu from Vuetify -->
            <div class="text-center">
    <v-menu
      top
      :offset-y="offset"
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
            
                <button @click="retrieveUserId" class="myButton">Unfollow</button>
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

    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
// import TweetComments from './TweetComments.vue'
    export default {
        name: 'ProfileTweets',
        components: {
            
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
                items: [
                    { title: 'Edit Tweet' },
                    { title: 'Delete Tweet' },
                ],
                offset: true,
            }
        },
        props: {
            tweetId : Number,
            username : String,
            content: String,
            createdAt: String
        },
        methods: {
            selectSelection(item) {
                switch (item.title) {
                    case 'Edit Tweet':
                    console.log("choice1");
                    break
                    case 'Delete Tweet':
                    console.log("choice2");
                    break
                }
            },
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