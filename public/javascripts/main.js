/*
	Project Name : Mixur
	+ Load
		- Loader
		- Popup
	+ Document Ready
		- Navbar
		- Isotope Filter
		- Counter
		- Countdown
		- Pie Chart
		- Carousel Types
		- Progress Bar
		- Wow Init
		- Maps
		
*/
(function($){
	"use strict" 
	$(window).on('load',function(){
		/*	Loader	*/
		$(".preloader").delay(600).fadeOut("slow");
		/*	Popup	*/
		var popUp = $(".work-gallery");
		popUp.magnificPopup({
			tLoading:"",
			gallery:{enabled:!0},
			mainClass:"mfp-fade",
			type: 'inline'
		});
	});
	$(document).on('ready',function(){
		/*	Navbar	*/
		$('.dropdown-menu .dropdown').on('mouseenter mouseleave', function() {
			$(this).toggleClass("open");
		});
		$('.dropdown-menu').on('click',function(e) {
			e.stopPropagation();
		});
		var menuOpenBtn = $('nav .menu_button');
		var menuCloseBtn = $('.menu_close_button');
		var sideMenu = $('.side-overlay-menu');
		menuOpenBtn.on("click", function(){
			$(this).toggleClass('open');
		});
		menuOpenBtn.on("click",function(){
			sideMenu.addClass("open");
		});
		menuCloseBtn.on("click",function(){
			sideMenu.removeClass("open");
			menuOpenBtn.toggleClass('open');
		});
		var dropdownToggle = $(".dropdown-toggle");
		dropdownToggle.on("hover", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		$(window).on("scroll", function() {
			var scroll_top = $(window).scrollTop();
			var navBar = $(".navbar");
			var navAddress = $(".navbar.navbar_3 .nav-address");
			var logoStick = $(".scroll_logo");
			var menu_value = $(".caption_header").height();
			if (scroll_top > 10) {
				navBar.addClass('stick_nav');
				navAddress.addClass('none-display');
				logoStick.attr("src", "img/logo.png");
			} else {
				navBar.removeClass('stick_nav');
				navAddress.removeClass('none-display');
				logoStick.attr("src", "img/logo_black.png");
			}
		}); 
		/*	Isotope Filter	*/
		var e;
		var $isoImageLoad = $('.items_list');
		if (typeof imagesLoaded === 'function') {
			imagesLoaded($isoImageLoad, function() {
				$isoImageLoad.isotope({
					itemSelector:".single_item",
					layoutMode:"masonry",
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					},
					filter:0
				});

			});
		};
		var filter = $(".filter li a");
		filter.on("click",function(){
			return $(".filter li").removeClass("active"),
			$(this).parent().addClass("active"),
			e=$(this).attr("data-filter"),
			$(".items_list").isotope({
				itemSelector:".single_item",
				layoutMode:"masonry",
				filter:e
			}),!1
		});
		/*	Counter	 */
		var counter = $('.counter');
		counter.counterUp({
			delay: 10,
			time: 1000
		});
		/*   Countdown   */
		var countTimer = $('.counter_timer');
		countTimer.countdown("2020/02/20", function(event) {
			var offset = event.offset;
			$('.cday').text(offset.totalDays);
			$('.chours').text(''.concat(offset.hours < 10 ? '0' : '', offset.hours));
			$('.cminutes').text(''.concat(offset.minutes < 10 ? '0' : '', offset.minutes));
			$('.cseconds').text(''.concat(offset.seconds < 10 ? '0' : '', offset.seconds));
		});
		countTimer.countdown('2020/02/20', function(event) {
			$(this).text(event.strftime('%D Days | %H H | %M M | %S S'));
		});
		var openBtn = $('.openbtn');
		var closeBtn = $('.closebtn');
		openBtn.on("click",function(){
			document.getElementById("myNav").style.height = "100%";
		});
		closeBtn.on("click",function(){
			document.getElementById("myNav").style.height = "0%";
		});
		/*		Pie Chart		*/
		var chart = $('.chart');
		chart.easyPieChart({
			barColor:'#26a69a',
			scaleColor:false,
			lineWidth:2,
			size:150,
			animate:{
				duration:1000,
				enabled:true
			},
			onStep: function(a, b, c) {
				$(this.el).find(".chart_percent").text(Math.round(c));
			}
		});
		/*		Carousel Types		*/
		var oneCarousel = $('.one_carousel');
		var twoCarousel = $('.two_carousel');
		var threeCarousel = $('.three_carousel');
		var fourCarousel = $('.four_carousel');
		var fiveCarousel = $('.five_carousel');
		var centerCarousel = $('.center_carousel');
		var fullCarousel = $('.full_carousel');
		oneCarousel.owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		twoCarousel.owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				1000:{
					items:2
				}
			}
		});
		threeCarousel.owlCarousel({
			loop:true,
			margin:10,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				1000:{
					items:3
				}
			}
		});
		fourCarousel.owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				1000:{
					items:4
				}
			}
		});
		fiveCarousel.owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:2
				},
				600:{
					items:3
				},
				1000:{
					items:5
				}
			}
		});
		centerCarousel.owlCarousel({
			center: true,
			loop:true,
			margin:20,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:2
				},
				600:{
					items:3
				},
				1000:{
					items:6
				}
			}
		});		
		fullCarousel.owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			slideSpeed:350,
			autoplay:1,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			navText: [ "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>","<i class='fa fa-long-arrow-right' aria-hidden='true'></i>" ],
			responsive:{
				0:{
					items:2
				},
				600:{
					items:2
				},
				1000:{
					items:3
				}
			}
		});
		/*		Progress Bar		*/
		var progressBar = $('.progress-bar > span');
		progressBar.each(function () {
			var $this = $(this);
			var width = $(this).data('percent');
			$this.css({
				'transition': 'width 3s'
			});
			setTimeout(function () {
				$this.appear(function () {
					$this.css('width', width + '%');
				});
			}, 500);
		});
		/*		Wow Init		*/
		var wow = new WOW(
			{
				boxClass:     'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset:       0,          // distance to the element when triggering the animation (default is 0)
				mobile:       true,       // trigger animations on mobile devices (default is true)
				live:         true,       // act on asynchronously loaded content (default is true)
				callback:     function(box) {
				  // the callback is fired every time an animation is started
				  // the argument that is passed in is the DOM node being animated
				},
				scrollContainer: null // optional scroll container selector, otherwise use window
			}
		);
		wow.init();
		/*		Maps		*/	
		if($("#map").length === 1){
			google.maps.event.addDomListener(window, 'load', init);		
		}
		function init() {
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 11,
				scrollwheel: false,
				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(40.6700, -73.9400), // New York
				// How you would like to style the map. 
				// This is where you would paste any style found on Snazzy Maps.
				styles: [
							{
								"featureType": "water",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#e9e9e9"
									},
									{
										"lightness": 17
									}
								]
							},
							{
								"featureType": "landscape",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#f5f5f5"
									},
									{
										"lightness": 20
									}
								]
							},
							{
								"featureType": "road.highway",
								"elementType": "geometry.fill",
								"stylers": [
									{
										"color": "#ffffff"
									},
									{
										"lightness": 17
									}
								]
							},
							{
								"featureType": "road.highway",
								"elementType": "geometry.stroke",
								"stylers": [
									{
										"color": "#ffffff"
									},
									{
										"lightness": 29
									},
									{
										"weight": 0.2
									}
								]
							},
							{
								"featureType": "road.arterial",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#ffffff"
									},
									{
										"lightness": 18
									}
								]
							},
							{
								"featureType": "road.local",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#ffffff"
									},
									{
										"lightness": 16
									}
								]
							},
							{
								"featureType": "poi",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#f5f5f5"
									},
									{
										"lightness": 21
									}
								]
							},
							{
								"featureType": "poi.park",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#dedede"
									},
									{
										"lightness": 21
									}
								]
							},
							{
								"elementType": "labels.text.stroke",
								"stylers": [
									{
										"visibility": "on"
									},
									{
										"color": "#ffffff"
									},
									{
										"lightness": 16
									}
								]
							},
							{
								"elementType": "labels.text.fill",
								"stylers": [
									{
										"saturation": 36
									},
									{
										"color": "#333333"
									},
									{
										"lightness": 40
									}
								]
							},
							{
								"elementType": "labels.icon",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "transit",
								"elementType": "geometry",
								"stylers": [
									{
										"color": "#f2f2f2"
									},
									{
										"lightness": 19
									}
								]
							},
							{
								"featureType": "administrative",
								"elementType": "geometry.fill",
								"stylers": [
									{
										"color": "#fefefe"
									},
									{
										"lightness": 20
									}
								]
							},
							{
								"featureType": "administrative",
								"elementType": "geometry.stroke",
								"stylers": [
									{
										"color": "#fefefe"
									},
									{
										"lightness": 17
									},
									{
										"weight": 1.2
									}
								]
							}
						]
				};
				// Get the HTML DOM element that will contain your map 
				// We are using a div with id="map" seen below in the <body>
				var mapElement = document.getElementById('map');
				// Create the Google Map using our element and options defined above
				var map = new google.maps.Map(mapElement, mapOptions);
				// Let's also add a marker while we're at it
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(40.6700, -73.9400),
					map: map,
					 animation:google.maps.Animation.BOUNCE,
					title: 'Location'
				});
		}	
		if($("#map_black").length === 1){
			google.maps.event.addDomListener(window, 'load', init1);		
		}
		function init1() {
				// Basic options for a simple Google Map
				// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
				var mapOptions1 = {
					// How zoomed in you want the map to start at (always required)
					zoom: 11,
					scrollwheel: false,
					// The latitude and longitude to center the map (always required)
					center: new google.maps.LatLng(40.6700, -73.9400), // New York
					// How you would like to style the map. 
					// This is where you would paste any style found on Snazzy Maps.
					styles: [
								{
									"featureType": "all",
									"elementType": "labels.text.fill",
									"stylers": [
										{
											"saturation": 36
										},
										{
											"color": "#000000"
										},
										{
											"lightness": 40
										}
									]
								},
								{
									"featureType": "all",
									"elementType": "labels.text.stroke",
									"stylers": [
										{
											"visibility": "on"
										},
										{
											"color": "#000000"
										},
										{
											"lightness": 16
										}
									]
								},
								{
									"featureType": "all",
									"elementType": "labels.icon",
									"stylers": [
										{
											"visibility": "off"
										}
									]
								},
								{
									"featureType": "administrative",
									"elementType": "geometry.fill",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 20
										}
									]
								},
								{
									"featureType": "administrative",
									"elementType": "geometry.stroke",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 17
										},
										{
											"weight": 1.2
										}
									]
								},
								{
									"featureType": "landscape",
									"elementType": "geometry",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 20
										}
									]
								},
								{
									"featureType": "poi",
									"elementType": "geometry",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 21
										}
									]
								},
								{
									"featureType": "road.highway",
									"elementType": "geometry.fill",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 17
										}
									]
								},
								{
									"featureType": "road.highway",
									"elementType": "geometry.stroke",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 29
										},
										{
											"weight": 0.2
										}
									]
								},
								{
									"featureType": "road.arterial",
									"elementType": "geometry",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 18
										}
									]
								},
								{
									"featureType": "road.local",
									"elementType": "geometry",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 16
										}
									]
								},
								{
									"featureType": "transit",
									"elementType": "geometry",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 19
										}
									]
								},
								{
									"featureType": "water",
									"elementType": "geometry",
									"stylers": [
										{
											"color": "#000000"
										},
										{
											"lightness": 17
										}
									]
								}
							]
					};
					// Get the HTML DOM element that will contain your map 
					// We are using a div with id="map" seen below in the <body>
					var mapElement1 = document.getElementById('map_black');
					// Create the Google Map using our element and options defined above
					var map1 = new google.maps.Map(mapElement1, mapOptions1);
					// Let's also add a marker while we're at it
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(40.6700, -73.9400),
						map: map1,
						 animation:google.maps.Animation.BOUNCE,
						title: 'Location'
					});
		}
	});

})(jQuery);





















