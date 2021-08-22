<template>
    <div>
        <h1>Log In</h1>
        <button @click="regUserAxiosCall">Click ME</button>
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
            regUserAxiosCall: function() {
                axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'GET',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY
                    },
                    data : {
                        "email": "CindyLou@suess.com",
                        "username": "CindyLou",
                        "password": "IStoleChristmas",
                        "bio": "I just want everyone to be together on christmas.",
                        "birthdate": "1993-07-26",
                        "imageUrl": "https://unsplash.com/photos/DCVMd_NOpro/download?force=true&w=640",
                        "bannerUrl": "https://i.picsum.photos/id/223/1080/640.jpg?hmac=1zRXJhkXy6EdeYC-WYatZnnmpkqINeYTiJ4-74E6t1o"
                    }
                  
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