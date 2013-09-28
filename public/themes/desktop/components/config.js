var themeName = themeName || "desktop";
var jlsConfig = {
	jQuery: ['/themes/'+themeName+'/components/jquery/jquery.min.js']
	,ui:[
		'jQuery'
		,'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js'
	]
	,zepto: '/themes/'+themeName+'/components/zepto/zepto.min.js'
	,foundationv3: [
		"jQuery"
		,'/themes/'+themeName+'/components/foundation/v3/modernizr.foundation.js'
		,'/themes/'+themeName+'/components/foundation/v3/foundation.min.js'
	]
	,pxloader: [
		'/themes/'+themeName+'/components/pxloader/PxLoader.js',
		'/themes/'+themeName+'/components/pxloader/PxLoaderImage.js',
		'/themes/'+themeName+'/components/pxloader/PxLoaderSound.js',
		'/themes/'+themeName+'/components/pxloader/PxLoaderVideo.js'
	]
	,galleria: [
		'/themes/'+themeName+'/components/jquery-galleria/src/galleria.js'
		,'/themes/'+themeName+'/components/jquery-galleria/src/themes/classic/galleria.classic.js'
		,'/themes/'+themeName+'/components/jquery-galleria/src/themes/classic/galleria.classic.css'
	]
	,backstretch: [
		"jQuery",
		'/themes/'+themeName+'/components/backstretch/jquery.backstretch.min.js'
	]
	,elfinder: [
		'jQuery'
		,'/themes/'+themeName+'/components/elfinder/css/smoothness/jquery-ui-1.8.13.custom.css'
		,'/themes/'+themeName+'/components/elfinder/css/elfinder.css'
		,'/themes/'+themeName+'/components/elfinder/js/jquery-ui-1.8.13.custom.min.js'
		,'/themes/'+themeName+'/components/elfinder/js/elfinder.min.js'
	]
	,scrollto: [
		"jQuery",
		'/themes/'+themeName+'/components/jquery.scrollTo/jquery.scrollTo.min.js'
	]
	,pathjs: [
		'/themes/'+themeName+'/components/pathjs/path.min.js'
	]
	,spxloader: [
		'pxloader',
		'/themes/'+themeName+'/components/pxloader/sPxLoader.js'
	]
	,nicescroll: '/themes/'+themeName+'/components/jquery-nicescroll/jquery.nicescroll.min.js'
	,utabs: [
		"jQuery"
		,'/themes/'+themeName+'/components/utabs/jquery-utabs-0.2.5-min.js'
	]
	,"jquery.tooltip": [
		"jQuery"
		,'/themes/'+themeName+'/components/jquery.plugins/tooltip/css/tooltip.min.css'
		,'/themes/'+themeName+'/components/jquery.plugins/tooltip/js/tooltip.min.js'
	]
	// icons
	,ecoico: '/themes/'+themeName+"/icons/ecoico/stylesheet.css"
	,foundIcon: [
		'/themes/'+themeName+"/icons/foundation_icons_general/stylesheets/general_foundicons.css"
		,'/themes/'+themeName+"/icons/foundation_icons_general/stylesheets/general_foundicons_ie7.css"
	]
	,icomoon: '/themes/'+themeName+"/icons/icomoon/style.css"
	,skrollr: '/themes/'+themeName+'/components/skrollr/skrollr.min.js'
	,videobg: '/themes/'+themeName+'/components/videobg/jquery.videoBG.js'
	,skrollrMobile: [
		"skrollr"
		,'/themes/'+themeName+'/components/skrollr/skrollr.mobile.min.js'
	]
};
