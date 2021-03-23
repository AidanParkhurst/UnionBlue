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
        delete-forever.icon(@click='deleteItem = item')
        pencil.icon.ml-2(@click='')
    td.text-center(colspan="3")
      button.bg-blue-500(@click='showAdd = true')
        plus.inline.mr-1.-ml-2
        .inline ADD ITEM
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(v-if="showAdd" class="h-1/2 w-1/2")
  div.header
    h1 Add An Item
  div.p-4
    form(id="addForm" @submit.prevent="submitAdd")
      div.py-2
        label.text-2xl(for="name") Name:
        input.text-input.mx-4.px-2(class="w-3/4"
          type="text"
          id="name"
          placeholder="Descriptive Item Name"
          v-model='itemName')
      div.py-2
        label.text-2xl(for="img") Image:
        input.text-input.mx-4.px-2(class="w-3/4"
          type="text"
          id="img"
          placeholder="Link to Item Image"
          v-model='itemImg')
      div.py-2
        label.text-2xl(for="contact") Contact:
        input.text-input.mx-4.px-2(class="w-3/4"
          type="text"
          id="contact"
          placeholder="Contact's Email"
          v-model='itemContact')
      textarea.text-input.my-2.p-2.w-full.h-40(
        form="addForm"
        id="body"
        placeholder="Item Description"
        v-model='itemDesc')
      button.bg-red-500.float-right.bottom-2.mx-4(type="button"
        @click='showAdd = false')
        close.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CANCEL
      button.bg-blue-500.float-right.bottom-2(type="submit" form="addForm")
        upload.inline.mr-2.-ml-2.mb-1.text-xl
        .inline ADD ITEM
div.shadow-2xl.fixed.m-auto.inset-0.bg-white(v-if="deleteItem" class="h-1/6 w-1/2")
  div.warning.header.mb-4
    h1 {{ "Delete " + deleteItem.name + "?" }}
  h1.text-2xl.inline Are You Sure? This cannot be undone!
  button.bg-red-500.float-right.mx-4(
    @click='deleteItem = null')
    close.inline.mr-2.-ml-2.mb-1.text-xl
    .inline CANCEL
  button.bg-blue-500.float-right(
    @click='submitDelete(deleteItem.id); deleteItem = null')
    delete-forever.inline.mr-2.-ml-2.mb-1.text-xl
    .inline DELETE

</template>

<script lang="ts">
import {getItems} from '@/composables/item'
import {createAlert} from '@/composables/alerts'
import API from '@/composables/api'

import {Close, DeleteForever, Pencil, Plus, Send, Upload} from 'mdue'

export default{
  name: "Admin",
  components: {
    Close,
    DeleteForever,
    Pencil,
    Plus,
    Send,
    Upload
  },
  data() {
    return {
      items: getItems(),

      showAdd: false,
      deleteItem: "",

      itemName: '',
      itemImg: '',
      itemContact: '',
      itemDesc: ''
    }
  },
  methods: {
    submitAdd() {
      API.post('/api/addItem', {
        'name': this.itemName,
        'img': this.itemImg,
        'contact': this.itemContact,
        'desc': this.itemDesc
      }).then((response) => {
        createAlert('Item Added!', 'success')
        this.items = getItems()
        this.showAdd = false
      }, (error) => {
        createAlert('Error Adding Item!', 'error')
      })
    },

    submitDelete(id: Text) {
      console.log("deleting: " + id)
      API.post('/api/deleteItem', {
        'id': id,
      }).then((response) => {
        createAlert('Item Deleted!', 'success')
        this.items = getItems()
      }, (error) => {
        createAlert('Error Deleting Item!', 'error')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
tr
  @apply border-b

.warning
  background-color: rgba(239, 68, 68, 255)

.icon
  @apply inline text-gray-400 text-2xl cursor-pointer
</style>