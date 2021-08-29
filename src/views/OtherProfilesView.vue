<template>
    <div> 
        <Header/>
        <OtherProfiles/>
        <Footer/>
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import OtherProfiles from '@/components/OtherProfiles.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'OtherProfilesView',
  components: {
    Header,
    OtherProfiles,
    Footer
  }
}
</script>