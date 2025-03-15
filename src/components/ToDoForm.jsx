import React from "react";

export default function ToDoForm() {
    return <div>

            <label>Nom de la tâche :</label>
            <input type="text" placeholder="Nom de la tâche" minLength={5} required/>

            <label>Description :</label>
            <textarea id="Description"></textarea>

            <label>Date d'échéance :</label>
            <input type="datetime-local" id="appt" name="appt"/>

            <label> Tâche urgente :</label>
            <input type="checkbox" id="urgent" name="urgent"/>

            <label>Tâche complétée :</label>
            <input type="checkbox" id="termine" name="termine"/>

            <label>Liste de contacts :</label>
            <input type="text" placeholder="Nom du contact" minLength={10} required/>
            <button type="button">Ajouter un contact</button>

            <ul>
                Y'aura un tableau ici...
            </ul>

            <button>Ajouter</button>
    </div>;
}