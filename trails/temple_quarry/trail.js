/*VARIABLES*/
var trailhead = {lat: 37.102846, lng: -113.595844};
var placeType = ''; /*search keywords for radar search*/
var names = ''; //place names for radar search
var mapContainer = ''; /*where to place map in html*/ 
var sponsor_type = '';
var sponsor = { rec: "ChIJwwwmycNEyoARU_80VcF25iE", 
                food: "ChIJ03TcEzBFyoAR9eYhDVccGGY", 
                pub: "ChIJRZn_fC5byoARsvxzYuO3vl8",
                accomdation: "ChIJMxsumC1byoARX6f_5mzGkTQ",
                transport: "ChIJI9pk1DpbyoAR22NzlZs6fr4",
                camp: "ChIJN_gZ3BfuyoAR53nzxpJyQlI",
                ammenity: "ChIJm94_eZZEyoARndqYachn1mc"};


var main = function() {

    /* 360 Viewer */
    $('#photo_sphere_close').click(function() {
      document.getElementById('photo_sphere_canvas').style.zIndex = "-1";    
    });
        

    /* TRAIL NAV */
    $('.photos-btn').click(function(){
       
    });

    $('.forecast-btn').click(function(){

      //CURRENT WEATHER
      //query OpenWeatherMap by geolocation
      var weather_query = "http://api.openweathermap.org/data/2.5/weather?lat="+trailhead.lat+"&lon="+trailhead.lng+"&APPID=1088269cadd02d84dba9b274fc7bc097&units=imperial";
      $.getJSON( weather_query, {
        format: "json"
      })
      .done(function( data ) {
        document.getElementById("current_img").src =  "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        document.getElementById("current_avg").innerHTML = Math.round(data.main.temp); 
        document.getElementById("current_conditions").innerHTML = data.weather[0].description + "<br>" + "Wind " + data.wind.speed + "mph";
      });

      // FORECAST
      var xmlhttp = new XMLHttpRequest();
      //query OpenWeatherMap by geolocation
      var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+trailhead.lat+"&lon="+trailhead.lng+"&mode=json&units=imperial&cnt=7&APPID=1088269cadd02d84dba9b274fc7bc097";
      
      xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          myFunction(xmlhttp.responseText);
        }
      }
      xmlhttp.open("GET", url, true);
      xmlhttp.send();

      function myFunction(response) {
          var arr = JSON.parse(response);
      
          for (var i = 0; i < arr.list.length; i++) {
            document.getElementById("icon" + i).src = "http://openweathermap.org/img/w/" + arr.list[i].weather[0].icon + ".png"; 
            document.getElementById("avg" + i).innerHTML = Math.round(arr.list[i].temp.day);
            document.getElementById("range" + i).innerHTML = Math.round(arr.list[i].temp.max) + "<br>" + Math.round(arr.list[i].temp.min);
            document.getElementById("desc" + i).innerHTML = arr.list[i].weather[0].description;

          };
      }

      $('.forecast').animate({
        right: "0px"
      }, 200);

    });

    $('#forecast_close').click(function() {
      $('.forecast').animate({
        right: "-250px"
      }, 200);
    });

    $('.distance-btn').click(function(){
       
    });

    // Impliment later
    $('.community-btn').click(function(){
       
    });
    /* End Trail Nav */
    

    /* PREP MAP */
    $('.services-btn').click(function(){
      var currentSlide = $('.active-slide-map');
       var nextSlide = $('#rec_shop_slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.services-btn');

       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       textSearch(trailhead, 'sports store', "rec_shop_slide", sponsor.rec);
       document.getElementById('map_headline').innerHTML = "Rec Shops";
       document.getElementById('map_headline').style.fontSize = "50px";
    });

    /* Restaurants */
    $('.food-btn').click(function(){
       var currentSlide = $('.active-slide-map');
       var nextSlide = $('#food_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.food-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'food|restaurant', "food_slide", sponsor.food);
       document.getElementById('map_headline').innerHTML = "Restaurants";
       document.getElementById('map_headline').style.fontSize = "40px";
    });

    /* Pubs */
    $('.pubs-btn').click(function(){
      var currentSlide = $('.active-slide-map');
       var nextSlide = $('#pub_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.pubs-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'bar', "pub_slide", sponsor.pub);
       document.getElementById('map_headline').innerHTML = "Pubs & Bars";
       document.getElementById('map_headline').style.fontSize = "45px";
    });

    /* Accomodations */
    $('.accomodations-btn').click(function(){
      var currentSlide = $('.active-slide-map');
       var nextSlide = $('#accomodations_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.accomodations-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'lodging', "accomodations_slide", sponsor.accomodation);
       document.getElementById('map_headline').innerHTML = "Lodging";
       document.getElementById('map_headline').style.fontSize = "55px";
    });

    /* Transportation */
    $('.transport-btn').click(function(){
      var currentSlide = $('.active-slide-map');
       var nextSlide = $('#gas_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.transport-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'parking|gas_station', "gas_slide", sponsor.transport );
       document.getElementById('map_headline').innerHTML = "Gas & Parking";
       document.getElementById('map_headline').style.fontSize = "40px";
    });

    /* Airport */
    $('.airfare-btn').click(function(){
       var currentSlide = $('.active-slide-map');
       var nextSlide = $('#airport_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.airfare-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'airport', "airport_slide");
       document.getElementById('map_headline').innerHTML = "Airports";
       document.getElementById('map_headline').style.fontSize = "55px";
    });

    /* Camp & RVs */
    $('.camp-btn').click(function(){
       var currentSlide = $('.active-slide-map');
       var nextSlide = $('#camp_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.camp-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'campground|rv_park', "camp_slide", sponsor.camp);
       document.getElementById('map_headline').innerHTML = "Camping";
       document.getElementById('map_headline').style.fontSize = "55px";
    });

    /* Amenities */
    $('.amenities-btn').click(function(){
       var currentSlide = $('.active-slide-map');
       var nextSlide = $('#amenities_slide');
       currentSlide.fadeOut(600).removeClass('active-slide-map');
       nextSlide.fadeIn(600).addClass('active-slide-map');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.amenities-btn');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       /*Map Search*/
       radarSearch(trailhead, 'laundry', "amenities_slide", sponsor.ammenity);
       document.getElementById('map_headline').innerHTML = "Amenities";
       document.getElementById('map_headline').style.fontSize = "50px";
    });
  /* END PREP MAP */


  /* PREP GEAR */
    $('.clothes-btn').click(function(){
       var currentSlide = $('.active-slide-gear');
       var nextSlide = $('#clothes-slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.clothes-btn');

       currentSlide.fadeOut(600).removeClass('active-slide-gear');
       nextSlide.fadeIn(600).addClass('active-slide-gear');

       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       document.getElementById('gear_headline').innerHTML = "Apparel";
       document.getElementById('gear_headline').style.fontSize = "60px";
    });

    /* Pack */
    $('.pack-btn').click(function(){
       var currentSlide = $('.active-slide-gear');
       var nextSlide = $('#pack-slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.pack-btn');
       
       currentSlide.fadeOut(600).removeClass('active-slide-gear');
       nextSlide.fadeIn(600).addClass('active-slide-gear');
      
       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       document.getElementById('gear_headline').innerHTML = "To Pack";
       document.getElementById('gear_headline').style.fontSize = "65px";
    });

    /* Sleep */
    $('.sleep-btn').click(function(){
       var currentSlide = $('.active-slide-gear');
       var nextSlide = $('#sleep-slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.sleep-btn');
       
       currentSlide.fadeOut(600).removeClass('active-slide-gear');
       nextSlide.fadeIn(600).addClass('active-slide-gear');
      
       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       document.getElementById('gear_headline').innerHTML = "Sleep";
       document.getElementById('gear_headline').style.fontSize = "65px";
    });
    
    /* Provisions */
    $('.provisions-btn').click(function(){
       var currentSlide = $('.active-slide-gear');
       var nextSlide = $('#provisions-slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.provisions-btn');
       
       currentSlide.fadeOut(600).removeClass('active-slide-gear');
       nextSlide.fadeIn(600).addClass('active-slide-gear');
      
       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       document.getElementById('gear_headline').innerHTML = "Provisions";
       document.getElementById('gear_headline').style.fontSize = "40px";
    });
    
    /* Safety */
    $('.safety-btn').click(function(){
       var currentSlide = $('.active-slide-gear');
       var nextSlide = $('#safety-slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.safety-btn');
       
       currentSlide.fadeOut(600).removeClass('active-slide-gear');
       nextSlide.fadeIn(600).addClass('active-slide-gear');
      
       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       document.getElementById('gear_headline').innerHTML = "Safety";
       document.getElementById('gear_headline').style.fontSize = "65px";
    });
    
    /* Play */
    $('.play-btn').click(function(){
       var currentSlide = $('.active-slide-gear');
       var nextSlide = $('#play-slide');

       var currentBtn = $('.active-btn');
       var nextBtn = $('.play-btn');
       
       currentSlide.fadeOut(600).removeClass('active-slide-gear');
       nextSlide.fadeIn(600).addClass('active-slide-gear');
      
       currentBtn.removeClass('active-btn');
       nextBtn.addClass('active-btn');

       document.getElementById('gear_headline').innerHTML = "For Fun";
       document.getElementById('gear_headline').style.fontSize = "65px";
    });
    /* END PREP GEAR */


    /* NEARBY TRAILS */
    $('.arrow-next').click(function(){
       var currentSlide = $('.active-slide-nearby');
       var nextSlide = currentSlide.next();
       
       var currentDot = $('.active-dot');
       var nextDot = currentDot.next();
       
       if(nextSlide.length == 0){
            nextSlide = $('.slide-nearby').first();
            nextDot = $('.dot').first();
       }
       
       currentSlide.fadeOut(600).removeClass('active-slide-nearby');
       nextSlide.fadeIn(600).addClass('active-slide-nearby');
       currentDot.removeClass('active-dot');
       nextDot.addClass('active-dot');  
    });

    $('.arrow-prev').click(function(){
       var currentSlide = $('.active-slide-nearby');
       var prevSlide = currentSlide.prev();
       
       var currentDot = $('.active-dot');
       var prevDot = currentDot.prev();
       
       if(prevSlide.length == 0){
            prevSlide = $('.slide-nearby').last();
            prevDot = $('.dot').last();
       }
       
       currentSlide.fadeOut(600).removeClass('active-slide-nearby');
       prevSlide.fadeIn(600).addClass('active-slide-nearby');
       currentDot.removeClass('active-dot');
       prevDot.addClass('active-dot'); 
    }); 
    /* END NEARBY TRAILS */
};


// SET TRAIL MAP
function initMap() {

  //Load Trail Data
  var xmlhttp = new XMLHttpRequest();
  var url = "trail.json";
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
      
  //Create Map
  var map = new google.maps.Map(document.getElementById('trail_map_canvas'), {
    center: trailhead,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    heading: 90,
    tilt: 45
  });

  //Parse and set marker and methods for each trail 
  function myFunction(response) {
    var arr = JSON.parse(response);
    
    //Set Photo Spheres
    arr.spheres.forEach(setSphere);

    //Set POIs
    arr.pois.forEach(setPoi);

    // Create an ElevationService.
    var elevator = new google.maps.ElevationService;
    // Draw the path, using the Visualization API and the Elevation service.
    displayPathElevation(arr.cairns[0], elevator, map);

    // If trail splits, show divergence
    if (arr.cairns.length == 2) {
      //Set Trail
      var path = new google.maps.Polyline({
      path: arr.cairns[1],
      geodesic: true,
      strokeColor: 'orange',
      strokeOpacity: 1.0,
      strokeWeight: 3
      });
  
      path.setMap(map);
    };

    //Set Trail Info
    document.getElementById('trail_name').innerHTML = arr.trail.name;
    document.getElementById('distance').innerHTML = "Distance: " + arr.trail.distance;
    document.getElementById('elevation_gain').innerHTML = "Elevation: " + arr.trail.elevation;
    document.getElementById('terrain').innerHTML = "Terrain: " + arr.trail.terrain;
    document.getElementById('cell_signal').innerHTML = "Cell Signal: " + arr.trail.signal;
    document.getElementById('city').innerHTML = "Near: " + arr.trail.city + "," + arr.trail.state;
  };

  function setPoi(poi){
    var marker = new google.maps.Marker({
      position: poi.coord,
      icon: {
        title: poi.desc,
        url: poi.img
      },
      map: map,
    });
  };

  function displayPathElevation(path, elevator, map) {
    // Display a polyline of the elevation path.
    new google.maps.Polyline({
      path: path,
      strokeColor: 'orange',
      opacity: 1,
      strokeWeight: 3,
      map: map
    });
    // Create a PathElevationRequest object using this array.
    // Ask for 256 samples along that path.
    // Initiate the path request.
    elevator.getElevationAlongPath({
      'path': path,
      'samples': path.length
    }, plotElevation);
  };

  // Takes an array of ElevationResult objects, draws the path on the map
  // and plots the elevation profile on a Visualization API ColumnChart.
  function plotElevation(elevations, status) {
    var chartDiv = document.getElementById('elevation_chart');
    if (status !== google.maps.ElevationStatus.OK) {
      // Show the error code inside the chartDiv.
      chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
          status;
      return;
    }
    // Create a new chart in the elevation_chart DIV.
    var chart = new google.visualization.LineChart(chartDiv);
    // Extract the data from which to populate the chart.
    // Because the samples are equidistant, the 'Sample'
    // column here does double duty as distance along the
    // X axis.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < elevations.length; i++) {
      data.addRow(['', elevations[i].elevation]);
    }
    // Draw the chart using the data within its DIV.
    chart.draw(data, {
      height: 150,
      legend: 'none',
      titleY: 'Elevation (m)'
    });
  };

  //Set Photo Spheres
  function setSphere(sphere) {
        var marker = new google.maps.Marker({
          map: map,
          position: sphere.coord,
          url: sphere.sphere
        });
      
        //Show Pano on click
      google.maps.event.addListener(marker, 'click', function() {
        document.getElementById('photo_sphere_canvas').style.zIndex = "1";
        document.getElementById('photo_sphere').src = marker.url;
      });
    };
}


// SET PREP MAP
function setMap() {
  
  var map = new google.maps.Map(document.getElementById('sponsor_slide'), {
    center: trailhead,
    zoom: 10
  });

  /* Add trailhead marker */
  var marker = new google.maps.Marker({
    position: trailhead,
    map: map,
    title: 'Trail Head'
  });

  //Handle click event for results
  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) { //if
        console.error(status);
        return;
      }
      
    });
  });
}


