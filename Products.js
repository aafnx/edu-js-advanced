export default class Products {
  static initialData = [
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
  static key = Products.saveKeyStorage("products");
  static products = Products.initData();
  static lastReviewID = Products.getLastReviewID(Products.products);

  static addNewProduct(productTitle, review) {
    const newProduct = {
      product: productTitle,
      reviews: [{ id: ++Products.lastReviewID, text: `${review}` }],
    };
    Products.products.push(newProduct);
  }

  static addNewReview(product, review) {
    product.reviews.push({ id: ++Products.lastReviewID, text: review });
  }

  static saveKeyStorage(key) {
    return key;
  }
  static saveToLocalStorage(data = Products.products, key = Products.key) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getFromLocalStorage(key = Products.key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static initData() {
    const dataFromLocalStorage = Products.getFromLocalStorage();
    return dataFromLocalStorage
      ? dataFromLocalStorage
      : [...Products.initialData];
  }

  static reinitData() {
    Products.products = Products.initData();
  }

  static removeReview(reviewId, productTitle) {
    const products = Products.initData();
    const product = Products.findProduct(productTitle, products);
    if (!product) throw new Error(`Товар ${productTitle} не найден`);

    const review = product.reviews.find(({ id }) => id === Number(reviewId));
    if (!review) throw new Error(`Отзыв с id ${reviewId} не найден`);

    const reviewIndex = product.reviews.indexOf(review);
    product.reviews.splice(reviewIndex, 1);
    if (!product.reviews.length) {
      Products.removeProduct(products, product);
    }
    Products.toggleLocalStorage(products);
  }

  static removeProduct(products, product) {
    const productIndex = products.indexOf(product);
    products.splice(productIndex, 1);
  }
  static toggleLocalStorage(products, key = Products.key) {
    if (!products.length) {
      localStorage.removeItem(key);
    } else {
      Products.saveToLocalStorage(products);
    }
  }
  static findProduct(productTitle, source = Products.products) {
    return source.find(
      (product) =>
        product.product.toLowerCase().trim() ===
        productTitle.toLowerCase().trim(),
    );
  }

  static getLastReviewID(source) {
    let result = 0;
    source.forEach(({ reviews }) => {
      reviews.forEach(({ id }) => (result = Math.max(result, id)));
    });
    return result;
  }
}
