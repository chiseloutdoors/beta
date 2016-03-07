var main = function() {
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);
  });
}

function initMap() {
  //Set US map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:37.1892273,lng:-113.2929227},
    zoom: 10,
    disableDefaultUI:false
  });

  // query trails from txt file (need to replace with data from mySQL database)
  var xmlhttp = new XMLHttpRequest();
  var url = "utah_trails.json";
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  //Parse and set marker and methods for each trail 
  function myFunction(response) {
    var arr = JSON.parse(response);
    for (var i = 0; i < arr.list.length; i++) {
      set_marker(arr.list[i]);
    };
  }

  
  function set_marker(trail){
    //Set marker
    var marker = new google.maps.Marker({
      position: trail.trailhead,
      map: map,
      title: trail.trail_name,
      url: trail.page,
      infowindow: trail_name
    });

    //Add 'click' listener for menu pop-up
    marker.addListener('click', function() {
      //Go to page link
      window.location = marker.url;

      /*map.setZoom(14);
      map.setCenter(marker.getPosition());
      //Set Link via Name
      document.getElementById('trail_name').innerHTML = marker.title;
      document.getElementById('trail_name').href = marker.url;
      //Pop Menu
      $('.menu').animate({
        left: "0px"
      }, 200);*/
    });
  }

};



$(document).ready(main);
