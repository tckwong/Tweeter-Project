<template>
    <div>
        <router-link to="/FeedView">Feed</router-link> |
        <router-link to="/DiscoverView">Feed</router-link>
        <h1>Log In PAGE</h1>

        <LogInPage/>
        
    </div> 
</template>

<script>
// @ is an alias to /src
import LogInPage from '@/components/LogInPage.vue'

export default {
  name: 'LoginView',
  components: {
    LogInPage
  }
}
</script>
