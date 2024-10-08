document.addEventListener('DOMContentLoaded', function() {
    var buttonIds = ['cart1', 'cart2', 'cart3', 'cart4', 'cart5', 'cart6', 'cart7', 'cart8', 'cart9'];
    
    buttonIds.forEach(function(buttonId) {
        var button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', './php/cart.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('Requête envoyée avec succès : ' + xhr.responseText);
                        } else {
                            alert('Erreur lors de l\'envoi de la requête : ' + xhr.status);
                        }
                    }
                };

                xhr.send('buttonId=' + encodeURIComponent(buttonId) + '&commandType=' + encodeURIComponent('playcart'));
            });
        }
    });

    var playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.addEventListener('click', function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', './php/cart.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log('Requête "Play" envoyée avec succès : ' + xhr.responseText);
                    } else {
                        alert('Erreur lors de l\'envoi de la requête "Play" : ' + xhr.status);
                    }
                }
            };

            xhr.send('commandType=' + encodeURIComponent('play'));
        });
    }
});