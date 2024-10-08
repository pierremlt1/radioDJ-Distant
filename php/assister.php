<?php

include '../config/config.php';

$commande = "StatusAssisted";
$argument = "";

$url = "http://$adresseIP:$port/opt?auth=$password&command=$commande&arg=$argument";

$response = file_get_contents($url);

if ($response === false) {
    die('Erreur lors de la récupération du fichier XML');
}

$dom = new DOMDocument();
$dom->loadXML($response);

$xpath = new DOMXPath($dom);
$xpath->registerNamespace('ns', 'http://schemas.microsoft.com/2003/10/Serialization/');

$entries = $xpath->query('//ns:string');
$contenuBalise = $entries->item(0)->nodeValue;

echo json_encode(['contenuBalise' => $contenuBalise]);
?>