// Import de React
import React from "react";

// Import des useContext
import {ToDoProvider} from "./context/ToDoContext";

// Import des composants
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import List from "./components/List";

// Import des fichiers CSS
import './css/App.css';

function App() {

    return (
        // Mise en place de l'useContext.
        <ToDoProvider>
            <div className="App">
                {/* Affichage de l'Header */}
                <Header />

                {/* Affichage du Main : Liste des tâches*/}
                <List />

                {/* Affichage du Footer : Crédit et bouton "Ajouter" (+)*/}
                <Footer />
            </div>
        </ToDoProvider>
    );
}

// Export de App
export default App;