<template lang="pug">
h1.text-center Items:
div(class="w-1/2 m-auto")
  table.w-full.text-center.rounded-lg.ring-2.ring-gray-200
    tr
      th Name
      th Description
      th Actions
    tr(v-for='item in items')
      td {{item.name}}
      td {{item.desc}}
      td
        delete-forever.icon(@click='')
        pencil.icon.ml-2(@click='')
</template>

<script lang="ts">
import {getItems} from '@/composables/item'
import {DeleteForever, Pencil} from 'mdue'

export default({
  name: "Admin",
  components: {
    DeleteForever,
    Pencil
  },
  setup() {
    let items = getItems()
    return {
      items
    }
  }
})
</script>

<style lang="sass" scoped>
tr
  @apply border-b

.icon
  @apply inline text-gray-400 text-2xl cursor-pointer
</style>