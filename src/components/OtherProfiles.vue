<template>
    <div>
        <h1>Hello: {{ this.$route.params.user }}</h1>
        {{ userProfileId }}
        <img :src="require('@/assets/defaultProfile.png')"/>
        <p>Name: {{ userName }}</p>
        <p>Email: {{ userEmail }}</p>
        <p>Bio: {{ userBio }}</p>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: 'OtherProfiles',
        data() {
            return {
                profile: this.$route.params.user,
                userProfileId: "",
                userName: "",
                userEmail: "",
                userBio: "",
            }
        },
        methods: {
            getAllUserInfo() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
               
                }).then((response) => {
                    const found = response.data.find(user => user.username === this.$route.params.user );
                    this.userProfileId = found.userId;
                    this.getUserProfile();
                }).catch((error) => {
                    console.error(error);
                })
            },
            getUserProfile() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    params: {
                        userId: this.userProfileId
                    }
               
                }).then((response) => {
                    this.userName = response.data[0].username;
                    this.userEmail = response.data[0].email;
                    this.userBio = response.data[0].bio;

                }).catch((error) => {
                    console.error(error);
                })
            }
        },
        mounted() {
            this.getAllUserInfo();
        }
    }
</script>

<style scoped>
    section {
        background-color: rgb(184, 204, 240);
        height: 50vh;
        margin-left: 10vw;
        margin-right: 10vw;
    }

    img {
        height: 20vh;
    }
</style>