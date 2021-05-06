<template lang="pug">
h1.section.text-5xl.text-center {{product.product}}
div.m-auto.flex.items-center.justify-center(class="w-full")
  div.grid.gap-4(:class="gridClasses")
    div.max-w-sm(v-for='item in items')
      div.flex.justify-center(class="h-80")
        img(:src='item.img' class="max-h-full")
      div.text-center.w-full
        h1.font-bold.text-blue-500 {{ item.name }}
        hr.border.border-blue-300.w-full
        h2.text-3xl {{item.desc}}
      div.flex.justify-center.my-12
        button.bg-blue-500.mx-auto(@click="setCurrentItem(item.id, item.name)")
          email.inline.mr-2.mb-1.text-xl
          .inline CONTACT
Contact(v-if="currentItem")
</template>

<script lang="ts">
import Contact from '@/components/Contact.vue'
import {Email} from 'mdue'

import {currentItem, getProducts, setCurrentItem} from '@/composables/item'
import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default {
  name: 'Brands',
  components: {
    Contact,
    Email
  },
  setup() {
    const route = useRoute()
    let products = getProducts()
    
    let product = computed(() => {
      let current = products.value.find((x) => {return x.id == route.params.id})
      if(!current) return {product:""}
      return current
    })

    let items = computed(() => {
      return product.value.items
    })

    return {
      items,
      product
    }
  },
  computed: {
    gridClasses() {
      let sizes = [['sm',2],['md',3],['lg',4]]
      let max = this.items.length
      let base = "grid-cols-1"
      for(let size of sizes) {
        let cols = max < size[1] ? max : size[1]
        base = base + " " + (size[0] + ":grid-cols-" + cols)
      }
      return base
    }
  },
  data() {
    return {
      currentItem,
      setCurrentItem
    }
  }
}
</script>
