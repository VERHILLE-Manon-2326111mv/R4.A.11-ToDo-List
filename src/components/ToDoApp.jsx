import React, { useState } from "react";

// Import des composants
import Footer from './layout/Footer';
import Header from './layout/Header';
import ToDoList from "./ToDoList";

// Import des fichiers CSS
import '../css/App.css';

// Import des fichiers JSON
import todos from "../json/backup.json";

function ToDoApp() {

    {/*Création de la liste des tâches via le fichier JSON*/}
    const [taches, setTaches] = useState(todos.taches || []);

    return (
        <div className="App">
            {/* Affichage de l'Header */}
            <Header nbTaches={taches.length} nbTachesEnCours={taches.filter(tache => !tache.done).length} />

            {/* Affichage du Main : Liste des tâches*/}
            <ToDoList listTaches={taches} setListTaches={setTaches}/>

            {/* Affichage du Footer : Crédit et bouton "Ajouter" (+)*/}
            <Footer listTaches={taches} setListTaches={setTaches} />

        </div>
    );
}

export default ToDoApp;