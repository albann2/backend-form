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
            if(chemin == '/Realisation') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-realisation.js';
                document.body.appendChild(staff);
            }
            if(chemin == '/Presentation') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-presentation.js';
                document.body.appendChild(staff);
            }
            if(chemin == '/Historique') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-historique.js';
                document.body.appendChild(staff);
            }
            if(chemin == '/Enseignant') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-enseignant.js';
                document.body.appendChild(staff);
            }
            if(chemin == '/Formation') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-formation.js';
                document.body.appendChild(staff);
            }
            if(chemin == '/Actualite') {
                var staff = document.createElement('script');
                staff.src = 'js/fill-table-actualite.js';
                document.body.appendChild(staff);
            }
            
        }
    };
    xhr.send();
}
const buttons=document.querySelectorAll('.reset-button')
buttons.forEach(button=>{
    button.addEventListener('click',function(){
        buttons.forEach(btn=>{
            btn.classList.remove('clicked')
        })
        this.classList.add('clicked')
    })
})

function adjustInputWidth(input) {
    input.style.width = `${input.value.length + 1}ch`;
}



function updateStaffData(url, formData) {
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(updatedItem => {
        getStaffData(); // Recharger les données pour afficher les mises à jour
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour des données:', error.message);
        alert('Erreur lors de la mise à jour des données: ' + error.message);
    });
}
///////////////////////





function sendDataViaAjax(formId, url, callback) {
    var form = document.getElementById(formId);
    if (!form) {
        console.error('Formulaire non trouvé');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        // Récupérer les valeurs des champs
        var formData = new FormData(form);
        var headers = {
            'Content-Type': 'application/json' // Assurez-vous que le type de contenu est correct
        };

        // Envoyer les données via AJAX avec les en-têtes d'autorisation
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => {
            if (response.ok) {
                // Traitement à effectuer en cas de succès
                if (callback && typeof callback === 'function') {
                }
            } else {
                // Traitement à effectuer en cas d'échec
                console.error('Erreur lors de l\'envoi des données');
                if (callback && typeof callback === 'function') {
                    callback('Erreur lors de l\'envoi des données');
                }
            }
        })
        .catch(error => {
            console.error('Erreur réseau lors de l\'envoi des données:', error.message);
            if (callback && typeof callback === 'function') {
                callback('Erreur réseau lors de l\'envoi des données');
            }
        });
    });
}