// TEXT SEARCH
function textSearch(trailhead, searchText, mapContainer, place_type) {
  
  //Clear previous slection
  clearPrepMenu();

  // Place Trailhead
  var map = new google.maps.Map(document.getElementById(mapContainer), {
      center: trailhead,
      zoom: 10
    });

  var request = {
    location: trailhead,
    radius: '50000',
    query: searchText
  };

  infowindow = new google.maps.InfoWindow();

  /* Add trailhead marker */
  var marker = new google.maps.Marker({
    position: trailhead,
    map: map,
    title: 'Trail Head'
    });

  var service = new google.maps.places.PlacesService(map);

  // Set Sponsored Marker
  /*service.getDetails({placeId: place_type}, 
    function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
          }
        });

        document.getElementById('place_name').innerHTML = place.name;
        //document.getElementById('place_pic').src = result.icon;
        document.getElementById('place_adress').innerHTML = "Address<br>" + place.formatted_address;
        document.getElementById('place_phone').innerHTML = "Phone<br>" + place.formatted_phone_number;
        document.getElementById('place_rating').innerHTML = "Rating of 5<br>" + place.rating;
        document.getElementById('place_web').href = place.url;
        document.getElementById('place_hours').innerHTML = place.openinghours.open_now;
      }
    }
  );*/


  service.textSearch(request, callback);


  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: {
        url: 'http://maps.gstatic.com/mapfiles/circle.png',
        anchor: new google.maps.Point(10, 10),
        scaledSize: new google.maps.Size(10, 17)
      }
    });

    //Handle click event for results
    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place, function(result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
  
          document.getElementById('place_name').innerHTML = result.name;
          //document.getElementById('place_pic').src = result.icon;
          document.getElementById('place_adress').innerHTML = "Address<br>" + result.formatted_address;
          document.getElementById('place_phone').innerHTML = "Phone<br>" + result.formatted_phone_number;
          document.getElementById('place_rating').innerHTML = "Rating of 5<br>" + result.rating;
          document.getElementById('place_name').href = result.url;
          document.getElementById('place_hours').innerHTML = result.openinghours.open_now;
        });
    });

    //Handle mouse over event for results
        google.maps.event.addListener(marker, 'mouseover', function() {
          service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              console.error(status);
              return;
            }
              infoWindow.setContent(result.name);
              infoWindow.open(map, marker);
            });
        });
  }
};

