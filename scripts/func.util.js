import Book from "./book.js";
import { storageUtil } from "./storage.util.js";

function modifyBookData(remove, edit) {
   return function (event) {
      const target = event.target;
      const parent = target.closest(".book-card")

      if (target.classList.contains("edit")) edit(parent);
      else if (target.classList.contains("delete")) remove(parent);
   };
}

function getInputData() {
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

function setInputData(bookObj){
   const bookData = Object.values(bookObj);
   const swatches = Array.from(document.querySelectorAll(".color-swatch"))
   const formInputs = document.querySelectorAll(".form-input")

   for(let i = 0; i < bookData.length - 3; i++) { formInputs[i].value = bookData[i]}
   swatches.forEach(swatch => swatch.dataset.bg === bookObj.coverColor ? swatch.classList.add("selected") : swatch.classList.remove("selected") )
}

function saveBookData(closeModal, render) {

   const submitMode = document.querySelector("#modal-submit");

   function insertBook() {
      const newBookData = getInputData();
      const newBook = new Book(newBookData.title, newBookData.category, newBookData.author, newBookData.page, newBookData.progress, newBookData.bgColor);
      storageUtil.set([...storageUtil.get(), newBook])
   }

   function updateBook() {
      submitMode.dataset.mode = "add"
      const newBookData = getInputData();
      // get the target element and replace its value with the new one
      // const currentBookData = 
   }

   return function() {
      const currentFunc = submitMode.dataset.mode === "add" ? insertBook : updateBook;
      currentFunc();
      closeModal();
      render()

   }
}


export { saveBookData, setInputData, modifyBookData };
