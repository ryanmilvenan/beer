(function ($) {
	function Beer (name, likes) {
    this.name = name;
    this.likes = likes;
  }

  function rebind () {
    $(".stand-in-up").on("click", function () {
      var like = $(this).closest('.beer-type').find('ul .likes');
      var likeNum = like.data('likes');
      likeNum++;
      like.data('likes', likeNum);
      like.find('.like-num').text(likeNum);
    });

    $(".stand-in-down").on("click", function () {
      var like = $(this).closest('.beer-type').find('ul .likes');
      var likeNum = like.data('likes');
      likeNum--;
      like.data('likes', likeNum);
      like.find('.like-num').text(likeNum);
    });
  }

  function addBeer (newBeer) {
    var likeNum = newBeer.likes;
    var upArrow = $("<img class='stand-in-up' />");
		var downArrow = $("<img class='stand-in-down' />");
		var newBeer = $("<li class='beer-type'>" + newBeer.name + "</li>");
    newBeer.append(downArrow);
    newBeer.append(upArrow);
    var likes = $("<ul><li class='likes' data-likes='"
                  + likeNum + "'>Likes: <span class='like-num'>"
                  + likeNum + "</span></li></ul>");
    newBeer.append(likes);
    newBeer.appendTo($('#beer-list'));
    rebind();
  }

  $(document).ready(function () {
    $(".side-button").bind("click", "#add-beer", function () {
      $('#add-beer-box').slideToggle();
    });

    $(".stand-in-up").on("click", function () {
      var like = $(this).closest('.beer-type').find('ul .likes');
      var likeNum = like.data('likes');
      likeNum++;
      like.data('likes', likeNum);
      like.find('.like-num').text(likeNum);
    });

     $(".stand-in-down").on("click", function () {
      var like = $(this).closest('.beer-type').find('ul .likes');
      var likeNum = like.data('likes');
      likeNum--;
      like.data('likes', likeNum);
      like.find('.like-num').text(likeNum);
    });

    $("#up").on("click", function () {
      var beerName = $("#beer-input").val();
      var likes = 1;
      var newBeer = new Beer(beerName, likes);
      addBeer (newBeer);
      $('#add-beer-box').slideToggle();
      $('#beer-input').val("");
    });

    $("#down").on("click", function () {
      var beerName = $("#beer-input").val();
      var likes = -1;
      var newBeer = new Beer(beerName, likes);
      addBeer (newBeer);
      $('#add-beer-box').slideToggle();
      $('#beer-input').val("");
    });

	});
})(jQuery);
