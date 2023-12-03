"use strict";

import Products from "./Products.js";

class ProductsView {
  constructor(options) {
    this.root = document.querySelector(options.id);
    if (!this.root) {
      throw new Error(`HTML элемент с id ${options.id} не найден!`);
    }
    this.init();
  }

  init() {
    this.render();
    this.root.addEventListener("click", this.clickHandler);
  }
  clickHandler = (event) => {
    if (event.target.classList.contains("toggle-reviews-btn")) {
      this.toggleReviews(event);
    }
    if (event.target.classList.contains("remove-review")) {
      this.removeReview(event);
    }
  };
  removeReview(event) {
    const reviewEl = event.target.parentElement;
    const reviewId = reviewEl.dataset.id;
    const productEl = event.target.closest(".product");
    const productTitle = productEl
      .querySelector(".product__title")
      .innerText.trim();
    Products.removeReview(reviewId, productTitle);
    Products.reinitData();
    this.render();
  }
  toggleReviews(event) {
    const productReviewsEl =
      event.target.parentElement.querySelector(".product__reviews");

    event.target.innerText = productReviewsEl.classList.contains("hide")
      ? "Скрыть отзывы"
      : "Показать отзывы";
    productReviewsEl.classList.toggle("hide");
  }
  render() {
    this.root.innerHTML = Products.products.reduce(
      (acc, product) => (acc += ProductsView.generateProductMarkUp(product)),
      "",
    );
  }
  static generateProductMarkUp(product) {
    return `
        <div class="product">
            <h3 class="product__title">${product.product}</h3>
            <button class="toggle-reviews-btn">Показать отзывы</button>
            <ul class="product__reviews hide">
                ${ProductsView.generateReviewsMarkUp(product.reviews)}
            </ul>
            <a href="index.html" target="_blank">На страницу отзывов</a>
        </div>
    `;
  }
  static generateReviewsMarkUp(reviews) {
    return reviews.reduce(
      (acc, review) =>
        (acc += `<li data-id="${review.id}" class="product_review">
          <p>${review.text}</p>
          <button class="remove-review">Удалить отзыв</button>
        </li>`),
      "",
    );
  }
}

new ProductsView({
  id: "#products",
});
