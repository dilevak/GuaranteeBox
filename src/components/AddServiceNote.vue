<template>
    <div>
      <textarea v-model="serviceNote" rows="4" cols="50" placeholder="Add service note"></textarea>
      <button @click="saveServiceNote">Save Service Note</button>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  
  export default {
    props: {
      guarantee: Object, //Odabrana garancija
    },
    data() {
      return {
        serviceNote: '', //Input polje za service note
      };
    },
    methods: {
      async saveServiceNote() {
        try {
        
          console.log('Spremanje service note-a');
        
          //Updateaj Firestore sa service note-om
          await db.collection('guarantees').doc(this.guarantee.id).update({
            serviceNote: this.serviceNote,
          });
          console.log('Servicenote SPREMLJEN!!');

          //Ocisti input polje
          this.serviceNote = '';
  
          // You can also emit an event to notify the parent component
          // that the service note has been added.
          this.$emit('serviceNoteAdded');
  
        } catch (error) {
          console.error('Error saving service note:', error);
        }
      },
    },
  };
  </script>
  