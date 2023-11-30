"use strict";

// Вы разрабатываете систему отзывов для вашего веб-сайта.
// Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие
// или слишком длинные сообщения, вы решаете установить ограничение,
// отзыв должен быть не менее **50** символов в длину и не более **500**.

// В случае неверной длины, необходимо выводить сообщение об ошибке,
// рядом с полем для ввода.
//
//     Создайте HTML-структуру.
//
//     На странице должны отображаться товары,
//     под каждым товаром должен быть список отзывов на данный товар.
//     Под каждым списком отзывов должна быть форма,
//     где можно добавить отзыв для продукта.
//
//     При добавлении отзыва, он должен отображаться на странице
//     под предыдущими отзывами, а не заменять их.
//
//     Массив `initialData` должен использоваться для начальной загрузки данных
//     при запуске вашего приложения.
//
//     Каждый отзыв должен иметь уникальное числовое `id`.

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

class ProductsView {
  #products = [];
  constructor(options) {
    this.productsBlock = document.querySelector(options.id);
    if (!this.productsBlock) {
      throw new Error(`HTML элемент с id ${options.id} не найден!`);
    }
    this.#products = [...options.data];
    this.lastReviewID = this.getLastReviewID();
    this.init();
  }

  init() {
    this.renderProducts();
    this.productsBlock.addEventListener("submit", this.addReview);
  }
  renderProducts() {
    this.#products.forEach((product) =>
      this.productsBlock.insertAdjacentHTML(
        "beforeend",
        ProductsView.generateProductMarkUp(product),
      ),
    );
  }
  addReview = (event) => {
    event.preventDefault();
    const productEl = event.target.parentElement;
    const textAreaEl = productEl.querySelector(".add-review__text");

    if (!ProductsView.validateReview(textAreaEl.value)) {
      const reviewErrorEl = productEl.querySelector(".add-review__error");
      ProductsView.showError(reviewErrorEl);
      return;
    }

    const productTitle = productEl.querySelector(".product__title").innerText;
    const product = this.findProduct(productTitle);
    product.reviews.push({ id: ++this.lastReviewID, text: textAreaEl.value });

    ProductsView.renderProductReviews(product.reviews, productEl);
    textAreaEl.value = "";
  };
  getLastReviewID() {
    let result = 0;
    this.#products.forEach(({ reviews }) => {
      reviews.forEach(({ id }) => (result = Math.max(result, id)));
    });
    return result;
  }
  findProduct(title) {
    return this.#products.find(
      (product) => product.product.toLowerCase() === title.toLowerCase(),
    );
  }
  static showError(errorEl) {
    errorEl.classList.add("show-error");
    errorEl.innerText = "Ошибка! Отзыв должен содержать от 50 до 500 символов!";
    setTimeout(() => {
      errorEl.classList.remove("show-error");
    }, 1000);
    setTimeout(() => (errorEl.innerText = ""), 1500);
  }
  static generateProductMarkUp(product) {
    return `
        <div class="product">
            <h3 class="product__title">${product.product}</h3>
            <ul class="product__reviews">
                ${ProductsView.generateReviewsMarkUp(product.reviews)}
            </ul>
            <form action="#" class="add-review">
                <textarea class="add-review__text" placeholder="Введите ваш отзыв (от 50 до 500 символов)"></textarea>
                <p class="add-review__error"></p>
                <button type="submit" class="add-review__btn">Добавить отзыв</button>
            </form>
        </div>
    `;
  }
  static generateReviewsMarkUp(reviews) {
    return reviews.reduce(
      (acc, { text }) => (acc += `<li class="product_review">${text}</li>`),
      "",
    );
  }
  static renderProductReviews(reviews, productEl) {
    productEl.querySelector(".product__reviews").innerHTML =
      ProductsView.generateReviewsMarkUp(reviews);
  }
  static validateReview(review) {
    return !(review.length < 50 || review.length > 500);
  }
}

new ProductsView({
  id: "#products",
  data: initialData,
});
