var modules = {
	/* ********************************************************************* */
	/* Revolution Slider */
	/* ********************************************************************* */
	revslider: {
		/* *************** */
		get: {
			loaded: false
		},
		/* *************** */
		init: function() {
			modules.revslider.fn();
		},
		/* *************** */
		params: {
			delay:5000,
			startheight:570,
			startwidth:1020,
			navigationType:"bullet", //bullet, thumb, none, both (No Shadow in Fullwidth Version !)
			navigationArrows:"verticalcentered", //nexttobullets, verticalcentered, none
			navigationStyle:"round", //round,square,navbar, *-old
			touchenabled:"on",
			onHoverStop:"on",
			navOffsetHorizontal:0,
			navOffsetVertical:20,
			hideCaptionAtLimit:10,
			hideAllCaptionAtLilmit:10,
			hideSliderAtLimit:10,
			thumbWidth:100, // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
			thumbHeight:50,
			thumbAmount:3,
			hideThumbs:200,
			stopAtSlide:-1,
			stopAfterLoops:-1,
			shadow:0,
			fullWidth:"on",
			stopLoop:"on" // on == Stop loop at the last Slie, off== Loop all the time.
		},
		/* *************** */
		fn: function(){
			// Revolution Slider!
			var v=$("body");
			if(jQuery().revolution){
				// Prepare dom and retrieve needed element!
				var htmlClasses=(document.documentElement.className).split(" ");
				htmlClasses.push("js-on");
				document.documentElement.className=htmlClasses.join(" ").replace(/^\s+|\s+$/g,"");
				var K=v.find(".rev-slider");
				var height = K.attr('data-height');
				var banner = K.find(".fullwidthabnner");
				//
				switch (true) {
					// Adapt the height of the slider with the window's height
					// and the height of an element from the page
					// juste place fullwith-[element with selector (i.e. fullwidth-#navigation)]
					case /^fullwith\-/.test(height):
						var node = height.replace("fullwith-","");
						height = $(window).height()-$('.menu').innerHeight();
						banner.css({
							height:height,
							maxHeight:height
						});
						$(window).resize(function(){
							var h = $(window).height()-$(node).innerHeight();
							modules.revslider.get.height = h;
							banner.css({
								height:h,
								maxHeight:h
							});
						});
					break;
					//
					// Adapt the height of the slider with the window's height
					case height == "full":
						height = $(window).height();
						banner.css({
							height:height,
							maxHeight:height
						});
						$(window).resize(function(){
							var h = $(window).height();
							modules.revslider.get.height = h;
							banner.css({
								height:h,
								maxHeight:h
							});
						});
					break;
					//
					// Adapt the height of the slider with the value
					default:
						height = parseInt(height);
						banner.css({
							height:height,
							maxHeight:height
						});
					break;
				}
				// Magical moment!
				K.find(".fullwidthabnner").revolution(modules.revslider.params);
				// Add controls and delegate events!
				K.delegate(
					".slider-control-prev, .slider-control-next",
					"click",
					function(Q){
						var P=w(this),
						O=P.closest(".rev-slider");
						Q.preventDefault();
						if (P.hasClass("slider-control-prev")){
							K.revprev()
						} else {
							K.revnext()
						}
					}	
				);

				// export params
				modules.revslider.get.height = height;
				modules.revslider.get.loaded = true;
			}
		}
	}
	/* ********************************************************************* */
	/* End Revolution Slider */
	/* ********************************************************************* */
	
	/* ********************************************************************* */
	/* Sidr plugin, combines with icomoon */
	/* ********************************************************************* */
	,sidr: {
		/* *************** */
		init: function() {
			modules.sidr.fn();	
		},
		/* *************** */
		fn: function() {
			$('#navigation').before('<div id="sidr-menu"><a class="responsive-menu-icon" href="#sidr-main"><span class="icon-list-2">&nbsp;</span></a></div>');
			$('.responsive-menu-icon').sidr({
				name: 'sidr-main',
				source: '#navigation nav',
				side: 'right'
			});
		}
	}
	/* ********************************************************************* */
	/* End Sidr plugin */
	/* ********************************************************************* */

	/* ********************************************************************* */
	/* Leafletjs, equivalent google map */
	/* ********************************************************************* */
	,leaflet: {
		/* *************** */
		init: function() {
			modules.leaflet.fn();	
		},
		maps: {},
		/* *************** */
		fn: function() {
			$('*[data-element=leaflet]').each(function(){
				var $this = $(this);
				var tilesLink = $this.attr('data-tiles-link') || 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png';
				var map = L.map($this.attr('id')).setView([parseFloat($this.attr('data-lat')), parseFloat($this.attr('data-ln'))], $this.attr('data-zoom'));
				map.touchZoom.disable();
				map.doubleClickZoom.disable();
				map.scrollWheelZoom.disable();
				// add a marker in the given location, attach some popup content to it and open the popup
				if ($this.attr('data-marker-lat') !== void 0 && $this.attr('data-marker-ln') !== void 0) {
				var myIcon = L.icon({
					iconUrl: '/theme/css/leafletjs/images/my-icon.png',
					iconRetinaUrl: '/theme/css/leafletjs/images/my-icon@2x.png'
				});
				L.marker([parseFloat($this.attr('data-marker-lat')), parseFloat($this.attr('data-marker-ln'))],{icon: myIcon}).addTo(map)
					.bindPopup($this.attr('data-marker-label'));
				}
				
				L.tileLayer(tilesLink, {
					maxZoom: ($this.attr('data-tiles-maxzoom') || 18)
				}).addTo(map);
				L.Control.Zoom("bottomleft");
				modules.leaflet.maps[$this.attr('id')] = map;
			});
		}
	}
	/* ********************************************************************* */
	/* End Leafletjs plugin */
	/* ********************************************************************* */

	/* ********************************************************************* */
	/* Accordion, Custom script */
	/* ********************************************************************* */
	,accordion: {
		/* *************** */
		init: function() {
			modules.accordion.fn();	
		},
		/* *************** */
		fn: function() {
			var accordion = $('*[data-element=accordion]').addClass("cAccordion");
			accordion = accordion.children();
			accordion.each(function(){
				var $this = $(this);
				var section = $(document.createElement('section'));
				section.html($this.attr('data-label'));
				section.addClass('tab-header');
				$this.addClass("tab-content");
				$this.before(section);
				var next = section.next();
				section.on('click',function(){
					if (next.is(':hidden')) {
						$('.tab-header').removeClass('current');
						accordion.slideUp();
						next.slideDown();
						section.addClass('current');
					}
				});
				if ($this.attr('data-opened') !== undefined && $this.attr('data-opened') == "true") {
					$this.prev('.tab-header').trigger('click');
					next.slideDown();
					section.addClass('current');
				}
			});
			accordion.hide();
		}
	}
	/* ********************************************************************* */
	/* End Leafletjs plugin */
	/* ********************************************************************* */
};
