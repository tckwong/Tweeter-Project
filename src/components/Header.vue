<template>
    <div class="pageWrapper">
        <nav>
            <ul>
                <li><router-link to="/">Log In</router-link></li>
                <li><router-link to="/ProfileView">Profile</router-link></li>
                <li><router-link to="/DiscoverView">Discover</router-link></li>
                <li><router-link to="/FeedView">Feed</router-link></li>
            </ul>

            <h1>THIS IS A HEADER</h1>
        </nav>
    </div>
   
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .pageWrapper {
        margin-left: 15vw;
        margin-right: 15vw;
    }
    nav {
        text-align: center;
        color: blue;
    }
    router-link {
        text-decoration: none;
    }
    li {
        text-decoration: none;
        color: rgb(51, 163, 66);
    }
</style>