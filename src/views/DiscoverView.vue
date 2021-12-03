<template>
    <div>
      <div id="navGridWrapper">
        <img id="logo" src="@/assets/logo.png"/>
        <h1>Discover</h1>
      </div>

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

<style lang="scss" scoped>
  h1 {
    text-align: center;
    line-height: 150px;
    justify-self: start;
    text-transform: uppercase;
  }
  #navGridWrapper {
    display: block;
    h1 {
      font-family: 'overpass', sans-serif;
      font-size: 3rem;
    }
  }

  #logo {
    height: 80px;
    justify-self: start;
    align-self: center;
  }

@media only screen and (min-width: 700px) {
  #navGridWrapper {
    display: grid;
    grid-template-columns: .4fr 1fr;
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
