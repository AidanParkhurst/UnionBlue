<template lang="pug">
div(class="w-2/5 mx-auto my-12")
  img(:src='imgsrc' class="inline h-80")
  div.float-right.rounded-lg.border.bg-white.text-center(class="relative inline-block h-80 w-80")
    div.header
      h1 {{ name }}
    h2.text-xl.p-4 {{ desc }}
    button.bg-blue-500(@click="setCurrentItem(name)") CONTACT US

</template>

<script lang="ts">
import {setCurrentItem} from '../composables/item'

export default {
  name: 'Item',
  props: {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    contact: {
      type: String,
    },
    imgsrc: {
      type: String,
    },
  },
  data() {
    return {
      setCurrentItem
    }
  }
}
</script>
