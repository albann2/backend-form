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
            <td><button class="btn-add">EDIT</button></td>
        `;

        const newRowForm = tableBody.insertRow();
        newRowForm.innerHTML = `
            <td colspan="4">
            <form action="/Updaterealisation/${item._id}" method="POST" class="modal" style="display:none;">
            <input type="text" value="${item.titre}" name="titre" id="titre" oninput="adjustInputWidth(this)">
            <input type="text" value="${item.annee}" name="annee" id="annee" oninput="adjustInputWidth(this)">
            <input type="text" value="${item.description}" name="description" id="description" oninput="adjustInputWidth(this)">
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
