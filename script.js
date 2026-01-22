import { toggleSidebar, toggleForm, toggleSwatch } from "./scripts/ui.util.js";
import { storageUtil } from "./scripts/storage.util.js";
import UIcontainers from "./scripts/ui.util.js";
import Book from "./scripts/book.js";

const UIbtns = {
   overlay: document.querySelector(".overlay"),
   sidebarBtns: document.querySelectorAll(".sidebar-btn"),
   modalAddBtn: document.querySelector("#book-navbar-add"),
   modalCloseBtn: document.querySelector("#modal-close"),
   modalCancelBtn: document.querySelector("#modal-cancel"),
   addBook: document.querySelector("#modal-submit"),
};

function generateColor() {
   document.querySelectorAll(".color-swatch").forEach((color) => {
      const bgColor = color.dataset.bg;
      color.style.background = bgColor;
   });
}

function getBookData(formClose) {
   function setData() {
      const bookData = {};
      document.querySelectorAll(".form-input").forEach((input) => {
         bookData[input.name] = input.value;
      });

      document.querySelectorAll(".color-swatch").forEach((swatch) => {
         if (swatch.classList.contains("selected")) {
            bookData["bgColor"] = swatch.dataset.bg;
         }
      });
      return bookData;
   }

   return function () {
      const bookData = setData();
      console.log(bookData);

      const newBook = new Book(
         bookData.title,
         bookData.author,
         bookData.page,
         bookData.category,
         bookData.progress,
         bookData.bgColor,
      );

      storageUtil.set([...storageUtil.get(), newBook]);
      formClose();
   };
}

function generateBookData() {
   UIcontainers.bookContainer.innerHTML = "";
   storageUtil.get().forEach(book => {
      const bookCard = document.createElement("div")
      bookCard.className = "book-card";
      bookCard.innerHTML = 
         `
         <div class="card-top data-id="${book.id}" style="background:${book.coverColor};" >
            <img class="settings edit" src="svg/edit.svg" alt="" />
            <img class="settings delete" src="svg/delete.svg" alt="">
            <div class="badge">${book.genre}</div>
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
               <g transform="translate(50, 50) scale(1.5)">
                  <path d="M 0 -7 v 14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M -9 6 a 1 1 0 0 1 -1 -1 V -8 a 1 1 0 0 1 1 -1 h 5 a 4 4 0 0 1 4 4 a 4 4 0 0 1 4 -4 h 5 a 1 1 0 0 1 1 1 v 13 a 1 1 0 0 1 -1 1 h -6 a 3 3 0 0 0 -3 3 a 3 3 0 0 0 -3 -3 z" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               </g>
            </svg>
         </div>
         <div class="card-bottom">
            <h3 class="book-title">${book.title}</h3>
            <div class="book-meta">
               <img class="book-meta-icon" src="svg/person.svg" alt="" />
               <span class="book-author">${book.author}</span>
               <img class="book-meta-icon" src="svg/page.svg" alt="" />
               <span class="book-pages">${book.page} pages</span>
            </div>
            <div class="progress-section">
               <div class="progress-label">
                  <span>Reading Progress</span>
                  <span> ${book.progress}%</span>
               </div>
               <div class="progress-bar">
                  <div class="progress-fill" style="width: ${book.progress}%"></div>
               </div>
            </div>
         </div>
         `
      UIcontainers.bookContainer.append(bookCard)
   });
}

(function () {
   generateColor();
   generateBookData();

   UIbtns.sidebarBtns.forEach((btns) => btns.addEventListener("click", toggleSidebar));
   UIbtns.modalAddBtn.addEventListener("click", toggleForm);
   UIbtns.modalCloseBtn.addEventListener("click", toggleForm);
   UIbtns.modalCancelBtn.addEventListener("click", toggleForm);
   UIbtns.overlay.addEventListener("click", toggleForm);
   UIbtns.addBook.addEventListener("click", getBookData(toggleForm));
   UIcontainers.colorContainer.addEventListener("click", toggleSwatch);
})();
