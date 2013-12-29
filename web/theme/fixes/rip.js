document.write('<script id="__ie_onload" defer src="//:"><\/script>');
var script = document.getElementById("__ie_onload");

script.onreadystatechange = function() {
	if (this.readyState == "complete") {
		var body = document.getElementsByTagName("body")[0];
		body.innerHTML =
			  '<h1>427 Outdated Browser</h1>'
			+ '<p>Your are using an outdated browser that is not compatible with this application.</p>'
			+ '<p>Please refer to your system administrator.</p>'
		;
	}
};
