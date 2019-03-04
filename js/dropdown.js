;(function($){

function DropDown($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.$layer = $elem.find('.dropdown-layer');
	this.options = options;
	this.activeClass = $elem.data('active') + '-active';
	this.timer = 0;
	//2.初始化
	this.init();
}
DropDown.prototype = {
	constructor:DropDown,
	init:function(){
		//1初始化显示隐藏插件
		this.$layer.showHide(this.options);
		//2监听显示隐藏时间
		this.$layer.on('show shown hide hidden',function(ev){
			this.$elem.trigger('dropdown-'+ ev.type)
		}.bind(this))
		//3绑定事件
		if(this.options.eventName == 'click'){
			this.$elem.on('click',function(ev){
				ev.stopPropagation();
				this.show();
			}.bind(this))
			$(document).on('click',$.proxy(this.hide,this))
		}else{
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this))			
		}

	},
	show:function(){
		if(this.options.delay){
			this.timer = setTimeout(function(){
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);				
			}.bind(this),this.options.delay)
		}else{
			this.$layer.showHide('show');
			this.$elem.addClass(this.activeClass);
		}

	},
	hide:function(){
		clearTimeout(this.timer)
		this.$layer.showHide('hide');
		this.$elem.removeClass(this.activeClass);
	}
}
DropDown.DEFAULTS = {
	js:true,
	mode:'slideDownUp',
	delay:200,
	eventName:''
}
$.fn.extend({
	dropdown:function(options){
			//console.log(this)
			return this.each(function(){
				var $elem = $(this);
				var dropdown = $elem.data('dropdown');
				if(!dropdown){
					options = $.extend({},DropDown.DEFAULTS,options);
					dropdown = new DropDown($elem,options);
					$elem.data('dropdown',dropdown)
				}
				if(typeof dropdown[options] == 'function'){
					dropdown[options]();
				}

			})
	}
})
})(jQuery);