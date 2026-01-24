const storageUtil = {
   get: function() {
      let raw = localStorage.getItem("books") 
      return raw == null ? [] : JSON.parse(raw);  
   },

   set: function(books) {
      return localStorage.setItem("books", JSON.stringify(books));
   }
}

export {
   storageUtil,
}
