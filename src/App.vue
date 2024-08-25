<template>
  <div>
    <Navbar />
    <Footer>
      <router-view />
    </Footer>

    <!-- Conditional HTML Message -->
    <div v-if="showMessage" class="mobile-alert">
      <div class="alert-content">
        <p>This website is not accessible on smartphones.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";
import { onMounted, onBeforeUnmount } from "vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const showMessage = ref(false);

    const checkWindowSize = () => {
      if (window.innerWidth <= 768) {
        showMessage.value = true;
      }
    };

    const closeAlert = () => {
      showMessage.value = false;
    };

    // Lifecycle hook to check window size when component mounts
    onMounted(() => {
      checkWindowSize();
      window.addEventListener("resize", checkWindowSize);
    });

    // Clean up the event listener
    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkWindowSize);
    });

    return {
      showMessage,
      closeAlert,
    };
  },
};
</script>

<style>
/* Style for the mobile alert message */
.mobile-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.alert-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.alert-content p {
  margin: 0 0 20px;
  font-size: 16px;
}

.alert-content button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
