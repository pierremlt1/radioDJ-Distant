<?php

include '../config/config.php';

$commande1 = "PlaycartByNumber";
$commande2 = "PlayPlaylistTrack";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $buttonId = $_POST['buttonId'] ?? null;
    $commandType = $_POST['commandType'] ?? null;

    $urls = array(
        'cart1' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=1",
        'cart4' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=2",
        'cart7' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=3",
        'cart2' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=4",
        'cart5' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=5",
        'cart8' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=6",
        'cart3' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=7",
        'cart6' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=8",
        'cart9' => "http://$adresseIP:$port/opt?auth=$password&command=$commande1&arg=9"
    );

    if ($commandType === 'playcart') {
        if (array_key_exists($buttonId, $urls)) {
            $url = $urls[$buttonId];
        } else {
            echo 'Invalid button ID';
            exit;
        }
    } elseif ($commandType === 'play') {
        $url = "http://$adresseIP:$port/opt?auth=$password&command=$commande2";
    } else {
        echo 'Invalid command type';
        exit;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
}
?>