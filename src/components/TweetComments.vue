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
                        <img id="editIcon" src="@/assets/editIcon.png"/>
                </v-card-actions>
            
                
            </v-card>
            <div>
                {{ username }} - {{ createdAt }}
            </div>
        </div>
        
    </section>
</template>

<script>
import axios from "axios"
    export default {
        name : 'TweetComments',
        data() {
            return {
                // Toggle edit button
                editBtnTgl: false,
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
                        "content" : this.content,
                    }

                }).then((response) => {
                    console.log(response);
                    this.updateComment();

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
        },
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