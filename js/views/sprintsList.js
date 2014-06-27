define( [
	'jquery',
	'underscore',
	'backbone',
	'collections/sprints'
],
	function ( $, _, Backbone, Sprints )
	{
		// Fix version View
		var SprintsList = Backbone.View.extend( {
			el : "#fixversions",

			initialize : function ()
			{
				this.collection = new Sprints;

				this.listenTo( this.collection, 'reset', this.render );

				$( this.el ).css( 'display', 'inline' ).hide();

				$( '#fixversions .dropdown' ).bind( 'click', function ()
				{
					$( '#fixversions_list' ).toggle();
					$( '#projects_list' ).hide();
				} );
			},

			render : function ()
			{
				$( this.el ).fadeIn();

				$( '#selectedFix' ).val( 'Sprint' );

				if ( this.collection.length )
				{
					var fixversion_list_template = _.template( $( "#sprintsListTpl" ).html(), {
						sprints : this.collection.toJSON()
					} );

					$( '#fixversions_list' ).html( fixversion_list_template );
					this.initVersionsDropDown();
				}
			},

			initVersionsDropDown : function ()
			{
				$( '#fixversions_list li' ).bind( 'click', function ()
				{
					App.router.navigate( 'project/' + App.currentProject + '/sprint/' + this.id, true );
				} );
			},

			setSprint : function ( sprintId )
			{
				var sName = document.getElementById( sprintId ).innerHTML;

				$( '#fixversions_list' ).hide();

				App.currentSprint = sprintId;

				$( '#selectedFix' ).val( sName );

				document.title += ' ' + sName;

			}
		} );

		return SprintsList;
	} );
