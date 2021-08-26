<template>
    <div>
        <router-link to="/FeedView">Feed</router-link> |
        <router-link to="/DiscoverView">Feed</router-link>
        <h1>PROFILE PAGE (EDIT)</h1>
        
        <Header/>
        <ProfileBodyEdit/>
        <Footer/>

        
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ProfileBodyEdit from '@/components/ProfileBodyEdit.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'ProfileEditView',
  components: {
    Header,
    ProfileBodyEdit,
    Footer,
  }
}
</script>