// array of strings for my topics.
var topics = ['Dog', 'Cat', 'Monkey', 'Rabit', 'Hampster', 'Skunk', 'Goldfish', 'Turtle', 'Chicken', 'Frog', 'Lizard'];
var title;
var animate;
var still;
var state;

// Function that adds buttons to the page. 
function createButton(holdName){
  var input = $("<input type='button' class = 'button' value='" + holdName + "'/>");
  input.appendTo($('h1'));
}

function renderButtons(){
  $('h1').empty();
  // for loop to add buttons to page using the topics array.
  for (var i = 0; i < topics.length; i++) {
  createButton(topics[i]);
  }
}
// DOCUMENT ON LOAD
$(document).ready(function(){
renderButtons();  

// Creates a new button when the user enters an animal.
$('#submit').click(function(){
  // Grab the input from the text box. 
  var userAnimal = $('#userInput').val().trim();
  // createButton(userAnimal);
  topics.push(userAnimal);
  renderButtons();
})  
// when the user clicks a button - it takes the value from that button and makes it the "title" so it searches for that topic. 
$(document).on('click', 'input:button', function(){
  title = $(this).val(); 

  // queryURL for Giphy API
  var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + title +  "&api_key=dc6zaTOxFJmzC");

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    console.log(response);
    $(".colOne").empty();
      // Insert 15 gifs related to the button the user clicks.
      for (var i = 0; i < 16; i++) {

      // Adding gifs
      var newRating =$("<p>");
      var newGif = $("<img>");
      var newDiv = $("<div>");
      newDiv.addClass("combined");
      newGif.attr("id", i);
      newGif.addClass("gif");
      newGif.attr("data-state", "animate");
      newGif.attr("src", response.data[i].images.downsized.url);
      newGif.attr("data-still", response.data[i].images.downsized_still.url); 
      newGif.attr("data-animate", response.data[i].images.downsized.url);
      newRating.html("Rating: " + response.data[i].rating);
      $(newDiv).append(newRating);
      $(newDiv).append(newGif);
      $(".colOne").append(newDiv);
      }

    })

}) 
          // when the user clicks a gif, change it to either still or animate. 
          $(document).on("click", ".gif", function(){
          // get the id of this.
          var myvar = $(this).attr("id");
          state = $(this).attr("data-state"); 
          var animateURL = $(this).attr("data-animate");
          var stillURL = $(this).attr("data-still");

            if (state === "animate") {
              // $(this).attr("src", response.data[myvar].images.downsized_still.url);
              $(this).attr("data-state", "still");
              $(this).attr("src", stillURL);
            } else{
              // $(this).attr("src", response.data[myvar].images.downsized.url);
              $(this).attr("data-state", "animate");
              $(this).attr("src", animateURL);
            }
                        
        })

});