// e$(function() {
//     var availableTags = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
// // $("#state" ).autocomplete({
// //       source: availableTags
// //     });
// //   });

$(document).ready(function(){

	$("button").click(function(){		//the type string needs to match where the click event handler is pointing to
        $("button").addClass('is-loading');
		var myInputZip = $('#zip').val();
		var myInputRadius = $('#radius').val();
		
        

		console.log("you are such a badass");
		console.log("it's not broken, it's just taking a while to load....");
		console.log("the input zip is: " + myInputZip);
		console.log("the input radius is: " + myInputRadius);
		
		$.ajax({
			"Access-Control-Allow-Origin": "*",
		    headers: { "Accept": "application/json"},
		    crossDomain: true,

			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + myInputZip + '&key=AIzaSyA2ImB_vfKMBm4X3h1yfFKzPbiJ22-MZ5c',
			type: 'GET',
			data: {}, // Additional parameters here
		    dataType: 'JSON',
		    jsonpCallback: 'callback',
		    success: function(data) {
		    	console.log("zip code success function is successful");
				console.log(data);
				
				var lat = data.results[0].geometry.location.lat;
				var lon = data.results[0].geometry.location.lng;
				
				console.log(lat);
				console.log(lon);

				
				$.ajax({
		    
				    url: 'https://trailapi-trailapi.p.mashape.com/?lat=' + lat + '&limit=100&lon=' + lon + '&q[activities_activity_type_name_eq]=hiking&q[country_cont]=United+States&radius=' + myInputRadius,
				    
				    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
				    data: {}, // Additional parameters here
				    dataType: 'json',
				    
				    success: function(data) { 
				    	console.log("the success function in ajax is working");
				    	console.log(data); 
					    	
					    	var returnedHikes = _.pluck(data.places, "name"); 
					    	var returnedCities = _.pluck(data.places, "city");  
					    	
					    	if (returnedHikes == null) {
					    		$("#returned_hikes").append("Sorry, there aren't any hikes nearby. Try expanding your radius.");
					    		console.log("inside of if statement");
					    	} else {

					    	for (var i = 0; i < returnedHikes.length; i++) {
					    		var returnedDescriptions = _.pluck(data.places[i].activities, "description");
					    		
					    		var eachReturnedHike = returnedHikes[i];
					    		var eachReturnedCity = returnedCities[i];
					    		var eachReturnedDescription = returnedDescriptions;
					    		$('#returned_hikes').append("<div class='output_container'><ul><li><a href='https://www.google.com/search?q=" + eachReturnedHike + " " + eachReturnedCity + " " + "trailhead" + "' target=_blank>" + eachReturnedHike + "</a></li></ul><ul><li>" + eachReturnedDescription + "</li></ul><br></div>");
					    		
					    	}	//end of else statement
					    	}; //end for loop

					    	$("button").on('click', function(){
			                    $('#returned_hikes').empty() //empties out previous results (hopefully)
			                    //location.reload();
			                });
					    	
							
							$('#test').text("append dammit");
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
					}); //end of success function
				    },
		    // error: function(err) { alert(err); },
		    error: function(err) { 
					    	$("#returned_hikes").append("Check your inputs.");
					    },
		});
		
		// second ajax (original)
		// $.ajax({
		//     // "Access-Control-Allow-Origin": "*",
		//     // headers: { "Accept": "application/json"},
		//     // crossDomain: true,
		//     // // url: 'https://trailapi-trailapi.p.mashape.com/?limit=100&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver&q[country_cont]=United+States&q[state_cont]=Colorado&radius=25',
		//     url: 'https://trailapi-trailapi.p.mashape.com/?lat=' + lat + '&limit=100&lon=' + lon + '&q[activities_activity_type_name_eq]=hiking&q[country_cont]=United+States',

		//     // url: 'https://trailapi-trailapi.p.mashape.com/?limit=100&q[activities_activity_type_name_eq]=hiking&q[city_cont]=' + myInputCity + '&q[country_cont]=United+States&q[state_cont]=' + myInputState + '&radius=' + myInputRadius, // The URL to the API. You can get this in the API page of the API you intend to consume
		//     type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		//     data: {}, // Additional parameters here
		//     dataType: 'json',
		    
		//     success: function(data) { 
		//     	console.log("the success function in ajax is working");
		//     	console.log(data); 
		//     	// var returnedHikes = data.places.map(function(answer) {
		//     	// 	return answer.name;
		//     	// });
		//     	var returnedHikes = _.pluck(data.places, "name"); 
		//     	var returnedCities = _.pluck(data.places, "city"); 
		//     	// returnedHikes.forEach(function(data) {
		    		
		//     	// });

		//     	for (var i = 0; i < returnedHikes.length; i++) {
		//     		console.log(returnedHikes[i]);
		//     		var eachReturnedHike = returnedHikes[i];
		//     		var eachReturnedCity = returnedCities[i];
		//     		$('#returned_hikes').append("<ul><li><a href='https://www.google.com/search?q=" + eachReturnedHike + " " + eachReturnedCity + " " + "trailhead" + "' target=_blank>" + eachReturnedHike + "</a></li></ul>");

		//     		// $('#returned_hikes').append("<ul><li><a href='https://www.google.com/search?q=");
		//     		// $('#returned_hikes').text("<ul><li><a href='https://www.google.com/search?q=" + eachReturnedHike + " " + eachReturnedCity + " " + "trailhead" + "' target=_blank>" + eachReturnedHike + "</a></li></ul>");
		//     	};

		//     	$("button").on('click', function(){
  //                   $('#returned_hikes').empty() //empties out previous results (hopefully)
  //                   //location.reload();
  //               });
		    	
		// 		// $('#returned_hikes').append("<ul><li>" + eachReturnedHike + "</li></ul>");
		// 		$('#test').text("append dammit");
		//     	console.log(returnedHikes);
		//     	// $('returned_hikes').append("<ul><li>" + returnedHikes + "</li></ul>");
		//     	// var hike_name = returnedHikes();
		//     	// console.log(hike_name);
		//     	// $("#returned_hikes").append(hike_name);
		//     },
		//     error: function(err) { alert(err); },
		//     beforeSend: function(xhr) {
		//     xhr.setRequestHeader("X-Mashape-Authorization", "Dj2zq0XDflmshi0eo7c7BX1KGoSQp1NzRTDjsnKUs68Z30N9rW"); // Enter here your Mashape key
		//     }
		// });
		// end second ajax 
	});
});