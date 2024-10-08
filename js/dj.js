document.addEventListener("DOMContentLoaded", function() {
    function fetchStatus() {
        fetch('./php/dj.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                console.log('Données reçues:', data);
                var contenuBalise = data.contenuBalise;
                updateStatus(contenuBalise);
            })
            .catch(error => {
                console.error('Erreur:', error);
                clearInterval(updateInterval);
            });
    }

    function updateStatus(value) {
        var statusElement = document.getElementById('autoDJ');
        if (!statusElement) {
            console.error('Élément autoDJ non trouvé dans le DOM.');
            return;
        }
        
        var currentStatus = statusElement.getAttribute('data-status');
        if (currentStatus !== value) {
            statusElement.setAttribute('data-status', value);
            if (value === "False") {
                statusElement.style.backgroundColor = 'green';
                statusElement.style.color = '#EBF5FB';
                statusElement.style.fontWeight = 'Bold';
                statusElement.textContent = 'ROTATION OFF';
            } else {
                statusElement.style.backgroundColor = 'red';
                statusElement.style.color = '#EBF5FB';
                statusElement.style.fontWeight = 'Bold';
                statusElement.textContent = 'ROTATION ON';
            }
        }
    }

    fetch('./php/dj.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            console.log('Initial check passed, starting periodic updates.');
            var contenuBalise = data.contenuBalise;
            updateStatus(contenuBalise);
            updateInterval = setInterval(fetchStatus, 500);
        })
        .catch(error => console.error('Initial check failed, stopping script:', error));
});