<template>
    <div class="delete-guarantee">
      <h3>Delete Guarantee</h3>
      <p>Are you sure you want to delete this guarantee?</p>
      <button @click="confirmDelete">Yes</button>
      <button @click="cancelDelete">No</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteGuarantee',
    methods: {
      confirmDelete() {
        
        this.$emit('deleteGuaranteeConfirmed');
      },
      cancelDelete() {
        
        this.$emit('cancelDelete');
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  