import {ref} from 'vue'
import API from './api'

export const currentItem = ref("")

const items = ref(Array())

export const getItems = () => {
  API.get('/api/items').then((response) => {
      items.value = response.data
  })
  return items
}
export const setCurrentItem = (item: string) => {
  currentItem.value = item;
}