<template>
    <div> 
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