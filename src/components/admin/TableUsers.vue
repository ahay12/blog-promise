<template>
  <!-- Table Users -->
  <div>{{ error }}</div>
  <div v-if="users.length" class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Id</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-left">Role</th>
          <th class="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        <tr
          v-for="(user, index) in users"
          :key="index"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-left whitespace-nowrap">{{ user.id }}</td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-left">{{ user.role }}</td>
          <td class="py-3 px-6 text-center">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none"
              @click="editUser(user.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none ml-2"
              @click="deleteUser(user.id)"
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
import getUsers from "../../composable/getUsers";

export default {
  setup() {
    const { users, error, load } = getUsers();

    load();

    const editUser = (id) => {
      // Handle the edit action here
      console.log(`Edit user with ID: ${id}`);
    };

    const deleteUser = (id) => {
      // Handle the delete action here
      console.log(`Delete user with ID: ${id}`);
    };

    return { users, editUser, deleteUser };
  },
};
</script>
