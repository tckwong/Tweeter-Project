<template>
    <div>
      <div id="navGridWrapper">
        <img id="logo" src="@/assets/logo.png"/>
        <h1>Profile Page</h1>
      </div>
        <Header/>
        <OtherProfiles/>
     
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import OtherProfiles from '@/components/OtherProfiles.vue'

export default {
  name: 'OtherProfilesView',
  components: {
    Header,
    OtherProfiles,
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