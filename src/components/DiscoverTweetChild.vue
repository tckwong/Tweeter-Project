<template>

    <div>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
        >
    <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="40vw"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        TWEETER
      </v-icon>
      <span class="text-h6 font-weight-light">{{ createdAt }}</span>
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
          <v-list-item-title><router-link :to="{ name: 'OtherProfilesView', params: { user: username }}">{{ username }}</router-link></v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
        <!-- Embed a button around v-icon for click-->
          <v-icon class="mr-1">
            mdi-thumb-up
          </v-icon>
          <span class="subheading mr-2">256</span>111
          <span class="mr-1">·</span>
       
              <button @click="retrieveUserId" class="myButton">Follow</button>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
  </v-lazy>

    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
    export default {
        name: 'DiscoverTweetChild',
        data()  {
            return {
                userToken : "",
                currUserId: "",
            }
        },
        props: {
            tweetId : Number,
            username : String,
            content: String,
            createdAt: String
        },
        methods: {
           
            retrieveUserId() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
             
                }).then((response) => {
                    console.log(response);
                    const found = response.data.find(user => user.username === this.username);
                    console.log(found);
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
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
            },
        },
        mounted() {
            this.getMyCookies();
        }
    }
</script>

<style lang="scss" scoped>
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
.myButton:hover {
	background:linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
	background-color:#0688fa;
}
.myButton:active {
	position:relative;
	top:1px;
}
</style>