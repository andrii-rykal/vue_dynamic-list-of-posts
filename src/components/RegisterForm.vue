<script setup>
import { ref, watch } from "vue";
import InputName from "./InputName.vue";

const emit = defineEmits(["getEmail", "register", "getPosts"]);
const { isNotRegister } = defineProps({
  user: Object,
  isNotRegister: Boolean,
});

const inputEmail = ref("");
const inputName = ref("");
const emailError = ref("");
const nameError = ref("");

watch(inputEmail, (newEmail) => {
  emailError.value = "";
});

watch(inputName, (newName) => {
  nameError.value = "";
});

const validateEmail = () => {
  if (!inputEmail.value.trim()) {
    emailError.value = "Email is required.";
    return false;
  }
  const emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)+[\w-]{2,66})$/i;

  if (!emailPattern.test(inputEmail.value)) {
    emailError.value = "Invalid email format.";
    return false;
  }
  emailError.value = "";
  return true;
};

const validateName = () => {
  if (!inputName.value.trim()) {
    nameError.value = "Name is required.";
    return false;
  }
  if (inputName.value.length < 4) {
    nameError.value = "Name must be at least 4 characters.";
    return false;
  }
  nameError.value = "";
  return true;
};

const handleSubmit = () => {
  if (!validateEmail()) {
    return;
  }

  if (!isNotRegister) {
    emit("getEmail", inputEmail.value);
    // emit("getPosts");
  } else {
    if (!validateName()) {
      return;
    }
    emit("register", inputName.value);
  }
};
</script>

<template>
  <section class="container is-flex is-justify-content-center">
    <form @submit.prevent="handleSubmit" class="box mt-5">
      <h1 class="title is-3">
        {{ isNotRegister ? "You need to register" : "Get your userId" }}
      </h1>

      <div class="field">
        <label class="label" htmlFor="user-email"> Email </label>

        <div class="control has-icons-left">
          <input
            v-model="inputEmail"
            type="text"
            id="user-email"
            name="email"
            class="input"
            :class="{ 'is-danger': emailError }"
            placeholder="Enter your email"
            :disabled="isNotRegister"
          />

          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>

        <p v-if="emailError" class="help is-danger">{{ emailError }}</p>
      </div>

      <InputName
        v-if="isNotRegister"
        :isNotRegister="isNotRegister"
        :errorMessage="nameError"
        @name="inputName = $event"
      />

      <div class="field">
        <button type="submit" class="button is-primary">
          {{ isNotRegister ? "Register" : "Login" }}
        </button>
      </div>
    </form>
  </section>
</template>

<style></style>
