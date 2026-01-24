function debounce(func, ms) {
   let id;
   return function (...args) {
      clearTimeout(id);
      id = setTimeout(() => {
         func.apply(this, args);
      }, ms);
   };
}

function throttle(func, ms) {
   let isWaiting = false;
   let previousArgs;

   return function (...args) {
      if (isWaiting) {
         previousArgs = [...args];
         return;
      }

      isWaiting = true;
      func.apply(this, args);

      setTimeout(() => {
         isWaiting = false;
         if (previousArgs) {
            func.apply(this, previousArgs);
            previousArgs = null;
         }
      }, ms);
   };
}

export { debounce, throttle };
