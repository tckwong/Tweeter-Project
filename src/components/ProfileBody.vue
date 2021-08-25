<template>
    <section>
        <h1>Profile Body</h1>
        <h3>{{ getState }}</h3>
       
        <img :src="require('@/assets/defaultProfile.png')"/>
        <p>Name: {{ }}</p>
    </section>
</template>

<script>
import axios from 'axios'
    export default {
        name: "ProfileBody",
        data: () => {
            return {
              
            }
        },
        computed: {
            getState() {
                return this.$store.state.currUserID;
            },
        },

        methods: {
            retrieveUserProfile() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data: {
                        'userId' : this.getState
                    }
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error(error);
                })
            },

            deleteUser() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data: {
                        "loginToken": "LIAbfvh341uNAS314",
                        "password": "ISavedChristmas"
                    }
               
                }).then((response) => {
                    console.log(response);
              
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
        },
        beforeMount() {
            this.retrieveUserProfile();
        }
    }
</script>

<style lang="scss" scoped>
    section {
        background-color: rgb(184, 204, 240);
        height: 40vh;
    }

    img {
        height: 20vh;
    }
</style>