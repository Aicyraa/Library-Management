import { toggleSidebar, toggleForm, toggleSwatch } from "./scripts/ui.util.js";
import { storageUtil } from "./scripts/storage.util.js";
import UIcontainers from "./scripts/ui.util.js";
import Book from "./scripts/book.js";

const UIbtns = {
   overlay: document.querySelector(".overlay"),
   sidebarBtns: document.querySelectorAll('.sidebar-btn'),
   modalAddBtn: document.querySelector('#book-navbar-add'),
   modalCloseBtn: document.querySelector("#modal-close"),
   modalCancelBtn: document.querySelector("#modal-cancel"),
   addBook: document.querySelector("#modal-submit"),
};

function generateColor() {
   document.querySelectorAll(".color-swatch").forEach(color => {
      console.log(color);
      
      const bgColor = color.dataset.bg
      color.style.background = bgColor;
   })
}


function getBookData(formClose) {
   
   function setData() {
      const bookData = {};
      document.querySelectorAll(".form-input").forEach(input => {
         bookData[input.name] = input.value;
      })

      document.querySelectorAll(".color-swatch").forEach(swatch => {
         if (swatch.classList.contains("selected")) {
            bookData["bgColor"] = swatch.dataset.bg;
         }
      })
      return bookData
   }

   return function() {
      const bookData = setData();


      formClose()
   }
}

function generateBookData () {

}



(function(){
   generateColor();

   UIbtns.sidebarBtns.forEach(btns => btns.addEventListener("click", toggleSidebar));
   UIbtns.modalAddBtn.addEventListener("click", toggleForm)
   UIbtns.modalCloseBtn.addEventListener("click", toggleForm)
   UIbtns.modalCancelBtn.addEventListener("click", toggleForm)
   UIbtns.overlay.addEventListener("click", toggleForm)
   UIbtns.addBook.addEventListener("click", getBookData(toggleForm))
   UIcontainers.colorContainer.addEventListener("click", toggleSwatch)
   

})();