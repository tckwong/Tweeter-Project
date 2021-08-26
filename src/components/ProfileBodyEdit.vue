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
        <h3>ID:{{ userID }}</h3>
        
        <img :src="require('@/assets/defaultProfile.png')"/>
        <p>Name: {{ userName }}</p>
        <p>Email: {{ userEmail }}</p>
        <p>Bio: {{ userBio }}</p>
</section>

</template>

<script>
// import axios from 'axios'
// import cookies from 'vue-cookies'

    export default {
        name: "ProfileBodyEdit"
    }
</script>

<style lang="scss" scoped>

</style>