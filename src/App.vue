<template lang="pug">
Header
Item(
  name='Latex Free Gloves'
  desc='Non-sterile latex free gloves, coming in boxes of 100'
  contact='jimmywilbur@mail.gov')
Item(
  name='Hand Sanitizer'
  desc='Gallon jugs of hand sanitizer, comes in boxes of 10'
  contact='someone@somewhere.edu')
Item(
  name='Face Masks'
  desc='Protective coverings for the mouth and nose, comes in boxes of 100'
  contact='bobertroberts@dese.net')
</template>

<script lang="ts">
import Header from './components/Header.vue'
import Item from './components/Item.vue'

export default {
  name: 'App',
  components: {
    Header,
    Item
  }
}
</script>
