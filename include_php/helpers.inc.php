<?php

	function html($text){
		return htmlspecialchars($text, ENT_QUOTES, 'utf-8'); 
	}

	function htmlout($text){
		echo html($text);
	}