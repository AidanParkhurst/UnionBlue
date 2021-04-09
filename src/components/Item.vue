<template lang="pug">
div(class="w-2/5 mx-auto my-12")
  img(:src='imgsrc' class="inline h-80 max-w-sm")
  div.float-right.rounded-lg.border.bg-white.text-center(class="relative inline-block h-80 w-80")
    div.header
      h1 {{ name }}
    h2.text-xl.mt-4.p-4 {{ desc }}
    button.absolute.bottom-4.inset-x-20.bg-blue-500(@click="setCurrentItem(id, name)")
      email.inline.mr-2.mb-1.text-xl
      .inline CONTACT

</template>

<script lang="ts">
import {setCurrentItem} from '@/composables/item'
import {Email} from 'mdue'

export default {
  name: 'Item',
  components: {
    Email
  },
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
    id: {
      type: String,
    }
  },
  data() {
    return {
      setCurrentItem
    }
  }
}
</script>
