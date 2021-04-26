<template lang="pug">
h1.section.text-center {{$route.params.id}}
div.m-auto.flex.items-center.justify-center(class="w-3/5")
  template(v-for='item in items')
    div.mx-4.bg-red-400(class="h-80 w-80")
      div.header
        h1 {{ item.name }}
</template>

<script lang="ts">
import {getItems} from '@/composables/item'

export default {
  name: 'Brands',
  setup() {
    let items = getItems()
    return {items}
  }
}
</script>
