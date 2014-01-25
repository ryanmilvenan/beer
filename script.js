(function ($) {
  /*
    Beer Model and View
  */
	var Beer = Backbone.Model.extend ({
    initialize: function () {
      this.on("change", function () {

      });
    },
    defaults: {
      name: "",
      likes: 0
    },
    decLikes: function () {
      var likes = this.get('likes');
      likes--;
      this.set({likes:likes});
    },
    addLikes: function () {
      var likes = this.get('likes');
      likes++;
      this.set({likes:likes});
    }
  });

  var BeerView = Backbone.View.extend ({
    tagName: 'li',
    className:"beer-type",
    template: _.template("<%= name %>" +
                         "<img class='small-down' />" +
                         "<img class='small-up' />" +
                         "<ul><li class='likes'>Likes: <%= likes %>"),
    initialize: function () {
      this.model.on("change", this.render, this);
    },
    events: {
      "click .small-down": "decLikes",
      "click .small-up": "addLikes"
    },
    render: function () {
      var attr = this.model.toJSON();
      this.$el.html(this.template( attr ));
      return this;
    },
    decLikes: function() {
      this.model.decLikes();
    },
    addLikes: function() {
      this.model.addLikes();
    }
  });

  /*
    Beers Collection and View
  */
  var Beers = Backbone.Collection.extend ({
    model: Beer,
    url: 'http://beer.fluentcloud.com/v1/beer/'

  });

  var BeerList = Backbone.View.extend ({
    el: $("#beer-list"),
    initialize: function () {
      this.collection.on("add", this.addOne, this);
      this.collection.on("reset", this.addAll, this);
    },
    addOne: function ( beer ) {
      var beerView = new BeerView({model:beer});
      this.$el.append(beerView.render().el);
    },
    addAll: function () {
      this.collection.forEach(this.addOne, this);
    },
    render: function () {
      this.addAll();
    }

  });

  /*
    UI Views w/ no model
  */

  var AddBeerButton = Backbone.View.extend ({
    el: $('#add-beer'),
    initialize: function () {
      this.$el.on("click", function () {
        $('#add-beer-box').slideToggle();
      });
    }
  });

  var GetBeerButton = Backbone.View.extend ({
    el: $('#get-beers'),
    events: {
      "click": "getBeers"
    },
    getBeers: function () {
      $(".info-text").remove();
      this.collection.fetch();
    }
  });

  var AddBeerBox = Backbone.View.extend ({
    el: $('#add-beer-box'),
    events: {
      "click #up": "submitUp",
      "click #down": "submitDown"
    },
    submitUp: function () {
      var beerName;
      if ($('#beer-input').val() !== "") {
        beerName = $('#beer-input').val();
        var beerLikes = 1;
        var newBeer = new Beer({name:beerName, likes: beerLikes});
        this.collection.add(newBeer);
        $(".info-text").remove();
        $('#add-beer-box').slideToggle();
        $('#beer-input').val("");
      }
    },
    submitDown: function () {
      var beerName = $('#beer-input').val();
      var beerLikes = -1;
      var newBeer = new Beer({name:beerName, likes: beerLikes});
      this.collection.add(newBeer);
      $(".info-text").remove();
      $('#add-beer-box').slideToggle();
      $('#beer-input').val("");
    }
  });

  //Beer Collection Instantiation
  var beers = new Beers();
  var beerList = new BeerList({collection: beers});

  //UI Instantiation
  var addBeerButton = new AddBeerButton();
  var getBeerButton = new GetBeerButton({collection: beers});
  var addBeerBox = new AddBeerBox({collection: beers});

})(jQuery);
