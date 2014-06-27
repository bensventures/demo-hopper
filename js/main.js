( function ( win, require )
{
	'use strict';

	require.config(
	{
		paths : {
			jquery: 'libs/jquery',
			underscore: 'libs/underscore',
			backbone: 'libs/backbone',
			marked: 'libs/marked.min',
			utilities: 'libs/utilities'
		},
		urlArgs : "v=" +  ( new Date() ).getTime()
	});

	require( ['app'], function( App )
	{
		App.initialize();
	});


} ( window, require ) );
