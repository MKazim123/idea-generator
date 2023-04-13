jQuery(document).ready(function () {
	jQuery("#btn-atm").attr('disabled', 'disabled');
	
	jQuery(document).on('keyup', '.find-atm-input', function(){
		jQuery("#btn-atm").attr('disabled', 'disabled');
	});
	
	
  jQuery(document).on("click", "#btn-atm", function () {
	  var states = {'AL':"Alabama",  
    'AK':"Alaska",  'AZ':"Arizona",  'AR':"Arkansas",  'CA':"California",  'CO':"Colorado",  
    'CT':"Connecticut",  'DE':"Delaware",  'DC':"District Of Columbia",  'FL':"Florida",  'GA':"Georgia",  
    'HI':"Hawaii",  'ID':"Idaho",  'IL':"Illinois",  'IN':"Indiana",  'IA':"Iowa",    'KS':"Kansas",    'KY':"Kentucky",  
    'LA':"Louisiana",   'ME':"Maine",   'MD':"Maryland",   'MA':"Massachusetts",  
    'MI':"Michigan",   'MN':"Minnesota",   'MS':"Mississippi",   'MO':"Missouri",   'MT':"Montana",
    'NE':"Nebraska",   'NV':"Nevada",   'NH':"New Hampshire",  'NJ':"New Jersey",  'NM':"New Mexico",  'NY':"New York",
    'NC':"North Carolina",  'ND':"North Dakota",
    'OH':"Ohio",    'OK':"Oklahoma",  'OR':"Oregon",  
    'PA':"Pennsylvania",   'RI':"Rhode Island",   'SC':"South Carolina",  
    'SD':"South Dakota",  'TN':"Tennessee",  'TX':"Texas",  'UT':"Utah",  'VT':"Vermont",  'VA':"Virginia",  'WA':"Washington",  'WV':"West Virginia",  
    'WI':"Wisconsin",  'WY':"Wyoming"};
	  
	  let state_short = jQuery("#administrative_area_level_1").val();
	  let location = states[state_short];
//     let location = jQuery("#autocomplete").val();
    let lower_location = location ? location.toLowerCase() : "";
    let split_location = lower_location.split(",");
    if (lower_location != "") {
      window.location = opt.homeUrl + "/locations/?loc=" + split_location[0];
    } else {
      alert("Please select location from dropdown");
    }
  });
	
	function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,showError);
        } else {
            alert("Please use browser which supports geolocation!");
        }
        function success(position) {
//             alert("Latitude: " + position.coords.latitude +" Longitude: " + position.coords.longitude);
			return
        }
        function showError(error)
        {
        switch(error.code) 
          {
          case error.PERMISSION_DENIED:
//             alert("Comments are only permitted when location sharing is enabled- you have denied the request for Geolocation.");
            	setTimeout(function(){
					jQuery(".storepoint-no-results .storepoint-cta").trigger("click");
				}, 3500);
			break;
		default:
			break;
//           case error.POSITION_UNAVAILABLE:
//             alert("Location Unavailable.");
//             break;
//           case error.TIMEOUT:
//             alert("The request to get location timed out. Please try again");
//             break;
//           case error.UNKNOWN_ERROR:
//             alert("An unknown error occurred.");
//             break;
          }
        }
    }
	
	
	
	
	
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var check_loc = url.searchParams.get("loc");
	
	console.log("loc="+check_loc);

	if (check_loc != "" && check_loc != null) {
		let customhtml_onload = `
<div id="storepoint-container" data-tags="${check_loc}" data-map-id="15c8f4612d44c3"></div><script>(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.storepoint.co/api/v1/js/15c8f4612d44c3.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);}());</script><style>#storepoint-tag-dropdown{display:none!important;}</style>
`;

		jQuery(".custom-html .kt-inside-inner-col").html(customhtml_onload);
		getCurrentLocation();
 }
	else{
// 		alert('else');
		
		 let customhtml_onload = `
		<div id="storepoint-container" data-tags="${null}" data-map-id="15c8f4612d44c3"></div><script>(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.storepoint.co/api/v1/js/15c8f4612d44c3.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);}());</script>
		`;
   jQuery(".custom-html .kt-inside-inner-col").html(customhtml_onload);
		getCurrentLocation();
	}
// 	setTimeout(function(){
// 		jQuery(".storepoint-no-results .storepoint-cta").trigger("click");
// 	}, 4000);
// 		getCurrentLocation();

});

jQuery(document).on("click", ".stateBox", function () {
  // 	jQuery('#storepoint-searchbar').val('michigan');
  // 	jQuery('#storepoint-searchbar').focus();
  // 	var e = jQuery.Event("keypress");
  //     e.keyCode = 13; // # Some key code value
  //     $('#storepoint-searchbar').trigger(e);
  // 	jQuery('#storepoint-searchbar').trigger(e);
  // 	jQuery("#storepoint-container").attr('data-tags', '');
  // 	jQuery("#storepoint-container").attr('data-tags', 'michigan');

  var url = document.location.href;
  window.history.pushState({}, "", url.split("?")[0]);

  var btn_val = jQuery(this).find("a").attr("rel");
  var customhtml = `
		<div id="storepoint-container" data-tags="${btn_val}" data-map-id="15c8f4612d44c3"></div><script>(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.storepoint.co/api/v1/js/15c8f4612d44c3.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);}());</script><style>#storepoint-tag-dropdown{display:none!important;}</style>
		`;
  jQuery(".custom-html .kt-inside-inner-col").html(customhtml);
  window.scrollTo(0, 0);
});





// second
jQuery(document).ready(function () {
	jQuery("#btn-atm").attr('disabled', 'disabled');
	
	jQuery(document).on('keyup', '.find-atm-input', function(){
		jQuery("#btn-atm").attr('disabled', 'disabled');
	});
	
	function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,showError);
        } else {
            alert("Please use browser which supports geolocation!");
        }
        function success(position) {
			return
        }
        function showError(error)
        {
        switch(error.code) 
          {
          case error.PERMISSION_DENIED:
            	setTimeout(function(){
					jQuery(".storepoint-no-results .storepoint-cta").trigger("click");
				}, 3500);
			break;
		default:
			break;
          }
        }
    }
		
		 let customhtml_onload = `
		<div id="storepoint-container" data-tags="${null}" data-map-id="15c8f4612d44c3"></div><script>(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://cdn.storepoint.co/api/v1/js/15c8f4612d44c3.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);}());</script>
		`;
   jQuery(".custom-html .kt-inside-inner-col").html(customhtml_onload);
		getCurrentLocation();
});