<template>
  <div class="container mx-auto px-4 h-screen bg-white font-serif">
    <h1>Book Lister</h1>
    <book-list></book-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BookList from "./components/bookList.vue";

export default defineComponent({
  components: { BookList }
});
</script>
