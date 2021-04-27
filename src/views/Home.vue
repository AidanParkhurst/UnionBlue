<template lang="pug">
template(v-for='product in products')
  Product(
    :name="product.product"
    :imgsrc="product.img"
    :id ="product.id"
  )
  hr.border.border-blue-200(class='w-3/5 m-auto')
</template>

<script lang="ts">
import Product from '@/components/Product.vue'
import Modal from '@/components/Modal.vue'

import {getProducts} from '@/composables/item'

export default {
  name: 'Home',
  components: {
    Modal,
    Product
  },
  setup() {
    let products = getProducts()
    return {
      products
    }
  }
}
</script>
