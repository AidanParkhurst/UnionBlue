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
import Header from './components/Header.vue'
import Item from './components/Item.vue'
import Contact from './components/Contact.vue'

import {currentItem, getItems} from './composables/item'

export default {
  name: 'App',
  components: {
    Header,
    Item,
    Contact
  },
  setup() {

    return {
      items: getItems()
    }
  },
  data() {
    return {
      currentItem: currentItem
    }
  }
}
</script>
