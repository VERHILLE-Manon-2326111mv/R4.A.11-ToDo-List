import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

export default function ToDoItem({ task }) {
    const handleDelete = (id) => {
        setTasks(prevTaches => prevTaches.filter(tache => tache.id !== id));
    };
    const {setTasks} = useToDo()
    const [showPopup, setShowPopup] = useState(false);
    const [nameContact, setNameContact] = useState("");
    const [showAddContact, setShowAddContact] = useState(false);

    return (
        <div className="task-description">
            <h4>Description :</h4>
            {!showPopup ? (
                <p>{task.description}</p>
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

            <h4>Date de création :</h4>
            <p>Créée le {task.date_creation}</p>

            <h4>Échéance :</h4>
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
            {!showPopup ? (
                <p>{task.done ? "En cours" : "Terminée"}</p>
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

            <div className="task-description-end">
                <div className="contacts">
                    <h4>Contacts :</h4>
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
                    <button onClick={() => handleDelete(task.id)}>Supprimer</button>
                    <button onClick={() => setShowPopup(prev => !prev)}>Modifier</button>
                </div>
            </div>
        </div>
    );
}
