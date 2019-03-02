;(function($){
	
/*	.hover(function(){
		var $this =$(this);
		var activeClass = $this.data('active')+'-active';
		$this.addClass(activeClass)
	},function(){
		var $this = $(this);
		var activeClass = $this.data('active')+'-active';
		$this.removeClass(activeClass);
	})*/
function DropDown($elem){
	//1.罗列属性
	this.$elem = $elem;
	//2.初始化
	this.init();
}
DropDown.prototype = {
	constructor:DropDown,
	init:function(){
		//1初始化显示隐藏插件
		
		//2监听显示隐藏时间
		//3绑定事件
	}
}
$.fn.extend({
	dropdown:function(){
			//console.log(this)
			return this.each(function(){
				var $elem = $(this)
			})
	}
})
})(jQuery);