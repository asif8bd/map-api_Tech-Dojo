var map;
var infowindow;
var placeTypes=['school', 'restaurant', 'hospital', 'bank'];
var userData = [
 { 'username': 'Tom',
'current_latitude': 23.752805,
'current_longitude': 90.375433,
'radius': 500
 },
 { 'username': 'Jane',
'current_latitude': 23.755790,
'current_longitude': 90.387363,
'radius': 400
 },
 { 'username': 'Dave',
'current_latitude': 23.765138,
'current_longitude': 90.362601,
'radius': 450
 },
 { 'username': 'Sarah',
'current_latitude': 23.792452,
'current_longitude': 90.416696,
'radius': 600
 },
 { 'username': 'John',
'current_latitude': 23.863064,
'current_longitude': 90.400126,
'radius': 640
 }
];

function initialize() {
	var u=document.getElementById("user");
	var uID=u.options[u.selectedIndex].value;

	var p=document.getElementById("place");
	var pID=p.options[p.selectedIndex].value;
	
	document.getElementById("msg").innerHTML ="Now displaying 5 "+placeTypes[pID]+" around "+userData[uID].username+" within the radius of "+userData[uID].radius+" meters";
	
	var zeroPoint = new google.maps.LatLng(userData[uID].current_latitude, userData[uID].current_longitude);

	  map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: zeroPoint,
		zoom: 16
	  });

  var request = {
    location: zeroPoint,
    radius: userData[uID].radius,
    types: [placeTypes[pID]]
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);  
  service.nearbySearch(request, callback);
  
  //drawing marker for user  
   var userMarker = new google.maps.Marker({
      position: zeroPoint,     
      icon: 'images/cartoon.png',
	  title: userData[uID].username
  });    
  userMarker.setMap(map);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  /*//The commented portion can view all places from fetched data.
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    } */
	for (var i = 0; i < 5; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
	 animation: google.maps.Animation.DROP
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(getIWContent(place));
    infowindow.open(map, this);
  });
}
//This function generates the infowindow on the top of each marker when the marker is clicked
function getIWContent(place) {
    var content = "";
    content += '<table><tr><td>';
    content += '<img class="placeIcon" src="' + place.icon + '"/></td>';
    content += '<td><b><a href="' + place.url + '">' + place.name + '</a></b>';
    content += '</td></tr></table>';
    return content;
  }

