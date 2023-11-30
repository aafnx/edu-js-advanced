"use strict";

// Необходимо создать класс `Library`.
// Конструктор класса, должен принимать начальный список книг (массив)
// в качестве аргумента. Убедитесь, что предоставленный массив
// не содержит дубликатов; в противном случае необходимо выбросить ошибку.

// 1. Класс должен содержать приватное свойство `#books`,
// которое должно хранить книги, переданные при создании объекта.
// 2. Реализуйте геттер-функцию `allBooks`,
// которая возвращает текущий список книг.
// 3. Реализуйте метод `addBook(title)`,
// который позволяет добавлять книгу в список. Если книга с таким названием
// уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// 4. Реализуйте метод `removeBook(title)`, который позволит удалять книгу
// из списка по названию. Если книги с таким названием нет в списке,
// выбросьте ошибку с соответствующим сообщением.
// 5. Реализуйте метод `hasBook(title)`, который будет проверять наличие книги
// в библиотеке и возвращать `true` или `false` в зависимости от того,
// есть ли такая книга в списке или нет.

const books = [
  {
    title: "Как устроен JavaScript",
    author: "Дуглас Крокфорд",
  },
  {
    title: "Выразительный JavaScript, второе издание",
    author: "Марейн Хавербек",
  },
  {
    title: "ECMAScript 6 для разработчиков",
    author: "Николас Закас",
  },
  {
    title: "Грокаем Алгоритмы",
    author: "Адитья Бхаргава",
  },
  {
    title: "Секреты CSS. Идеальные решения ежедневных задач",
    author: "Лия Веру",
  },
  {
    title: "Чистая архитектура",
    author: "Роберт Мартин",
  },
  {
    title: "Эффективный TypeScript: 62 способа улучшить код",
    author: "Дэн Вандеркам",
  },
  {
    title:
      "Джедайские техники: как воспитать свою обезьянку, опустошить инбокс и сберечь мыслетопливо",
    author: "Максим Дорофеев",
  },
];
class Library {
  #books = [];

  constructor(books) {
    if (this.checkBooksDuplicate(books)) {
      throw new Error("В предсталенных книгах имеются дубликаты!");
    }
    this.#books = books;
  }

  checkBooksDuplicate(books) {
    const duplicates = books.filter(
      ({ title }, index) => this.findIndexBook(title, books) !== index,
    );
    return duplicates.length > 0;
  }

  get allBooks() {
    return this.#books;
  }
  addBook(book) {
    if (this.hasBook(book.title)) {
      throw new Error(`Книга ${book.title} — уже есть в библиотеке`);
    }
    this.#books.push(book);
  }
  removeBook(title) {
    if (!this.hasBook(title)) {
      throw new Error(
        `Ошибка при удалении книги ${title}, такой книги нет в библиотеке`,
      );
    }
    const bookIndex = this.findIndexBook(title);
    this.#books.splice(bookIndex, 1);
  }

  hasBook(title) {
    return Boolean(
      this.allBooks.find(
        (book) => book.title.toLowerCase() === title.toLowerCase(),
      ),
    );
  }

  findIndexBook(title, books = this.#books) {
    return books.findIndex(
      (book) => book.title.toLowerCase() === title.toLowerCase(),
    );
  }
}

const library = new Library(books);

console.log(library.allBooks);
library.removeBook("Грокаем Алгоритмы");
console.log(library.hasBook("Грокаем Алгоритмы"));

library.addBook({
  title: "Новая лучшая книга по JS",
  author: "Именитый Автор",
});
console.log(library.hasBook("Новая лучшая книга по js"));

// errors
// library.removeBook("Старая лучшая книга по JS");
// library.addBook({
//   title: "Новая лучшая книга по JS",
//   author: "Именитый Автор",
// });

const duplicateLibrary = new Library([
  {
    title: "Книга по Python",
    author: "Мастер Python",
  },
  {
    title: "Книга по Java",
    author: "Мастер по Java",
  },
  {
    title: "Книга по Python",
    author: "Мастер Python",
  },
]);
