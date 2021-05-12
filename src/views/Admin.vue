<template lang="pug">
h1.text-center Items:
div(class="w-1/2 m-auto")
  table.w-full.text-center.rounded-lg.ring-2.ring-gray-200
    tr
      th Name
      th Description
      th Actions
    template(v-for='product in products')
      tr(v-for='item in product.items')
        td {{item.name}}
        td {{item.desc}}
        td
          delete-forever.icon(@click='deleteItem = item; deleteType = product.id')
          pencil.icon.ml-2(@click='editItem = item; editId = item.id; itemType = product.id')
    td.text-center(colspan="3")
      button.bg-blue-500(@click='showAdd = true')
        plus.inline.mr-1.-ml-2
        .inline ADD ITEM
Modal(v-if="showAdd")
  template(v-slot:header)
    div.header
      h1 Add An Item
  template(v-slot:body)
    div.p-4
      form(id="addForm" @submit.prevent="submitAdd")
        label.text-2xl(for="type") Product Type:
        select(id='type' v-model='itemType')
          template(v-for='product in products')
            option.text-input(:value='product.id' placeholder='Nitrile Gloves') {{product.product}}
        div.py-2
          label.text-2xl(for="name") Name:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="name"
            placeholder="Descriptive Item Name"
            v-model='itemName')
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
  template(v-slot:actions)
    .flex.bg-white.justify-end.pb-2
      button.bg-blue-500(type="submit" form="addForm")
        upload.inline.mr-2.-ml-2.mb-1.text-xl
        .inline ADD ITEM
      button.bg-red-500.mx-4(type="button"
        @click='showAdd = false')
        close.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CANCEL
Modal(v-if="deleteItem")
  template(v-slot:header)
    div.warning.header
      h1 {{ "Delete " + deleteItem.name + "?" }}
  template(v-slot:body)
    h1.text-2xl Are You Sure? This cannot be undone!
  template(v-slot:actions)
    .flex.bg-white.justify-end.pb-2
      button.bg-blue-500(
        @click='submitDelete(deleteItem.id, deleteType); deleteItem = null; deleteType = ""')
        delete-forever.inline.mr-2.-ml-2.mb-1.text-xl
        .inline DELETE
      button.bg-red-500.mx-4(
        @click='deleteItem = null')
        close.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CANCEL
Modal(v-if="editItem")
  template(v-slot:header)
    div.header
      h1 {{"Edit " + editItem.name}}
  template(v-slot:body)
    div.p-4
      form(id="editForm" @submit.prevent="submitEdit")
        div.py-2
          label.text-2xl(for="name") Name:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="name"
            :placeholder="editItem.name"
            v-model='itemName')
        div.py-2
          label.text-2xl(for="img") Image:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="img"
            :placeholder="editItem.img"
            v-model='itemImg')
        div.py-2
          label.text-2xl(for="contact") Contact:
          input.text-input.mx-4.px-2(class="w-3/4"
            type="text"
            id="contact"
            :placeholder="contacts[editId]"
            v-model='itemContact')
        textarea.text-input.my-2.p-2.w-full.h-40(
          form="addForm"
          id="body"
          :placeholder="editItem.desc"
          v-model='itemDesc')
  template(v-slot:actions)
    .flex.bg-white.justify-end.pb-2
      button.bg-blue-500(
        type="submit" form="editForm")
        pencil.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CONFIRM
      button.bg-red-500.mx-4(
        @click='editItem = null; editId = ""')
        close.inline.mr-2.-ml-2.mb-1.text-xl
        .inline CANCEL
</template>

<script lang="ts">
import {getContacts, getProducts} from '@/composables/item'
import {createAlert} from '@/composables/alerts'
import {API, jwtToken} from '@/composables/api'

import {Close, DeleteForever, Pencil, Plus, Send, Upload} from 'mdue'

import Modal from '@/components/Modal.vue'

export default{
  name: "Admin",
  components: {
    Close,
    DeleteForever,
    Pencil,
    Plus,
    Modal,
    Send,
    Upload
  },
  data() {
    return {
      contacts: getContacts(),
      products: getProducts(), 
      jwtToken,

      showAdd: false,
      deleteItem: null,
      deleteType: "",
      editItem: null,
      editId: "",

      itemType: '',
      itemName: '',
      itemImg: '',
      itemContact: '',
      itemDesc: ''
    }
  },
  methods: {
    submitAdd() {
      API.post('/api/addItem', {
        'token': this.jwtToken,
        'productId': this.itemType,
        'name': this.itemName,
        'img': this.itemImg,
        'contact': this.itemContact,
        'desc': this.itemDesc
      }).then((_response) => {
        createAlert('Item Added!', 'success')
        this.cleanup()
      }, (_error) => {
        createAlert('Error Adding Item!', 'error')
      })
    },

    submitDelete(itemId: Text, productType: Text) {
      API.post('/api/deleteItem', {
        'token': this.jwtToken,
        'type': productType,
        'id': itemId,
      }).then((_response) => {
        createAlert('Item Deleted!', 'success')
        this.cleanup()
      }, (_error) => {
        createAlert('Error Deleting Item!', 'error')
      })
    },

    submitEdit() {
      API.post('/api/editItem', {
        'token': this.jwtToken,
        'productId': this.itemType,
        'id': this.editId,
        'name': this.itemName,
        'img': this.itemImg,
        'contact': this.itemContact,
        'desc': this.itemDesc
      }).then((_response) => {
        createAlert('Item Edited!', 'success')
        this.cleanup()
      }, (_error) => {
        createAlert('Error Editing Item!', 'error')
      })
    },

    cleanup() {
      this.products = getProducts()
      this.contacts = getContacts()
      this.itemType = ''
      this.itemName = ''
      this.itemImg = ''
      this.itemContact = ''
      this.itemDesc = ''
      this.editItem = null
      this.editId = ""
      this.showAdd = false
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