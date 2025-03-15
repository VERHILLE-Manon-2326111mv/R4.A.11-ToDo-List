import React from "react";

export default function CategoryForm() {
    return <div>

            <label>Nom de la tâche :</label>
            <input type="text" placeholder="Nom de la tâche" minLength={3} required/>

            <label>Description :</label>
            <textarea id="Description"></textarea>

            <label>Couleur :</label>
            <select id="Couleur">Y'aura des couleurs ici...</select>

            <label>Pictogramme :</label>
            <select>Y'aura des pictogrammes ici...</select>

            <button>Ajouter</button>
        </div>;
}