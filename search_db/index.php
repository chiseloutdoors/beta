<?php

	//Handle Magic Quotes
	include $_SERVER['DOCUMENT_ROOT'] . '/beta/include_php/magicquotes.inc.php';

	//Connect to DB
	include $_SERVER['DOCUMENT_ROOT'] . '/beta/include_php/db.inc.php';
		
	//SQL Query joke list
	try {
		$sql = 'SELECT * FROM Trails';
		$result = $pdo->query($sql);
	}
	catch (PDOException $e) {
		$error = 'Error fetching jokes: ' . $e->getMessage();
		include $_SERVER['DOCUMENT_ROOT'] . '/beta/include_html/error.html.php';
		exit();
	}

	//Parse results
	while ($row = $result->fetch()) {
		$trails[] = array('Trail_ID' => $row['Trail_ID'], 'Trail_Name' => $row['Trail_Name'], 'Trail_Lat' => $row['Trail_Lat'], 'Trail_Long' => $row['Trail_Long']);
	}

	include 'search.html.php';