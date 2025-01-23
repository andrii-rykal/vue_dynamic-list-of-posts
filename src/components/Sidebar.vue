<script setup>
import NoCommentsYet from "./NoCommentsYet.vue";
import PostPreview from "./PostPreview.vue";
import WriteCommentBtn from "./WriteCommentBtn.vue";

const props = defineProps({
  post: Object,
  isOpened: Boolean,
})

// отримати коменти



</script>

<template>
  <div class="tile is-parent is-8-desktop Sidebar " :class="{'Sidebar--open': isOpened}">
    <div class="tile is-child box is-success ">
      <div class="content">
        <PostPreview :post="post" />
        <!-- <div class="block"> -->
        <NoCommentsYet />
        <WriteCommentBtn />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Sidebar {
  overflow: hidden;
  opacity: 0;
  transition-property: max-width, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  @media (min-width: 769px) {
    max-width: 0;
  }
}

.Sidebar--open {
  opacity: 1;

  @media (min-width: 769px) {
    max-width: 50%;
  }
}
</style>
