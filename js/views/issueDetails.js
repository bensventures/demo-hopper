define( [
	'jquery',
	'underscore',
	'backbone',
	'marked'
],
	function ( $, _, Backbone, Marked )
	{
		var IssueDetailsView = Backbone.View.extend( {

			template : $( '#issueDetailsTpl' ).html(),

			initialize : function ()
			{
				this.listenTo( this.model, 'change', this.render );
			},

			render : function ()
			{
				var modelJSON = this.model.toJSON();

				modelJSON.description = Marked( modelJSON.description );

				this.el.innerHTML = _.template( this.template, modelJSON );
				this.el.classList.remove( 'hidden' );
			}

		} );

		return IssueDetailsView;
	}
);
