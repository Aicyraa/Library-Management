const storageUtil = {
   get: function() {
      return JSON.parse(localStorage.getItem("books"))
   },

   set: function(books) {
      return localStorage.setItem("books", JSON.stringify(books));
   }
}

export {
   storageUtil,
}
