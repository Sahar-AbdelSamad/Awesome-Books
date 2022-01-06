/* eslint-disable max-classes-per-file, eqeqeq */
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

class Count {
  constructor() {
    this.id = 0;
  }
}

const cc = new Count();

class Library {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = cc.id;
  }

  static book = [];

  static showList() {
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
      cc.id += 1;
      const newBook = new Library(bookTitle.value, bookAuthor.value, cc.id);
      Library.book.push(newBook);
      localStorage.setItem('list', JSON.stringify(Library.book));
      const section = document.querySelector('.bookSection');
      const div = document.createElement('div');
      div.className = ('bookList');
      div.id = (cc.id);
      section.appendChild(div);
      const title = document.createElement('p');
      title.textContent = (`"${newBook.title}"`);
      title.className = ('classTitle');
      div.appendChild(title);
      const author = document.createElement('p');
      author.textContent = (` by ${newBook.author}`);
      author.className = ('classAuthor');
      const removeButton = document.createElement('button');
      removeButton.textContent = ('Remove');
      removeButton.className = ('removee');
      removeButton.id = (cc.id);
      div.appendChild(author);
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
    const input = document.querySelector('input');
    input.addEventListener('focus', () => {
      bookAdded.style.display = ('none');
    });
  }

  static removeBook() {
    const elementToRemove = document.getElementById(this.id);
    elementToRemove.style.display = ('none');
    for (let i = 0; i < Library.book.length; i += 1) {
      if (`"${Library.book[i].title}"` === elementToRemove.children[0].textContent && Library.book[i].id == this.id) {
        Library.book.splice(i, 1);
        localStorage.setItem('list', JSON.stringify(Library.book));
      }
    }
  }

  static init() {
    for (let i = 0; i < Library.book.length; i += 1) {
      cc.id += 1;
      const section = document.querySelector('.bookSection');
      const div = document.createElement('div');
      div.className = ('bookList');
      div.id = (cc.id);
      const title = document.createElement('p');
      title.textContent = (`"${Library.book[i].title}"`);
      title.className = ('classTitle');
      div.appendChild(title);
      const author = document.createElement('p');
      author.textContent = (` by ${Library.book[i].author}`);
      author.className = ('classAuthor');
      div.appendChild(author);
      const removeButton = document.createElement('button');
      removeButton.textContent = ('Remove');
      removeButton.className = ('removee');
      removeButton.id = (cc.id);
      div.appendChild(removeButton);
      section.appendChild(div);
      const removeBtn = document.querySelectorAll('.removee');
      removeBtn.forEach((item) => item.addEventListener('click', Library.removeBook));
    }
  }

  static onloadFunction() {
    if (data[0]!==undefined) {
      for (let i = 0; i < data.length; i += 1) {
        data[i].id = i + 1;
      }
      Library.book = data;
      Library.init();
    } else {
      const empty = document.querySelector('.emptyCollection');
      empty.style.display = ('flex');
    }
  }
}

addBtn.addEventListener('click', Library.addNewBook);
window.onload = Library.onloadFunction;
navList.addEventListener('click', Library.showList);
navAddBook.addEventListener('click', Library.createBooks);
navContact.addEventListener('click', Library.showContactSection);