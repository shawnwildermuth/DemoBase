import axios from "axios";
import { reactive, ref } from "vue";
import { LibraryResult, Work } from "./models";

export const busy = ref(false);

export const categories = [
 { name: "Love", param: "love" }, 
 { name: "Science Fiction", param: "science_fiction" }, 
 { name: "Science", param: "science" }, 
 { name: "Fantasy", param: "fantasy" }, 
];

export const works = reactive(new Array<Work>());

export async function clearBooks() {
  works.splice(0, works.length);
}

export async function loadBooks(category: string) {
  const index = categories.findIndex(i => i.name === category);
  if (index === -1) {
    throw "Invalid Category";
  } 
  busy.value = true;
  try {
    const url = `http://openlibrary.org/subjects/${categories[index].param}.json?details=true`;
    const result = await axios.get<LibraryResult>(url);
    works.splice(0, works.length, ...result.data.works);
    return true;  
  } catch {
    return false;
  } finally {
    busy.value = false;
  }
}

