<template>
  <div class="dashboard-view">
    <div class="dashboard">
      <Slide noOverlay>
      <a id="home" href="#">
        <span>Home</span>
      </a>
    </Slide>
      <img alt="GuaranteeBox Logo" src="../assets/GuaranteeBox_Logo.png">
    </div>
    <div>
      <h2>Welcome to GuaranteeBox</h2>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue3-burger-menu';


export default {
  name: 'DashboardView',
  components: {
    Slide,
  },
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