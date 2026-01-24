import { storageUtil } from "./util.storage.js";

/**
 * Creates a search handler that filters books by title or author
 * @param {Function} renderFn - Function to render the filtered books
 * @returns {Function} Event handler for search input
 */
function bookSearch(renderFn) {
   return function(e) {
      const query = e.target.value.toLowerCase().trim();
      const books = storageUtil.get();

      if (!query) {
         renderFn(books);
         return;
      }

      const filtered = books.filter(book =>
         book.title.toLowerCase().includes(query) ||
         book.author.toLowerCase().includes(query)
      );

      renderFn(filtered);
   };
}

/**
 * Creates an arrange handler that sorts books and updates localStorage
 * @param {Function} renderFn - Function to render the arranged books
 * @returns {Function} Event handler for select change
 */
function bookArrange(renderFn) {
   return function(e) {
      const sortBy = e.target.value;
      const books = storageUtil.get();

      let arranged;
      switch (sortBy) {
         case "title":
            arranged = books.sort((a, b) => a.title.localeCompare(b.title));
            break;
         case "title-z":
            arranged = books.sort((a, b) => b.title.localeCompare(a.title));
            break;
         case "newest":
            arranged = books.sort((a, b) => {
               const dateA = a.readInfo?.readDates?.[0] || 0;
               const dateB = b.readInfo?.readDates?.[0] || 0;
               return new Date(dateB) - new Date(dateA);
            });
            break;
         case "progress":
            arranged = books.sort((a, b) => b.progress - a.progress);
            break;
         case "progress-asc":
            arranged = books.sort((a, b) => a.progress - b.progress);
            break;
         default:
            arranged = books;
      }

      storageUtil.set(arranged);
      renderFn(arranged);
   };
}

/**
 * Creates a category filter handler using event delegation
 * @param {Function} renderFn - Function to render the filtered books
 * @returns {Function} Event handler for category checkbox clicks
 */
function bookSort(renderFn) {
   return function(e) {
      const target = e.target;

      if (!target.classList.contains("category")) return;

      const parent = e.currentTarget;
      const checkboxes = parent.querySelectorAll(".category");
      const allCheckbox = checkboxes[0];

      // Handle "All" checkbox logic
      if (target === allCheckbox) {
         if (target.checked) {
            checkboxes.forEach((cb, i) => {
               if (i !== 0) cb.checked = false;
            });
         }
      } else {
         // Uncheck "All" when any specific category is checked
         if (target.checked) {
            allCheckbox.checked = false;
         }

         // If no category is checked, check "All"
         const anyChecked = Array.from(checkboxes).slice(1).some(cb => cb.checked);
         if (!anyChecked) {
            allCheckbox.checked = true;
         }
      }

      const books = storageUtil.get();

      // If "All" is checked, show all books
      if (allCheckbox.checked) {
         renderFn(books);
         return;
      }

      // Get selected categories
      const selectedCategories = Array.from(checkboxes)
         .filter(cb => cb.checked)
         .map(cb => cb.nextElementSibling.textContent.trim());

      const filtered = books.filter(book =>
         selectedCategories.includes(book.category)
      );

      renderFn(filtered);
   };
}

export { bookSearch, bookArrange, bookSort };
