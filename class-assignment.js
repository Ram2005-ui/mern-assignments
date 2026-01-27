//Problem Statement: Library Book Management System
//-------------------------------------------------
//Objective : Create a Book class and use it to manage a collection of books in a library.
//
//Requirements:
//  Create a Book class with the following:
//
//  Properties:
//      title (string)
//      author (string)
//      pages (number)
//      isAvailable (boolean, default: true)
//
//
//  Methods:
//      borrow() - Marks the book as not available
//      returnBook() - Marks the book as available
//      getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
//      isLongBook() - Returns true if pages > 300, false otherwise
//
//
//
//
//  1. Create at least 5 book objects using the class:
//      Example: "Harry Potter", "1984", "The Hobbit", etc.
//
//
//  2. Perform the following operations:
//
//      i. Display info of all books
//      ii. Borrow 2 books and show their availability status
//      iii. Return 1 book and show updated status
//      iv. Count how many books are "long books" (more than 300 pages)
//      v. List all available books

class Book{
    constructor(title,author,pages,isAvailable=true){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isAvailable=isAvailable;
    }
    borrow(){
        this.isAvailable=false;
    }
    returnBook(){
        this.isAvailable=true;
    }
    getInfo(){
        return `${this.title} by ${this.author} (${this.pages} pages)`;
    }
    isLongBook(){
        if(this.pages>300){
            return true;
        }
        else{
            return false;
    }
    }
    }
let book1=new Book("Harry Potter","J.K. Rowling",350);
let book2=new Book("1984","George Orwell",280);
let book3=new Book("The Hobbit","J.R.R. Tolkien",310);
let book4=new Book("To Kill a Mockingbird","Harper Lee",250);
let book5=new Book("Moby Dick","Herman Melville",400);

console.log(book1.getInfo());
console.log(book2.getInfo());
console.log(book3.getInfo());
console.log(book4.getInfo());
console.log(book5.getInfo());

book1.borrow();
book2.borrow();

console.log(book1.isAvailable);
console.log(book2.isAvailable);

book1.returnBook();

console.log(book1.isAvailable);

let longBooks=0;
let availableBooks=[];
for(let book of [book1,book2,book3,book4,book5]){
    if(book.isLongBook()){
        longBooks++;
    }
    if(book.isAvailable){
        availableBooks.push(book.getInfo());
    }
}
console.log(longBooks);
console.log(availableBooks);


