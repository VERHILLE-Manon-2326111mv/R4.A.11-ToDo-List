import React, { useState } from "react";

// Import des composants
import Footer from './layout/footer';
import Header from './layout/header';
import ToDoList from "./ToDoList";
import Modal from "./Modal";

// Import des fichiers CSS
import '../css/App.css';

// Tableau exemple de tâches
// const taches = [
//     {id: 1, name : "Faire les courses", enCours : true},
//     {id: 2, name : "Aller à la salle de sport", enCours : false},
//     {id: 3, name : "Réviser le code", enCours : true},
//     {id: 4, name : "Finir cette ToDo List", enCours : true}
// ];

function ToDoApp() {
    const [showPopup, setShowPopup] = useState(false);

    const [taches, setTaches] = useState([
        { id: 1, name: "Faire les courses", enCours: true },
        { id: 2, name: "Aller à la salle de sport", enCours: false },
        { id: 3, name: "Réviser le code", enCours: true },
        { id: 4, name: "Finir cette ToDo List", enCours: true }
    ]);

    return (
        <div className="App">
            {/* Affichage de l'Header */}
            <Header nbTaches={taches.length} nbTachesEnCours={taches.filter(tache => tache.enCours).length} />

            {/* Affichage du Main : Liste des tâches*/}
            <ToDoList listTaches={taches} setListTaches={setTaches}/>

            {/* Affichage du Footer : crédits et Main*/}
            {showPopup && (<Modal setShowPopup={setShowPopup} />)}

            <Footer showPopup={showPopup} setShowPopup={setShowPopup} />
        </div>
    );
}

export default ToDoApp;
