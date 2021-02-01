import {ref} from 'vue'

export const currentItem = ref("")

export const setCurrentItem = (item: string) => {
  console.log("Current Item: " + item)
  currentItem.value = item;
}