<template lang="pug">
div.flex(class="w-full sm:w-3/4 md:w-1/2 xl:w-1/3 mx-auto my-12")
  img(:src='imgsrc' class="inline h-1/2 md:h-80 w-1/2 max-w-sm")
  div.flex.justify-end.items-center(class="h-80 w-full")
    div.grid.grid-cols-1
      h1.font-bold.text-4xl {{ name }}
      button.bg-blue-500(@click="$router.push('/product/' + id)")
        view-week.inline.mr-2.mb-1.text-xl
        .inline VIEW OPTIONS

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
