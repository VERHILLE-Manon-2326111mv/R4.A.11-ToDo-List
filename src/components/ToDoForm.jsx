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

    // Accès aux données du contexte
    const { tasks, setTasks, categories, setRelations } = useToDo();

    // Ajouter un contact à la liste des contacts de la tâche
    const addContact = () => {
        if (!contact.trim()) return; // Ne rien faire si le champ est vide
        setContacts([...contacts, { name: contact }]); // Ajouter le contact à la liste
        setContact(""); // Réinitialiser le champ de contact
    };

    // Ajouter une catégorie à la tâche
    const addCategoryToTask = () => {
        if (!category) return; // Si aucune catégorie n'est sélectionnée, ne rien faire

        // Vérifier si la catégorie est déjà ajoutée à la tâche
        if (taskCategories.some(cat => cat.id === Number(category))) {
            alert("Cette catégorie est déjà ajoutée !"); // Alerter si la catégorie existe déjà
            return;
        }

        const newCategory = categories.find(cat => cat.id === Number(category)); // Trouver la catégorie dans les catégories disponibles
        setTaskCategories([...taskCategories, newCategory]); // Ajouter la catégorie à la liste des catégories de la tâche

        setCategory(""); // Réinitialiser la catégorie sélectionnée
    };

    // Supprimer une catégorie de la tâche
    const removeCategoryFromTask = (categoryId) => {
        setTaskCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId)); // Retirer la catégorie de la liste
    };

    // Ajouter la tâche avec toutes ses relations
    const addTask = () => {
        let date = new Date(); // Récupérer la date actuelle

        const newTask = {
            id: tasks.length,
            title: title,
            description: description,
            date_creation: date.toLocaleDateString(),
            date_echeance: dateEcheance,
            urgent: urgent,
            done: done,
            contacts: contacts
        };

        // Ajouter la tâche à la liste des tâches
        setTasks(prevTaches => [...prevTaches, newTask]);

        // Créer les relations entre la tâche et ses catégories
        const newRelations = taskCategories.map(cat => ({ tache: newTask.id, categorie: cat.id }));
        setRelations(prevRelations => [...prevRelations, ...newRelations]);

        // Réinitialiser tous les champs du formulaire
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
            <input type="text" minLength={5} value={title} onChange={(e) => setTitle(e.target.value)} required /> {/* Champ pour le titre de la tâche */}

            <label>Description :</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea> {/* Champ pour la description de la tâche */}

            <label>Catégories associées :</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat.id}>{cat.title}</option>
                    ))}
                {/* Liste déroulante pour choisir une catégorie */}
            </select>
            <button type="button" onClick={addCategoryToTask}>Ajouter</button> {/* Bouton pour ajouter la catégorie sélectionnée */}

            <ul>
                {taskCategories.map((cat, index) => (
                    <li key={index}>
                        {cat.title} {/* Affichage de la catégorie associée */}
                        <button onClick={() => removeCategoryFromTask(cat.id)}>❌</button> {/* Bouton pour retirer la catégorie */}
                    </li>
                ))}
            </ul>

            <label>Date d'échéance :</label>
            <input type="date" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} /> {/* Champ pour la date d'échéance */}

            <label> Tâche urgente :</label>
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} /> {/* Case à cocher pour marquer la tâche urgente */}

            <label>Tâche complétée :</label>
            <input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} /> {/* Case à cocher pour marquer la tâche comme terminée */}

            <label>Liste de contacts :</label>
            <input type="text" minLength={10} value={contact} onChange={(e) => setContact(e.target.value)} /> {/* Champ pour ajouter un contact */}
            <button type="button" onClick={addContact}>Ajouter un contact</button> {/* Bouton pour ajouter un contact à la liste */}

            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        {contact.name} {/* Affichage du nom du contact */}
                        <button onClick={() => setContacts(contacts.filter((_, i) => i !== index))}>❌</button> {/* Bouton pour retirer un contact */}
                    </li>
                ))}
            </ul>

            <button onClick={addTask}>Ajouter</button> {/* Bouton pour ajouter la nouvelle tâche */}
        </div>
    );
}
