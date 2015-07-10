//Products constructor
function Products(container, template) {
	var that = this;
	this.products = [];
	this.productsContainer = container;
	this.productsTemplate = template;
	this.templateProducts = Handlebars.compile(this.productsTemplate.html());
	this.currentView = {
		products: []
	};

	// Handlebarsjs function to write
	this.updatePageView = function (data) {
		that.currentView.products = data.products;
		that.productsContainer.html('');
		that.productsContainer.append(this.templateProducts(data));
		Slider($("[data-gallery]"));
		that.updateStepper();
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
			that.findGalleries();
			that.updatePageView(Products);
			that.currentView.products = Products.products;
		});
	};

	//  Searching for product that matches current gallery and binds them
	this.findGalleries = function () {
		$.each(Galleries.galleriesList, function (index, value) {
			var currentGallery = this;

			$.each(Products.products, function (index, value) {
				if (this.gallery_id === currentGallery.id) {
					this.images = currentGallery.images;
				}
			});
		});
	};

	this.updateStepper = function () {
		this.productsContainer.find("input[type='number']").stepper();
	};


	this.sortToLow = function () {
		Products.currentView.products = Products.currentView.products.sort(function (a, b) {
			var keyA = a.price,
				keyB = b.price;
			// Compare the 2 dates
			if (keyA < keyB) return -1;
			if (keyA > keyB) return 1;
			return 0;
		});

		Products.updatePageView(Products.currentView);
	};

	this.sortToHigh = function () {
		that.sortToLow();
		Products.currentView.products = Products.currentView.products.reverse();
		Products.updatePageView(Products.currentView);
	};



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
		this.images = [];

		this.changeStatus = function () {
			if (this.inBasket) {
				this.inBasket = false;
			} else {
				this.inBasket = true;
			}
		};
	};
}

var Products = new Products($('#products_container'), $('#templateProduct'));
Products.getProducts('data/products.json');