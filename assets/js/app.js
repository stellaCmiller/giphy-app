//Contains all the methods necessary to searching the giphy api and displaying gifs
var giphyApp = {
    apiKey: "6WQSswR7NKx3IHsKier7FfZ0jOJ0Eqbi",
    gifTopics: ["cats", "dogs", "chris pratt", "batman", "birds", "Michael Scott", "birthday"],

    makeButtons: function(){
        $("#gif-buttons").empty();
        this.gifTopics.forEach(e =>{
            $("#gif-buttons").append(`
            <button class="gif-button">${e}</button>
            `)
        });
    },

    addTopic: function(userInput){
        this.gifTopics.push(userInput);
    },

    searchAndDisplay: function(query){
        queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`;
        $.get(queryURL).then(function(response){
            console.log(response);
            response.data.forEach(e =>{
            $("#gif-display").append(`<div class="gif-box"><img 
            class="gif" 
            animated="${e.images.fixed_height.url}" 
            still ="${e.images.fixed_height_still.url}" 
            state= "still" 
            src="${e.images.fixed_height_still.url}">
            <p>Rating: ${e.rating}</p>
            <p>Favorite this Gif? </p>
            </div>`);
            });
        });
    },

    toggleAnimation: function(gif){
        if ($(gif).attr("state") == "still"){
            $(gif).attr("src", `${$(gif).attr("animated")}`);
            $(gif).attr("state", "animated");
        } else {
            $(gif).attr("src", `${$(gif).attr("still")}`);
            $(gif).attr("state", "still");
        }
    }
}

//called initially to display starting list of gif topics buttons
giphyApp.makeButtons();

//When the user enters a gif topic and presses enter or clicks 'enter', the topic is added to the topic array and a button is created for it
$("#add-topic").click( function() {
    event.preventDefault();
    giphyApp.addTopic($("#user-input").val());
    giphyApp.makeButtons();
    $("#user-input").val("");
})

//When the user clicks a gif button, the gifphy API is queried and 10 gifs are displayed
$("body").on("click", ".gif-button", function(){
    $("#gif-display").empty();
    giphyApp.searchAndDisplay($(this).text());
})

//When a still gif is clicked, it animates. If an animated gif is click, it stops
$("body").on("click", ".gif", function(){
    giphyApp.toggleAnimation(this);
})