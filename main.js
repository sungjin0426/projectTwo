window.onload = function() {
  console.log("main.js is fully loaded");

  var infoContainer = document.getElementById('info-container');
  infoContainer.style.display = 'none';

  var baseURL =

  // If submit button is clicked
  document.getElementById('submit-btn').addEventListener('click', function(event){
  event.preventDefault();

    $.ajax({
      url: query
    }).done(function(response){
    }).fail(function(response){
      console.log(response);
    }).always(function(response){
    }); // end query
  });

    $.ajax({
      url: query
    }).done(function(response){
      console.log(response);
    }).fail(function(response){
      console.log(peopleQueryResponse);
    }).always(function(response){
    }); // end query
  });
};
