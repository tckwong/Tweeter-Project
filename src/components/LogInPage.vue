<template>
    <div>
        <h1>Log In</h1>
        <button @click="getAxiosCall">Click ME</button>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "LogInPage",
        data: () => {
            return {
              
            }
        },
        methods : {
            printKey() {
                console.log(process.env.VUE_APP_API_KEY);
            },
            getAxiosCall: function() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                  
                }).then((response) => {
                    console.log("TEST"+response);
                    this.printKey();
                    // cookies.set('loginToken', response.data.token);
                    // this.$router.push({ name: 'Game' });
                }).catch((error) => {
                    console.error("There was an error: " +error);
                    // this.activateErrorMsg();
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>