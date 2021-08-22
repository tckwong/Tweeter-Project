<template>
    <div>
        <router-link to="/FeedView">Feed</router-link> |
        <router-link to="/DiscoverView">Feed</router-link>
        <h1>PROFILE PAGE</h1>
        
        <Header/>
        <ProfileBody/>
        <Footer/>

        
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ProfileBody from '@/components/ProfileBody.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ProfileView',
  components: {
    Header,
    ProfileBody,
    Footer,

  }
}
</script>
