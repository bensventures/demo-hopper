define( [
	'jquery',
	'underscore',
	'backbone'
],
	function ( $, _, Backbone )
	{
		// Projects Collection
		var Projects = Backbone.Collection.extend(
			{
				model : Backbone.Model,

				url : function ()
				{
					return App.config.mediatorUrl + '?action=projectList';
				},

				parse : function ( response )
				{
					return response.views;
				}
			} );

		return Projects;
	} );
