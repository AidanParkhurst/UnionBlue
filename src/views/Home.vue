<template lang="pug">
template(v-for='item in items')
  Item(
    :name="item.name"
    :desc="item.desc"
    :contact="item.contact"
    :imgsrc="'/img/' + item.img"
  )
  hr.border.border-blue-200(class='w-3/5 m-auto')
Contact(v-if="currentItem")
</template>

<script lang="ts">
import Header from '../components/Header.vue'
import Item from '../components/Item.vue'
import Contact from '../components/Contact.vue'

import {currentItem, getItems} from '../composables/item'

export default {
  name: 'Home',
  components: {
    Header,
    Item,
    Contact
  },
  setup() {
    let items = getItems()
    return {
      items
    }
  },
  data() {
    return {
      currentItem: currentItem
    }
  }
}
</script>
