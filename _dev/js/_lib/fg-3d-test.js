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

	// Media-matchin’ for WebKit up front, as the `t in transforms` test loop below gives a false positive in older Androids.
	if( mm ) {
		ret = window.matchMedia( "(-" + vendors.join( "-" + prop + "),(-" ) + "-" + prop + "),(" + prop + ")" ).matches;
	}

	if( !ret ) {
		transforms = {
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
		de.removeChild( fakeBody );
	}

	// If `ret` is explicitly true or contains a matchMedia match other than `none`, add the prop class. Else, prefix it with `no-`.
	de.setAttribute( "class", ' ' + ( ( !!ret && ret !== "none" ) ? '' : 'no-') + prop );

}( this ));
