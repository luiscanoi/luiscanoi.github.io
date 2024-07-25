/**
*   RyanCV - Resume/CV/vCard Theme (Jekyll)
*   Version: 1.0
*   Author: beshleyua
*   Author URL: https://themeforest.net/user/beshleyua
*   Copyright © RyanCV by beshleyua. All Rights Reserved.
**/


/*
	Preloader
*/

$(window).on("load", function() {
	var preload = $('.preloader');
	preload.find('.spinner').fadeOut(function(){
		preload.fadeOut();
	});
});

$(function () {
	'use strict';
	
	
	/*
		Vars
	*/
	
	var width = $(window).width();
	var height = $(window).height();
	
	
	/*
		Header Menu Desktop
	*/
	
	var container = $('.container');
	var card_items = $('.card-inner');
	var animation_in = container.data('animation-in');
	var animation_out = container.data('animation-out');
	
	var current_hash = window.location.hash;
	if ($(current_hash).length && $('body').hasClass('home') && $('.top-menu a[href$="'+current_hash+'"]').length ) {
		top_menu( $('.top-menu a[href$="'+current_hash+'"]') );
	}
	if (!$('body').hasClass('home')) {
		$('.top-menu li').removeClass('active');
	}

	$('.top-menu').on('click', 'a', function(){
		top_menu($(this));
	});

	function top_menu(el) {
		/* vars */
		var width = $(window).width();
		var url = el.attr('href');
		var id = false;

		if ($('body').hasClass('home')) {
			var url_hash = url.substring(url.indexOf('#')+1);
			id = '#'+url_hash;
		}

		if ( id && $(id).length ) {
			var h = parseFloat($(id).offset().top);
			var card_item = $(id);
			var menu_items = $('.top-menu li');
			var menu_item = el.closest('li');
			var d_lnk = $('.lnks .lnk[href="#contacts-card"]');

			if((width >= 1024)) {
				
				/* if desktop */
				if(!menu_item.hasClass('active') & (width > 1023) & $('#home-card').length) {

					/* close card items */
					menu_items.removeClass('active');
					container.find(card_items).removeClass('animated '+animation_in);

					if($(container).hasClass('opened')) {
						container.find(card_items).addClass('animated '+animation_out);
					}

					/* open card item */
					menu_item.addClass('active');
					container.addClass('opened');
					container.find(card_item).removeClass('animated '+animation_out);
					container.find(card_item).addClass('animated '+animation_in);
					
					$(card_items).addClass('hidden');
					
					$(card_item).removeClass('hidden');
					$(card_item).addClass('active');
				}
			}
			/* if mobile */
			if((width < 1024) & $('#home-card').length) {

				/* scroll to section */
				$('body,html').animate({
					scrollTop: h - 76
				}, 800);
			}
			return false;
		}
	}

	$(window).on('resize', function(){
		var width = $(window).width();
		var height = $(window).height();

		if((width < 1024)) {
			$('.card-inner').removeClass('hidden');
			$('.card-inner').removeClass('fadeOutLeft');
			$('.card-inner').removeClass('rotateOutUpLeft');
			$('.card-inner').removeClass('rollOut');
			$('.card-inner').removeClass('jackOutTheBox');
			$('.card-inner').removeClass('fadeOut');
			$('.card-inner').removeClass('fadeOutUp');
			$('.card-inner').removeClass('animated');

			$(window).on('scroll', function(){
				var scrollPos = $(window).scrollTop();
				$('.top-menu ul li a').each(function () {
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if (refElement.offset().top - 76 <= scrollPos) {
						$('.top-menu ul li').removeClass("active");
						currLink.closest('li').addClass("active");
					}
				});
			});

			$('.card-inner .card-wrap').slimScroll({destroy: true});
			$('.card-inner .card-wrap').attr('style', '');
		}
		else {
			$($('.top-menu li.active a').attr('href')).addClass('active');
			if((!$('.page').hasClass('new-skin')) && (width > 1024)) {
				$('.card-inner .card-wrap').slimScroll({
					height: '570px'
				});
			}
		}
	});
	
	
	/*
		Smoothscroll
	*/
	
	if((width < 1024) & $('#home-card').length) { 
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top - 76 <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
				}
			});
		});
	}
	
	
	/*
		slimScroll
	*/
	
	if((!$('.page').hasClass('new-skin')) && (width > 1024)) {
		$('.card-inner .card-wrap').slimScroll({
			height: '570px'
		});
	}
	
	
	/*
		Initialize Portfolio
	*/
	var $container = $('.grid-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			percentPosition: true,
			itemSelector: '.grid-item'
		});
	});


	/*
		Filter items on button click
	*/
	$('.filter-button-group').on( 'click', '.f_btn', function() {
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: '.'+filterValue });
		$('.filter-button-group .f_btn').removeClass('active');
		$(this).addClass('active');
	});

	
	/*
		Gallery popup
	*/
	if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}


	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade popup-box-inline'
	});


	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});

	
	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
			patterns: {
				youtube_short: {
				  index: 'youtu.be/',
				  id: 'youtu.be/',
				  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
				}
			}
		},
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});

	
	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});


	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
		var gallery = $(this).attr('href');
	
		$(gallery).magnificPopup({
			delegate: 'a',
			type:'image',
			closeOnContentClick: false,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			fixedContentPos: false,
			gallery: {
				enabled: true
			}
		}).magnificPopup('open');

		return false;
	});
	
	
	/*
		Validate Contact Form
	*/
	
	$("#cform").validate({
		ignore: ".ignore",
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			hiddenRecaptcha: {
				required: function () {
					if (grecaptcha.getResponse() == '') {
						return true;
					} else {
						return false;
					}
				}
			}
		},
		success: "valid",
		submitHandler: function() {
			return true;
			$("#cform").find('input[type="text"], input[type="email"], input[type="tel"], textarea').val('');
		}
	});
	
	
	/*
		Validate Commect Form
	*/
	
	$("#comment_form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			}
		},
		success: "valid",
		submitHandler: function() {
		}
	});
	
	
	/*
		Google Maps
	*/
	
	if($('#map').length) {
		var map_lat = $('#map').data('lat');
		var map_long = $('#map').data('long');
		var map_zoom = $('#map').data('zoom');
		initMap(map_lat, map_long, map_zoom);
	}


	/*
		Tesimonials Carousel
	*/
	var revs_slider = $(".revs-carousel.default-revs .owl-carousel");

	revs_slider.owlCarousel({
		margin: 0,
		items: 1,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		loop: true,
		rewind: false,
		nav: false,
		dots: true
	});

	var rtl_revs_slider = $(".revs-carousel.rtl-revs .owl-carousel");

	rtl_revs_slider.owlCarousel({
		margin: 0,
		items: 1,
		rtl: true,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		loop: true,
		rewind: false,
		nav: false,
		dots: true
	});


	/*
		New JS
	*/

	$(window).on('resize', function(){
		/*
			Dotted Skills Line On Resize Window
		*/

		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}

		/*
			Testimonials Carousel On Resize Window
		*/

		var revs_slider = $(".revs-carousel .owl-carousel");
		revs_slider.find('.revs-item').css({'max-width':revs_slider.width()});
	});

	/*
		Dotted Skills Line
	*/

	function skills(){
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills-list.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}

	/*
		Wrap First Title Word
	*/

	$('.content .title, .widget-title-span').each(function(index) {
	    var title = $(this).text().split(' ');
	    if(title.length>1){
		    var firstWord = title[0];
		    var replaceWord = '<span class="first-word">' + firstWord + '</span>';
		    var newString = $(this).html().replace(firstWord, replaceWord);
		    $(this).html(newString);
		} else {
			$(this).html('<div class="first-letter">'+ $(this).html() + '</div>');
		}
	});


	/*
		Typed
	*/

	$('.subtitle.subtitle-typed').each(function(){
		var subtitleContainer = $(this);

		subtitleContainer.typed({
			stringsElement: subtitleContainer.find('.typing-title'),
			backDelay: 1500, /* Delay in text change */
			typeSpeed: 0, /* Typing speed */
			loop: true
		});
	});

	/*
		Sidebar Show/Hide
	*/

	$('header, .profile').on('click', '.menu-btn', function(){
		$('.s_overlay').fadeIn();
		$('.content-sidebar').addClass('active');
		$('body,html').addClass('sidebar-open');
		return false;
	});
	$('.content-sidebar, .container').on('click', '.close, .s_overlay', function(){
		$('.s_overlay').fadeOut();
		$('.content-sidebar').removeClass('active');
		$('body,html').removeClass('sidebar-open');
	});

	/*
		Widget Title
	*/
	$('.widget-title').wrapInner('<span class="widget-title-span"></span>');

	/*
		Social Share
	*/
	$('.social-share').rrssb({
		title: $('.social-share').data('title'),
		url: $('.social-share').data('url'),
	});

	/*
		Search
	*/
	var sjs = SimpleJekyllSearch({
	  searchInput: document.getElementById('search-input'),
	  resultsContainer: document.getElementById('results-container'),
	  json: '/search.json'
	});

	/*
		Ajax Blog Paginations
	*/
	var loading_blog = 1;

	$('.home #blog-card .card-wrap').on('scroll', function(){
		if($(this).scrollTop() > ($('#blog-card .card-wrap .content').height() - $(this).height()) && loading_blog){
			loading_blog = 0;
			loadMorePosts();
		}
	});
	function loadMorePosts() {
		var $blogContainer = $(".post-items");
		var nextPage = parseInt($blogContainer.attr("data-page")) + 1;
		var totalPages = parseInt($blogContainer.attr("data-total"));
		$blogContainer.addClass("loading");
		
	  	$.ajax({
		    url: "/page" + nextPage,
		    type: 'get',
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		        console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
		    },
		    success: function(data){
		    	var htmlData = $.parseHTML(data);
				var $articles = $(htmlData).find(".post-item");
		    	$blogContainer.attr("data-page", nextPage).append($articles);
		    	$blogContainer.removeClass("loading");
		    	if ($blogContainer.attr("data-total") == nextPage) {
		    		loading_blog = 0;
		    	} else {
		    		loading_blog = 1;
		    	}
		    }
		});
	}
});


/*
	Google Map Options
*/

function initMap(lat, long, zoom) {
	var myLatlng = new google.maps.LatLng(lat, long); // <- Your latitude and longitude
	var styles = [
	{
		"featureType": "water",
		"stylers": [{
			"color": "#d8dee9"
		},
		{
			"visibility": "on"
		}]
	},
	{
		"featureType": "landscape",
		"stylers": [{
			"color": "#eeeeee"
		}]
	}]

	var mapOptions = {
		zoom: zoom,
		center: myLatlng,
		mapTypeControl: false,
		disableDefaultUI: true,
		zoomControl: true,
		scrollwheel: false,
		styles: styles
	}
	
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'We are here!'
	});
}