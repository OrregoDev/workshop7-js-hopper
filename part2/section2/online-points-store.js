function ProductCategory(name, description, products) {
  this.name = name;
  this.description = description;
  this.products = products;
}
ProductCategory.prototype.listProduct = function () {
  this.products.forEach((product) => console.log(product.getInfo()));
};

function Product(name, points, stock) {
  this.name = name;
  this.points = points;
  this.stock = stock;
}
Product.prototype.getInfo = function () {
  return `${this.name} - ${this.points} - ${this.stock}`;
};

function PhysicalProduct(name, points, stock, price) {
  Product.call(this, name, points, stock);
  this.price = price;
}

PhysicalProduct.prototype = Object.create(Product.prototype);
PhysicalProduct.prototype.constructor = PhysicalProduct;
PhysicalProduct.prototype.updateStock = function (newStock) {
  console.log('Updating stock');
  this.stock = newStock;
};
PhysicalProduct.prototype.sendProduct = function (user) {
  console.log(`Sending product ${this.name} to '${user.name}'`);
};

function DigitalProduct(name, points, stock, url) {
  Product.call(this, name, points, stock);
  this.url = url;
}

DigitalProduct.prototype = Object.create(Product.prototype);
DigitalProduct.prototype.constructor = DigitalProduct;
DigitalProduct.prototype.download = function () {
  console.log(`Downloading '${this.name}'...`);
};
DigitalProduct.prototype.getProduct = function () {
  console.log(`Getting '${this.name}'...`);
};

function Person(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
}

function User(name, email, password, initialPoints = 0) {
  Person.call(this, name, email, password);
  this.points = initialPoints;
}

User.prototype = Object.create(Person.prototype);
User.prototype.constructor = User;
User.prototype.accumulatePoints = function (points) {
  console.log(`Acummulating ${points} points.`);
  this.points += points;
};
User.prototype.exchangePoints = function (points) {
  console.log(`Redeeming ${points} points.`);
  this.points -= points;
};

function Admin(name, email, password) {
  Person.call(this, name, email, password);
}

Admin.prototype = Object.create(Person.prototype);
Admin.prototype.constructor = Admin;
Admin.prototype.addProduct = function (product) {
  console.log(`Adding ${product.name} to inventory.`);
};

function ExchangeOrder(user, product, date) {
  this.user = user;
  this.product = product;
  this.date = date;
}
ExchangeOrder.prototype.confirmOrder = function () {
  console.log(
    `Confirming order of '${this.product.name}' to ${this.user.name} redeeming: ${this.product.points}.`
  );
};
ExchangeOrder.prototype.cancelOrder = function () {
  console.log(
    `Canceling order of '${this.product.name}' to ${this.user.name}.`
  );
};

function Activity(type, awardedPoints) {
  this.type = type;
  this.awardedPoints = awardedPoints;
}
Activity.prototype.complete = function () {
  console.log(`Completing activity of'${this.type}'.`);
};

const user = new User('Camilo', 'camilo.orrego554@gmail.com', 'password');
const physicalProduct = new PhysicalProduct('Phone', 100, 10, 1000);
const digitalProduct = new DigitalProduct(
  'Book',
  10,
  5,
  'https://example.com/book?id=1'
);
const admin = new Admin('Pacho', 'pachoflow@gmail', 'password');
const activity = new Activity('Watch Ads', 100);
user.accumulatePoints(activity.awardedPoints);
const order = new ExchangeOrder(user, physicalProduct, new Date());
order.confirmOrder();
