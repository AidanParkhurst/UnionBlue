<template lang="pug">
.alert.absolute(:data-alert-type='type') {{ text }}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'Alert',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="sass" scoped>
.alert
  @apply rounded shadow p-2 text-gray-100 m-2 text-center
  &[data-alert-type='error']
    @apply bg-red-500
  &[data-alert-type='info']
    @apply bg-blue-500
  &[data-alert-type='warning']
    @apply bg-yellow-500
  &[data-alert-type='success']
    @apply bg-green-600
</style>