// ✅ File B: rg.js
const store = {
  sunscreen: {
    inventory: 817,
    cost: 9.99
  },
  pants: {
    inventory: 236,
    cost: 7.99
  },
  bags: {
    inventory: 17,
    cost: 12.99
  }
};

const checkInventory = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const itemsArr = order.items;
      let inStock = itemsArr.every(item => store[item[0]].inventory >= item[1]);

      if (inStock) {
        let total = 0;
        itemsArr.forEach(item => {
          total += item[1] * store[item[0]].cost;
        });
        console.log(`All of the items are in stock. The total cost of the order is ${total.toFixed(2)}.`);
        resolve([order, total]);
      } else {
        reject(`The order could not be completed because some items are sold out.`);
      }
    }, generateRandomDelay());
  });
};

const processPayment = (responseArray) => {
  const order = responseArray[0];
  const total = responseArray[1];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let hasEnoughMoney = order.creditCardBalance >= total;

      if (hasEnoughMoney) {
        console.log(`Payment processed with credit card. Generating shipping label.`);

        // ✅ Update the balance
        order.creditCardBalance -= total;

        let trackingNum = generateTrackingNumber();
        resolve([order, trackingNum]);
      } else {
        reject(`Cannot process order: credit card balance was insufficient.`);
      }
    }, generateRandomDelay());
  });
};

const shipOrder = (responseArray) => {
  const order = responseArray[0];
  const trackingNum = responseArray[1];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`The order has been shipped. The tracking number is: ${trackingNum}.`);
    }, generateRandomDelay());
  });
};

function generateTrackingNumber() {
  return Math.floor(Math.random() * 1000000);
}

function generateRandomDelay() {
  return Math.floor(Math.random() * 5000);
}

module.exports = { checkInventory, processPayment, shipOrder };
