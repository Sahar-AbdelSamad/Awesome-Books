class Collection {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  static book = [];

  static addNewBook() {

  if (bookTitle.value && bookAuthor.value) {

    const newBook = new Collection(bookTitle.value, bookAuthor.value);

    Library.book.push(newBook);

    localStorage.setItem('list', JSON.stringify(Library.book));

    const section = document.querySelector('.bookSection');
    const div = document.createElement('div');
    div.className = ('bookList');
    section.appendChild(div);
    const title = document.createElement('p');
    title.textContent = ('"'+newBook.title+'"');
    title.className = ('classTitle');
    div.appendChild(title);
    const author = document.createElement('p');
    author.textContent = (' by '+newBook.author);
    author.className = ('classAuthor');
    div.appendChild(author);
    const removeBtn = document.createElement('button');
    removeBtn.textContent = ('Remove');
    removeBtn.className = ('remove');

    removeBtn.addEventListener('click', () => {
      div.style.display = ('none');
      // Remove the book from the collection
      for (let i = 0; i < Library.book.length; i += 1) {
        if (Library.book[i].title === newBook.title) {
          Library.book.splice(i, 1);
          localStorage.setItem('list', JSON.stringify(Library.book));
        }
      }
    });

    div.appendChild(removeBtn);
    // Empty input values
    bookTitle.value = ('');
    bookAuthor.value = ('');
  }
}
  static init() {
    for (let i = 0; i < Library.book.length; i += 1) {

      const section = document.querySelector('.bookSection');
      const div = document.createElement('div');
      div.className = ('bookList');
      const title = document.createElement('p');
      title.textContent = ('"'+Library.book[i].title+'"');
      title.className = ('classTitle');
      div.appendChild(title);
      const author = document.createElement('p');
      author.textContent = (' by '+Library.book[i].author);
      author.className = ('classAuthor');
      div.appendChild(author);
      const removeBtn = document.createElement('button');
      removeBtn.textContent = ('Remove');
      removeBtn.className = ('remove');
  
      /* eslint-disable no-loop-func */
      removeBtn.addEventListener('click', () => {
        div.style.display = ('none');
        for (let j = 0; j < Library.book.length; j += 1) {
          if (Library.book[j].title === Library.book[i].title) {
            Library.book.splice(j, 1);
            localStorage.setItem('list', JSON.stringify(Library.book));
          }
        }
      });
      div.appendChild(removeBtn);
      section.appendChild(div);
    }
  }

  static onloadFunction() {
  if (data) {
    Library.book = data;
    Library.init();
  } else {
    Library.book = [
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
    Library.init();
    localStorage.setItem('list', JSON.stringify(Library.book));
  }
}
}


const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.btn');

addBtn.addEventListener('click', Library.addNewBook);

const data = JSON.parse(localStorage.getItem('list'));
window.onload = Library.onloadFunction;
