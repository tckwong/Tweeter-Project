<template>
    <section>
        <div id="gridWrapper">
            <v-list-item-avatar id="cmtAveCont">
                <img :src="commentImageUrl" alt="Profile Picture">
            </v-list-item-avatar>
            <!-- Comment edit content -->
            <v-card
                width="mx-md-10"
                class="childGridCont">
                <v-card-actions 
                width="100%"
                height="10px">
                    <p class="commentContent">{{ content }}</p>
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
                                Edit Comment:
                                </v-card-title>
                                <v-card-text
                                Post new comment below:
                                ></v-card-text>
                                    <v-text-field
                                    :label="content"
                                    v-model="commentEditContent"
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
                                        @click="dialog = false; updateComment()"
                                    >
                                        POST
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>   
                        </div>
                    </div>
                    
                </v-card-actions> 
                <!-- Vuetify menu dropdown -->
                            <v-menu
                            top
                            width="10px"
                            class="menuCommIcon"
                            v-if="username === loggedInUser"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                >
                                <v-icon>mdi-dots-horizontal</v-icon>
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
                    </v-card>
                <div>
                    <p>{{ username }} - {{ createdAt }}</p>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
    export default {
        name : 'TweetComments',
        data() {
            return {
                // Toggle edit button
                editBtnTgl: false,
                loggedInUser : "",
                dialog: false,
                commentEditContent: "",
                userToken: "",
                items: [
                    { title: 'Edit Comment' },
                    { title: 'Delete Comment' },
                ],
                imageList: [],
                commentImageUrl: "",
            }
        },
        computed: {
            retrieveLoggedInUserName() {
                return this.$store.state.username;
            },
            getList() {
                return this.$store.state.imageList;
            },
        },
        props: {
            commentId : Number,
            tweetId : Number,
            username : String,
            content : String,
            createdAt : String,
        },
        methods: {
            findCommentImg() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                }).then((response) => {
                    console.log(this.username);
                        const found = response.data.find(user => user.username === this.username);
                        if (found.imageUrl != null) {
                          this.commentImageUrl = found.imageUrl;
                        }else {
                            this.commentImageUrl = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                        }

                }).catch((error) => {
                    console.error("There was an error: " +error);
                }) 
            },
            updateComment() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/comments',
                    method: 'PATCH',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "commentId" : this.commentId,
                        "content" : this.commentEditContent,
                    }

                }).then(() => {
                    this.$emit('notifyParentEditComment', "");

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            openDialog() {
                this.dialog = true;
            },
            deleteComment() {
                axios.request({
                    url: 'https://tweeterproject.ml/api/comments',
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "commentId" : this.commentId,
                    }
                }).then(() => {
                    this.$emit('notifyParentDeleteComment', "");

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            selectSelection(item) {
                switch (item.title) {
                    case 'Edit Comment':
                    this.openDialog();
   
                    break
                    case 'Delete Comment':
                    this.deleteComment();
             
                    break
                }
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.loggedInUser = getCookie.username;
            },
        },
        beforeMount() {
            this.getMyCookies();
            this.findCommentImg();
        }
    }
</script>

<style lang="scss" scoped>
    #gridWrapper {
        display: grid;
        grid-template-columns: .2fr .8fr;
        grid-template-rows: 1fr 1fr;
        height: 80px;
        
        div {
            padding-left: 50px;
        }
        div:nth-child(1) {
            position: relative;
            padding-left: 18px;
            grid-row: 1/3;
            border-right: 1px solid grey;
        }
        div:nth-child(2) {
            font-size: 1.3rem;
        }
        div:nth-child(3) {
            font-size: 0.9rem;
            color: rgb(150, 146, 146);
        }
    }
    div > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .editIcon {
        height: 30px;
        width: 30px;
        right:0;
    }
    .childGridCont {
        display: grid;
        grid-template-columns: 1fr .1fr;
    }
    .menuCommIcon {
        width: 60%;
    }
    #cmtAveCont {
        border-right: 1px solid grey;
    }
    .commentContent {
        font-size: 14px;
    }
    @media only screen and (min-width: 700px) {
        .commentContent {
        font-size: 16px;
    }
    }

    @media only screen and (max-width: 699px) {
        #gridWrapper {
        display: grid;
        grid-template-columns: .1fr .8fr;
        grid-template-rows: 1fr 1fr;
        height: 80px;
        padding: 0;
        margin: 0;
        
        div:nth-child(1) {
            position: relative;
            grid-row: 1/3;
            border-right: 1px solid grey;
            padding: 0;
            margin: 0;
        }
        div:nth-child(2) {
            font-size: 1.3rem;
            padding: 5px;
            margin: 0;
        }
        div:nth-child(3) {
            font-size: 0.9rem;
            color: rgb(150, 146, 146);
            padding: 0;
            margin: 0;
        }
    }
   
    .editIcon {
        height: 30px;
        width: 30px;
        right:0;
    }
    .childGridCont {
        display: grid;
        grid-template-columns: 1fr .1fr;
    }

}

</style>