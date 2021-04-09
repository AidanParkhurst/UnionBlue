<template lang="pug">
Modal
  template(v-slot:header)
    div.header
      h1 Contact
  template(v-slot:body)
    form.px-4(id="contactform" @submit.prevent="submitContact")
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
            :placeholder="'IE: \"Order for \"' + currentItemName + '\"'",
            v-model="subject")
      textarea.text-input.my-2.p-2.w-full.h-52(
        form="contactform"
        id="body"
        placeholder="Email Body"
        v-model="body")
  template(v-slot:actions)
    .flex.bg-white.justify-end.pb-2
      button.bg-blue-500(type="submit" form="contactform")
        send.inline.mr-2.-ml-2.mb-1.text-xl
        .inline SEND
      button.bg-red-500.mx-4(type="button" @click="setCurrentItem('')")
        close.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CANCEL
</template>

<script lang="ts">
import {currentItem, currentItemName, setCurrentItem} from '@/composables/item'
import API from '@/composables/api'
import {Close, Send} from 'mdue'
import {createAlert} from '@/composables/alerts'

import Modal from '@/components/Modal.vue'

export default {
  name: "Contact",
  components: {
    Close,
    Modal,
    Send
  },
  data() {
    return {
      currentItem,
      currentItemName,
      setCurrentItem,

      createAlert,

      email: '',
      subject: '',
      body: '',
    }
  },
  methods: {
    submitContact() {
      let id = this.currentItem;
      setCurrentItem('') // Closes contact form

      API.post('/api/contact', {
        'id': id,
        'email': this.email,
        'subject': this.subject,
        'body': this.body
      }).then((response) => {
        createAlert('Email Sent!', 'success')
      }, (error) => {
        createAlert('Error Sending Email!', 'error')
      })
    }
  }
}
</script>