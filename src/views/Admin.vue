<template lang="pug">
h1.text-center Items:
div(class="w-1/2 m-auto")
  table.w-full.text-center.rounded-lg.ring-2.ring-gray-200
    tr
      th Name
      th Description
      th Actions
    tr(v-for='item in items')
      td {{item.name}}
      td {{item.desc}}
      td
        delete-forever.icon(@click='deleteItem = item.name')
        pencil.icon.ml-2(@click='')
    td.text-center(colspan="3")
      button.bg-blue-500(@click='showAdd = true')
        plus.inline.mr-1.-ml-2
        .inline ADD ITEM
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(v-if="showAdd" class="h-1/2 w-1/2")
  div.header
    h1 Add An Item
  div.p-4
    form(id="addform" @submit.prevent="submitAdd")
      div.py-2
          label.text-2xl(for="email") Email:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="email"
            placeholder="Where can responses reach you?")
      div.py-2
          label.text-2xl(for="subject") Subject:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="subject"
            placeholder="IE: \"Order for \"")
      textarea.text-input.my-2.p-2.w-full.h-52(
        form="contactform"
        id="body"
        placeholder="Email Body")
      button.bg-red-500.float-right.bottom-2.mx-4(type="button"
        @click='showAdd = false')
        close.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CANCEL
      button.bg-blue-500.float-right.bottom-2(type="submit" form="contactform")
        send.inline.mr-2.-ml-2.mb-1.text-xl
        .inline ADD ITEM
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(v-if="deleteItem" class="h-1/6 w-1/2")
  div.header
    h1 {{ "Delete " + deleteItem + "?" }}
  h1.text-2xl Are You Sure? This cannot be undone!
    button.bg-red-500.float-right.mx-4(
      @click='deleteItem = ""')
      close.inline.mr-2.-ml-2.mb-1.text-xl
      .inline CANCEL
    button.bg-blue-500.float-right
      delete-forever.inline.mr-2.-ml-2.mb-1.text-xl
      .inline DELETE

</template>

<script lang="ts">
import {getItems} from '@/composables/item'

import Add from '@/components/Add.vue'
import Delete from '@/components/Delete.vue'

import {Close, DeleteForever, Pencil, Plus, Send} from 'mdue'

export default({
  name: "Admin",
  components: {
    Add,
    Close,
    Delete,
    DeleteForever,
    Pencil,
    Plus,
    Send
  },
  setup() {
    let items = getItems()

    return {
      items
    }
  },
  data() {
    return {
      showAdd: false,
      deleteItem: "",
    }
  }
})
</script>

<style lang="sass" scoped>
tr
  @apply border-b

.icon
  @apply inline text-gray-400 text-2xl cursor-pointer
</style>