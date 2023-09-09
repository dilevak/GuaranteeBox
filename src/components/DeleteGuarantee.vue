<template>
  <div>
    <!--Prikazi confirm dialog-->
    <div v-if="showDialog" class="confirmation-dialog">
      <p>Are you sure you want to delete this guarantee?</p>
      <button @click="confirmDelete">Confirm Delete</button>
      <button @click="cancelDelete">Cancel</button>
    </div>
    <button @click="openDialog">Delete</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    openDialog() {
      //Prikazi confirmation dialog
      this.showDialog = true;
    },
    confirmDelete() {
      this.$emit('deleteClicked');
      //this.$emit('deleteGuaranteeConfirmed');
      //Sakrij confirmation dialog
      this.showDialog = false;
    },
    cancelDelete() {
      //Sakrij confirmation dialog ako korisnik cancelira
      this.showDialog = false;
    },
  },
};
</script>
