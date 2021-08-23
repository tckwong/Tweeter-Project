<template>
    <div>
        <h1>Feed Body</h1>
        <button @click="getMyCookies">RetrieveCookie</button>

        <v-col
            cols="1"
            sm="19"
            md="10"
        >
        <v-text-field
            label="Write post"
            placeholder="Username"
            solo
        ></v-text-field>
        </v-col>
        

          
          <v-col cols="12">
            <v-textarea
              v-model="content"
              color="teal"
            >
              <template v-slot:label>
                <div>
                  New Tweet <small>Required</small>
                </div>
              </template>
            </v-textarea>
          </v-col>
            <v-btn
                @click="createTweet"
                color="primary"
                elevation="2"
                large
            >POST
            </v-btn>
    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {
        name: 'FeedBody',
        data: () => {
            return {
                loginToken: cookies.get('loginToken'),
                content: ""
            }     
        },
        computed: {
        },
        methods: {
            createTweet() {
                axios.request({
                    url: 'https://tweeterest.ml/api/tweets',
                    method: 'POST',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.loginToken,
                        "content" : "",
                    }
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                console.log(this.loginToken);
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>