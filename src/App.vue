<template lang="pug">
Header
template(v-for='item in items')
  Item(
    :name="item.name"
    :desc="item.desc"
    :contact="item.contact"
    :imgsrc="item.img"
  )
  hr(class='w-1/2 m-auto')
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from './components/Header.vue'
import Item from './components/Item.vue'

//TODO: Remove this, fetch from backend
import * as inventory from './assets/ItemsTemp.json'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Item
  },
  data() {
    return {
      items: inventory.items
    }
  }
})
</script>
