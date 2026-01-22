import { toggleSidebar, toggleForm } from "./scripts/ui.util.js";

const UIbtns = {
   overlay: document.querySelector(".overlay"),
   sidebarBtns: document.querySelectorAll('.sidebar-btn'),
   modalAddBtn: document.getElementById('book-navbar-add'),
   modalCloseBtn: document.getElementById("modal-close"),
   modalCancelBtn: document.getElementById("modal-cancel"),

};

(function(){
   UIbtns.sidebarBtns.forEach(btns => btns.addEventListener("click", toggleSidebar));
   UIbtns.modalAddBtn.addEventListener("click", toggleForm)
   UIbtns.modalCloseBtn.addEventListener("click", toggleForm)
   UIbtns.modalCancelBtn.addEventListener("click", toggleForm)
   UIbtns.overlay.addEventListener("click", toggleForm)

})();