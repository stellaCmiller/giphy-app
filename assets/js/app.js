var giphyApp = {
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

    searchTopic: function(query){
        
    }
}

giphyApp.makeButtons();

$("#add-topic").click( function() {
    event.preventDefault();
    giphyApp.addTopic($("#user-input").val());
    giphyApp.makeButtons();
    $("#user-input").val("");
})