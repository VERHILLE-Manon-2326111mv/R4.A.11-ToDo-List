import React, {useEffect, useState} from "react";

export default function ToDoForm({listTaches, setListTaches}) {
    // Création des useStates
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dateEcheance, setDateEcheance] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [termine, setTermine] = useState(false);
    const [contact, setContact] = useState([]);

    const ajouterTache = () => {
        const nouvelleTache = {
            id: listTaches.length,
            name: name,
            description: description,
            urgent: urgent,
            termine: termine,
            contact: []
        };

        setListTaches(prevTaches => [...prevTaches, nouvelleTache]);

        setName("");
        setDescription("");
        setDateEcheance("");
        setUrgent(false);
        setTermine(false);
        setContact([]);
    };
    return <div>
            <label>Nom de la tâche :</label>
            <input type="text" placeholder="Nom de la tâche" minLength={5} value={name} onChange={(e) => setName(e.target.value)} required/>

            <label>Description :</label>
            <textarea id="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <label>Date d'échéance :</label>
            <input type="datetime-local" id="appt" name="appt" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)}/>

            <label> Tâche urgente :</label>
            <input type="checkbox" id="urgent" name="urgent" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} required/>

            <label>Tâche complétée :</label>
            <input type="checkbox" id="termine" name="termine" checked={termine} onChange={(e) => setTermine(e.target.checked)} required/>

            <label>Liste de contacts :</label>
            <input type="text" placeholder="Nom du contact" minLength={10} value={contact} onChange={(e) => setContact(e.target.value)}/>
            <button type="button">Ajouter un contact</button>

            <ul>
                Y'aura un tableau ici...
            </ul>

            <button onClick={ajouterTache}>Ajouter</button>
        </div>;
}