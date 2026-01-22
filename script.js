import { toggleSidebar, toggleForm } from "./scripts/ui.util.js";
import { storageUtil } from "./scripts/storage.util.js";
import Book from "./scripts/book.js";

const UIbtns = {
   overlay: document.querySelector(".overlay"),
   sidebarBtns: document.querySelectorAll('.sidebar-btn'),
   modalAddBtn: document.querySelector('#book-navbar-add'),
   modalCloseBtn: document.querySelector("#modal-close"),
   modalCancelBtn: document.querySelector("#modal-cancel"),
   addBook: document.querySelector("#modal-submit"),
};

function getBookData(formClose) {
   
   function setData() {
      const bookData = {};
      document.querySelectorAll(".form-input").forEach(input => {
         bookData[input.name] = input.value;
      })
      return bookData
   }

   // func for handling generating the color from data-bg
   // func for adding "selected" for the bg

   return function() {
      const bookData = setData();


      formClose()
   }
}

function generateBookData () {

}



(function(){
   UIbtns.sidebarBtns.forEach(btns => btns.addEventListener("click", toggleSidebar));
   UIbtns.modalAddBtn.addEventListener("click", toggleForm)
   UIbtns.modalCloseBtn.addEventListener("click", toggleForm)
   UIbtns.modalCancelBtn.addEventListener("click", toggleForm)
   UIbtns.overlay.addEventListener("click", toggleForm)
   UIbtns.addBook.addEventListener("click", getBookData(toggleForm))

})();