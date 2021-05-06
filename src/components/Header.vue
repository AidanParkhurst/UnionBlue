<template lang="pug">
div.bg-blue-300.w-full.h-16.my-0.shadow-lg.flex.justify-center.items-center
  div(class="w-3/5")
    h1.font-bold.text-white.inline.float-left UnionBlue
    router-link.link(v-if='onHome' to="/about") About
    router-link.link(v-if='!onHome' to="/") Home
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
