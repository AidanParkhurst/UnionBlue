<template lang="pug">
main.relative.h-screen
  Header
  Alert(v-if='alert.active' :type='alert.type' :text='alert.text')
  router-view(v-if='!onAdmin || jwtToken')
  div.w-full.flex.justify-center.items-center(v-else)
    form(id='passForm' @submit.prevent='signIn')
      input.p-2.rounded-md.text-3xl.border(v-model="password" type="password" placeholder='Password')
      button.bg-blue-500.m-12(@click='signIn')
        h2 SIGN IN
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import Alert from '@/components/Alert.vue'
import {alert} from '@/composables/alerts'
import {API, jwtToken, setToken} from '@/composables/api'

export default {
  name: 'App',
  components: {
    Header,
    Alert
  },
  setup() {
    let password = ""

    return {
      alert,
      jwtToken,
      password,
    }
  },
  computed: {
    onAdmin() {
      return this.$route.name === 'admin'
    }
  },
  methods: {
    signIn() {
      API.post('api/login', {
        pass: this.password
      }).then((response) => {
        setToken(response.data)
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>
