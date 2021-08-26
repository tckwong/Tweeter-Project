<template>
    <div>
        <nav>
            <ul>
                <li><router-link class="navLink" to="/">Log In</router-link></li>
                <li><router-link class="navLink" to="/ProfileView">Profile</router-link></li>
                <li><router-link class="navLink" to="/DiscoverView">Discover</router-link></li>
                <li><router-link class="navLink" to="/FeedView">Feed</router-link></li>
            </ul>

        </nav>
    </div>
   
</template>

<script>
    export default {
        name: "Header"
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