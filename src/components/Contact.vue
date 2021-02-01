<template lang="pug">
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(class="w-1/2 h-1/2")
  div.bg-blue-700(class="w-full h-16")
    h1.text-3xl.text-white.p-4 Contact
  div.p-4
    form(id="contactform" action="/#")
      input(type="hidden" :value="currentItem")
      template(v-for="question in inputs")
        div.py-2
          label.text-2xl(:for="question.id") {{ question.label }}:
          input.mx-4.px-2.rounded-md.border.border-black.outline-none.text-lg(class="w-3/4 focus:ring-2 focus:ring-blue-500"
            type="text"
            :id="question.id"
            :name="question.id"
            :placeholder="question.placeholder")
      textarea.mx-auto.my-2.p-2.text-lg.rounded-lg.border.border-black.outline-none(
        class="w-full h-52 focus:ring-2 focus:ring-blue-500"
        form="contactform"
        id="body"
        name="body"
        placeholder="Email Body")
      button.bg-blue-500.rounded-md.text-white.font-bold.float-right(
        class="bottom-2 py-2 px-8"
        type="submit"
        form="contactform") Send
      
</template>

<script lang="ts">
import {currentItem, setCurrentItem} from '../composables/item'

export default {
  name: "Contact",
  data() {
    return {
      currentItem: currentItem,
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