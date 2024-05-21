// Tableau pour stocker les données d'administration

function getStaffData() {
    let staffData = [];

    fetch('/Getrealisation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données de staff récupérées:', data);
        // Stocker les données dans le tableau
        staffData = data;
        // Appeler la fonction pour afficher les données dans le tableau
        displayStaffData(staffData);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error.message);
        // Afficher une alerte en cas d'erreur de récupération des données
    });
}

// Fonction pour afficher les données d'administration dans le tableau
function adjustInputWidth(input) {
    input.style.width = `${input.value.length + 1}ch`; // Adjust the width based on the content length
}

function displayStaffData(data) {
    const tableBody = document.getElementById("corps-realisation");
    tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau

    data.forEach(item => {
        const newRow = tableBody.insertRow();
        
        newRow.innerHTML = `
            <td>${item.titre}</td>
            <td>${item.annee}</td>
            <td>${item.description}</td>
            <td><button class="btn-add">ajouter</button></td>
        `;

        const newRowForm = tableBody.insertRow();
        newRowForm.innerHTML = `
            <td colspan="4">
            <form action="/Updaterealisation/${item._id}" method="post" class="modal" style="display:none;" onsubmit="event.preventDefault(); updateRealisation(this);">
            <input type="text" name="titre"  oninput="adjustInputWidth(this)">
            <input type="text" name="annee"  oninput="adjustInputWidth(this)">
            <input type="text" name="description"  oninput="adjustInputWidth(this)">
            <input type="submit" value="mettre à jour">
        </form>
        
            </td>
        `;

        newRow.querySelector('.btn-add').addEventListener('click', () => {
            const form = newRowForm.querySelector('.modal');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
            // Adjust input widths initially
            form.querySelectorAll('input[type="text"]').forEach(adjustInputWidth);
        });
    });
}


// Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
getStaffData();


function updateRealisation(form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const url = form.action;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur lors de la mise à jour');
        }
    })
    .then(updatedData => {
        console.log('Données mises à jour:', updatedData);
        getStaffData();

        // Mettre à jour l'interface utilisateur avec les nouvelles données si nécessaire
    })
    .catch(error => {
        console.error('Erreur:', error.message);
        // Gérer l'erreur de mise à jour
    });
}
