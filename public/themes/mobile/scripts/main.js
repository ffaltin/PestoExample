var App =  {
	transformation: function(type,parent,obj,ajustment) {
		var ajustment = ajustment || 0;
		App[type+'Fn'](parent,obj,ajustment);
		// resize function
		$(window).resize(function(){
			App.vars.resizing = true;
			setTimeout(function() {
				if (!App.vars.resizing) {
					App[type+'Fn'](parent,obj,ajustment);
				}
			}, 100);
			App.vars.resizing = false;
		});
	},
	alignFn: function(parent,obj,ajustment){
		var h = ($(parent).height()-$(obj).height())/2;
		$(obj).css('margin-top',(h<20+ajustment?20:(h+ajustment)));
	},
	adaptFn: function(parent,obj,ajustment){
		var h = $(parent).height();
		// block height
		if (App.helpers.isUndefined(App.vars[obj])) $(obj).css('height',h<App.vars[obj]?App.vars[obj]:h+ajustment);
		else $(obj).css('height',h+ajustment);
	},
	helpers: {
		isUndefined: function(obj) {
			return obj === void 0;
		}
	},
	vars: {
		resizing: false,
		obj: {
		}
	},
	utils: {
		link: null,
		state:  {}
	},
	resize: function(callback){
		isResizing = true;
		setTimeout(function(){
			if (!isResizing) {
				callback.call();
			}
		}, 100);
		isResizing = false;
	},
	move: function (distance,link,func,direction) {
		var func = func || function(){};
		$('.nPage').attr('data-current','not').css({'z-index':3});
		var div = $(document.createElement('div'));
		div.attr('class','nPage').attr('data-current','true').css({position:"absolute",'width': '100%','z-index':'4','top':0});
		var direction = direction || "left";
		if (!(link ===void 0)) {			
			$.get(link,function(data){
				$('body').css('overflow-x','hidden');
				div.html(data);
				var o = {};
				o['margin-'+direction] = distance;
				div.css(o);
				$('#mainContent').prepend(div);
				o['margin-'+direction] = 0;
				div.animate(o,500, function(){
					$('#mainContent').children(':not(*[data-current=true])').fadeOut(250,function(){
						$(this).remove();
						$('body').css('overflow-x','visible');
					});
				});
				func.call();
			});
		}
	},
	
	fn: {
		
	},
	ready: function() {
		function talk(message) {
			$.get('/sse/set',{touch:true,type:message},function(){});
		}
		$('html').hammer().on("swiperight","#hello", function(event) {
			talk("swiperight");
		});
		$('html').hammer().on("swipeleft","#hello", function(event) {
			talk("swipeleft");
		});
		$.get('/sse/set',{touch:false},function(){});
	}
};

ljs.load(["jQuery"],"hammerjs",function(){
	$(document).ready(App.ready);
});