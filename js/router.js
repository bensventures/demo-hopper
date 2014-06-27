// Filename: router.js
define( [
	'jquery',
	'underscore',
	'backbone'
], function ( $, _, Backbone )
{
	var AppRouter = Backbone.Router.extend( {
		routes : {
			'' : 'index',
			'project/:id' : 'selectProject',
			'project/:id/sprint/:id' : 'selectSprint',
			'project/:id/sprint/:id/slide/:number' : 'getSlide'
		},

		index : function ()
		{
			App.oProjectsList.collection.fetch( { reset : true } );
		},

		/**
		 *
		 * @param projectId
		 * @returns {*}
		 */
		selectProject : function ( projectId )
		{
			var self = this;

			if ( !App.oProjectsList.collection.length )
			{
				return App.oProjectsList.collection.fetch( { reset : true } ).then( function ()
				{
					return self.getSprints( projectId )
				} );
			}
			else
			{
				return this.getSprints( projectId );
			}
		},

		/**
		 * Before getting the sprints we need to
		 * @param projectId
		 * @returns {Promise|*}
		 */
		getSprints : function ( projectId )
		{
			App.oProjectsList.setProject( projectId );

			App.oSprintsList.collection.url = App.config.mediatorUrl + '?action=sprintList' + '&project=' + projectId;

			return App.oSprintsList.collection.fetch( { reset : true } );
		},

		selectSprint : function ( projectId, sprintId )
		{
			var self = this;

			if( !App.oSprintsList.collection.length )
			{
				return this.selectProject( projectId ).then( function ()
				{
					return self.getIssues( projectId, sprintId );
				} );
			}
			else
			{
				return this.getIssues( projectId, sprintId );
			}
		},

		getIssues : function ( projectId, sprintId )
		{
			var sUserParam = App.utilities.getUrlParam( window.location, 'assignee' );

			App.oSprintsList.setSprint( sprintId );

			$( '#softJSWrap' ).fadeOut();

			App.oIssuesList.collection.url = App.config.mediatorUrl + '?action=issuesList' + '&project='+ App.currentProject +'&sprint=' + sprintId + '&assignee=' + sUserParam;

			return App.oIssuesList.collection.fetch( { reset : true } );
		},

		getSlide : function ( projectId, sprintId, slideIndex )
		{
			slideIndex = parseInt( slideIndex, 10 );

			if ( App.currentProject !== projectId || App.currentSprint !== sprintId )
			{
				// Set project and sprint
				this.selectSprint( projectId, sprintId ).then( function()
				{
					App.oIssuesList.selectIssue( slideIndex );
				} );
			}
			else
			{
				App.oIssuesList.selectIssue( slideIndex );
			}
		}
	} );

	var initialize = function ()
	{
		App.router = new AppRouter;

		Backbone.history.start( {
			root: "/experiments/demo-hopper/"
		} );
	};

	return {
		initialize : initialize
	};
} );
