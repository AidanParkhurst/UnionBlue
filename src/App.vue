<template lang="pug">
main.relative.h-screen
  Header
  Alert(v-if='alert.active' :type='alert.type' :text='alert.text')
  router-view
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import Alert from '@/components/Alert.vue'
import {alert} from '@/composables/alerts'

export default {
  name: 'App',
  components: {
    Header,
    Alert
  },
  setup() {
    return {
      alert
    }
  }
}
</script>
