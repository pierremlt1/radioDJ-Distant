<?php

include '../config/config.php';

$url = "http://$adresseIP:$port/p?auth=$password";

$response = file_get_contents($url);

if ($response === false) {
    die('Erreur lors de la récupération du fichier XML');
}

$dom = new DOMDocument();
$dom->loadXML($response);

$xpath = new DOMXPath($dom);
$xpath->registerNamespace('ns', 'http://schemas.datacontract.org/2004/07/rdjInterface');

$songs = $xpath->query('//ns:SongData');
$data = [];

foreach ($songs as $song) {
    $title = $xpath->query('ns:Title', $song)->item(0)->nodeValue;
    $artist = $xpath->query('ns:Artist', $song)->item(0)->nodeValue;
    $remaining = $xpath->query('ns:Remaining', $song)->item(0)->nodeValue;
    $data[] = ['title' => $title, 'artist' => $artist, 'remaining' => $remaining];
}

echo json_encode($data);
?>
