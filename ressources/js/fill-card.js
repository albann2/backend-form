document.addEventListener("DOMContentLoaded", () => {
    const staffArray = {}; // Objet pour stocker les résultats de l'API par poste
    const mainContent = document.getElementById("cards-content");

    // Fonction pour effectuer la requête AJAX
    function getStaff() {
        fetch("/Getstaff")
            .then(response => response.json())
            .then(data => {
                // Regrouper les données par poste
                data.forEach(person => {
                    if (!(person.poste in staffArray)) {
                        staffArray[person.poste] = []; // Initialiser un tableau vide pour chaque poste
                    }
                    staffArray[person.poste].push(person);
                });

                // Créer les cards pour chaque poste
                createCards();
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du personnel :", error);
            });
    }

    // Fonction pour créer les cards à partir des données
    function createCards() {
        // Supprimer le contenu existant
        mainContent.innerHTML = "";

        // Parcourir les postes dans staffArray
        for (const poste in staffArray) {
            if (staffArray.hasOwnProperty(poste)) {
                const personnes = staffArray[poste];
                const cardHTML = `
                    <div class="card-single">
                        <div>
                            <h1>${personnes.length}</h1>
                            <span>${poste}</span>
                        </div>
                        <div>
                            <span class="las la-users"></span>
                        </div>
                    </div>
                `;
                mainContent.innerHTML += cardHTML;
            }
        }
    }

    // Appel de la fonction pour récupérer le personnel au chargement de la page
    getStaff();
});
