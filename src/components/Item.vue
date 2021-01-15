<template lang="pug">
div.inline-block.bg-white.rounded-xl.h-52.shadow-md.border
  h1.p-4.text-xl.font-sans {{ name }}
  h2.pl-2 {{ desc }}
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
