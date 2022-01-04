class Collection {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
let book = [];

class Library {
addNewBook() {
  if (bookTitle.value && bookAuthor.value) {
    console.log(bookTitle.value)
    const newBook = new Collection(bookTitle.value, bookAuthor.value);
    console.log(newBook)
    book.push(newBook);
    localStorage.setItem('list', JSON.stringify(book));
    const section = document.querySelector('.bookSection');
    const div = document.createElement('div');
    div.className = ('bookList');
    section.appendChild(div);
    const title = document.createElement('p');
    title.textContent = (newBook.title);
    title.className = ('classTitle');
    div.appendChild(title);
    const author = document.createElement('p');
    author.textContent = (newBook.author);
    title.className = ('classAuthor');
    div.appendChild(author);
    const removeBtn = document.createElement('button');
    removeBtn.textContent = ('Remove');
    removeBtn.className = ('remove');
    div.appendChild(removeBtn);
    const hr = document.createElement('hr');
    div.appendChild(hr);
    // Empty input values
    bookTitle.value = ('');
    bookAuthor.value = ('');
  }
}
init() {
    for (let i = 0; i < book.length; i += 1) {
      const section = document.querySelector('.bookSection');
      const div = document.createElement('div');
      div.className = ('bookList');
      const title = document.createElement('p');
      title.textContent = (book[i].title);
      title.className = ('classTitle');
      div.appendChild(title);
      const author = document.createElement('p');
      author.textContent = (book[i].author);
      author.className = ('classAuthor');
      div.appendChild(author);
      const removeBtn = document.createElement('button');
      removeBtn.textContent = ('Remove');
      removeBtn.className = ('remove');
  
      /* eslint-disable no-loop-func */
      removeBtn.addEventListener('click', () => {
        div.style.display = ('none');
        for (let i = 0; i < book.length; i += 1) {
          if (book[i].title === title.textContent) {
            book.splice(i, 1);
            localStorage.setItem('list', JSON.stringify(book));
          }
        }
      });
      div.appendChild(removeBtn);
      const hr = document.createElement('hr');
      div.appendChild(hr);
      section.appendChild(div);
    }
  }
onloadFunction() {
  if (data) {
    book = data;
    addNewBookToLibrary.init();
  } else {
    book = [
      {
        title: 'Book1',
        author: 'Author1',
      },
      {
        title: 'Book2',
        author: 'Author2',
      },
      {
        title: 'Book3',
        author: 'Author3',
      },
    ];
    addNewBookToLibrary.init();
    localStorage.setItem('list', JSON.stringify(book));
  }
}
}

const addNewBookToLibrary = new Library();

const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', addNewBookToLibrary.addNewBook);

const data = JSON.parse(localStorage.getItem('list'));
window.onload = addNewBookToLibrary.onloadFunction;
