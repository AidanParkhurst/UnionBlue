<template lang="pug">
teleport(to='main')
  .fixed.z-10.inset-0
    .flex.items-center.justify-center.min-h-screen
      .inline-block.shadow-2xl.inset-0.bg-white(class="w-1/2")
        slot(name='header')
          .header
            h1.text-white Are you sure?
        slot(name='body')
          .bg-white
            p.text-2xl Complete this action?
        slot(name='actions')
          .flex.bg-white.justify-end.pb-2
            button.bg-red-500.mx-2 YES
            button.bg-blue-500 NO
</template>

<script lang="ts">
export default {
  name: 'Modal'
}
</script>