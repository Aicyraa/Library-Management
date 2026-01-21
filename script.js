document.addEventListener('DOMContentLoaded', () => {
   const sidebarBtns = document.querySelectorAll('.sidebar-btn');
   const sidebarContainer = document.getElementById('sidebar-container');

   // Function to sync all buttons
   function toggleSidebar() {
      sidebarContainer.classList.toggle('closed');
      sidebarBtns.forEach(btn => btn.classList.toggle('closed'));
   }

   // Initialize for mobile
   if (window.innerWidth <= 768) {
      sidebarContainer.classList.add('closed');
      sidebarBtns.forEach(btn => btn.classList.add('closed'));
   }

   // Add event listeners
   sidebarBtns.forEach(btn => {
      btn.addEventListener('click', toggleSidebar);
   });
});
