<template>
  <!-- Table Posts -->
  <div>{{ error }}</div>
  <div v-if="posts.length" class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Id</th>
          <th class="py-3 px-6 text-left">Title</th>
          <th class="py-3 px-6 text-left">Body</th>
          <th class="py-3 px-6 text-left">Tags</th>
          <th class="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        <tr
          v-for="(post, index) in posts"
          :key="index"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-left whitespace-nowrap">{{ post.id }}</td>
          <td class="py-3 px-6 text-left">{{ post.title }}</td>
          <td class="py-3 px-6 text-left">{{ post.body }}</td>
          <td class="py-3 px-6 text-left">
            <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
          </td>
          <td class="py-3 px-6 text-center">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none"
              @click="editUser(post.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none ml-2"
              @click="deleteUser(post.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Loading from "../Loading.vue";
import getPosts from "../../composable/getPosts";

export default {
  components: {
    Loading,
  },
  setup() {
    const { posts, error, load } = getPosts();

    load();

    const editPost = (id) => {
      // Handle the edit action here
      console.log(`Edit post with ID: ${id}`);
    };

    const deletePost = (id) => {
      // Handle the delete action here
      console.log(`Delete post with ID: ${id}`);
    };

    return { posts, error, editPost, deletePost };
  },
};
</script>
