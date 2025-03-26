import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";
import ToDoItem from "./ToDoItem";
import ToDoFilter from "./ToDoFilter";

export default function ToDoList() {
    // Récupère les tâches, catégories et relations du contexte global
    const { tasks, setTasks, categories, relations } = useToDo();

    // États pour la gestion de l'affichage des tâches et des filtres
    const [showTasks, setShowTasks] = useState({}); // Détermine si une tâche spécifique est affichée ou non
    const [ordreTri, setOrdreTri] = useState("tri_date_echeance"); // État pour l'ordre de tri des tâches
    const [typeFiltre, setTypeFiltre] = useState("all"); // Filtre pour afficher toutes les tâches, uniquement celles terminées ou non terminées
    const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche dans le titre et la description des tâches

    // Fonction pour récupérer les catégories liées à une tâche
    const listCatTask = (id) => {
        return relations
            .filter(relation => relation.tache === id) // Filtre les relations pour la tâche donnée
            .map(relation => categories.find(cat => cat.id === relation.categorie)) // Trouve les catégories liées
            .filter(title => title !== undefined); // Filtre les catégories valides (non undefined)
    };

    // Fonction pour alterner l'affichage des détails d'une tâche
    const toggleTasks = (taskId) => {
        setShowTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId] // Si la tâche est affichée, on la cache et vice-versa
        }));
    };

    // Normalise les chaînes de caractères pour comparaison (minuscule et espaces enlevés)
    const normalizeString = (str) => (str || "").trim().toLowerCase();

    // Fonction pour convertir une date au format 'dd-mm-yyyy' en objet Date
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    // Fonction pour enlever les chiffres et les points au début du titre
    const stripLeadingNumbers = (str) => str.replace(/^\d+\.\s*/, "");

    // Fonction qui applique tous les filtres et tris sur les tâches
    const getFilteredTasks = () => {
        let newList = [...tasks]; // Crée une copie des tâches pour éviter de muter l'état directement

        // Application du filtre en fonction de l'état "typeFiltre"
        if (typeFiltre === "not_done") {
            newList = newList.filter(tache => !tache.done);
        } else if (typeFiltre === "done") {
            newList = newList.filter(tache => tache.done);
        }

        // Recherche par titre ou description si la longueur de la recherche est suffisante (>= 3 caractères)
        if (searchQuery.length >= 3) {
            newList = newList.filter(tache =>
                normalizeString(tache.title).includes(normalizeString(searchQuery)) ||
                normalizeString(tache.description).includes(normalizeString(searchQuery))
            );
        }

        // Application du tri en fonction de l'état "ordreTri"
        switch (ordreTri) {
            case "tri_alpha_croissant":
                newList.sort((a, b) => normalizeString(stripLeadingNumbers(a.title))
                    .localeCompare(normalizeString(stripLeadingNumbers(b.title))));
                break;
            case "tri_alpha_decroissant":
                newList.sort((a, b) => normalizeString(stripLeadingNumbers(b.title))
                    .localeCompare(normalizeString(stripLeadingNumbers(a.title))));
                break;
            case "tri_date_creation_croissant":
                newList.sort((a, b) => parseDate(a.date_creation) - parseDate(b.date_creation));
                break;
            case "tri_date_creation_decroissant":
                newList.sort((a, b) => parseDate(b.date_creation) - parseDate(a.date_creation));
                break;
            case "tri_date_echeance_croissant":
                newList.sort((a, b) => parseDate(a.date_echeance) - parseDate(b.date_echeance));
                break;
            case "tri_date_echeance_decroissant":
                newList.sort((a, b) => parseDate(b.date_echeance) - parseDate(a.date_echeance));
                break;
            case "tri_categorie":
                newList.sort((a, b) => {
                    const getFirstCategory = (taskId) => {
                        const relation = relations.find(r => r.tache === taskId);
                        return relation ? categories.find(cat => cat.id === relation.categorie)?.title || "" : "";
                    };
                    return getFirstCategory(a.id).localeCompare(getFirstCategory(b.id));
                });
                break;
            default:
                break;
        }

        return newList;
    };

    // Fonction qui met à jour l'état pour l'ordre de tri
    const trier = (value) => {
        setOrdreTri(value);
    };

    // Fonction qui met à jour l'état pour le type de filtre (tâches terminées ou non terminées)
    const filtrer = (value) => {
        setTypeFiltre(value);
    };

    // On obtient la liste des tâches filtrées et triées
    const filteredTasks = getFilteredTasks();

    return (
        <div id="list">
            <h2>Filtrer les tâches :</h2>
            {/* Composant de filtre avec les options de tri et de recherche */}
            <ToDoFilter trier={trier} filtrer={filtrer} rechercher={setSearchQuery} />
            <h2>Liste des tâches :</h2>
            <ul className="list-ul">
                {/* Affichage de chaque tâche filtrée et triée */}
                {filteredTasks.map(task => {
                    // Liste des catégories associées à la tâche (maximum 3 catégories affichées)
                    const categoriesList = listCatTask(task.id).slice(0, 3);

                    return (
                        <li className="list-ul-li" key={task.id}>
                            <div className="task-name">
                                {/* Case à cocher pour marquer la tâche comme terminée/non terminée */}
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={(e) => {
                                        setTasks(prevTaches =>
                                            prevTaches.map(t =>
                                                t.id === task.id ? { ...t, done: e.target.checked } : t
                                            )
                                        );
                                    }}
                                />
                                {/* Affichage du titre de la tâche */}
                                <h3 className={"task-" + task.done}>{task.title}</h3>
                                {/* Affichage des catégories de la tâche */}
                                {categoriesList.length > 0 && (
                                    <ul className="categories-list">
                                        {categoriesList.map((cat, index) => (
                                            <li key={index} className={"category-item " + cat.color}>
                                                {(cat.icon ? cat.icon : "") + cat.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {/* Affichage de la date d'échéance */}
                                <p>Fini le {task.date_echeance}</p>
                                {/* Bouton pour afficher/cacher les détails de la tâche */}
                                <button id={"item-" + task.id} onClick={() => toggleTasks(task.id)}>
                                    {showTasks[task.id] ? "⇑" : "⇓"}
                                </button>
                            </div>
                            {/* Détails de la tâche, uniquement affichés si la tâche est ouverte */}
                            {showTasks[task.id] && (<ToDoItem task={task} listCatTask={listCatTask} />)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
