  window.onload = function() {
  console.log("main.js is fully loaded");
  //initial grab
    //by id
  var dropdown = document.querySelector('#drop');
  var mapMe = document.querySelector('#map-me');
  var myForm = document.querySelector('#my-form');
  var parkSearch = document.querySelector('#park-search');
  var subBtn = document.querySelector('#submit-btn');
  var searchBtn = document.querySelector('#search-btn');
    //by class
  var clickMe = document.querySelector('.click-me');
  var foundMe = document.querySelector('.current-location');
  var findMeBtn = document.querySelector('.find-me-btn');
  var latLong = document.querySelector('.lat-long');
  var myLabel = document.querySelector('.my-label');

  var infoContainer = document.getElementById('info-container');
  infoContainer.style.display = 'none';
  myLabel.style.display = 'none';
  parkSearch.style.display = 'none';
  searchBtn.style.display = 'none';
  subBtn.style.display = 'none';

  //City's public recyclbin api from nyc opendata
  var baseQuery = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.json';

  // determine the current position
  // received direction from Mozilla MDN
  findMeBtn.addEventListener("click", function(event){
  event.preventDefault();

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
    var myLat  = position.coords.latitude;
    var myLong = position.coords.longitude;
    mapMe.innerHTML = '<p>Latitude is: ' + myLat + '° <br>Longitude is: ' + myLong + '°</p>';
    console.log(myLat, myLong);
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + myLat + "," + myLong + "&zoom=18&size=250x250&sensor=false";
    mapMe.appendChild(img);
    clickMe.innerHTML = "My current location is:";

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
  }
  //if geolocation is failed to load,
  function error() {
    mapMe.innerHTML = "Unable to retrieve your location";
  }
    mapMe.innerHTML = "<p>Locating you…</p>";
    clickMe.innerHTML = "";
    navigator.geolocation.getCurrentPosition(success, error);
  });

  //dropdown for borough
  document.getElementById('submit-btn').addEventListener('click', function(event){
  event.preventDefault();

  parkSearch.style.display = 'block';
  searchBtn.style.display = 'block';
  subBtn.remove();

  var boroughDrop = document.querySelector('.boroughNYC:checked');

  var findBoroughQuery = baseQuery + "?borough=" + boroughDrop.value;

    $.ajax({
      url: findBoroughQuery,
    }).done(function(findBoroughQueryresponse){
      console.log(findBoroughQueryresponse);
    }).fail(function(findBoroughQueryresponse){
      console.log("fail");
    }).always(function(findBoroughQueryresponse){
      console.log("always running");
    }); // end query
  });// end submit click fxn

  // //seaching parks' recycle bin in NYC through the borough
  document.getElementById('search-btn').addEventListener('click', function(event){
  event.preventDefault();
  console.log("Search button is being clicked");
  findMeBtn.remove();
  searchBtn.remove();
  myLabel.remove();
  parkSearch.remove();

  var userChosenPark = parkSearch.value.toLowerCase().replace(" ", "%20");
  var findParkQuery = baseQuery + "?park_site_name=" + userChosenPark;

    $.ajax({
      url: findParkQuery,
    }).done(function(findParkQueryresponse){
      console.log(findParkQueryresponse);
      for (var i = 0; i < findParkQueryresponse.length; i++ ) {
        if (parkSearch.value == findParkQueryresponse[i].park_site_name) {
          var newEl = document.createElement('p');
          newEl.innerHTML = "NYC Park: " + parkSearch.value + " @" + findParkQueryresponse[i].borough;
          dropdown.appendChild(newEl);
          console.log("I am at " + parkSearch.value + " @" + findParkQueryresponse[i].borough);
          console.log("I found recycle bin! @" + parkSearch.value + ", " + findParkQueryresponse.borough);
        }
      }

    }).fail(function(findParkQueryresponse){
      console.log("fail");
    }).always(function(findParkQueryresponse){
      console.log("always running");
    }); // end query
  });// end serch click fxn

};
