<template>
    <div>
        <router-link to="/ProfileView">Profile</router-link>
        <router-link to="/FeedView">Feed</router-link>
        <h1>DISCOVER PAGE ONLY</h1>
        <Header/>
        <Footer/>
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'DiscoverView',
  components: {
    Header,
    Footer
  }
}
</script>
