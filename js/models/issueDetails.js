define([
  'underscore',
  'backbone'
], function( _, Backbone )
{
	// Model
	var IssueDetails = Backbone.Model.extend({
		parse : function ( response )
		{
			var fields = response.fields;

			fields.issueKey = response.key;

			return fields;
		}
	});

	return IssueDetails;
} );