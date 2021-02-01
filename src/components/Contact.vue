<template lang="pug">
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(class="w-1/2 h-1/2")
  div.header
    h1 Contact
  div.p-4
    form(id="contactform" action="/#")
      input(type="hidden" :value="currentItem")
      template(v-for="question in inputs")
        div.py-2
          label.text-2xl(:for="question.id") {{ question.label }}:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            :id="question.id"
            :name="question.id"
            :placeholder="question.placeholder")
      textarea.text-input.my-2.p-2.w-full.h-52(
        form="contactform"
        id="body"
        name="body"
        placeholder="Email Body")
      button.bg-red-500.float-right.bottom-2.mx-4(@click="setCurrentItem('')") Cancel
      button.bg-blue-500.float-right.bottom-2(type="submit" form="contactform") Send
      
</template>

<script lang="ts">
import {currentItem, setCurrentItem} from '../composables/item'

export default {
  name: "Contact",
  data() {
    return {
      currentItem,
      setCurrentItem,
      inputs: [
        {
          id: "email",
          placeholder: "Where can responses reach you?",
          label: "Email"
        },
        {
          id: "subject",
          placeholder: "IE: \"Order for XYZ\"",
          label: "Subject"
        }
      ]
    }
  } 
}
</script>