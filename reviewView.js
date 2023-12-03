"use strict";

import Products from "./Products.js";

class ReviewView {
  constructor(options) {
    this.root = document.querySelector(options.id);
    if (!this.root) {
      throw new Error(`HTML элемент с id ${options.id} не найден!`);
    }
    this.init();
  }

  init() {
    this.render();
    this.formEl = this.root.querySelector("#add-review");
    this.inputEl = this.root.querySelector("#product-list-input");
    this.datalistEl = this.root.querySelector("#products-list");
    this.textAreaEl = this.root.querySelector("#textarea");

    this.formEl.addEventListener("submit", this.addReviewHandler);
  }

  addReviewHandler = (event) => {
    event.preventDefault();
    const productInputValue = this.inputEl.value.trim();
    const reviewTextareaValue = this.textAreaEl.value.trim();
    ReviewView.validateInputProduct(productInputValue);
    ReviewView.validateTextareaValue(reviewTextareaValue);

    const product = Products.findProduct(this.inputEl.value);
    if (product) {
      Products.addNewReview(product, reviewTextareaValue);
    } else {
      Products.addNewProduct(productInputValue, reviewTextareaValue);
    }
    this.inputEl.value = "";
    this.textAreaEl.value = "";
    this.datalistEl.innerHTML = this.renderOptions();
    Products.saveToLocalStorage();
  };
  static validateInputProduct(inputValue) {
    if (!inputValue) {
      throw new Error("Не заполнено поле с название товара");
    }
  }
  static validateTextareaValue(textareaValue) {
    if (!textareaValue) {
      throw new Error("Отзыв не может быть пустым");
    }
  }

  render() {
    this.root.innerHTML = `
        <a href="products.html" class="link" target="_blank">Страница товаров</a>
        <form id="add-review" action="#">
            <input list="products-list" id="product-list-input" required>
            <datalist id="products-list">
                ${this.renderOptions()}
            </datalist>
            <textarea id="textarea" cols="20" rows="5" required style="resize: none"></textarea>
            <button id="submit-btn" type="submit">Добавить отзыв</button>
        </form>
    `;
  }
  renderOptions() {
    return Products.products.reduce(
      (acc, product) => (acc += `<option value="${product.product}"></option>`),
      "",
    );
  }
}

new ReviewView({
  id: "#review",
});
