<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";

const props = defineProps({
  posts: Array,
});

const isOpenedSidebar = ref(false);
const currentPost = ref(null);

const handleClick = (post) => {
  if (isOpenedSidebar.value && currentPost.value.id === post.id) {
    isOpenedSidebar.value = false;
    currentPost.value = post;
  } else {
    isOpenedSidebar.value = true;
    currentPost.value = post;
  }
};
</script>

<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box is-success">
          <div class="block">
            <div class="block is-flex is-justify-content-space-between">
              <p class="title">Posts</p>
              <button type="button" class="button is-link">Add New Post</button>
            </div>

            <h3 v-if="!posts.length" class="has-text-centered mt-2">
              No posts yet.
            </h3>

            <table
              v-else
              class="table is-fullwidth is-striped is-hoverable is-narrow"
            >
              <thead>
                <tr class="has-background-link-light">
                  <th>ID</th>
                  <th>Title</th>
                  <th class="has-text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in props.posts" :key="post.id">
                  <td>{{ post.id }}</td>
                  <td>{{ post.title }}</td>
                  <td class="has-text-right is-vcentered">
                    <button
                      type="button"
                      class="button is-link"
                      @click="handleClick(post)"
                    >
                      {{
                        isOpenedSidebar && currentPost.id === post.id
                          ? "Close"
                          : "Open"
                      }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Sidebar :isOpened="isOpenedSidebar" :post="currentPost" />
    </div>
  </div>
</template>
