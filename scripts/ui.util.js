const UIcontainers = {
   overlay: document.querySelector(".overlay"),
   sidebarContainer: document.querySelector("#sidebar-container"),
   modalContainer: document.querySelector("#form-modal"), 
};

function toggleSidebar() {
   UIcontainers.sidebarContainer.classList.toggle("closed");
   document.querySelectorAll(".sidebar-btn").forEach((btn) => btn.classList.toggle("closed"));
}

function toggleForm() {
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
   // window related
   if (window.innerWidth <= 768) {
      UIcontainers.sidebarContainer.classList.add("closed");
      document.querySelectorAll(".sidebar-btn").forEach((btn) => btn.classList.add("closed"));
   }

   // Close modal on Escape key
   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && UIcontainers.modalContainer.classList.contains("active")) { toggleForm();}
   });
});

export { toggleSidebar, toggleForm };
