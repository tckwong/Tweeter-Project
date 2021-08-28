<template>

    <section>
        <h1>EDIT TIME</h1>
        <v-btn
        class="mx-2"
        fab
        dark
        large
        color="yellow"
        >
        <v-icon dark>
        mdi-pencil
        </v-icon>
        </v-btn>
        <h1>Profile</h1>
        
        <img :src="require('@/assets/defaultProfile.png')"/>
        <p>Name: {{  }}</p><span><input v-model="myEdits.nameEdit" type="text"/></span>
        <p>Email: {{  }}</p><span><input v-model="myEdits.emailEdit" type="text"/></span>
        <p>Bio: {{  }}</p><span><input v-model="myEdits.bioEdit" type="text"/></span>

        <v-btn
            @click="patchProfile"
            color="primary"
            elevation="2"
            large
        >Update
        </v-btn>
</section>

</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: "ProfileBodyEdit",
        data: () => {
            return {
                userToken: "",
                myEdits: {
                    nameEdit: "",
                    emailEdit: "",
                    bioEdit: "",
                }
            
            }
        },
        methods: {
            updateProfile() {
                this.$store.commit('editProfile', this.myEdits);
            },
            patchProfile() {
                console.log(this.userToken);
                console.log(this.myEdits.emailEdit);
    

            axios.request({
                    url: 'https://tweeterest.ml/api/users',
                    method: 'PATCH',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "email" : this.myEdits.emailEdit,
                        "username" : this.myEdits.nameEdit,
                        // "content" : this.myEdits.content,
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
        beforeMount() {
            this.getMyCookies();
        }
    }
</script>

<style lang="scss" scoped>
    img {
        height: 20vh;
    }
    p {
        display: inline-block;
    }
    input {
        border: 1px solid black;
    }
</style>