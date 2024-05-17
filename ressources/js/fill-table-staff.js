
    // Tableau pour stocker les données d'administration

    function getStaffData() {
        let staffData = [];

        fetch('/Getstaff', {
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
    function displayStaffData(data) {
        const tableBody = document.getElementById("corps-staff"); // Correction de la méthode pour obtenir l'élément
            tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau
    
            data.forEach(item => {
                // Parcourir toutes les personnes de l'item
                    // Ajouter une nouvelle ligne au tableau avec les données de la personne
                    const newRow = tableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${item.nom}</td>
                        <td>${item.email}</td>
                        <td>${item.telephone}</td>
                        <td>${item.poste}</td>
                        <td>${item.addsup}</td>
                        <td>${item.bureau}</td>
                        <td>${item.batiment}</td>

                    `;
            });
    }

    // Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
    getStaffData();