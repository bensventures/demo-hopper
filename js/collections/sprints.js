define( [
	'jquery',
	'underscore',
	'backbone'
],
	function ( $, _, Backbone )
	{
		var Sprints = Backbone.Collection.extend(
			{
				model : Backbone.Model,

				url : function ()
				{
					return App.config.mediatorUrl + '?action=fixVersion';
				},

				parse : function ( response )
				{
					return response.sprints;
				},

				comparator : function ( item )
				{
					return item.get( 'id' );
				}
			} );

		return Sprints;
	} );
