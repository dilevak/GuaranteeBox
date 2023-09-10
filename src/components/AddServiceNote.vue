<template>
    <div>
      <textarea v-model="serviceNote" rows="4" cols="50" placeholder="Add service note"></textarea>
      <button @click="saveServiceNote">Save Service Note</button>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  
  export default {
    props: {
      guarantee: Object,
 
    },
    data() {
      return {
        serviceNote: '',
        successMessage: '',
      };
    },
    methods: {
      async saveServiceNote() {
  try {
    console.log('Spremanje service note-a');
    console.log('GARANCIJA provjera:', this.guarantee.name);

    if (this.guarantee && typeof this.serviceNote === 'string') { //Provjera ako je this.serviceNote string
      const guaranteeRef = db.collection('guarantees').doc(this.guarantee.id);
      await guaranteeRef.update({
        serviceNote: this.serviceNote,
      });
      console.log('Service note added to Firestore document.');
      this.successMessage = 'Service note added successfully'; //spremi poruku za prikaz korisniku
      this.$emit('serviceNoteAdded'); //Emitaj event da serviceNote nije dodan

      this.serviceNote = ''; //ocisti input field

    } else {
      console.error('Invalid guarantee or service note.');
    }
  } catch (error) {
    console.error('Error saving service note:', error);
  }
},

    },
  };
  </script>