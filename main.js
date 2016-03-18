window.onload = function() {
  console.log("main.js is fully loaded");
  //initial grab
  var mapMe = document.querySelector('#map-me');
  var findMeBtn = document.querySelector('.find-me-btn');
  var foundMe = document.querySelector('.current-location');
  var latLong = document.querySelector('.lat-long');
  var myLabel = document.querySelector('.my-label');
  var parkSearch = document.querySelector('#park-search');
  var subBtn = document.querySelector('#submit-btn');
  var dropdown = document.querySelector('#drop');
  var clickMe = document.querySelector('.click-me');

  var infoContainer = document.getElementById('info-container');
  infoContainer.style.display = 'none';
  myLabel.style.display = 'none';
  subBtn.style.display = 'none';
  parkSearch.style.display = 'none';

  //City's public recyclbin api from nyc opendata
  var baseQuery = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.json';

  // determine the current position
  // received direction from Mozilla MDN
  findMeBtn.addEventListener("click", function(event){
  console.log("Find where i am!");
  var mapMe = document.querySelector('#map-me');
  if (!navigator.geolocation){
    mapMe.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    console.log("Turn on your locator");
  }
  //if geolocation is successfully loaded,
  function success(position) {
    myLabel.style.display = 'block';
    subBtn.style.display = 'block';
    parkSearch.style.display = 'block';
    var myLat  = position.coords.latitude;
    var myLong = position.coords.longitude;
    mapMe.innerHTML = '<p>Latitude is: ' + myLat + '° <br>Longitude is: ' + myLong + '°</p>';
    console.log(myLat, myLong);
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + myLat + "," + myLong + "&zoom=18&size=250x250&sensor=false";
    mapMe.appendChild(img);
    clickMe.innerHTML = "My current location is:"

    $.ajax({
      url: baseQuery,
      dataType: 'json'
    }).done(function(response){
      console.log(response);

    }).fail(function(response){
      console.log("fail");
    }).always(function(response){
      console.log("always running");
    }); // end query
  };
  //if geolocation is failed to load,
  function error() {
    mapMe.innerHTML = "Unable to retrieve your location";
  }
    mapMe.innerHTML = "<p>Locating you…</p>";
    clickMe.innerHTML = "";
    navigator.geolocation.getCurrentPosition(success, error);
  });



  //dropdown for borough
  var boroughDrop = document.querySelector('#borough-nyc').value;

  var findBoroughQuery = baseQuery + "?borough=" + boroughDrop;

  document.getElementById('submit-btn').addEventListener('click', function(event){
  event.preventDefault();

    $.ajax({
      url: findBoroughQuery,
    }).done(function(findBoroughQueryresponse){
      console.log(findBoroughQueryresponse);
    }).fail(function(findBoroughQueryresponse){
      console.log("fail");
    }).always(function(findBoroughQueryresponse){
      console.log("always running");
    }); // end query

  });// end click fxn

};
