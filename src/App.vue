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
Contact(v-if="currentItem")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from './components/Header.vue'
import Item from './components/Item.vue'
import Contact from './components/Contact.vue'

import {currentItem} from './composables/item'

//TODO: Remove this, fetch from backend
import * as inventory from './assets/ItemsTemp.json'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Item,
    Contact
  },
  data() {
    return {
      items: inventory.items,
      currentItem: currentItem
    }
  }
})
</script>
