//Basket constructor
function Basket(container, template) {
	var that = this;
	this.basketList = [];
	this.basketContainer = container;
	this.basketTemplate = template;
	this.templateBasket = Handlebars.compile(this.basketTemplate.html());
	this.basketQuantity = $('#basket_count');
	this.basketWrapper = $('#basket_wrapper');
	this.basketItemContainer = $('#basket_container');
	this.basketTotalPrice = $('#basket_total_price');
	this.basketTotalSum = null;

	// Handlebars function to update view on the page
	this.updatePageView = function (data) {
		this.basketItemContainer.html('');
		return this.basketContainer.append(this.templateBasket(data));
	};


	// Adding new product to Basket
	this.purchase = function (productId, productQuantity) {
		if (that.basketList[0]) {
			that.purchaseOldItem(productId, productQuantity); //Добавить возможные проверки
		} else {
			that.purchaseNewItem(productId, productQuantity);
		}
		// Создавать обьект товара в корзине или же копировать обьект из масива
		//updateview Basket
		//update product count 
	};

	this.purchaseOldItem = function (productId, productQuantity) {
		$.each(that.basketList, function (index, value) {
			if (productId == this.id && this.quantity >= productQuantity) {
				this.productQuantity += +productQuantity;
				that.updatePageView(Basket); //Вынести 4 в одну функцию
				that.basketUpdateStepper();
				that.basketCountQuantity();
				that.basketCountPrice();
			}
		});
	},


	this.purchaseNewItem = function (productId, productQuantity) {
		$.each(Products.products, function (index, value) {
			if (productId == value.id) {
				that.basketList.push(new that.purchaseItemConstructor(value, productQuantity));
				that.updatePageView(Basket); //Вынести 4 в одну функцию
				that.basketUpdateStepper();
				that.basketCountQuantity();
				that.basketCountPrice();
			}
		});
	},



	// Purchase item constructor
	this.purchaseItemConstructor = function purchaseItem(value, productQuantity) {
		this.id = value.id;
		this.title = value.title;
		this.quantity = value.quantity;
		this.productQuantity = +(productQuantity);
		this.price = value.price;
	}

	this.basketCountQuantity = function () {
		this.basketQuantity.text(this.basketList.length);
	}

	this.basketUpdateStepper = function () {
		this.basketWrapper.find("input[type='number']").stepper();
	}

	this.basketUpdateTotalPrice = function () {
		that.basketTotalPrice.text("$ " + that.basketTotalSum.toFixed(2)); // Вынести в функцию
	};

	this.basketCountPrice = function () {
		that.basketTotalSum = null;

		$.each(that.basketList, function (index, value) {
			that.basketTotalSum += value.price * value.productQuantity;
			/*			if (productId == value.id) {
				that.basketList.push(new that.purchaseItemConstructor(value, productQuantity));
			}*/
			that.updatePageView(Basket);
			that.basketUpdateStepper();
		});

	};




}

var Basket = new Basket($('#basket_container'), $('#templateBasket'));