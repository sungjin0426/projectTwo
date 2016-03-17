window.onload = function() {
  console.log("main.js is fully loaded");

  var findMeBtn = document.querySelector('.find-me-btn');
  var foundMe = document.querySelector('.current-location');
  var latLong = document.querySelector('.lat-long');

  var infoContainer = document.getElementById('info-container');
  infoContainer.style.display = 'none';
  var query = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.json';

  findMeBtn.addEventListener("click", function(event){
    // determine the current position
    var success = function (position) {
      var currentLat = position.coords.latitude;
      var currentLon = position.coords.longitude;
      var myCoord = [currentLat, currentLon];
      console.log(myCoord);
      APIcall(currentLat, currentLon);
    };
    var error = function() {
      console.log("Unable");
    };
    var findSelf = navigator.geolocation.getCurrentPosition(success, error);
    console.log(findSelf);
  });

  var APIcall = function(currentLat, currentLon) {
  console.log('My location is at latitude: ' + currentLat + ", longitude:" + currentLon);
  findMeBtn.style.diplay = "none";
  foundMe.innerHTML = "I am at:";
  latLong.innerHTML = "Lat: " + currentLat + ", Long: " + currentLon;
  }

  document.getElementById('submit-btn').addEventListener('click', function(event){
  event.preventDefault();

    $.ajax({
      url: query,
      dataType: 'json'
    }).done(function(response){
      console.log(response);
    }).fail(function(response){
      console.log("fail");
    }).always(function(response){
      console.log("always running");
    }); // end query
  });

  //   $.ajax({
  //     url: query
  //   }).done(function(response){
  //     console.log(response);
  //   }).fail(function(response){
  //     console.log(peopleQueryResponse);
  //   }).always(function(response){
  //   }); // end query
  };
