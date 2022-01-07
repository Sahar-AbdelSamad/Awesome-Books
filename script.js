const today = new Date().toUTCString();
const time = document.querySelector('.time');
time.textContent = today;

const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.btn');
const navList = document.querySelector('.list');
const bookList = document.querySelector('.bookListSection');
const navAddBook = document.querySelector('.addBook');
const bookCreation = document.querySelector('.bookCreationSection');
const navContact = document.querySelector('.contact');
const contactInfo = document.querySelector('.contactSectionNav');

const data = JSON.parse(localStorage.getItem('list'));

class Library {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static book = [];

  static showList() {
    const empty = document.querySelector('.emptyCollection');
    if (Library.book.length === 0) {
      empty.style.display = ('flex');
    }
    bookList.style.display = ('block');
    bookCreation.style.display = ('none');
    contactInfo.style.display = ('none');
  }

  static createBooks() {
    const bookAdded = document.querySelector('.bookAdded');
    bookAdded.style.display = ('none');
    bookCreation.style.display = ('flex');
    bookList.style.display = ('none');
    contactInfo.style.display = ('none');
  }

  static showContactSection() {
    contactInfo.style.display = ('flex');
    bookList.style.display = ('none');
    bookCreation.style.display = ('none');
  }

  static addNewBook() {
    if (bookTitle.value && bookAuthor.value) {
      const empty = document.querySelector('.emptyCollection');
      empty.style.display = ('none');
      const newBook = new Library(bookTitle.value, bookAuthor.value);
      Library.book.push(newBook);
      localStorage.setItem('list', JSON.stringify(Library.book));
      const section = document.querySelector('.bookSection');
      const div = document.createElement('div');
      div.className = ('bookList');
      div.dataset.id = (Library.book.length - 1);
      section.appendChild(div);
      const bookInfo = document.createElement('p');
      bookInfo.textContent = (`"${bookTitle.value}" by ${bookAuthor.value}`);
      bookInfo.className = ('bookInfo');
      div.appendChild(bookInfo);
      const removeButton = document.createElement('button');
      removeButton.textContent = ('Remove');
      removeButton.className = ('removee');
      removeButton.dataset.id = (Library.book.length - 1);
      div.appendChild(removeButton);
      // Empty input values
      bookTitle.value = ('');
      bookAuthor.value = ('');
      Library.showSuccessMessage();
      const removeBtn = document.querySelectorAll('.removee');
      removeBtn.forEach((item) => item.addEventListener('click', Library.removeBook));
    }
  }

  static showSuccessMessage() {
    const bookAdded = document.querySelector('.bookAdded');
    bookAdded.style.display = ('block');
    Library.removeMessageOnInput();
  }

  static removeMessageOnInput() {
    const bookAdded = document.querySelector('.bookAdded');
    const input = document.querySelectorAll('input');
    input.forEach((item) => {
      item.addEventListener('focus', () => {
        bookAdded.style.display = ('none');
      });
    });
  }

  static removeBook(ev) {
    const elementToRemove = document.querySelectorAll('[data-id]');
    elementToRemove.forEach((item) => {
      if (item.dataset.id === ev.target.dataset.id) {
        item.style.display = ('none');
      }
    });
    for (let i = 0; i < Library.book.length; i += 1) {
      if (i.toString() === ev.target.dataset.id) {
        Library.book.splice(i, 1);
        localStorage.setItem('list', JSON.stringify(Library.book));
      }
    }
  }

  static init() {
    for (let i = 0; i < Library.book.length; i += 1) {
      const section = document.querySelector('.bookSection');
      const div = document.createElement('div');
      div.className = ('bookList');
      div.dataset.id = (i);
      const bookInfo = document.createElement('p');
      bookInfo.textContent = (`"${Library.book[i].title}" by ${Library.book[i].author}`);
      bookInfo.className = ('bookInfo');
      div.appendChild(bookInfo);
      const removeButton = document.createElement('button');
      removeButton.textContent = ('Remove');
      removeButton.className = ('removee');
      removeButton.dataset.id = (i);
      div.appendChild(removeButton);
      section.appendChild(div);
      const removeBtn = document.querySelectorAll('.removee');
      removeBtn.forEach((item) => item.addEventListener('click', Library.removeBook));
    }
  }

  static onloadFunction() {
    const empty = document.querySelector('.emptyCollection');
    if (data[0] !== undefined) {
      empty.style.display = ('none');
      for (let i = 0; i < data.length; i += 1) {
        data[i].id = i + 1;
      }
      Library.book = data;
      Library.init();
    } else {
      empty.style.display = ('flex');
    }
  }
}

addBtn.addEventListener('click', Library.addNewBook);
window.onload = Library.onloadFunction;
navList.addEventListener('click', Library.showList);
navAddBook.addEventListener('click', Library.createBooks);
navContact.addEventListener('click', Library.showContactSection);