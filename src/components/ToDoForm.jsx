import React, {useEffect, useState} from "react";

export default function ToDoForm({listTaches, setListTaches}) {
    // Création des useStates
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [dateEcheance, setDateEcheance] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [termine, setTermine] = useState(false);
    const [contact, setContact] = useState("");
    const [contacts, setContacts] = useState([]);

    // Fonction pour ajouter un contact à la liste
    const ajouterContact = () => {
        setContacts([...contacts, contact]);
        setContact("")
    };


    // Fonction pour ajouter une tâche à la liste
    const ajouterTache = () => {
        let date = new Date();

        const formatLocalDate = (dateString) => {
            let dateObj = new Date(dateString);
            return dateObj.toLocaleString("fr-FR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
        };

        const nouvelleTache = {
            id: listTaches.length,
            name: name,
            description: description,
            category: category,
            dateCreation: date.toLocaleString(),
            dateEcheance: formatLocalDate(dateEcheance),
            urgent: urgent,
            termine: termine,
            contacts: contacts
        };

        console.log(nouvelleTache);

        setListTaches(prevTaches => [...prevTaches, nouvelleTache]);

        setName("");
        setDescription("");
        setCategory("");
        setDateEcheance("");
        setUrgent(false);
        setTermine(false);
        setContacts([]);
    };
    // Mise en page du formulaire
    return <div>
            <label>Nom de la tâche :</label>
            <input type="text" placeholder="Nom de la tâche" minLength={5} value={name} onChange={(e) => setName(e.target.value)} required/>

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
            <input type="datetime-local" id="appt" name="appt" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)}/>

            <label> Tâche urgente :</label>
            <input type="checkbox" id="urgent" name="urgent" checked={urgent} onChange={(e) => setUrgent(e.target.checked)}/>

            <label>Tâche complétée :</label>
            <input type="checkbox" id="termine" name="termine" checked={termine} onChange={(e) => setTermine(e.target.checked)}/>

            <label>Liste de contacts :</label>
            <input type="text" placeholder="Nom du contact" minLength={10} value={contact} onChange={(e) => setContact(e.target.value)}/>
            <button type="button" onClick={ajouterContact}>Ajouter un contact</button>

            <label>Liste des contacts ajoutés :</label>
            <ul>
                {contacts.map(contact => (
                    <li key={contact}>
                        {contact}
                    </li>
                ))}
            </ul>

            <button onClick={ajouterTache}>Ajouter</button>
        </div>;
}