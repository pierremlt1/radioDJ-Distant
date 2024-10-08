document.addEventListener("DOMContentLoaded", function() {
    function fetchCurrentSong() {
        fetch('../php/titreEnCours.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                updateCurrentSong(data);
            })
            .catch(error => {
                console.error('Erreur fetch:', error);
                document.getElementById('titreEnCours').textContent = 'Erreur de chargement du titre';
                document.getElementById('tempsRestant').textContent = 'Erreur';
            });
    }

    function updateCurrentSong(song) {
        var currentSongContainer = document.getElementById('titreEnCours');
        var remainingTimeContainer = document.getElementById('tempsRestant');
        
        if (!currentSongContainer || !remainingTimeContainer) {
            console.error('Éléments non trouvés dans le DOM.');
            return;
        }

        if (song.error) {
            currentSongContainer.textContent = song.error;
            remainingTimeContainer.textContent = 'Erreur';
        } else {
            var songInfo = `${song.artist} - ${song.title}`;
            currentSongContainer.textContent = songInfo;
            
            var remainingSeconds = parseFloat(song.remaining);
            var minutes = Math.floor(remainingSeconds / 60);
            var seconds = Math.floor(remainingSeconds % 60);
            var remainingTime = `${minutes} min ${seconds} sec`;

            remainingTimeContainer.textContent = `Temps restant : ${remainingTime}`;
        }
    }
    fetchCurrentSong();
    setInterval(fetchCurrentSong, 1000);
});