define( [] ,
function ( $, _, Backbone )
{
	App.utilities = {
		/**
		 * Return the value for an url param.
		 *
		 * @param {String} sParamName The name of url param.
		 * @returns String The value for the given param if exists.
		 */
		getUrlParam : function ( sUrl, sParamName )
		{
			var oRegex = new RegExp( '[\\?&]' + sParamName + '=([^&#]*)' ),
				aParamValue = oRegex.exec( sUrl );

			if ( null !== aParamValue && aParamValue.length > 1 )
			{
				return aParamValue[1];
			}
			return false;
		}
	};
} );
