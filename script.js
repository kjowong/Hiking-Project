$(document).ready(function(){ //function runs only when document is ready
	$("button").click(function(){ //function runs when button is clicked
        $("button").addClass("is-loading"); //changes to a loading button when clicked
		var myInputZip = $("#zip").val();
		var myInputRadius = $("#radius").val();

		$.ajax({ //uses ajax to access 1st API (Google Maps)
			"Access-Control-Allow-Origin": "*", //fixes any cross-origin issues
		    headers: { "Accept": "application/json"},
		    crossDomain: true,
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + myInputZip + "&key=AIzaSyA2ImB_vfKMBm4X3h1yfFKzPbiJ22-MZ5c",
			type: "GET", // The HTTP Method, can be GET POST PUT DELETE etc
			data: {}, // Additional parameters here
		    dataType: "JSON",
		    jsonpCallback: "callback",
		    success: function(data) {

				var lat = data.results[0].geometry.location.lat;
				var lon = data.results[0].geometry.location.lng;
				
				$.ajax({ //on the success of 1st API call, access 2nd API (Trails)
				    url: "https://trailapi-trailapi.p.mashape.com/?lat=" + lat + "&limit=100&lon=" + lon + "&q[activities_activity_type_name_eq]=hiking&q[country_cont]=United+States&radius=" + myInputRadius,
				    type: "GET", 
				    data: {}, // Additional parameters here
				    dataType: "json",
				    success: function(data) { 

					    	var returnedHikes = _.pluck(data.places, "name"); //plucking all values based on key 'name'
					    	console.log(returnedHikes);
					    	var returnedCities = _.pluck(data.places, "city"); //plucking all values based on key 'city'
					    	console.log(returnedCities);

					    	if (returnedHikes === 0) {
					    		$("#returned_hikes").append("<div class='output_container'>Sorry, there aren't any hikes nearby. Try expanding your radius.</div>");
					    		console.log("inside of if statement");
					    	} 
					    	else {
						    	for (var i = 0; i < returnedHikes.length; i++) {
						    		var returnedDescriptions = _.pluck(data.places[i].activities, "description");
						    		var eachReturnedHike = returnedHikes[i];
						    		var eachReturnedCity = returnedCities[i];
						    		var eachReturnedDescription = returnedDescriptions;
						    		$("#returned_hikes").append("<div class='output_container'><ul><li><a href=https://www.google.com/search?q=" + eachReturnedHike + " " + eachReturnedCity + " " + "trailhead" + "' target=_blank>" + eachReturnedHike + "</a></li></ul><ul><li>" + eachReturnedDescription + "</li></ul><br></div>");
					    		}	//end of for loop
					    	} //end else statement

					    	$("button").on("click", function(){
			                    $("#returned_hikes").empty(); //empties out the previous results
			                });

							$("#test").text("append dammit");
					    	console.log(returnedHikes);
					    	$("button").removeClass('is-loading');
					 },
					    // error: function(err) { alert(err); },
					 error: function(err) { 
					    $("#returned_hikes").append("Zip code must be a 5-digit number. Miles must be a number.");
					 },
					 beforeSend: function(xhr) {
					    xhr.setRequestHeader("X-Mashape-Authorization", "Dj2zq0XDflmshi0eo7c7BX1KGoSQp1NzRTDjsnKUs68Z30N9rW"); // Enter here your Mashape key
					 }
					// }	//end of else statement
				}); //end of outside success function
			},
		    // error: function(err) { alert(err); },
		    error: function(err) { 
				$("#returned_hikes").append("Check your inputs.");
			},
		});
	});
});