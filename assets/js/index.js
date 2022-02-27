
var inputs = ['Dog', 'Cat', 'Rabbit', 'Hamster', 'Skunk', 'Goldfish', 'Bird', 'Ferret', 'Turtle', 'Sugar Glider', 'Chinchilla', 'Hedgehog', 'Hermit Grab', 'Gerbil', 'Chicken', 'Capybara', 'Teacup Pig', 'Serval', 'Salamander', 'Frog', 'Alligator'];
var title;
var animate;
var still;
var state;
/*
function createButton(animalName){
  var input = $("<button type='button' class = 'button' value='" + animalName + "'/>");
  input.appendTo($('h1'));
}*/
function createButton(animalName) {
    var input = $("<input type='button' class = 'button' value='" + animalName + "'/>");
    input.appendTo($('h1'));
}

function addButtons() {
    $('h1').empty();
    for (var i = 0; i < inputs.length; i++) {
        createButton(inputs[i]);
    }
}

$(document).ready(function () {
    addButtons();

    $('#submit').click(function () {
        var userInput = $('#userInput').val().trim();
        inputs.push(userInput);
        addButtons();
    })
    // $(document).on('click', 'button:button', function(){
    //     queue = $(this).val(); 
    $(document).on('click', 'input:button', function () {
        queue = $(this).val();

        var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + queue + "&api_key=kBZUhMtzJjJ4FUDxd9cqG0xgPhZ9nkZJ");

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            $(".buttons").empty();
            for (var i = 0; i < 20; i++) {

                var newRating = $("<div>");
                var newGif = $("<img>");
                var newDiv = $("<div>");
                newDiv.addClass("giph");
                newGif.addClass("giphy");
                newGif.attr("data-state", "still");
                newGif.attr("data-still", response.data[i].images.downsized_still.url);
                newGif.attr("data-animate", response.data[i].images.downsized.url);
                newRating.html("Rating: " + response.data[i].rating);
                newGif.attr("src", response.data[i].images.downsized.url);
                $(newDiv).append(newRating);
                $(newDiv).append(newGif);
                $(".buttons").append(newDiv);
            }

        })

    })
    $(document).on("click", ".giphy", function () {
        state = $(this).attr("data-state");
        var animated = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", animated);
          } else{
            $(this).attr("data-state", "still");
            $(this).attr("src", still);
          }

    })

});