function clickRubrique(chemin) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', chemin, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById('main-content').innerHTML = xhr.responseText;
           
            // Importer le script correspondant après le changement de page
            var scriptSrc = '';
            switch(chemin) {
                case '/Administration':
                    scriptSrc = 'js/fill-table-admin.js';
                    break;
                case '/Mission':
                    scriptSrc = 'js/fill-table-mission.js';
                    break;
                case '/Realisation':
                    scriptSrc = 'js/fill-table-realisation.js';
                    break;
                case '/Presentation':
                    scriptSrc = 'js/fill-table-presentation.js';
                    break;
                case '/Historique':
                    scriptSrc = 'js/fill-table-historique.js';
                    break;
                case '/Enseignant':
                    scriptSrc = 'js/fill-table-enseignant.js';
                    break;
                case '/Formation':
                    scriptSrc = 'js/fill-table-formation.js';
                    break;
                case '/Actualite':
                    scriptSrc = 'js/fill-table-actualite.js';
                    break;
                default:
                    // Aucune action nécessaire pour d'autres chemins
                    break;
            }
            if (scriptSrc !== '') {
                var script = document.createElement('script');
                script.src = scriptSrc;
                document.body.appendChild(script);
            }
        }
    };
    xhr.send();
}

module.exports = clickRubrique;
