<template>
    <section>
        <div id="gridWrapper">
            <div>
                <img class="avatar" src="@/assets/defaultProfile.png" alt="">
            </div>
            <v-card
             width="mx-md-5">
                <v-text-field
                v-if="editBtnTgl" 
                solo
                clearable
                :value="content"
                v-model="content"
                ></v-text-field>
                <v-card-actions width="100%">
                        {{ content }}
                        <div id="EditCommentModal">
                        <div class="text-center">
                            <v-dialog
                            v-model="dialog"
                            width="500"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                v-if="loggedInUser === username"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >  <img
                                id="editIcon"
                                src="@/assets/editIcon.png"/>
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                Edit Comment:
                                </v-card-title>

                                <v-card-text
                                Post new comment below:
                                ></v-card-text>
                                 <v-textarea
                                v-model="commentEditContent"
                                solo
                                color="black"
                                background-color="light-blue"
                                clearable
                                ></v-textarea>
                                <v-divider></v-divider>

                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false; updateComment()"
                                >
                                    POST
                                </v-btn>
                                 <span><v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                >
                                    Cancel
                                </v-btn></span>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </div>
                    </div>
                      
                </v-card-actions>
                  
            </v-card>
            <div>
                {{ username }} - {{ createdAt }}
            </div>
        </div>
        USER:{{ loggedInUser }}

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
            }
        },
        computed: {
            retrieveLoggedInUserName() {
                return this.$store.state.username;

            }
        },
        props: {
            commentId : Number,
            tweetId : Number,
            username : String,
            content : String,
            createdAt : String,
        },
        methods: {
            updateComment() {
                axios.request({
                    url: 'https://tweeterest.ml/api/comments',
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

                }).then((response) => {
                    console.log(response);
                    console.log(this.userToken);
                    console.log("Successfully updated");

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
             getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken; 
            },
        },
       
        beforeMount() {
            this.getMyCookies();
            this.loggedInUser = this.retrieveLoggedInUserName;
        }
    }
</script>

<style lang="scss" scoped>
    #gridWrapper {
        display: grid;
        grid-template-columns: .2fr .8fr;
        grid-template-rows: 1fr 1fr;
        height: 60px;
        
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
    .avatar {
        height: 30px;
    }
    #editIcon {
        height: 30px;
        width: 30px;
        left: 90%;
    }

</style>