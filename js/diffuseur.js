document.addEventListener("DOMContentLoaded", function() {
    var updateInterval;

    function fetchPlaylist() {
        fetch('./php/diffuseur.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                console.log('Données reçues:', data);
                updatePlaylist(data);
                updateCurrentSong(data);
            })
            .catch(error => {
                console.error('Erreur fetch:', error);
                clearInterval(updateInterval);
            });
    }

    function updatePlaylist(songs) {
        var playlistContainer = document.getElementById('playlist');
        if (!playlistContainer) {
            console.error('Élément playlist non trouvé dans le DOM.');
            return;
        }

        playlistContainer.innerHTML = '';

        var maxSongs = Math.min(songs.length, 10);

        for (var i = 0; i < maxSongs; i++) {
            var song = songs[i];
            var songElement = document.createElement('div');
            songElement.classList.add('song');

            var remainingSeconds = parseFloat(song.remaining);
            var minutes = Math.floor(remainingSeconds / 60);
            var seconds = Math.floor(remainingSeconds % 60);

            if (!isNaN(remainingSeconds) && remainingSeconds > 0) {
                songElement.classList.add('current');
                songElement.innerHTML = `
                    <div class="gauche">
                    <img class="logodiffimg" src="./data/logo.jpg" alt="votre logo">
                    <div class="centre">
                    <div class="artist">${song.artist}</div>
                    <div class="title">${song.title}</div>
                    </div>
                    </div>
                    <div id="droite">
                    <div class="remaining">Temps restant : <b>${minutes} min ${seconds} sec </b></div>
                    </div>
                `;
            } else {
                songElement.innerHTML = `
                    <div class="gauche">
                    <img class="logodiffimg" src="./data/logo.jpg" alt="votre logo">
                    <div class="centre">
                    <div class="artist">${song.artist}</div>
                    <div class="title">${song.title}</div>
                    </div>
                `;
            }
            playlistContainer.appendChild(songElement);
        }
    }

    function updateCurrentSong(songs) {
        var currentSongContainer = document.getElementById('titreEnCours');
        if (!currentSongContainer) {
            console.error('Élément currentSong non trouvé dans le DOM.');
            return;
        }

        var currentSong = songs[0];
        if (currentSong) {
            var remainingSeconds = parseFloat(currentSong.remaining);
            var minutes = Math.floor(remainingSeconds / 60);
            var seconds = Math.floor(remainingSeconds % 60);

            currentSongContainer.innerHTML = `
                <h3>Nrj --> &nbsp;</h3>
                <div class="artist">${currentSong.artist}</div>
                <div>&nbsp;-&nbsp;</div>
                <div class="title">${currentSong.title}</div>
            `;
        } else {
            currentSongContainer.textContent = 'NRJ, Hit Music Only!';
        }
    }

    fetch('./php/diffuseur.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            console.log('Initial check passed, starting periodic updates.');
            updatePlaylist(data);
            updateCurrentSong(data);
            updateInterval = setInterval(fetchPlaylist, 500);
        })
        .catch(error => console.error('Initial check failed, stopping script:', error));
});