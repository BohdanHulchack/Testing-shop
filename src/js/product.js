//Products constructor
function Products(container, template) {
	var that = this;
	this.products = [];
	this.productsContainer = container;
	this.productsTemplate = template;
	this.templateProducts = Handlebars.compile(this.productsTemplate.html());

	// Handlebarsjs function to write
	this.updatePageView = function (data) {
		this.productsContainer.append(this.templateProducts(data));
		Slider($("[data-gallery]"));
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
			$("input[type='number']").stepper();
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