define( [
	'jquery',
	'underscore',
	'backbone'
],
	function ( $, _, Backbone )
	{
		var Issues = Backbone.Collection.extend(
		{
			model : Backbone.Model,

			url : '',

			parse : function ( response )
			{
				return response.contents.completedIssues;
			},

			resetVisibility : function ()
			{
				var visibleIssue = this.findWhere( { 'visible' : true } );

				if( visibleIssue )
					visibleIssue.set( { 'visible' : false } );
			},

			comparator : function ( issue )
			{
				return issue.get( 'assignee' );
			}
		} );

		return Issues;
	} );