import nextId from "react-id-generator";
class Book {
    constructor(title, author, cover, year, medium) {
      this.title = title;
      this.author = author;
      this.cover = cover;
      this.year = year;
      this.medium = medium;
      this.id = nextId();
    }

  }
  
  export default Book;