define( [
	'jquery',
	'underscore',
	'backbone',
	'collections/projects'
],
	function ( $, _, Backbone, Projects )
	{
		// Projects View
		var ProjectsList = Backbone.View.extend( {
			el : "#projects",

			initialize : function ()
			{
				var self = this;

				self.collection = new Projects;

				self.listenTo( self.collection, 'reset', self.render );

				// DOM caching
				self.projectsList = $( '#projects_list' );

				$( '#projects .dropdown' ).bind( 'click', function ()
				{
					self.projectsList.toggle();
					$( '#fixversions_list' ).hide();
				} );
			},

			render : function ()
			{
				if ( this.collection.length )
				{
					var project_list_template = _.template( $( "#projectsListTpl" ).html(), {
						projects : this.collection.toJSON()
					} );

					this.projectsList.html( project_list_template );
					this.initProjectsDropDown();
				}
			},

			initProjectsDropDown : function ()
			{
				this.projectsList.find( 'li' ).bind( 'click', function ()
				{
					App.router.navigate( 'project/' + this.id, true );
				} );
			},

			setProject : function ( projectId )
			{
				var name = document.getElementById( projectId ).innerHTML;

				App.currentProject = projectId;

				this.projectsList.hide();

				$( '#selectedProject' ).val( name );

				document.title = name;
			}
		} );

		return ProjectsList;
	} );