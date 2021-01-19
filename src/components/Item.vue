<template lang="pug">
div(class="w-1/2 space-x-64 mx-auto my-12")
  img(:src='imgsrc' class="inline h-80")
  div.rounded-lg.shadow-md.border.bg-white(class="inline-block h-80 w-80")
    div.bg-blue-700.text-white(class="w-full h-16")
      h1.text-3xl.font-sans.p-4 {{ name }}
    h1.text-xl.p-4 {{ desc }}
    h1.text-lg.p-4 {{ contact }}

</template>

<script lang="ts">
export default {
  name: 'Item',
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    imgsrc: {
      type: String,
      required: true,
    },
  },
}
</script>
