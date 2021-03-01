<template lang="pug">
div.bg-blue-300.h-16.shadow-lg
  div(class="w-3/5 m-auto")
    h1.font-bold.text-white.inline.float-left UnionBlue
    router-link.link.text-white.inline.float-right(v-if='onHome' to="/about") About
    router-link.link.text-white.inline.float-right(v-if='!onHome' to="/") Home
</template>

<script lang="ts">
export default {
  name: 'Header',
  computed: {
    onHome() {
      return this.$route.name === 'home'
    }
  }
}
</script>
