<template>
    <div  class="pageWrapper">
        <Header/>
        <FeedBody/>
        <Footer/>
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import FeedBody from '@/components/FeedBody.vue'

export default {
  name: 'FeedView',
  components: {
    Header,
    FeedBody,
    Footer
  }
}
</script>

<style>
  .pageWrapper {
        margin-left: 20vw;
        margin-right: 20vw;
    }
</style>
