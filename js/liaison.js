document.addEventListener("DOMContentLoaded", function() {
    function checkConnection() {
        fetch('./php/diffuseur.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                console.log('Connexion établie. Actualisation de la page.');
                location.reload();
            })
            .catch(error => {
                console.error('Erreur de connexion:', error);
            });
    }

    document.getElementById('checkConnectionBtn').addEventListener('click', function() {
        checkConnection();
    });
});