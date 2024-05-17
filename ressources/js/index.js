function clickRubrique(chemin) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', chemin, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            document.getElementById('main-content').innerHTML = xhr.responseText;
           
            // Importez le script fill-table-admin.js après avoir changé la page
            if(chemin == '/Administration') {
                var admin = document.createElement('script');
                admin.src = 'js/fill-table-admin.js';
                document.body.appendChild(admin);
            }

            // Importez le script fill-table-staff.js après avoir changé la page
            if(chemin == '/Staff') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-staff.js';
                document.body.appendChild(staff);
            }

            // Importez le script fill-table-enseignement.js après avoir changé la page
            if(chemin == '/Enseignement') {
                var enseignement = document.createElement('script');
                enseignement.src = 'js/fill-table-enseignement.js'; // Ajouté le préfixe 'js/'
                document.body.appendChild(enseignement);
            }
            if(chemin == '/Recherche'){
                var recherche = document.createElement('script');
                recherche.src = 'js/fill-table-recherche.js'; // Ajouté le préfixe 'js/'
                document.body.appendChild(recherche);
            }
        }
    };
    xhr.send();
}