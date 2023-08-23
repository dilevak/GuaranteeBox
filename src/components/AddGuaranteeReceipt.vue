<template>
    <div class="add-guarantee-receipt">
      <h3>Add Guarantee and Receipt</h3>
      <form @submit.prevent="addGuaranteeReceipt">
        <label>Name</label>
        <input v-model="name" required>
  
        <label>Expire Date</label>
        <input type="date" v-model="expireDate" required>
  
        <label>Guarantee Picture</label>
        <input type="file" @change="uploadGuaranteePicture" required>
  
        <label>Receipt Picture</label>
        <input type="file" @change="uploadReceiptPicture" required>
  
        <button type="submit">Add</button>
        <button @click="closeForm">Close</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddGuaranteeReceipt',
    data() {
      return {
        name: '',
        expireDate: '',
        guaranteePicture: null,
        receiptPicture: null,
        isAdding: false,
        addedItems: [] //Za spremanje garancija i racuna
      };
    },
    methods: {
      addGuaranteeReceipt() {
        //Dodavanje itema
        const addedItem = {
          name: this.name,
          expireDate: this.expireDate,
          guaranteePicture: this.guaranteePicture,
          receiptPicture: this.receiptPicture
        };
  
        this.addedItems.push(addedItem);
  
        //Resetiranje polja
        this.name = '';
        this.expireDate = '';
        this.guaranteePicture = null;
        this.receiptPicture = null;
  
        this.isAdding = false;
      },
      uploadGuaranteePicture(event) {
        this.guaranteePicture = event.target.files[0];
      },
      uploadReceiptPicture(event) {
        this.receiptPicture = event.target.files[0];
      },
      closeForm() {
        this.$emit('closeAddForm');
      }
    }
  };
  </script>
  
<style scoped>
.add-guarantee-receipt {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}
</style>