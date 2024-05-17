
    // Tableau pour stocker les données d'administration

    function getAdministrationData() {
        let administrationData = [];

        fetch('/Getadministration', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Données d\'administration récupérées:', data);
            // Stocker les données dans le tableau
            administrationData = data;
            // Appeler la fonction pour afficher les données dans le tableau
            displayAdministrationData(administrationData);

        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error.message);
            // Afficher une alerte en cas d'erreur de récupération des données
        });
    }

    // Fonction pour afficher les données d'administration dans le tableau
    function displayAdministrationData(data) {
        const tableBody = document.getElementById("corps-administration"); // Correction de la méthode pour obtenir l'élément
            tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau
    
            data.forEach(item => {
                // Parcourir toutes les personnes de l'item
                item.personnes.forEach(personne => {
                    // Ajouter une nouvelle ligne au tableau avec les données de la personne
                    const newRow = tableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${item.poste}</td>
                        <td>${personne.nom}</td>
                        <td>${personne.agenda}</td>
                        <td>${personne.email}</td>
                        <td>${personne.telephone}</td>
                    `;
                });
            });
       
    }

    // Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
    getAdministrationData();