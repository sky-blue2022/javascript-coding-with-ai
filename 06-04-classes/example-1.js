class Library {
  constructor(name) {
    this.name = name; // Name of the library
    this.books = []; // Array to hold the list of books
  }

  // Method to add a book to the library
  addBook(book) {
    this.books.push(book);
    console.log(`"${book}" has been added to ${this.name}.`);
  }

  // Method to remove a book by its title
  removeBook(title) {
    const index = this.books.indexOf(title);
    if (index > -1) {
      this.books.splice(index, 1);
      console.log(`"${title}" has been removed from ${this.name}.`);
    } else {
      console.log(`"${title}" was not found in ${this.name}.`);
    }
  }

  // Method to list all books in the library
  listBooks() {
    if (this.books.length > 0) {
      console.log(`Books in ${this.name}:`);
      this.books.forEach((book, index) => console.log(`${index + 1}. ${book}`));
    } else {
      console.log(`${this.name} has no books.`);
    }
  }

  // Static method to compare two libraries
  static compareLibraries(library1, library2) {
    const count1 = library1.books.length;
    const count2 = library2.books.length;

    if (count1 > count2) {
      console.log(
        `${library1.name} has more books (${count1}) than ${library2.name} (${count2}).`
      );
    } else if (count1 < count2) {
      console.log(
        `${library2.name} has more books (${count2}) than ${library1.name} (${count1}).`
      );
    } else {
      console.log(
        `${library1.name} and ${library2.name} have the same number of books (${count1}).`
      );
    }
  }
}

// Example usage
const cityLibrary = new Library("City Library");
cityLibrary.addBook("The Great Gatsby");
cityLibrary.addBook("1984");
cityLibrary.listBooks();

const townLibrary = new Library("Town Library");
townLibrary.addBook("To Kill a Mockingbird");
townLibrary.listBooks();

Library.compareLibraries(cityLibrary, townLibrary);
cityLibrary.removeBook("1984");
cityLibrary.listBooks();
Library.compareLibraries(cityLibrary, townLibrary);
