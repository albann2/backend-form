
    // Tableau pour stocker les données d'administration

    function getEnseignementData() {
        let enseignementData = [];

        fetch('/Getenseignement', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Données de staff récupérées:', data);
            // Stocker les données dans le tableau
            enseignementData = data;
            // Appeler la fonction pour afficher les données dans le tableau
            displayEnseignementData(enseignementData);

        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error.message);
            // Afficher une alerte en cas d'erreur de récupération des données
        });
    }

    // Fonction pour afficher les données d'administration dans le tableau
    function displayEnseignementData(data) {
        const tableBody = document.getElementById("corps-enseignement"); // Correction de la méthode pour obtenir l'élément
            tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau
    
            data.forEach(item => {
                // Parcourir toutes les personnes de l'item
                    // Ajouter une nouvelle ligne au tableau avec les données de la personne
                    const newRow = tableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${item.nom}</td>
                        <td>${item.type}</td>
                        <td>${item.nbrCredits}</td>
                        <td>${item.description}</td>
                        <td>${item.langue}</td>
                        <td><button class="change">DELETE</button></td>
                        <td><button class="change">EDIT</button></td>

                    `;
            });
    }

    // Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
    getEnseignementData();