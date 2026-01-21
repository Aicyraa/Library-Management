document.addEventListener('DOMContentLoaded', () => {
   // ====================
   // Sidebar Toggle Logic
   // ====================
   const sidebarBtns = document.querySelectorAll('.sidebar-btn');
   const sidebarContainer = document.getElementById('sidebar-container');

   function toggleSidebar() {
      sidebarContainer.classList.toggle('closed');
      sidebarBtns.forEach(btn => btn.classList.toggle('closed'));
   }

   // Initialize for mobile
   if (window.innerWidth <= 768) {
      sidebarContainer.classList.add('closed');
      sidebarBtns.forEach(btn => btn.classList.add('closed'));
   }

   sidebarBtns.forEach(btn => {
      btn.addEventListener('click', toggleSidebar);
   });

   // ====================
   // Modal Logic
   // ====================
   const modal = document.getElementById('form-modal');
   const overlay = document.getElementById('modal-overlay');
   const addBookBtn = document.getElementById('book-navbar-add');
   const closeModalBtn = document.getElementById('modal-close');
   const cancelModalBtn = document.getElementById('modal-cancel');
   const colorSwatches = document.querySelectorAll('.color-swatch');

   // Open modal
   function openModal() {
      modal.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
   }

   // Close modal
   function closeModal() {
      modal.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
   }

   // Event listeners for modal
   if (addBookBtn) {
      addBookBtn.addEventListener('click', openModal);
   }

   if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
   }

   if (cancelModalBtn) {
      cancelModalBtn.addEventListener('click', closeModal);
   }

   // Close modal when clicking overlay
   if (overlay) {
      overlay.addEventListener('click', closeModal);
   }

   // Close modal on Escape key
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
         closeModal();
      }
   });

   // ====================
   // Color Swatch Selection
   // ====================
   colorSwatches.forEach(swatch => {
      // Apply the gradient background from data-bg
      const gradient = swatch.getAttribute('data-bg');
      if (gradient) {
         swatch.style.background = gradient;
      }

      // Handle click for selection
      swatch.addEventListener('click', () => {
         // Remove active from all swatches
         colorSwatches.forEach(s => s.classList.remove('active'));
         // Add active to clicked swatch
         swatch.classList.add('active');
      });
   });

   // Expose functions globally if needed
   window.openModal = openModal;
   window.closeModal = closeModal;
});
