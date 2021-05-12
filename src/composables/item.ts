import {ref} from 'vue'
import {API, jwtToken} from './api'

export const currentItem = ref("")
export const currentItemName = ref("")

const products = ref(Array())
const contacts = ref({})

export const getContacts = () => {
  API.post('/api/contacts', {
    'token': jwtToken.value
  }).then((response) => {
    contacts.value = response.data
  }, (_error) => {
  })
  return contacts
}

export const getProducts = () => {
  API.get('/api/inventory').then((response) => {
    products.value = response.data
  })
  return products
}

export const setCurrentItem = (item: string, itemName: string = "") => {
  currentItem.value = item
  currentItemName.value = itemName
}