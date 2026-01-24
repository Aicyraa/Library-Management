
export default class Book {
   /**
    * @param {string} title - The title of the book
    * @param {string} genre - The genre of the book
    * @param {string} author - The author of the book
    * @param {number} totalPage - The total number of pages
    * @param {number} currentPage - The current page number
    * @param {string} coverColor - Cover color hex code
    */
   constructor(title, category, author, totalPage, currentPage = 0, coverColor) {
      this.title = title;
      this.category = category;
      this.author = author;
      this.totalPage = totalPage;
      this.currentPage = currentPage;
      this.progress = Math.floor((currentPage / totalPage) * 100);
      this.coverColor = coverColor;
      this.id = crypto.randomUUID();
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

