# Урок 2


## Задание 1
Необходимо создать класс `Library`. Конструктор класса, должен принимать начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив
не содержит дубликатов; в противном случае необходимо выбросить ошибку.

1. Класс должен содержать приватное свойство `#books`, которое должно хранить книги, переданные при создании объекта.
2. Реализуйте геттер-функцию `allBooks`, которая возвращает текущий список книг.
3. Реализуйте метод `addBook(title)`, который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
4. Реализуйте метод `removeBook(title)`, который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
5. Реализуйте метод `hasBook(title)`, который будет проверять наличие книги в библиотеке и возвращать `true` или `false` в зависимости от того, есть ли такая книга в списке или нет.


## Задание 2

Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить ограничение, отзыв должен быть не менее **50**
символов в длину и не более **500**.
В случае неверной длины, необходимо выводить сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру.

На странице должны отображаться товары, под каждым товаром должен быть список отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

Массив `initialData` должен использоваться для начальной загрузки данных при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое `id`.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не делать, пока рано.

```js
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];
```
