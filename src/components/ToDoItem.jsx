import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

export default function ToDoItem({ task, listCatTask }) {
    // Accès aux fonctions du contexte pour mettre à jour les tâches et les relations
    const { setTasks, categories, setRelations } = useToDo();

    // Fonction pour supprimer une tâche
    const handleDelete = (id) => {
        setTasks(prevTaches => prevTaches.filter(tache => tache.id !== id));
    };

    // États pour gérer l'affichage de la popup, des contacts et des catégories
    const [showPopup, setShowPopup] = useState(false); // Afficher ou non la popup d'édition
    const [nameContact, setNameContact] = useState(""); // Nom du contact à ajouter
    const [showAddContact, setShowAddContact] = useState(false); // Afficher ou non le champ d'ajout de contact
    const [category, setCategory] = useState(""); // Catégorie à ajouter

    // Liste des catégories associées à la tâche
    const [categoriesList, setCategoriesList] = useState(listCatTask(task.id));
    let backupCategories = [...categories]; // Copie des catégories pour les utiliser dans la sélection

    // Ajouter une relation entre une tâche et une catégorie
    const addRelation = (taskId) => {
        if (!category) return; // Si aucune catégorie n'est sélectionnée, ne rien faire

        const relationExists = categoriesList.some(cat => cat.id === Number(category));
        if (relationExists) {
            alert("Cette catégorie est déjà ajoutée à cette tâche !");
            return;
        }

        const newRelation = { tache: taskId, categorie: Number(category) };

        setRelations(prevRelations => [...prevRelations, newRelation]);

        const newCategory = categories.find(cat => cat.id === Number(category));
        setCategoriesList(prevCategories => [...prevCategories, newCategory]);

        setCategory(""); // Réinitialiser la sélection de catégorie
    };

    // Supprimer une relation entre une tâche et une catégorie
    const removeRelation = (taskId, categoryId) => {
        setRelations(prevRelations => prevRelations.filter(rel => !(rel.tache === taskId && rel.categorie === categoryId)));

        setCategoriesList(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
    };

    return (
        <div className="description">
            <h4>Description :</h4>
            {/* Affichage de la description de la tâche */}
            {!showPopup ? (
                <p>{task.description || 'Aucune description saisie'}</p>
            ) : (
                <textarea
                    id="Description"
                    value={task.description || ''}
                    onChange={(e) => {
                        setTasks(prevTaches =>
                            prevTaches.map(t =>
                                t.id === task.id ? { ...t, description: e.target.value } : t
                            )
                        );
                    }}
                ></textarea>
            )}

            <h4>Catégories :</h4>
            {/* Affichage des catégories associées ou possibilité d'ajouter des catégories */}
            {!showPopup ? (
                categoriesList.length > 0 ? (
                    <ul className="categories-list">
                        {categoriesList.map((cat, index) => (
                            <li key={index} className={"category-item " + cat.color}>
                                {(cat.icon ? cat.icon : "") + cat.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    "Aucune catégorie enregistrée"
                )
            ) : (
                <div>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Sélectionner une catégorie</option>
                        {backupCategories.map((cat, index) => (
                            <option key={index} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                    <button onClick={() => addRelation(task.id)}>Ajouter</button>
                    {categoriesList.length > 0 && (
                        <ul className="categories-list">
                            {categoriesList.map((cat, index) => (
                                <li key={index} className={"category-item " + cat.color}>
                                    {(cat.icon ? cat.icon : "") + cat.title}
                                    <button onClick={() => removeRelation(task.id, cat.id)}>❌</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <h4>Date de création :</h4>
            <p>Créée le {task.date_creation}</p>

            <h4>Échéance :</h4>
            {/* Affichage de la date d'échéance de la tâche */}
            {!showPopup ? (
                <p>Se termine le {task.date_echeance}</p>
            ) : (
                <input
                    type="date"
                    value={task.date_echeance || ''}
                    onChange={(e) => {
                        setTasks(prevTaches =>
                            prevTaches.map(t =>
                                t.id === task.id ? { ...t, date_echeance: e.target.value } : t
                            )
                        );
                    }}
                />
            )}

            <h4>Degré de la tâche :</h4>
            {/* Affichage du statut d'urgence de la tâche */}
            {!showPopup ? (
                <p>{task.urgent ? "Urgent" : "Pas urgent"}</p>
            ) : (
                <input
                    type="checkbox"
                    checked={task.urgent}
                    onChange={(e) => {
                        setTasks(prevTaches =>
                            prevTaches.map(t =>
                                t.id === task.id ? { ...t, urgent: e.target.checked } : t
                            )
                        );
                    }}
                />
            )}

            <h4>Statut :</h4>
            {/* Affichage du statut d'accomplissement de la tâche */}
            {!showPopup ? (
                <p>{!task.done ? "En cours" : "Terminée"}</p>
            ) : (
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => {
                        setTasks(prevTaches =>
                            prevTaches.map(t =>
                                t.id === task.id ? { ...t, done: e.target.checked } : t
                            )
                        );
                    }}
                />
            )}

            <div className="description-end">
                <div className="contacts">
                    <h4>Contacts :</h4>
                    {/* Affichage des contacts ou ajout de nouveaux contacts */}
                    {!showPopup ? (
                        task.contacts.length > 0 ? (
                            <ul>
                                {task.contacts.map((contact, index) => (
                                    <li key={index}>{contact.name}</li>
                                ))}
                            </ul>
                        ) : (
                            "Aucun contact enregistré"
                        )
                    ) : (
                        <div>
                            {task.contacts.map((contact, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={contact.name}
                                        onChange={(e) => {
                                            const newContact = {
                                                name: e.target.value
                                            };

                                            setTasks(prevTaches =>
                                                prevTaches.map(t =>
                                                    t.id === task.id
                                                        ? {
                                                            ...t,
                                                            contacts: t.contacts.map((c, i) =>
                                                                i === index ? newContact : c
                                                            ),
                                                        }
                                                        : t
                                                )
                                            );
                                        }}
                                    />
                                    <button onClick={() => {
                                        setTasks(prevTaches =>
                                            prevTaches.map(t =>
                                                t.id === task.id
                                                    ? { ...t, contacts: t.contacts.filter((_, i) => i !== index) }
                                                    : t
                                            )
                                        );
                                    }}>❌</button>
                                </div>
                            ))}
                            {showAddContact ? (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nom du contact"
                                        value={nameContact}
                                        onChange={(e) => setNameContact(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        if (nameContact.trim() !== "") {
                                            setTasks(prevTaches =>
                                                prevTaches.map(t =>
                                                    t.id === task.id
                                                        ? { ...t, contacts: [...(t.contacts || []), { name: nameContact }] }
                                                        : t
                                                )
                                            );
                                            setNameContact("");  // Réinitialiser après ajout
                                            setShowAddContact(false);  // Fermer le champ après l'ajout
                                        }
                                    }}>Valider</button>
                                    <button onClick={() => setShowAddContact(false)}>Annuler</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowAddContact(true)}>Ajouter un contact</button>
                            )}
                        </div>
                    )}
                </div>
                <div className="task-buttons">
                    {/* Boutons pour supprimer ou modifier la tâche */}
                    <button onClick={() => handleDelete(task.id)}>Supprimer</button>
                    <button onClick={() => setShowPopup(prev => !prev)}>Modifier</button>
                </div>
            </div>
        </div>
    );
}
