<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post">
    <section class="p-8">
      <div class="mx-auto max-w-screen-md">
        <img
          src="https://www.material-tailwind.com/img/content2.jpg"
          alt="team work"
          class="mb-4 h-[28rem] w-full rounded-xl object-cover"
        />
        <p
          class="inline-block antialiased font-sans text-sm font-light leading-normal text-inherit font-medium !text-blue-500"
          v-for="tag in post.tags"
          :key="tag"
        >
          #{{ tag }}&nbsp;
        </p>
        <h2
          class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 my-4 font-black text-4xl !leading-snug"
        >
          {{ post.title }}
        </h2>
        <p
          class="block antialiased font-sans text-base font-light leading-relaxed text-inherit font-normal !text-gray-500"
        >
          {{ post.body }}
        </p>
      </div>
    </section>
  </div>
  <div v-else class="loading-container">
    <Loading />
  </div>
</template>

<script>
import Loading from "../../components/Loading.vue";
import getPost from "../../composable/getPost";

export default {
  name: "ShowPost",
  props: ["id"],
  components: {
    Loading,
  },
  setup(props) {
    const { post, error, load } = getPost(props.id);

    load();

    return { post, error };
  },
};
</script>

<style>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}
.tag {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  background-color: #f1f1f1;
  border-radius: 5px;
}
</style>
