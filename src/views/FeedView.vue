<template>
    <div>
       <div id="navGridWrapper">
        <img id="logo" src="@/assets/logo.png"/>
        <h1>Feed Page</h1>
      </div>
        
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

<style scoped>
   h1 {
    text-align: center;
    line-height: 100px;
    justify-self: start;
    text-transform: uppercase;
  }
  #navGridWrapper {
    display: block;

  }

  #logo {
    height: 80px;
    justify-self: start;
  }

  @media only screen and (min-width: 700px) {
    #navGridWrapper {
      display: grid;
      grid-template-columns: .5fr 1fr;
      width: 50vw;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
