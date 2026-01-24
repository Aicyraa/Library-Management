const UIcontainers = {
   overlay: document.querySelector(".overlay"),
   sidebarContainer: document.querySelector("#sidebar-container"),
   modalContainer: document.querySelector("#form-modal"), 
   colorContainer: document.querySelector(".form-colors"),
   bookContainer: document.querySelector(".books"),
};

function toggleSidebar() {
   UIcontainers.sidebarContainer.classList.toggle("closed");
   document.querySelectorAll(".sidebar-btn").forEach((btn) => btn.classList.toggle("closed"));
}

function toggleForm(event) {
   function clearBookData() {
      const formInputs = document.querySelectorAll(".form-input");
      const swatches = document.querySelectorAll(".color-swatch");
      formInputs.forEach((form, index) => index === 1 ? form.value = "Fiction" : form.value = "");
      swatches.forEach((swatch, index) => index === 0 ? swatch.classList.add("selected") : swatch.classList.remove("selected"))
   }
   
   clearBookData();
   const submitBtn = document.querySelector("#modal-submit");   
   
   if (event?.currentTarget?.id == "book-navbar-add") {submitBtn.dataset.mode = "add"}
   else if (event?.currentTarget == undefined) {submitBtn.dataset.mode = "edit"}

   if (submitBtn.dataset.mode == "add") { submitBtn.textContent = "Add Book" }
   else if (submitBtn.dataset.mode == "edit") { submitBtn.textContent = "Update Book" }
   
   UIcontainers.overlay.classList.toggle("active")
   UIcontainers.modalContainer.classList.toggle("active")
}

function toggleSwatch(event) {
   const currentSwatch = event.target;

   if (currentSwatch.classList.contains("color-swatch")) {
      document.querySelectorAll(".color-swatch").forEach(swatch => swatch.classList.remove("selected"))
      currentSwatch.classList.add("selected")
   }
}

// miscellanous container
document.addEventListener("DOMContentLoaded", () => {

   // Close modal on Escape key
   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && UIcontainers.modalContainer.classList.contains("active")) { toggleForm();}
   });

   // close the modal when in mobile viewport
   if (window.innerWidth <= 768) {
      UIcontainers.sidebarContainer.classList.add("closed");
      document.querySelectorAll(".sidebar-btn").forEach((btn) => btn.classList.add("closed"));
   }

});

export default UIcontainers
export {toggleSidebar, toggleForm, toggleSwatch };
