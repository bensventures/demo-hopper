define( [
	'jquery',
	'underscore',
	'backbone',
	'models/issueDetails',
	'views/issueDetails'
],
	function ( $, _, Backbone, IssueDetailsModel, IssueDetailsView )
	{
		var IssueView = Backbone.View.extend( {

			template : $( '#issueTpl' ).html(),

			initialize : function ()
			{
				this.listenTo( this.model, 'change:visible', this.toggleVisibility );
				this.listenTo( this.model, 'change:visible', this.renderDetails );
				this.listenTo( this.model, 'change:prefetch', this.renderDetails );
			},

			render : function ()
			{
				var temp = document.createElement( 'div' );

				temp.innerHTML =  _.template( this.template, this.model.toJSON() );

				this.setElement( temp.firstElementChild );

				return this;
			},

			toggleVisibility : function ()
			{
				var action = this.model.get( 'visible' ) ? 'remove' : 'add';

				this.el.classList[action]( 'hidden' );
			},

			renderDetails : function ()
			{
				if( !this.detailsModel )
				{
					this.detailsModel = new IssueDetailsModel;
					this.detailsView = new IssueDetailsView( {
							model : this.detailsModel,
							el : this.el.querySelector( '.issue-details' )
						} );

					this.detailsModel.url = App.config.mediatorUrl + '?action=issueDetails&issueId=' + this.model.get( 'id' );

					// Retrieve model's data from the server which will in turn trigger the view render
					this.detailsModel.fetch();
				}
			}

		} );

		return IssueView;
	}
);
