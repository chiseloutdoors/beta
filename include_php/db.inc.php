<?php
	$servername = "localhost";
	$username = "cave_alix";
	$password = "Stackedrocks17";

	//Connect to database
	try {
		$pdo = new PDO('mysql:host='.$servername.';dbname=ChiselDB', $username, $password);
		// set the PDO error mode to exception
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->exec('SET NAMES "utf8"');
	}
	catch (PDOException $e) {
		$output = 'Unable to connect to the database server: ' . $e->getMessage();
		include 'output.html.php';
		exit();
	}
