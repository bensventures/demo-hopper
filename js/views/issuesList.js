define( [
	'jquery',
	'underscore',
	'backbone',
	'collections/issues',
	'views/issue'
],
	function ( $, _, Backbone, Issues, IssueView )
	{
		// IssuesList View
		var IssuesList = Backbone.View.extend( {
			el : "#issuesList",
			selectedIssue : null,
			currentIssueNumber : 0,

			initialize : function ()
			{
				this.collection = new Issues;
				this.listenTo( this.collection, 'reset', this.render );
				this.listenTo( this.collection, 'request', this.loading );
				this.buildArrows();
			},

			loading: function ()
			{
				this.$el.empty();
				$( '#spinner' ).removeClass( 'hidden' );
			},

			/**
			 * Instanciate views for each model and call render on the first one
			 */
			render : function ()
			{
				var issuesFragment = document.createDocumentFragment();

				this.collection.each( function ( issue ){

					var view = new IssueView( { model: issue } );

					issuesFragment.appendChild( view.render().el );
				} );

				this.$el.append( issuesFragment );
				$( '#spinner' ).addClass( 'hidden' );

				this.baseUrl = 'project/' + App.currentProject + '/sprint/' + App.currentSprint + '/slide/';

				// Load first slide
				this.currentIssueNumber = 0;
				this.nextIssue();
			},

			nextIssue : function ()
			{
				if ( this.currentIssueNumber !== this.collection.length )
				{
					App.router.navigate( this.baseUrl + ++this.currentIssueNumber, true );
				}
			},

			prevIssue : function ()
			{
				if ( this.currentIssueNumber !== 1 )
				{
					App.router.navigate( this.baseUrl + --this.currentIssueNumber, true );
				}
			},

			selectIssue : function ( slideIndex )
			{
				if( slideIndex > App.oIssuesList.collection.length )
				{
					App.router.navigate( App.oIssuesList.baseUrl + this.collection.length , true );
				}
				else
				{
					this.currentIssueNumber = slideIndex;

					this.animateCards();
					this.showArrows();
					this.prefetchModelDetails();
				}
			},

			prefetchModelDetails : function ()
			{
				var nextModel = this.collection.at( this.currentIssueNumber ),
					prevModel = this.collection.at( this.currentIssueNumber - 2 );

				if ( nextModel )
				{
					nextModel.set( 'prefetch', true );
				}
				if ( prevModel )
				{
					prevModel.set( 'prefetch', true );
				}
			},

			animateCards : function ()
			{
				this.collection.resetVisibility();

				this.collection.models[this.currentIssueNumber - 1].set( 'visible', true );
			},

			showArrows : function ()
			{
				if ( this.currentIssueNumber === 1 )
				{
					$( '#arrow-left' ).fadeOut();
				}
				else
				{
					$( '#arrow-left' ).fadeIn();
				}

				if ( this.currentIssueNumber === this.collection.length )
				{
					$( '#arrow-right' ).fadeOut();
				}
				else
				{
					$( '#arrow-right' ).fadeIn();
				}
			},

			buildArrows : function ()
			{
				var oSelf = this;

				$( '#arrow-left' ).bind( 'click', function ()
				{
					oSelf.prevIssue();
				} );

				$( '#arrow-right' ).bind( 'click', function ()
				{
					oSelf.nextIssue();
				} );

				$( document ).bind( 'keydown', function ( e )
				{
					switch ( e.keyCode )
					{
						// Left arrow
						case 37 :
							oSelf.prevIssue();
							break;

						// Right arrow
						case 39 :
							oSelf.nextIssue();
							break;
					}
				} )
			}
		} );

		return IssuesList;

	} );
