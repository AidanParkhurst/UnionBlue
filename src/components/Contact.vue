<template lang="pug">
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(class="w-1/2 h-1/2")
  div.header
    h1 Contact
  div.p-4
    form(id="contactform" @submit.prevent="submitContact")
      input(type="hidden" name="item" :value="currentItem")
      div.py-2
          label.text-2xl(for="email") Email:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="email"
            placeholder="Where can responses reach you?"
            v-model="email")
      div.py-2
          label.text-2xl(for="subject") Subject:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="subject"
            :placeholder="'IE: \"Order for \"' + currentItem + '\"'",
            v-model="subject")
      textarea.text-input.my-2.p-2.w-full.h-52(
        form="contactform"
        id="body"
        placeholder="Email Body"
        v-model="body")
      button.bg-red-500.float-right.bottom-2.mx-4(type="button" @click="setCurrentItem('')") CANCEL
      button.bg-blue-500.float-right.bottom-2(type="submit" form="contactform") SEND
      
</template>

<script lang="ts">
import {currentItem, setCurrentItem} from '@/composables/item'
import API from '@/composables/api'

export default {
  name: "Contact",
  data() {
    return {
      currentItem,
      setCurrentItem,

      email: '',
      subject: '',
      body: '',
    }
  },
  methods: {
    submitContact() {      
      API.post('/api/contact', {
        'email': this.email,
        'subject': this.subject,
        'body': this.body
      }).then((response) => { // TODO: Handle this in a meaningful way
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>