//Categories constructor
function Categories(container, template) {
	var that = this;
	this.categories = [];
	this.categoriesContainer = container;
	this.categoriesTemplate = template;

	this.templateCategories = Handlebars.compile(this.categoriesTemplate.html());

	// Handlebarsjs function to write
	this.updatePageView = function (data) {
		return this.categoriesContainer.append(this.templateCategories(data));
	};

	// Category item constructor
	this.categoryConstructor = function Category(value) {
		this.id = value.id;
		this.title = value.title;
	};

	// Creating new Category object from json data
	this.addNewCategory = function (value) {
		that.categories.push(new this.categoryConstructor(value));
	};

	// Get and parse data from JSON
	this.getCategories = function (link) {
		$.get(link, function (data) {
			var cat = JSON.parse(data);
			console.log(cat);
			$.each(cat.categories, function (index, value) {
				that.addNewCategory(value);
			});
			that.updatePageView(Categories);
		});
	};
}

var Categories = new Categories($('#categories_container'), $('#templateCategories'));
Categories.getCategories('data/categories.json');