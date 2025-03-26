import Modal from "../Modal";
import React, { useState } from "react";
import { useToDo } from "../../context/ToDoContext";

export default function Footer() {
    // État pour afficher ou non la popup de formulaire.
    const [showPopup, setShowPopup] = useState(false);

    // Récupération des fonctions pour modifier les tâches, catégories et relations depuis le contexte.
    const { setTasks, setCategories, setRelations } = useToDo();

    // État pour s'assurer que la confirmation de reset ne s'affiche qu'une seule fois.
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Fonction pour réinitialiser toutes les données de la To-Do List.
    const reset = () => {
        setTasks([]);
        setCategories([]);
        setRelations([]);
    };

    // Vérifie si le reset a déjà été demandé, sinon affiche une confirmation au chargement du composant.
    if (!isDataLoaded) {
        if (window.confirm('Voulez-vous reset des données ?')) {
            reset();
        }
        setIsDataLoaded(true); // Empêche d'afficher la confirmation plusieurs fois.
    }

    // Fonction déclenchée au clic sur le bouton RESET, demande confirmation avant de réinitialiser.
    const resetButton = () => {
        if (window.confirm('Voulez-vous reset des données ?')) {
            reset();
        }
    };

    return (
        <footer className="App-footer">
            <p>To-Do List by Manon VERHILLE</p>

            {/* Pop-up d'affichage des formulaires */}
            {showPopup && (<Modal setShowPopup={setShowPopup} />)}

            {/* Bouton pour réinitialiser les données */}
            <button onClick={() => resetButton()}>
                RESET
            </button>

            {/* Bouton pour afficher/fermer la pop-up */}
            <button onClick={() => setShowPopup(prev => !prev)}>
                {showPopup ? "✘" : "+"} {/* Change l'icône en fonction de l'état */}
            </button>
        </footer>
    );
}
