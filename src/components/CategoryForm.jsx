import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

export default function CategoryForm() {
    // Récupération des catégories et de la fonction pour les mettre à jour depuis le contexte
    const { categories, setCategories } = useToDo();

    // Définition des états locaux pour chaque champ du formulaire
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [icon, setIcon] = useState("");

    // Fonction pour ajouter une catégorie à la liste
    const addCategorie = () => {
        // Création d'un objet pour la nouvelle catégorie
        const newCategorie = {
            id: categories.length,
            title: title,
            description: description,
            color: color,
            icon: icon
        };

        // Mise à jour des catégories dans le contexte
        setCategories(prevCat => [...prevCat, newCategorie]);

        // Réinitialisation des champs du formulaire après l'ajout
        setTitle("");
        setDescription("");
        setColor("");
        setIcon("");
    };

    return (
        <div>
            {/* Formulaire pour ajouter une nouvelle catégorie */}

            <label>Nom de la catégorie :</label>
            <input
                type="text"
                placeholder="Nom de la catégorie"
                minLength={3}
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                required
            />

            <label>Description :</label>
            <textarea
                id="Description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
            ></textarea>

            <label>Couleur :</label>
            <select id="Couleur" value={color} onChange={(e) => { setColor(e.target.value) }}>
                {/* Liste des options de couleur pour la catégorie */}
                <option value="brown">Marron</option>
                <option value="red">Rouge</option>
                <option value="orange">Orange</option>
                <option value="yellow">Jaune</option>
                <option value="green">Vert</option>
                <option value="bluesky">Bleu clair</option>
                <option value="blue">Bleu foncé</option>
                <option value="purple">Violet</option>
                <option value="pink">Rose</option>
            </select>

            <label>Icône :</label>
            <select value={icon} onChange={(e) => { setIcon(e.target.value) }}>
                {/* Liste des options d'icônes disponibles pour la catégorie */}
                <option value="">Aucune icône</option>
                <option value="📍">📍</option>
                <option value="📢">📢</option>
                <option value="✨">✨</option>
                <option value="⚽">⚽</option>
                <option value="💻">💻</option>
                <option value="🎮">🎮</option>
                <option value="🎉">🎉</option>
                <option value="👕">👕</option>
                <option value="✈️">✈️</option>
            </select>

            {/* Bouton pour soumettre le formulaire et ajouter la catégorie */}
            <button onClick={addCategorie}>Ajouter</button>
        </div>
    );
}
