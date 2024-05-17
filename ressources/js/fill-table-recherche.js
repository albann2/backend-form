
    // Tableau pour stocker les données d'administration

    function getResearchData() {
        let researchData = [];

        fetch('/Getrecherche', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Données d\'administration récupérées:', data);
            // Stocker les données dans le tableau
            researchData = data;
            // Appeler la fonction pour afficher les données dans le tableau
            displayresearchData(researchData);

        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error.message);
            // Afficher une alerte en cas d'erreur de récupération des données
        });
    }

    // Fonction pour afficher les données d'administration dans le tableau
    function displayresearchData(data) {
        const tableBody = document.getElementById("corps-recherche"); // Correction de la méthode pour obtenir l'élément
            tableBody.innerHTML = ''; // Effacer le contenu précédent du tableau
    
            data.forEach(item => {
                // Parcourir toutes les personnes de l'item
                item.participants.forEach(personne => {
                    // Ajouter une nouvelle ligne au tableau avec les données de la personne
                    const newRow = tableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${item.theme}</td>
                        <td>${item.lien_utile}</td>
                        <td>${personne.nom}</td>
                        <td>${personne.grade}</td>

                    `;
                });
            });
       
    }

    // Appel de la fonction pour récupérer et afficher les données lors du chargement de la page
    getResearchData();