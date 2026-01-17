
export default class Book {
   /**
    * @param {string} title - The title of the book
    * @param {string} author - The author of the book
    * @param {number} page - The number of pages
    * @param {string} genre - The genre of the book
    * @param {boolean} hasRead - Whether the book has been read
    */
   constructor(title, author, page, genre, hasRead) {
      this.id = crypto.randomUUID();
      this.title = title;
      this.author = author;
      this.page = page;
      this.genre = genre;
      this.hasRead = hasRead;
      this.readInfo = {
         readCount: 0,
         readDates: [],
      };
   }

   getReadInfo(infoType) {
      switch (infoType) {
         case 0:
            return this.readInfo;
         case 1:
            return this.readInfo.readCount;
         case 2:
            return this.readInfo.readDates;
         default:
            throw new Error("Invalid info type!");
      }
   }

   setReadCount() {
      this.readInfo.readCount++;
      return "Success";
   }

   setReadDates() {
      const date = new Date();
      const newDate = { day: date.toLocaleDateString(), time: date.toLocaleTimeString(), }
      this.readInfo.readDates.push(newDate);
      return "Success"
   }
}

