import {ref} from 'vue'

export const alert = ref({
  active: false,
  type: '',
  text: '',
})

function removeAlert(id: string) {
  alert.value = {
    active: false,
    type: '',
    text: '',
  }
}

export const createAlert = (text: string, type: string, timeout = 2500) => {
  console.log('pinagsa!')
  alert.value = {active: true, text: text, type: type}
  setTimeout(removeAlert, timeout)
}