<template>
    <div>
        <div>
            <Slide
            id="hamburgerMenu"
            width="350">
            <nav id="mobileVersion">
                <div class="wrapper">
                    <div class="sidebar">
                        <ul>
                            <li><router-link class="navLink" to="/">Log In</router-link></li>
                            <li><router-link class="navLink" :to="`/OtherProfilesView/`+ this.username">Profile</router-link></li>
                            <li><router-link class="navLink" to="/FeedView">Feed</router-link></li>
                            <li><router-link class="navLink" to="/DiscoverView">Discover</router-link></li>
                            <li><v-btn @click="logOutUser" color="red" elevation="2" large>Log Out</v-btn></li>
                            <v-btn @click="toggleTheme" text rounded>Toggle Theme</v-btn>
                        </ul>
                    </div>
                </div>
                </nav>
            </Slide>
        </div>
            <nav id="desktopVersion">
                <ul>
                    <li><router-link class="navLink" to="/">Log In</router-link></li>
                    <li><router-link class="navLink" :to="`/OtherProfilesView/`+ this.username">Profile</router-link></li>
                    <li><router-link class="navLink" to="/FeedView">Feed</router-link></li>
                    <li><router-link class="navLink" to="/DiscoverView">Discover</router-link></li>
                    <li><v-btn @click="logOutUser" color="red" elevation="2" large>Log Out</v-btn></li>
                    <v-btn @click="toggleTheme" text rounded>Toggle Theme</v-btn>
                </ul>
            </nav>
    </div>
</template>

<script>
import axios from "axios"
import cookies from 'vue-cookies'
// import Slide from './Slide.vue' 
import { Slide } from 'vue-burger-menu'
import '../css/headerStyle.scss'
    export default {
        name: "Header",
        components: {
            Slide
        },
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
            toggleTheme() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark
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

</style>