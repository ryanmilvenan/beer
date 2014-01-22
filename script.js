(function ($) {

	Beer = Backbone.Model.extend({
		urlRoot:'http://beer.fluentcloud.com/v1/beer/',
		url: function() {
			return this.urlRoot;
		},
		initialize:function(models, options) {
		},
		defaults: {
			name: '',
			likes: 0
		}
	});

	
	Beers = Backbone.Collection.extend({
		model:Beer,
		url: 'http://beer.fluentcloud.com/v1/beer/',
		initialize: function (models, options) {
		}
	});
	

	AppView = Backbone.View.extend({
		el: $("body"),

		initialize: function () {
			//Connect the view with a new beer collection
			this.beers = new Beers( null, { view: this });
		},
		events: {
			"click #add-beer":  "addBeer",
			"click #get-beer": 	"getBeers",
			"click #update-likes": "setLikes"
		},
		addBeer: function () {
			//Add a beer to the server, if the collection has been initialized
			if(this.beers.length !== 0) {
				//Get input from user
				var beer_name = prompt("What type of beer?");	

				//Create a new beer model using input		
				var beer_model = new Beer({ name: beer_name });

				//Add the new model to the collection, and POST it to the server
				if(beer_model.get('name') !== '' && beer_model.get('name') !== null) {
					this.beers.add( beer_model );
					beer_model.save();
				}
			}else{
				alert("You should open the cooler first.");
			}
		},
		getBeers: function() {
			//Keep track of this.beers in a local variable for ease of use
			var collection = this.beers;

			//GET the beer models from the server
			collection.fetch({
				//If the GET was successful, render the models values to a list
				success: function (response) {
					$('#beer-list').empty();
					collection.forEach(function(model) {
						if(collection.length < 15) {
							$("#beer-list").append("<li>" + model.get('name') + " -- Likes: " + 
								model.get('likes') + "</li>");
						}
					})
				}
			});
		},
		setLikes: function() {
			//Keep track of this.beers in a local variable for ease of use
			var collection = this.beers;

			//Ask the user which beer to update, and what they would like to update it to,
			//if the beer collection has been retrieved.
			if(collection.length !== 0) {
				var beer_name = prompt("Which beer would you like to update?");
				var new_likes_str = prompt("How many people like it now?");
				var new_likes = parseInt(new_likes_str);

				//If input is valid, retrieve the appropriate beer model from the collection
				if(typeof new_likes === "number") {
					var beer_model = collection.find(function(model) {
						return model.get('name') === beer_name;
					});
					//If the beer has been found, PUT the new like information on the server
					if(beer_model !== undefined) {	
						beer_model.save({likes:new_likes});
					}else{
						//The beer searched for wasn't found
						alert("I don't think we have that beer");
					}
				} else {
					//The like value wasn't the right type
					alert("You didn't enter a number");
				}
			} else {
				alert("You should open the cooler first.");
			}
		}
	});
	
	var appview = new AppView;

})(jQuery);