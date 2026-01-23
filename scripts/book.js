
export default class Book {
   /**
    * @param {string} title - The title of the book
    * @param {string} genre - The genre of the book
    * @param {string} author - The author of the book
    * @param {number} page - The number of pages
    * @param {number} progress - Reading progress percentage (0-100)
    * @param {string} coverColor - Cover color hex code
    */
   constructor(title, category, author, page, progress = 0, coverColor = '#6366f1') {
      this.title = title;
      this.category = category;
      this.author = author;
      this.page = page;
      this.progress = progress;
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

