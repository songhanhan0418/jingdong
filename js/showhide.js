;(function($){
	function init($elem,hiddenCb){
		if($elem.is(":hidden")){
			$elem.data('status','hidden');
			typeof hiddenCb == 'function' && hiddenCb();
		}else{
			$elem.data('status','shown');
		}
	}
	function show($elem,cb){
		if($elem.data('status') == 'shown') return;
		if($elem.data('status') == 'show') return;
		$elem.data('status','show').trigger('show');
		cb();
	}
	function hide($elem,cb){
		if($elem.data('status') == 'hidden') return;
		if($elem.data('status') == 'hide') return;
		$elem.data('status','hide').trigger('hide')
		cb();
	}



	var slient = {
		init:init,
		show:function($elem){

			show($elem,function(){
				$elem.show();
				$elem.trigger('shown').data('status','shown');
			})
		},
		hide:function($elem){

			hide($elem,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');		
			})
		}
	}

	var js = {
		fade:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'fadeIn')
			},
			hide:function($elem){
				js._hide($elem,'fadeOut')
			}	
		},
		slideDownUp:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'slideDown')
			},
			hide:function($elem){
				js._hide($elem,'slideUp')
			}	
		},
		slideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0	
				})
			},
			show:function($elem){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0	
				});
			}
		},
		fadeSlideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
				})
			},
			show:function($elem){
				js._customShow($elem);
			},
			hide:function($elem){
				js._customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
				});
			}
		},
	}

	js._init = function($elem){
		$elem.removeClass('transition')
		init($elem);
	}
	js._show = function($elem,mode){
		show($elem,function(){
			$elem.stop()
			[mode](function(){
				$elem.trigger('shown').data('status','shown')
			})
		})	
	}
	js._hide =function($elem,mode){
		hide($elem,function(){
			$elem.stop()
			[mode](function(){
				$elem.trigger('hidden').data('status','hidden')
			})	
		})	
	}
	js._customInit = function($elem,options){
		$elem.removeClass('transition')
		
		//1.保存原始值
		var styles = {};

		for(var key in options){
			styles[key] = $elem.css(key)
		}
		$elem.data('styles',styles);
		//2.如果原本是隐藏，则水平方向值改为0
		init($elem,function(){
			$elem.css(options)
		});
	}
	js._customShow = function($elem){
		show($elem,function(){
			$elem.show();
			$elem.stop()
			.animate($elem.data('styles'),function(){
				$elem.trigger('shown').data('status','shown')
			});
		});		
	}
	js._customHide = function($elem,options){
		hide($elem,function(){
			$elem.stop()
			.animate(options,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');
			});
		})		
	}

	function getShowHide($elem,options){
		 var showHideFn = slient;
		 if(options.js){
		 	showHideFn = js[options.mode];
		 }
		 showHideFn.init($elem);
		 return {
		 	show:showHideFn.show,
		 	hide:showHideFn.hide
		 }
	}

	var DEFAULTS = {
		js:true,
		mode:'fade'
	}

	$.fn.extend({
		showHide:function(options){
			//console.log(this)
			return this.each(function(){
				//console.log(this)
				var $elem = $(this);
				var showHideObj = $elem.data('showHideObj')

				if(!showHideObj){
					options = $.extend({}.DEFAULTS,options)
					showHideObj = getShowHide($elem,options)
					$elem.data('showHideObj',showHideObj)
				}

				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($elem);
					
				}
			})
		}
	})
})(jQuery);