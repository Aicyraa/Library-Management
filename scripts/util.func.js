import Book from "./book.js";
import { storageUtil } from "./util.storage.js";

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
         console.log(swatch.dataset.bg);
         bookData["coverColor"] = swatch.dataset.bg;
      }
   });
   return bookData;
}

function setInputData(bookObj){
   const swatches = Array.from(document.querySelectorAll(".color-swatch"))
   const formInputs = document.querySelectorAll(".form-input")
   
   formInputs[0].value = bookObj.title;
   formInputs[1].value = bookObj.category;
   formInputs[2].value = bookObj.author;
   formInputs[3].value = bookObj.totalPage;
   formInputs[4].value = bookObj.currentPage;

   swatches.forEach(swatch => swatch.dataset.bg === bookObj.coverColor ? swatch.classList.add("selected") : swatch.classList.remove("selected") )
}

function saveBookData(closeModal, render) {

   const submitMode = document.querySelector("#modal-submit");

   function insertBook() {
      const newBookData = getInputData();
      const newBook = new Book(newBookData.title, newBookData.category, newBookData.author, newBookData.totalPage, newBookData.currentPage, newBookData.coverColor);
      storageUtil.set([...storageUtil.get(), newBook])
   }

   function updateBook() {
      const newBookData = getInputData();
      const books = storageUtil.get();
      const targetBookIndex = books.findIndex(book => book.id === window.targetEditID);
      
      if (targetBookIndex !== -1) {
         const updatedBook = new Book(
            newBookData.title,
            newBookData.category,
            newBookData.author,
            newBookData.totalPage,
            newBookData.currentPage,
            newBookData.coverColor
         );

         updatedBook.id = books[targetBookIndex].id;
         updatedBook.readInfo = books[targetBookIndex].readInfo;

         books[targetBookIndex] = updatedBook;
         storageUtil.set(books);
         window.targetEditID = null
      }
   }

   return function() {
      const currentFunc = submitMode.dataset.mode === "add" ? insertBook : updateBook;
      currentFunc();
      closeModal();
      render()

   }
}


export { saveBookData, setInputData, modifyBookData };
