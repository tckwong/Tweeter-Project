<template>
    <div>
        <nav>
            <ul>
                <li><router-link class="navLink" to="/">Log In</router-link></li>
                <li><router-link class="navLink" :to="`/OtherProfilesView/`+ this.username">Profile</router-link></li>
                <li><router-link class="navLink" to="/FeedView">Feed</router-link></li>
                <li><router-link class="navLink" to="/DiscoverView">Discover</router-link></li>
                <li><v-btn @click="logOutUser" color="red" elevation="2" large>Log Out</v-btn></li>
            </ul>
        </nav>
    </div>
   
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'

    export default {
        name: "Header",
        methods: {
            logOutUser() {
                axios.request({
                    url: 'https://tweeterest.ml/api/login',
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "username" : this.username,
                    }

                }).then(() => {
                    console.log("LOGGED OUT SUCCESSFUL");
                    cookies.remove('loginData');
                    this.$store.dispatch('removeToken', "");
                    this.$router.push({ name: 'LoginView' });

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.username = getCookie.username;
            }
        },
        beforeMount() {
            this.getMyCookies();
        }
    }
</script>

<style scoped>
    nav {
        text-align: center;
        color: blue;
    }
    router-link {
        text-decoration: none;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333333;
    }
    li {
        display: inline-block;
        list-style-type: none;
        color: rgb(51, 163, 66);
    }
    .navLink {
        color: white;
        text-align: center;
        padding: 16px;
        text-decoration: none;
    }
</style>