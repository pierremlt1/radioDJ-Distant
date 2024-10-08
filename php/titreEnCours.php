<?php

include '../config/config.php';

$url = "http://$adresseIP:$port/p?auth=$password";

$response = file_get_contents($url);
if ($response === false) {
    die(json_encode(['error' => 'Erreur lors de la récupération du fichier XML']));
}

$dom = new DOMDocument();
$dom->loadXML($response);

$xpath = new DOMXPath($dom);
$xpath->registerNamespace('ns', 'http://schemas.datacontract.org/2004/07/rdjInterface');

$song = $xpath->query('//ns:SongData')->item(0);
$data = [];

if ($song) {
    $title = $xpath->query('ns:Title', $song)->item(0)->nodeValue ?? 'Inconnu';
    $artist = $xpath->query('ns:Artist', $song)->item(0)->nodeValue ?? 'Inconnu';
    $remaining = $xpath->query('ns:Remaining', $song)->item(0)->nodeValue ?? '0';

    $data = [
        'title' => $title,
        'artist' => $artist,
        'remaining' => $remaining
    ];
} else {
    $data = ['error' => 'Aucune chanson en cours'];
}

header('Content-Type: application/json');
echo json_encode($data);
?>