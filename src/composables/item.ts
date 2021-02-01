import {ref} from 'vue'

export const currentItem = ref("")

export const setCurrentItem = (item: string) => {
  currentItem.value = item;
}