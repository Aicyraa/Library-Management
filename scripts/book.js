class Book {
   constructor(title, author, page, genre, hasRead) {
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
