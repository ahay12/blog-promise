<template>
  <title>Home</title>
  <div class="flex items-center justify-center pt-10 pb-20">Hot Article</div>
  <div class="container">
    <div class="flex items-center justify-center min-h-screen">
      <div>{{ error }}</div>
      <div v-if="posts.length">
        <PostList :posts="posts" />
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import PostList from "../components/PostList.vue";
import getPosts from "../composable/getPosts";

export default {
  name: "HomeView",
  components: {
    PostList,
    Loading,
  },
  setup() {
    const { posts, error, load } = getPosts();

    load();

    return { posts, error };
  },
};
</script>
