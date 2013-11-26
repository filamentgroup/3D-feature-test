/*! 3D feature test - v0.0.1 - 2013-11-26
* Copyright (c) 2013 Authored by Filament Group, Inc.
* http://filamentgroup.github.com/3D-feature-test */

(function( win, undefined ) {
	var fakeBody,
		doc = document,
		de = doc.documentElement,
		bod = doc.body || (function() {
			fakeBody = doc.createElement('body');
			return de.insertBefore( fakeBody, de.firstElementChild || de.firstChild);
		}()),
		el = document.createElement( "div" ),
		prop = "transform-3d",
		vendors = [ "Webkit", "Moz", "O" ],
		mm = "matchMedia" in window,
		ret = false,
		transforms, t;

	if( mm ) {
		ret = window.matchMedia( "(-" + vendors.join( "-" + prop + "),(-" ) + "-" + prop + "),(" + prop + ")" );
	}

	if( !ret ) {
		transforms = {
			// We’re omitting Opera for the time being; MS uses unprefixed.
			"MozTransform": "-moz-transform",
			"transform": "transform"
		};

		bod.appendChild( el );

		for ( t in transforms ) {
			if ( el.style[ t ] !== undefined ) {
				el.style[ t ] = "translate3d( 100px, 1px, 1px )";
				ret = window.getComputedStyle( el ).getPropertyValue( transforms[ t ] );
			}
		}
	}

	if( fakeBody ) {
		fakeBody.remove();
	}
	
	de.setAttribute( "class", ' ' + ( ( !!ret && ret !== "none" ) ? '' : 'no-') + prop );

}( this ));

/*
 * initial.config.js - conditionally load JS
 *
 * Copyright (c) 2013 Filament Group, Inc.
 * Licensed under MIT
 */

 /*
	this file:
		* determines whether a browser is qualified for enhancements at all, and if so,
		* finds available CSS and JS assets that may be loaded
		* check the template via meta[name='template']
		* test features and device conditions and environment to determine which files to load
		* load files as needed
*/

(function( win, undefined ){

	var initialJS = win.document.getElementById( "initialjs" ),
		docClasses = [ "enhanced" ];

	// simple load JS function
	function loadJS( src ){
		if( initialJS && initialJS.parentNode ) {
			var script = win.document.createElement( "script" );
			script.src= src;
			initialJS.parentNode.insertBefore( script, initialJS );
		} else {
			window.setTimeout(function() {
				loadJS( src );
			}, 15);
		}
	}

	// Qualifications for major browser experience divisions
	// For example, you might choose to only enhance browsers that support document.querySelector (IE8+, etc)
	// Use case will vary, but basic browsers: last stop here!
	if( !( "querySelector" in win.document ) ){
		return;
	}
	
	// Add scoping classes to HTML element
	win.document.documentElement.className += " " + docClasses.join(" ");

	// Get scripts to load, if defined
	if( initialJS ){
		var enhancedScripting = initialJS.getAttribute( "data-enhance" );
		// Load JS files
		if( enhancedScripting ){
			loadJS( enhancedScripting );
		}
	}

}( this ));
