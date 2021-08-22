<template>
    <div>
        <router-link to="/ProfileView">Profile</router-link>
        <LogInPage/>
    </div> 
</template>

<script>
// @ is an alias to /src
import LogInPage from '@/components/LogInPage.vue'

export default {
  name: 'LoginView',
  components: {
    LogInPage
  }
}
</script>
