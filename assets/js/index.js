// array of strings for my topics.
var topics = ['Dog', 'Cat', 'Rabbit', 'Hamster', 'Skunk', 'Goldfish','Bird', 'Ferret', 'Turtle','Sugar Glider','Chinchilla' ,'Hedgehog','Hermit Grab','Gerbil','Chicken','Capybara','Teacup Pig','Serval','Salamander','Frog', 'Alligator'];
var title;
var animate;
var still;
var state;
/*
function createButton(animalName){
  var input = $("<button type='button' class = 'button' value='" + animalName + "'/>");
  input.appendTo($('h1'));
}*/ 
function createButton(animalName){
  var input = $("<input type='button' class = 'button' value='" + animalName + "'/>");
  input.appendTo($('h1'));
}

function renderButtons(){
  $('h1').empty();
  for (var i = 0; i < topics.length; i++) {
  createButton(topics[i]);
  }
}

$(document).ready(function(){
renderButtons();  

$('#submit').click(function(){
  var userAnimal = $('#userInput').val().trim();
  topics.push(userAnimal);
  renderButtons();
})  
// $(document).on('click', 'button:button', function(){
//     title = $(this).val(); 
$(document).on('click', 'input:button', function(){
  title = $(this).val(); 

  // queryURL for Giphy API
  var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + title +  "&api_key=kBZUhMtzJjJ4FUDxd9cqG0xgPhZ9nkZJ");

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    console.log(response);
    $(".buttons").empty();
      for (var i = 0; i < 20; i++) {

      var newRating =$("<div>");
      var newGif = $("<img>");
      var newDiv = $("<div>");
      newDiv.addClass("giph");
      newGif.addClass("gif");
      newGif.attr("data-state", "animate");
      newGif.attr("src", response.data[i].images.downsized.url);
      newRating.html("Rating: " + response.data[i].rating);
      $(newDiv).append(newRating);
      $(newDiv).append(newGif);
      $(".buttons").append(newDiv);
      }

    })

}) 
          $(document).on("click", ".gif", function(){
          var myvar = $(this).attr("id");
          state = $(this).attr("data-state"); 
          var animateURL = $(this).attr("data-animate");
          var stillURL = $(this).attr("data-still");

            if (state === "animate") {
              $(this).attr("data-state", "still");
              $(this).attr("src", stillURL);
            } else{
              $(this).attr("data-state", "animate");
              $(this).attr("src", animateURL);
            }
                        
        })

});