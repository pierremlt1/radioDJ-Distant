document.getElementById('formulaire').addEventListener('submit', function(event) {
    event.preventDefault();

    const trackId = document.getElementById('input').value.trim();

    if (!trackId || isNaN(trackId) || !Number.isInteger(parseFloat(trackId))) {
        console.error('Veuillez saisir un ID valide (un entier).');
        return;
    }

    document.getElementById('input').value = '';

    const formData = new FormData();
    formData.append('track_id', trackId);

    fetch('../php/borne.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            console.error('Erreur HTTP : ' + response.status);
            return;
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi : ' + error.message);
    });
});