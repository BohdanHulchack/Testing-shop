//Products constructor
function Products(container, template) {
	var that = this;
	this.products = [];
	this.productsContainer = container;
	this.productsTemplate = template;

	this.templateProducts = Handlebars.compile(this.productsTemplate.html())

	// Handlebarsjs function to write
	this.updatePageView = function (data) {
		return this.productsContainer.append(this.templateProducts(data));
	};

	// Creating new Category object from json data
	this.addNewProduct = function (value) {
		that.products.push(new this.productConstructor(value));
	};

	// Get and parse data from JSON
	this.getProducts = function (link) {
		$.get(link, function (data) {
			var prod = JSON.parse(data);
			$.each(prod.products, function (index, value) {
				that.addNewProduct(value);
			});
			that.updatePageView(Products);
			$("input[type='number']").stepper(); // Вынести в функцию
		});
	}

	// Product item constructor
	this.productConstructor = function Product(value) {
		var that = this;
		this.id = value.id;
		this.category = value.category_id;
		this.description = value.description;
		this.title = value.title;
		this.quantity = value.quantity;
		this.gallery_id = value.gallery_id;
		this.price = value.price;
		this.inBasket = false;

		this.changeStatus = function () {
			if (this.inBasket) {
				return this.inBasket = false;
			} else {
				return this.inBasket = true;
			}
		};



		this.GetImages = function () {
			$.each(Galleries, function (index, value) {
				if (that.gallery_id == value.id && that.images != value.images) {
					that.images = value.images;
				}
			});
		}

	};
}

var Products = new Products($('#products_container'), $('#templateProduct'));
Products.getProducts('data/products.json');