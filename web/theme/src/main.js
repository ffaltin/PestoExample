#include "lib/revslider/jquery.themepunch.plugins.min.js"
#include "lib/revslider/jquery.themepunch.revolution.min.js"
#include "lib/scrollto/core.js"
#include "lib/sidr/core.js"
#include "lib/leafletjs/core.js"
#include "lib/modules.js"
// app namespace for preventing fucking conflicts!
var app = {
	init: function() {
		// Add Revolution slider if needed
		// See lib/modules.js -> revslider for more infos about params!
		// i.e.: Edit params => modules.revslider.params.delay = 5000;
		if ($("*[data-element=revSlider]").length) modules.revslider.init();
		// Call Homepage
		if ($("#page-home").length) app.homepage();
		// Call accordion if necessary
		if ($("*[data-element=accordion]").length) modules.accordion.init();
	},
	homepage: function() {
		
	},
	contact: function() {
		
	}
};

jQuery(function($) {
	$(document).ready(app.init());
});
