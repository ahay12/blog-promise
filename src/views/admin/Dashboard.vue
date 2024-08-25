<template>
  <div class="flex">
    <SideBar @tab-changed="handleTabChange" />
    <div class="flex-1 p-4">
      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import Posts from "../../components/admin/Posts.vue";
import SideBar from "../../components/admin/SideBar.vue";
import TableUsers from "../../components/admin/TableUsers.vue";
import CreatePost from "../../components/admin/CreatePost.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  components: {
    TableUsers,
    SideBar,
    Posts,
    CreatePost,
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
  data() {
    return {
      currentTab: "table", // Default tab
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.currentTab) {
        case "posts":
          return Posts;
        case "users":
          return TableUsers;
        case "create":
          return CreatePost;
        default:
          return null;
      }
    },
  },
  methods: {
    handleTabChange(tab) {
      this.currentTab = tab;
    },
  },
};
</script>
