import React, {useState} from "react";
import {useToDo} from "../context/ToDoContext";

export default function CategoryForm() {
    const [title, setTitle]  = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [icon, setIcon] = useState("");

    const {categories, setCategories} = useToDo();

    // Fonction pour ajouter une catégorie à la liste
    const addCategorie = () => {
            const newCategorie = {
                id: categories.length,
                title: title,
                description: description,
                color: color,
                icon: icon
            }

            console.log(newCategorie)

            setCategories(prevCat => [...prevCat, newCategorie]);

            setTitle("");
            setDescription("");
            setColor("");
            setIcon("");
    }

    return (
        <div>
            <label>Nom de la catégorie :</label>
            <input type="text" placeholder="Nom de la catégorie" minLength={3} value={title} onChange={(e) => {setTitle(e.target.value)}} required/>

            <label>Description :</label>
            <textarea id="Description" value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>

            <label>Couleur :</label>
            <select id="Couleur" value={color} onChange={(e) => {setColor(e.target.value)}}>
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
            <select value={icon} onChange={(e) => {setIcon(e.target.value)}}>
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

            <button onClick={addCategorie}>Ajouter</button>
        </div>);
}