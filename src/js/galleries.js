//Categories constructor
function Galleries() {
	var that = this;
	this.galleriesList = [];

	// Gets images from json file
	this.getImages = function () {
		$.get('data/galleries.json', function (data) {
			var gal = JSON.parse(data);
			$.each(gal.galleries, function (index, value) {
				that.galleriesList.push(this);
			});
			that.addPathsToImages();
		});
	};

	// Add right path to images folder
	this.addPathsToImages = function () {
		$.each(that.galleriesList, function (index, value) {
			var id = this.id,
				i = this.images.length - 1;

			for (; i >= 0; i--) {
				this.images[i] = "images/" + id + "/" + this.images[i];
			}
		});
	};
}

var Galleries = new Galleries();
Galleries.getImages();