<template lang="pug">
div.flex(class="w-2/5 mx-auto my-12")
  img(:src='imgsrc' class="inline h-80 max-w-sm")
  div.bg-white.text-right(class="h-80 w-full")
    div
      h1 {{ name }}
    button.bg-blue-500(@click="$router.push('/product/' + id)")
      view-week.inline.mr-2.mb-1.text-xl
      .inline VIEW BRANDS

</template>

<script lang="ts">
import {ViewWeek} from 'mdue'

export default {
  name: 'Product',
  components: {
    ViewWeek
  },
  props: {
    name: {
      type: String,
    },
    imgsrc: {
      type: String,
    },
    id: {
      type: String,
    }
  }
}
</script>
