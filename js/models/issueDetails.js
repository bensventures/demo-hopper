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

			fields.links = fields.description ? fields.description.match( /\[demo\](.*?)\[demo\]/ig ) : [];

			return fields;
		}
	});

	return IssueDetails;
} );

/*

<%
var desc = issue.description,
	oRegDemo = new RegExp(/\[demo\]/g),
	oRegImg = new RegExp(/(.*?)\.(png|jpg|gif|jpeg)/i);

if ( desc ) { %>
	<ul id="demo_links">
	<% var links = issue.description.match( /\[demo\](.*?)\[demo\]/ig );
	_( links ).each(function( link ) { %>
		<li>
			<a target="_blank" href="<%=link.replace( oRegDemo, '' ) %>"><% if ( link.match( oRegImg ) ) { %> img <% } else { %> &#9658;<% } %></a>
		</li>
	<% }); %>
	</ul>
<% } %>
 */