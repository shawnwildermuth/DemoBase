<template>
  <div>
    <div>
      Category:
      <select
        @change="onCategoryChange($event)"
        class="bg-white border border-zinc-300 hover:border-zinc-600 rounded p-1 focus:outline-none focus:shadow-outline"
      >
        <option>Select One...</option>
        <option v-for="c in categories" :key="c.name">{{ c.name }}</option>
      </select>
      <div v-if="busy">Loading...</div>
      <div v-if="!busy" class="flex flex-wrap">
        <div v-for="w in works" :key="w.key" class="m-1">
          <img class="w-24 md:w-36 lg:w-48 xl:w-60" :src="`https://covers.openlibrary.org/b/id/${ w.cover_id }-M.jpg`" alt="{{ w.title }}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { categories, clearBooks, loadBooks, works, busy } from "../library";

export default defineComponent({
  name: "book-list",
  setup() {
    async function onCategoryChange(eventSource: Event) {
      if (eventSource) {
        const newCategory = eventSource.target.value;
        if (newCategory === "Select One...") {
          clearBooks();
        } else {
          await loadBooks(newCategory);
        }
      }
    }

    return {
      categories,
      works,
      onCategoryChange,
      busy
    };
  },
});
</script>
