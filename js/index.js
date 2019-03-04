;(function($){
	var $menuDropdown = $('.dropdown')
	$menuDropdown.dropdown({
		delay:200
	});
	$menuDropdown.on('dropdown-show',function(ev){
		var $elem = $(this);
		var loadUrl = $elem.data('load');
		if(!loadUrl) return
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return
		var $layer = $.find('.dropdown-layer');
		$.getJSON(loadUrl,function(data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html+='<li><a href="'+ data[i].url +'" class="menu-item">'+data[i].name+'</a></li>'
			}
			setTimeout(function(){
				$layer.html(html);
				$elem.data('isLoaded',true)
			})
		})
	});
	
})(jQuery); 