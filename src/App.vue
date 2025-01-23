<script setup>
import { ref } from "vue";
import { createUser, getUser } from "./api/users";
import RegisterForm from "./components/RegisterForm.vue";
import Header from "./components/Header.vue";
import PostList from "./components/PostList.vue";
import { getPosts } from "./api/posts";

const user = ref(null);
const email = ref("");
const name = ref("");
const posts = ref([]);
const isNotRegister = ref(false);

console.log(user);

const handleGetEmail = (userEmail) => {
  email.value = userEmail;

  getUser(userEmail).then((fetchedUser) => {
    if (fetchedUser) {
      user.value = fetchedUser;
      getPosts(user.value.id).then(({ data }) => {
        posts.value = data;
      });
      isNotRegister.value = false;
    } else {
      user.value = null;
      posts.value = [];
      isNotRegister.value = true;
    }
  });
};

const handleRegister = (userName) => {
  name.value = userName;
  createUser(email.value, name.value)
    .then(() => {
      return getUser(email.value);
    })
    .then((createdUser) => {
      user.value = createdUser;
      isNotRegister.value = false;
    });
};
</script>

<template>
  <RegisterForm
    v-if="!user"
    @get-email="handleGetEmail"
    @register="handleRegister"
    :is-not-register="isNotRegister"
    :user="user"
  />
  <Header v-if="user" :user="user" @logout="user = null" />
  <main v-if="user" class="section">
    <PostList :posts="posts" />
  </main>
</template>

<style></style>
