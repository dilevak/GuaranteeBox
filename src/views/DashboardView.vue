<template>
  <div class="dashboard-view">
    <div class="dashboard">
      <img alt="GuaranteeBox Logo" src="../assets/GuaranteeBox_Logo.png">
    </div>
    <div>
      <h2>Welcome to GuaranteeBox</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
};
</script>

<style scoped>
.dashboard-view {
  background-color: #471AA1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dashboard-view h2 {
  color: white;
}
</style>