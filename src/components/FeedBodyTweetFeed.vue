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
            <div id="parent">
        
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {

        name: "FeedBodyTweetFeed",
        props: ['testProp'],
        
        data:() => {
            return {
                userToken : "",
                profileUserID : "",
                currUsername: "",
                tweetContent: "",

            }
        },
        methods: {
            retrieveUserTweets() {
                console.log('WORKS');
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
                    console.log(response);
                    var parent = document.getElementById('parent');
                    for (let i=0; i<response.data.length; i++){
                        let myTitle = document.createElement('h4');
                        let tweetContent = document.createElement('p');
                        let makeBtn = document.createElement('button');
                        // var test = makeBtn.classList.add('closeBtn');
                        makeBtn.setAttribute('class', 'closeBtn');
                        var test= makeBtn.getAttribute('class');
                        parent.append(myTitle);
                        parent.append(makeBtn);
                        parent.append(tweetContent);
                        myTitle.innerText = this.currUsername;
                        tweetContent.innerText = response.data[i].content;
                        makeBtn.innerText = "x";

                        console.log(test);
                        
                    }
                    
                }).catch((error) => {
                    console.error(error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.profileUserID = getCookie.userId;
                this.currUsername = getCookie.username;
                this.tweetContent = getCookie.content;
            },
   
        },
        watch: {
            testProp: function() {
                 this.retrieveUserTweets();
            }
        },
        beforeMount() {
            this.getMyCookies();
        }
    }
</script>

<style>
    .wrapper {
        margin-left: 10vw;
        margin-right: 10vw;
        /* height: 800px; */
    }

    .closeBtn {
        box-shadow:inset 0px 1px 0px 0px #dcecfb;
        background:linear-gradient(to bottom, #bddbfa 5%, #80b5ea 100%);
        background-color:#bddbfa;
        border-radius:6px;
        border:1px solid #84bbf3;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:6px 24px;
        text-decoration:none;
        text-shadow:0px 1px 0px #528ecc;
}
.closeBtn:hover {
	background:linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
	background-color:#80b5ea;
}
.closeBtn:active {
	position:relative;
	top:1px;
}
</style>