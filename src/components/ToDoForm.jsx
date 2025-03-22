import React, {useEffect, useState} from "react";
import {useToDo} from "../context/ToDoContext";

export default function ToDoForm() {
    // Création des useStates
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [dateEcheance, setDateEcheance] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [done, setDone] = useState(false);
    const [contact, setContact] = useState("");
    const [contacts, setContacts] = useState([]);

    const {tasks, setTasks} = useToDo();

    // Fonction pour ajouter un contact à la liste
    const ajouterContact = () => {
        const newContact = {
            name: contact
        }
        setContacts([...contacts, newContact]);
        setContact("")
    };

    // Fonction pour ajouter une tâche à la liste
    const ajouterTache = () => {
        let date = new Date();

        const nouvelleTache = {
            id: tasks.length,
            title: title,
            description: description,
            date_creation: date.toLocaleDateString(),
            date_echeance: dateEcheance,
            urgent: urgent,
            done: done,
            contacts: contacts
        };

        console.log(nouvelleTache);

        setTasks(prevTaches => [...prevTaches, nouvelleTache]);

        setTitle("");
        setDescription("");
        setCategory("");
        setDateEcheance("");
        setUrgent(false);
        setDone(false);
        setContacts([]);
    };
    // Mise en page du formulaire
    return <div>
            <label>Nom de la tâche :</label>
            <input type="text" placeholder="Nom de la tâche" minLength={5} value={title} onChange={(e) => setTitle(e.target.value)} required/>

            <label>Description :</label>
            <textarea id="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <label>Catégorie :</label>
            <select id="Category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" >Aucune</option>
                <option value="Rien">Rien</option>
                <option value="Nada">Nada</option>
                <option value="Nope">Nope</option>
            </select>

            <label>Date d'échéance :</label>
            <input type="date" id="appt" name="appt" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)}/>

            <label> Tâche urgente :</label>
            <input type="checkbox" id="urgent" name="urgent" checked={urgent} onChange={(e) => setUrgent(e.target.checked)}/>

            <label>Tâche complétée :</label>
            <input type="checkbox" id="termine" name="termine" checked={done} onChange={(e) => setDone(e.target.checked)}/>

            <label>Liste de contacts :</label>
            <input type="text" placeholder="Nom du contact" minLength={10} value={contact} onChange={(e) => setContact(e.target.value)}/>
            <button type="button" onClick={ajouterContact}>Ajouter un contact</button>

            <label>Liste des contacts ajoutés :</label>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        {contact.name}
                        <button onClick={() => {
                            const newContact = {
                                name: contact.value
                            };
                            setContacts(prevContact =>
                                prevContact.filter(c => c !== newContact
                                )
                            );
                        }}>❌</button>
                    </li>
                ))}
            </ul>

            <button onClick={ajouterTache}>Ajouter</button>
        </div>;
}