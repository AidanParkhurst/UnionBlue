<template lang="pug">
div(class="w-1/2 space-x-64 mx-auto my-12")
  img(:src='imgsrc' class="inline h-80")
  div.rounded-lg.border.bg-white.text-center(class="relative inline-block h-80 w-80")
    div.bg-blue-700.text-white(class="w-full h-16")
      h1.text-3xl.p-4 {{ name }}
    h1.text-xl.p-4 {{ desc }}
    a.bg-blue-500.rounded-md.text-white.font-bold.cursor-pointer(
      class="bottom-2 py-2 px-8"
      @click="setCurrentItem(name)") Contact Us

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
