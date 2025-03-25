import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

export default function ToDoForm() {
    // États pour les champs du formulaire
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateEcheance, setDateEcheance] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [done, setDone] = useState(false);
    const [contact, setContact] = useState("");
    const [contacts, setContacts] = useState([]);

    // États pour la gestion des catégories associées
    const [category, setCategory] = useState("");
    const [taskCategories, setTaskCategories] = useState([]);

    const { tasks, setTasks, categories, setRelations } = useToDo();

    // Ajouter un contact à la tâche
    const addContact = () => {
        if (!contact.trim()) return;
        setContacts([...contacts, { name: contact }]);
        setContact("");
    };

    // Ajouter une catégorie à la tâche
    const addCategoryToTask = () => {
        if (!category) return;

        // Vérifier si la catégorie est déjà associée
        if (taskCategories.some(cat => cat.id === Number(category))) {
            alert("Cette catégorie est déjà ajoutée !");
            return;
        }

        const newCategory = categories.find(cat => cat.id === Number(category));
        setTaskCategories([...taskCategories, newCategory]);

        setCategory("");
    };

    // Supprimer une catégorie de la tâche
    const removeCategoryFromTask = (categoryId) => {
        setTaskCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
    };

    // Ajouter la tâche avec ses relations
    const addTask = () => {
        let date = new Date();

        const newTask = {
            id: tasks.length,
            title,
            description,
            date_creation: date.toLocaleDateString(),
            date_echeance: dateEcheance,
            urgent,
            done,
            contacts
        };

        setTasks(prevTaches => [...prevTaches, newTask]);

        // Ajouter les relations tâche-catégorie
        const newRelations = taskCategories.map(cat => ({ tache: newTask.id, categorie: cat.id }));
        setRelations(prevRelations => [...prevRelations, ...newRelations]);

        // Réinitialisation du formulaire
        setTitle("");
        setDescription("");
        setCategory("");
        setTaskCategories([]);
        setDateEcheance("");
        setUrgent(false);
        setDone(false);
        setContacts([]);
    };

    return (
        <div>
            <label>Nom de la tâche :</label>
            <input type="text" minLength={5} value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Description :</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <label>Catégories associées :</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat.id}>{cat.title}</option>
                ))}
            </select>
            <button type="button" onClick={addCategoryToTask}>Ajouter</button>

            <ul>
                {taskCategories.map((cat, index) => (
                    <li key={index}>
                        {cat.title}
                        <button onClick={() => removeCategoryFromTask(cat.id)}>❌</button>
                    </li>
                ))}
            </ul>

            <label>Date d'échéance :</label>
            <input type="date" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />

            <label> Tâche urgente :</label>
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />

            <label>Tâche complétée :</label>
            <input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />

            <label>Liste de contacts :</label>
            <input type="text" minLength={10} value={contact} onChange={(e) => setContact(e.target.value)} />
            <button type="button" onClick={addContact}>Ajouter un contact</button>

            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        {contact.name}
                        <button onClick={() => setContacts(contacts.filter((_, i) => i !== index))}>❌</button>
                    </li>
                ))}
            </ul>

            <button onClick={addTask}>Ajouter</button>
        </div>
    );
}
