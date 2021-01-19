<template lang="pug">
div.h-80.w-80.mx-auto.my-20.bg-white.rounded-lg.shadow-md.border
  div.w-full.h-16.bg-blue-700.text-white
    h1.p-4.text-3xl.font-sans {{ name }}
  h1.p-4.text-xl {{ desc }}
  h1.p-4.text-lg {{ contact }}

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
  },
}
</script>
