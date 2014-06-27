( function ( win )
{
	'use strict';

	var App = win.App || {};

	define( [
		'jquery',
		'underscore',
		'backbone',
		'router',
		'utilities',
		'views/projectsList',
		'views/issuesList',
		'views/sprintsList'
	] , function ( $, _, Backbone, Router, Util, ProjectsList, IssuesList, SprintsList )
	{
		var _initialize = function ()
		{
			App.config = {
				mediatorUrl : 'http://' + win.location.host + '/experiments/demo-hopper/request.php'
			};

			App.oProjectsList = new ProjectsList;
			App.oIssuesList = new IssuesList;
			App.oSprintsList = new SprintsList;

			Router.initialize();
		};

		return {
			initialize : _initialize
		};
	} );

	win.App = App;

} ( window ) );