// RADAR SEARCH
function radarSearch(trailhead, placeType, mapContainer){
  /*Create map search for "placeType" around trailhead*/
    //Clear previous slection
    clearPrepMenu();

    var myOptions = {
        zoom: 10,
        center: trailhead,
        mapTypeId: google.maps.MapTypeId.ROADMAP
       };
       
      /*Set search map into corresponding slide*/ 
      var map = new google.maps.Map(document.getElementById(mapContainer), 
        myOptions);

      /*"infoWindow" handles info of places returned from search*/
      infoWindow = new google.maps.InfoWindow();
      /*"Service" handles radar search results to find places*/
      service = new google.maps.places.PlacesService(map);

      // The idle event is a debounced event, so we can query & listen without
      // throwing too many requests at the server.
      map.addListener('idle', performSearch);
      
      /* Add trailhead marker */
      var marker = new google.maps.Marker({
        position: trailhead,
        map: map,
        title: 'Trail Head'
        });

      function performSearch() {
        var request = {
          keyword: placeType,
          name: names,
          location: trailhead,
          radius: 50000
        };
        service.radarSearch(request, callback);
      }
      
      function callback(results, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        for (var i = 0, result; result = results[i]; i++) {
          addMarker(result);
        }
      }
      
      //Add marker (dot) for each 
      function addMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
          }
        });
      
        //Handle click event for results
        google.maps.event.addListener(marker, 'click', function() {
          service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              console.error(status);
              return;
            }
              document.getElementById('place_name').innerHTML = result.name;
          //document.getElementById('place_pic').src = result.icon;
          document.getElementById('place_adress').innerHTML = "Address<br>" + result.formatted_address;
          document.getElementById('place_phone').innerHTML = "Phone<br>" + result.formatted_phone_number;
          document.getElementById('place_rating').innerHTML = "Rating of 5<br>" + result.rating;
          document.getElementById('place_web').href = result.url;
          document.getElementById('place_hours').innerHTML = result.openinghours.open_now;
        });
      });
  

        //Handle mouse over event for results
        google.maps.event.addListener(marker, 'mouseover', function() {
          service.getDetails(place, function(result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              console.error(status);
              return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
            });
        });
      }
};

// Clear Prep Menu
function clearPrepMenu(){
  document.getElementById('place_name').innerHTML = "";
  //document.getElementById('place_pic').src = result.icon;
  document.getElementById('place_adress').innerHTML = "";
  document.getElementById('place_phone').innerHTML = "";
  document.getElementById('place_rating').innerHTML = "";
  document.getElementById('place_name').href = "";
  document.getElementById('place_hours').innerHTML = "";
};

//Function To Display Popup
function div_show() {
document.getElementById('abc').style.display = "block";
}


$(document).ready(main);