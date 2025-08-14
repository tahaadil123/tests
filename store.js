const { checkInventory, processPayment, shipOrder } = require('./rg.js');

// 🧱 Define the Order class
class Order {
  constructor(items) {
    this.items = items;
    this.creditCardBalance = this.generateRandomBalance();
  }

  generateRandomBalance() {
    // Generates a random balance between $100 and $2000
    return parseFloat((Math.random() * (2000 - 100) + 100).toFixed(2));
  }

  deductBalance(amount) {
    this.creditCardBalance -= amount;
  }

  getFormattedBalance() {
    return `$${this.creditCardBalance.toFixed(2)}`;
  }
}

// 🛒 Create a new order instance
const order = new Order([['sunglasses', 1], ['bags', 2]]);

console.log('Initial Credit Card Balance: ' + order.getFormattedBalance());

checkInventory(order)
  .then((resolvedValueArray) => {
    return processPayment(resolvedValueArray);
  })
  .then((resolvedValueArray) => {
    return shipOrder(resolvedValueArray);
  })
  .then((successMessage) => {
    console.log(successMessage);
    console.log('Thanks for your purchase. Credit Card Balance: ' + order.getFormattedBalance());
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
