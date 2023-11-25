"use strict";

// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся
// на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
//
//     Необходимо реализовать функцию `newOrder`. Создавать вспомогательные функции, коллекции, не запрещается. Старайтесь использовать коллекции `Map`/`Set`, где это актуально. Представленный ниже код должен работать.
//
//     Повара и их специализации:
//
//     1. Олег - специализация: Пицца.
//     2. Андрей - специализация: Суши.
//     3. Анна - специализация: Десерты.

//     Блюда, которые могут заказать посетители:
//     - Пицца "Маргарита"
//     - Пицца "Пепперони"
//     - Пицца "Три сыра"
//     - Суши "Филадельфия"
//     - Суши "Калифорния"
//     - Суши "Чизмаки"
//     - Суши "Сеякемаки"
//     - Десерт Тирамису
//     - Десерт Чизкейк

// Посетитель ресторана.
class Client {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}


const menu = new Map();
menu
    // используем коллекцию Set, чтобы быть уверенным, что блюда уникальны
    .set('Пицца',  new Set(['Маргарита', 'Пепперони', 'Три сыра']))
    .set('Суши', new Set(['Филадельфия', 'Калифорния', 'Чизмаки']))
    .set('Десерт', new Set(['Тирамису', 'Чизкейк']));

const cookSpecialization = new Map();
cookSpecialization
    .set('Пицца', 'Олег')
    .set('Суши', 'Андрей')
    .set('Десерт', 'Анна');

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
    constructor() {
        this.orders = new Map();
    }
    newOrder(client, ...order) {
        const currentOrder = [];
        try {
            order.forEach((dish) => {
                this.validateErrorsOrder(dish.type, dish.name, dish.quantity);
                this.addDishInOrder(currentOrder, dish, false);
            })
            this.addClientOrder(client, currentOrder);
        } catch (error) {
            console.error(`\n${error.message}`);
        }
        this.showOrderInfo(client);
    }
    addClientOrder(client, order) {
        if (!this.orders.has(client)) {
            this.orders.set(client, order);
            return;
        }

        const orders = [...this.orders.get(client)];
        order.forEach(dish => {
            this.addDishInOrder(orders, dish);
        })
        this.orders.set(client, orders);
    }

    // предполагаем, что официант может ошибиться при приеме заказа
    // и указать одно блюдо несколько раз
    // ставим количество такого блюда по последней записи от официанта, если isAdding === false
    addDishInOrder(order, dish, isAdding = true) {
        const isOrderAdded = order.find(({name}) => name === dish.name);
        if (isAdding) {
            isOrderAdded ? isOrderAdded.quantity += dish.quantity : order.push(dish);
        } else {
            isOrderAdded ? isOrderAdded.quantity = dish.quantity : order.push(dish);
        }
    }
    showOrderInfo(client) {
        console.log(`\nКлиент ${client.firstname} заказал:`);
        this.orders.get(client).forEach(({type, name, quantity}) => {
            const cook = cookSpecialization.get(type);
            console.log(`${type} "${name}" - ${quantity}; готовит повар ${cook}`);
        })
    }
    validateErrorsOrder(type, name, quantity) {
        if (!menu.get(type)) {
            throw new Error(`${type} - такого типа блюд не существует!`);
        }
        if (![...menu.get(type)].includes(name)) {
            throw new Error(`${type} "${name}" - такого блюда не существует!`);
        }
        if (quantity <= 0) {
            throw new Error(`Указано количество ${quantity}, количество не может быть меньше или равно 0`);
        }
    }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
    new Client("Иван", "Иванов"),
    { name: "Маргарита", quantity: 1, type: "Пицца" },
    { name: "Пепперони", quantity: 2, type: "Пицца" },
    { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал:
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.
