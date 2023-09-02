<template>
  <div class="add-guarantee-receipt">
    <h3>Add Guarantee and Receipt</h3>
    <form @submit.prevent="addGuaranteeReceipt">
      <label>Name</label>
      <input v-model="name" required />

      <label>Expire Date</label>
      <input type="date" v-model="expireDate" required />

      <label>Guarantee Picture</label>
      <input type="file" @change="uploadGuaranteePicture" required />

      <label>Receipt Picture</label>
      <input type="file" @change="uploadReceiptPicture" required />

      <button type="submit">Add</button>
      <button @click="closeForm">Close</button>
    </form>
  </div>
</template>

<script>
import { db, storage } from '@/firebase';

export default {
  name: 'AddGuaranteeReceipt',
  data() {
    return {
      name: '',
      expireDate: '',
      guaranteePicture: null,
      receiptPicture: null,
      isAdding: false,
    };
  },
  methods: {
    async addGuaranteeReceipt() {
      let addedDocument; // Declare the variable here
      try {
        if (!this.guaranteePicture || !this.receiptPicture) {
          console.error('Guarantee or receipt picture is missing.');
          return;
        }

        //Uplodanje slike garancije u Firebase Storage
        const guaranteePictureRef = storage
          .ref('guaranteePictures')
          .child(this.guaranteePicture.name);
        await guaranteePictureRef.put(this.guaranteePicture);
        const guaranteePictureURL = await guaranteePictureRef.getDownloadURL();
        //URL dodane slike garancije
        console.log('Guarantee picture URL:', guaranteePictureURL);

        //Uploadanje slike racuna u Firebase Storage
        const receiptPictureRef = storage
          .ref('receiptPictures')
          .child(this.receiptPicture.name);
        await receiptPictureRef.put(this.receiptPicture);
        const receiptPictureURL = await receiptPictureRef.getDownloadURL();
        //URL dodane slike racuna
        console.log('Receipt picture URL:', receiptPictureURL);


        //Kreiranje novog dokumenta u guarantees kolekciji
        addedDocument = await db.collection('guarantees').add({
          name: this.name,
          expireDate: this.expireDate,
          guaranteePicture: guaranteePictureURL,
          receiptPicture: receiptPictureURL,
        });

        //ID dodanog dokumenta
        console.log('Added document with ID:', addedDocument.id); 

        //Resetiranje polja
        this.name = '';
        this.expireDate = '';
        this.guaranteePicture = null;
        this.receiptPicture = null;

        //Zatvaranje forme
        this.isAdding = false;
        this.$emit('guaranteeReceiptAdded');
      } catch (error) {
        console.error('Error adding guarantee receipt:', error);
        //hendlanje erora
      }
      if (addedDocument) {
        console.log('Added document with ID:', addedDocument.id);
        } else {
          //nesto
        }
    },
    uploadGuaranteePicture(event) {
      this.guaranteePicture = event.target.files[0];
    },
    uploadReceiptPicture(event) {
      this.receiptPicture = event.target.files[0];
    },
    closeForm() {
      //Dogadjaj za zatvaranje forme kod uspjenog dodavanja
      this.$emit('closeAddForm');
    },
  },
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
