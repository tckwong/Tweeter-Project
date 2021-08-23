<template>
    <div>
        <h1>Profile Body</h1>
        <h3>UserID {{  }}</h3>

    </div>
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
            }
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
                        'userId' : this.$store.state.currUserID
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
        }
    }
</script>

<style lang="scss" scoped>

</style>