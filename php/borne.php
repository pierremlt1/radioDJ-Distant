<?php
header('Content-Type: application/json');
include '../config/config.php';

$commande = 'LoadTrackToBottom';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $track_id = $_POST['track_id'] ?? '';

    $url = "http://$adresseIP:$port/opt?auth=" . urlencode($password) . "&command=" . urlencode($commande) . "&arg=" . urlencode($track_id);

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_VERBOSE => false
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Erreur lors de la requête cURL: ' . curl_error($ch),
            'url' => $url
        ]);
    } elseif ($httpCode !== 200) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Erreur HTTP: ' . $httpCode,
            'url' => $url
        ]);
    } else {
        echo json_encode([
            'status' => 'success',
            'message' => 'Requête envoyée avec succès',
            'apiResponse' => $response,
            'url' => $url
        ]);
    }

    curl_close($ch);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Méthode non autorisée'
    ]);
}
?>