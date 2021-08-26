<template>
    <div>
      <h1>Discover</h1>
      <Header/>
      <DiscoverBody/>
      <Footer/>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import DiscoverBody from '@/components/DiscoverBody.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'DiscoverView',
  components: {
    Header,
    DiscoverBody,
    Footer
  }
}
</script>

<style>

</style>
