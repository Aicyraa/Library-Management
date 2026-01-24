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

function toggleForm() {
   
   function clearBookData() {
      const formInputs = document.querySelectorAll(".form-input");
      const swacthes = document.querySelectorAll(".color-swatch");
      debugger
      formInputs.forEach((form, index) => index === 1 ? form.value = "Fiction" : form.value = "");
      swacthes.forEach((swatch, index) => index === 0 ? swatch.classList.add("selected") : swatch.classList.remove("selected"))
   }

   console.log("Calling");
   clearBookData();
   const submitBtn = document.querySelector("#modal-submit");
   if (submitBtn.dataset.mode == "add") submitBtn.textContent = "Add Book"
   else if (submitBtn.dataset.mode == "edit") submitBtn.textContent = "Update Book"
   
   UIcontainers.overlay.classList.toggle("active")
   UIcontainers.modalContainer.classList.toggle("active")
}

function toggleSwatch(event) {
   document.querySelectorAll(".color-swatch").forEach(swatch => swatch.classList.remove("selected"))
   const currentSwatch = event.target;
   if (currentSwatch.classList.contains("color-swatch")) {
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
