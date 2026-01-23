import Book from "./book.js";
import { storageUtil } from "./storage.util.js";

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

function saveBookData(formClose, render) {
   return function () {
      const bookData = getInputData();
      const newBook = new Book(bookData.title, bookData.category, bookData.author,bookData.page, bookData.progress, bookData.bgColor,);
      storageUtil.set([...storageUtil.get(), newBook]);
      render()
      formClose();
   };
}

function modifyBook(remove, edit) {
   return function (event) {
      const target = event.target;
      const parent = target.closest(".book-card")

      if (target.classList.contains("edit")) edit(parent);
      else if (target.classList.contains("delete")) remove(parent);
   };
}

export { saveBookData, setInputData, modifyBook };
