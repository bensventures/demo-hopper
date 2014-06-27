<?php

// Dirty workaround for the new JIRA API v6 which dropped JSONP support
if( $_GET['action'] )
{
	switch( $_GET['action'] )
	{
		case 'projectList' :
			//$url = 'https://jira.redtonic/rest/api/2/project';
			$url = 'https://jira.redtonic/rest/greenhopper/1.0/rapidview';
		break;

		case 'sprintList' :
			//$url = 'http://jira.redtonic/rest/api/2/project/' . $_GET['project'] . '/versions';
			$url = 'https://jira.redtonic/rest/greenhopper/1.0/sprintquery/' . $_GET['project'];
		break;

		case 'issuesList' :
			//$assignee = !empty( $_GET['assignee'] ) && $_GET['assignee'] != 'false' ? ' AND assignee="' . $_GET['assignee'] .'"' : '';
			//$jql = 'project='. $_GET['project'] .' AND issuetype in standardIssueTypes() AND status IN ( \'solved\', \'Waiting for Deployment\', \'Testing Production\', \'Closed\', \'Testing Integration\'  ) AND sprint=\''. $_GET['fixVersion'] .'\' ' . $assignee . ' AND ( labels!=\'nodemo\' OR labels is empty ) ORDER BY assignee';
			//$url = 'https://jira.redtonic/rest/api/2/search?' . 'jql=' . urlencode($jql);

			$url = 'https://jira.redtonic/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=' . $_GET['project'] . '&sprintId=' . $_GET['sprint'];

		break;

		case 'issueDetails' :
			$url = 'https://jira.redtonic/rest/api/2/issue/' . $_GET['issueId'];
		break;
	}

	//echo $url;

	$ch = curl_init( $url );

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch, CURLOPT_HEADER, false );

	$result = curl_exec( $ch );

	if( curl_exec($ch) === false)
	{
		echo 'Curl error: ' . curl_error( $ch );
	}
	else
	{
		echo $result;
	}
}

?>