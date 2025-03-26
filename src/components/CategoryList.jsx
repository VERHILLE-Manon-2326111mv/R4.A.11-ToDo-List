import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
    const { categories } = useToDo();
    const [showCategories, setShowCategories] = useState({});

    // Fonction pour basculer l'affichage des catégories (détails)
    const toggleCategroies = (catId) => {
        setShowCategories(prev => ({
            ...prev,
            [catId]: !prev[catId]  // Bascule entre true et false pour chaque catégorie
        }));
    };

    return (
        <div className="list">
            <h2>Liste des catégories :</h2>
            <ul className="list-ul">
                {/* Itération sur les catégories */}
                {categories.map(cat => (
                    <li className={"list-ul-li " + cat.color} key={cat.id}>
                        <div className="task-name">
                            {/* Affichage de l'icône de la catégorie si elle existe */}
                            {cat.icon !== "" && (
                                <p>{cat.icon}</p>
                            )}
                            <h3>{cat.title}</h3>

                            {/* Bouton pour afficher/masquer les détails de la catégorie */}
                            <button id={"item-" + cat.id} onClick={() => toggleCategroies(cat.id)}>
                                {showCategories[cat.id] ? "⇑" : "⇓"}  {/* Flèche vers le haut ou vers le bas selon l'état */}
                            </button>
                        </div>

                        {/* Affichage des détails de la catégorie si showCategories[cat.id] est true */}
                        {showCategories[cat.id] && (<CategoryItem cat={cat} />)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
