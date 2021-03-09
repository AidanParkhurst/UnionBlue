<template lang="pug">
.alert.absolute(:data-alert-type='type')
  h2.inline {{ text }}
  check.inline.ml-1(v-if="type === 'success'")
  alert-circle-outline.inline.ml-1(v-else)
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {AlertCircleOutline, Check} from 'mdue'

export default defineComponent({
  name: 'Alert',
  components: {
    AlertCircleOutline,
    Check
  },
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
  &[data-alert-type='success']
    @apply bg-green-600
</style>