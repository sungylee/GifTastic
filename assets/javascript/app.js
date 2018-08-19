
// Used examples from ajax activites button triggered ajax & log movie name & pausing-gifs-solutions

$(function() {
  makeButtons(searchArray, 'searchButton', '#buttons-view');
 
})


// Initial array of search - things
var searchArray = ['Dog', 'Car', 'Funny', 'Boat', 'Cat', 'Cow'];

//searchButton --> classToAdd
//#buttons-view --> areatoAddto
// Function for displaying movie data
function makeButtons(searchArray,classToAdd,areaToAddto) {
    // Deleting the list prior to adding new search
    // (this is necessary otherwise we will have repeat buttons)
    $(areaToAddto).empty();

    for (var i=0; i < searchArray.length; i++) {
        var a = $("<button>");
        // Adding a class of searchButton to our button
        a.addClass(classToAdd);
        // Adding a data-attribute to button
        a.attr("data-name", searchArray[i]);
        // Providing the initial button text
        a.text(searchArray[i]);
        // Adding the button to the HTML
        $(areaToAddto).append(a);
    }
}

var numGIFs = 10;  
var APIKey = "dc6zaTOxFJmzC";

//the user clicks on button to generate 10 images based on variable numGifs
$(document).on('click', '.searchButton', function() {

    // Value of button that will be used to search
    var searchFor = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchFor +'&api_key=' + APIKey + '&limit='+numGIFs;
       
    // Performing our AJAX GET request
    $.ajax({
        url:queryURL,
        method: "GET"
    }) 
        .done(function(response) {
        var results = response.data;
     
         for(var i=0; i < results.length;i++) {

            // Creating a div with the class "search-item
            var searchDiv = $("<div class='search-item'>");

            // Creating  rating value
            var rating = results[i].rating;

            // Creating a paragraph tag with the result search-item's rating
            var p = $("<p>").text("Rating: " + rating);

            //animated image 
            var animatedImage = results[i].images.fixed_height.url;

            //still image
            var stillImage = results[i].images.fixed_height_still.url;
            
            var image = $("<img>");
            image.attr("src", stillImage);
            image.attr("data-still", stillImage);
            image.attr("data-animated", animatedImage);
            image.attr("data-state", "stillImage");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").prepend(searchDiv);

         }
        })
    })
   

  $(document).on("click", ".searchImage", function(event) {
    event.preventDefault();

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
     var state = $(this).attr("data-state");

      // If the clicked image's state is still,  update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
     if (state == "still") {
           $(this).attr("src", $(this).attr("data-animated"));
           $(this).attr("data-state","animate");

     } else {
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state","still");

     }
     
    })

    // This function takes value from the input box and adds it into topic list
    $("#add-Search").on("click", function(event) {
      // Preventing the buttons default behavior when clicked (which is submitting a form)  
      event.preventDefault();
      // This line grabs the input from the textbox
      var newSearch = $("#search-input").val().trim();

      // Adding the search from the textbox to our array
       searchArray.push(newSearch);
        
       // Calling makeButtons which handles the processing of our search array
       makeButtons(searchArray, 'searchButton', '#buttons-view');
    })
    
    
