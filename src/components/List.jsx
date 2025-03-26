import React, { useState } from "react";
import ToDoList from "./ToDoList";
import CategoryList from "./CategoryList";

export default function List() {
    // État pour gérer le type de liste à afficher, initialisé à "task"
    const [listype, setListType] = useState("task");

    // État pour gérer la sélection du bouton actif (soit "task", soit "category")
    const [selectedList, setSelectedList] = useState("task");

    // Fonction pour afficher la liste des tâches et activer le bouton correspondant
    const showTaskList = () => {
        setListType("task");  // Définit le type de liste à afficher (tâches)
        setSelectedList("task");  // Sélectionne le bouton des tâches comme actif
    };

    // Fonction pour afficher la liste des catégories et activer le bouton correspondant
    const showCategoryList = () => {
        setListType("category");  // Définit le type de liste à afficher (catégories)
        setSelectedList("category");  // Sélectionne le bouton des catégories comme actif
    };

    // Rendu du composant List
    return <main>
        <div className="list-content">
            {/* Groupe de boutons pour choisir entre les listes de tâches ou de catégories */}
            <div className="button-group">
                {/* Bouton pour afficher la liste des tâches */}
                <button className={selectedList === "task" ? "selected" : ""} onClick={showTaskList}>
                    Liste des tâches
                </button>

                {/* Bouton pour afficher la liste des catégories */}
                <button className={selectedList === "category" ? "selected" : ""} onClick={showCategoryList}>
                    Liste des catégories
                </button>
            </div>

            {/* Affichage conditionnel des listes */}
            {listype === "task" && <ToDoList />}  {/* Si "task", afficher ToDoList */}
            {listype === "category" && <CategoryList />}  {/* Si "category", afficher CategoryList */}

        </div>
    </main>
}
