import React from "react";

// Import des useContext
import {ToDoProvider} from "../context/ToDoContext";

// Import des composants
import Footer from './layout/Footer';
import Header from './layout/Header';
import ToDoList from "./ToDoList";

// Import des fichiers CSS
import '../css/App.css';

function ToDoApp() {

    return (
        // Mise en place de l'useContext.
        <ToDoProvider>
            <div className="App">
                {/* Affichage de l'Header */}
                <Header />

                {/* Affichage du Main : Liste des tâches*/}
                <ToDoList />

                {/* Affichage du Footer : Crédit et bouton "Ajouter" (+)*/}
                <Footer />
            </div>
        </ToDoProvider>
    );
}

export default ToDoApp;