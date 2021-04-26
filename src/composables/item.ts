import {ref} from 'vue'
import API from './api'

export const currentItem = ref("")
export const currentItemName = ref("")

const products = ref(Array())

export const getProducts = () => {
  API.get('/api/inventory').then((response) => {
    products.value = response.data
  })
  return products
}

export const getItems = (id: String) => {
  let product = products.value.find((x) => {return x.id == id})
  if(!product) return []
  
  return product.items
}

export const setCurrentItem = (item: string, itemName: string = "") => {
  currentItem.value = item
  currentItemName.value = itemName
}