jQuery.fn.img2Canvas = function (option) {
	var settings = {
		"width": 300
	};

	if(option) jQuery.extend(settings, option);
	return this.each (function () {
		var agent = navigator.userAgent;
		if(agent.search(/iPhone/) != -1 || agent.search(/Android/) != -1){
			var w = settings.width;
			$("img").each(function() {
				var img = $(this);
				this.onload = function (){
					var scale = w/$(img).width();
					var canvas = $("<canvas>").attr({"width":w+"px","height":Math.ceil($(img).height()*scale)+"px"});
					var ctx = canvas.get(0).getContext("2d");
					ctx.setTransform(scale, 0, 0, scale, 0, 0);
					$(this).after(canvas);
					ctx.drawImage(this, 0, 0);
					$(this).remove();
					}
			});
		}
	});
}