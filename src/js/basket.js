//Basket constructor
function Basket(container, template) {
	var that = this;
	this.basketList = [];
	this.basketContainer = container;
	this.basketTemplate = template;
	this.templateBasket = Handlebars.compile(this.basketTemplate.html());

	// Handlebarsjs function to update view on the page
	this.updatePageView = function (data) {
		return this.basketContainer.append(this.templateBasket(data));
	};


	// Adding new product to Basket
	this.purchase = function purchase(productId, productQuantity) {
		$.each(Products.products, function (index, value) {
			if (productId == value.id) {
				that.basketList.push(new that.purchaseItemConstructor(value, productQuantity));
			}
			that.updatePageView(Basket);
			$("input[type='number']").stepper(); // Вынести в функцию
			$('#basket_count').text(Basket.basketList.length); // Вынести в функцию
		});
		// Создавать обьект товара в корзине или же копировать обьект из масива
		//updateview Basket
		//update product coumt 
	};

	// Purchase item constructor
	this.purchaseItemConstructor = function purchaseItem(value, productQuantity) {
		this.id = value.id;
		this.title = value.title;
		this.numer = value.quantity;
		this.productQuantity = productQuantity;
		this.price = value.price;
	}

	this.basketCountPrice = function () {
		$.each(Basket.basketList, function (index, value) {

			var sum = value

			if (productId == value.id) {
				that.basketList.push(new that.purchaseItemConstructor(value, productQuantity));
			}
			that.updatePageView(Basket);
			$("input[type='number']").stepper(); // Вынести в функцию
			$('#basket_total_price').text("$ " + Basket.basketList.length); // Вынести в функцию



		});
	};




}

var Basket = new Basket($('#basket_container'), $('#templateBasket'));