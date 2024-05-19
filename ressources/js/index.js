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
            if(chemin == '/Mission') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-mission.js';
                document.body.appendChild(staff);
            }

            
        }
    };
    xhr.send();
}