/*
 * flip plugin
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

(function( $ ) {

	var pluginName = "flip",
		initSelector = "." + pluginName,
		overClass = pluginName + "-over",
		overEvent = pluginName;

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var $el = $( this );

			function flipit(){
				$el[ $el.is( "." + overClass ) ? "removeClass" : "addClass" ]( overClass );
			}

			$( this ).bind( overEvent, flipit );

			$( this ).bind( "click keypress", function( e ){
				$( this ).trigger( overEvent );
				e.preventDefault();	
			} );
		});
	};

	// auto-init
	$(function(){
		$( initSelector )[ pluginName ]();
	});

}( jQuery ));
