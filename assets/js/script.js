// Just realized I only did the initail commit until I was finished...sorry. It was done all at once


var topics = ['cat', 'dog', 'rabbit',];

for(var i = 0; i < topics.length; i++){
    var loadedBtn = $('<button>' + topics[i] + '</button>');
    loadedBtn.attr('class', 'btn btn-dark search-btn');
    loadedBtn.attr('data-critter', topics[i]);
    $(".btn-container").append(loadedBtn);
}

$("#user-submit").on('click', function () {
    event.preventDefault();
    var userInput = $("#user-input").val().trim();
    // console.log(userInput)
    var newBtn = $('<button>' + userInput + '</button>');
    newBtn.attr('class', 'btn btn-dark search-btn');
    newBtn.attr('data-critter', userInput);
    // console.log(newBtn)
    $(".btn-container").append(newBtn);
    $(".gif-container").empty();
    

})

$(document).on('click', ".search-btn", function () {
    var critter = $(this).attr("data-critter");
    // console.log("clicked")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        critter + "&api_key=UbE45OaEiLjCyYNkPzfusZ5qgMoEAKOF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        var results = response.data;
        // console.log("THEN")
        for (var i = 0; i < results.length; i++) {
            // console.log("IN THE LOOP")
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");
                gifDiv.attr('class', 'col-md-6')
                

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var critterImage = $("<img>");

                critterImage.attr("src", results[i].images.fixed_height_still.url);
                var stillImage =  results[i].images.fixed_height_still.url;
                var animatedGif =  results[i].images.fixed_height.url;
                critterImage.attr('class', 'gif')
                critterImage.attr('data-state', 'still');
                critterImage.attr('data-still', stillImage);
                critterImage.attr('data-animate', animatedGif);
                gifDiv.append(p);
                gifDiv.append(critterImage);

                $(".gif-container").prepend(gifDiv);

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
            }
        }
    })
})


