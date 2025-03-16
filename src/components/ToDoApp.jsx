import React, { useState } from "react";

// Import des composants
import Footer from './layout/Footer';
import Header from './layout/Header';
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
        {
            id: 0,
            name: "Faire les courses",
            description:"",
            categroy: "",
            dateCreation: "",
            dateEcheance: "",
            urgent: false,
            enCours: true,
            contacts: []
        },
        {
            id: 1,
            name: "Aller à la salle de sport",
            description:"",
            categroy: "",
            dateCreation: "",
            dateEcheance: "",
            urgent: false,
            enCours: true,
            contacts: []
        },
        {
            id: 2,
            name: "Réviser le code",
            description:"", categroy: "",
            dateCreation: "",
            dateEcheance: "",
            urgent: false,
            enCours: true,
            contacts: []
        },
        {
            id: 3,
            name: "Finir cette ToDo List",
            description:"Je veux avoir une bonne note please.",
            categroy: "",
            dateCreation: "",
            dateEcheance: "",
            urgent: true,
            enCours: false,
            contacts: []
        }
    ]);

    return (
        <div className="App">
            {/* Affichage de l'Header */}
            <Header nbTaches={taches.length} nbTachesEnCours={taches.filter(tache => tache.enCours).length} />

            {/* Affichage du Main : Liste des tâches*/}
            <ToDoList listTaches={taches} setListTaches={setTaches}/>

            {/* Affichage du Footer : crédits et Main*/}
            {showPopup && (<Modal setShowPopup={setShowPopup} listTaches={taches} setListTaches={setTaches}/>)}

            <Footer showPopup={showPopup} setShowPopup={setShowPopup} />
        </div>
    );
}

export default ToDoApp;
