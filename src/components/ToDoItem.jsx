import React, { useState } from "react";

export default function ToDoItem({ tache, listTaches, setListTaches }) {
    const handleDelete = (id) => {
        setListTaches(prevTaches => prevTaches.filter(tache => tache.id !== id));
    };

    const [showPopup, setShowPopup] = useState(false);
    const [nameContact, setNameContact] = useState("");
    const [showAddContact, setShowAddContact] = useState(false);

    return (
        <div className="task-description">
            <h4>Description :</h4>
            {!showPopup ? (
                <p>{tache.description}</p>
            ) : (
                <textarea
                    id="Description"
                    value={tache.description || ''}
                    onChange={(e) => {
                        setListTaches(prevTaches =>
                            prevTaches.map(t =>
                                t.id === tache.id ? { ...t, description: e.target.value } : t
                            )
                        );
                    }}
                ></textarea>
            )}

            <h4>Date de création :</h4>
            <p>Créée le {tache.date_creation}</p>

            <h4>Échéance :</h4>
            {!showPopup ? (
                <p>Se termine le {tache.date_echeance}</p>
            ) : (
                <input
                    type="date"
                    value={tache.date_echeance || ''}
                    onChange={(e) => {
                        setListTaches(prevTaches =>
                            prevTaches.map(t =>
                                t.id === tache.id ? { ...t, date_echeance: e.target.value } : t
                            )
                        );
                    }}
                />
            )}

            <h4>Degré de la tâche :</h4>
            {!showPopup ? (
                <p>{tache.urgent ? "Urgent" : "Pas urgent"}</p>
            ) : (
                <input
                    type="checkbox"
                    checked={tache.urgent}
                    onChange={(e) => {
                        setListTaches(prevTaches =>
                            prevTaches.map(t =>
                                t.id === tache.id ? { ...t, urgent: e.target.checked } : t
                            )
                        );
                    }}
                />
            )}

            <h4>Statut :</h4>
            {!showPopup ? (
                <p>{tache.done ? "En cours" : "Terminée"}</p>
            ) : (
                <input
                    type="checkbox"
                    checked={tache.done}
                    onChange={(e) => {
                        setListTaches(prevTaches =>
                            prevTaches.map(t =>
                                t.id === tache.id ? { ...t, done: e.target.checked } : t
                            )
                        );
                    }}
                />
            )}

            <div className="task-description-end">
                <div className="contacts">
                    <h4>Contacts :</h4>
                    {!showPopup ? (
                        tache.contacts.length > 0 ? (
                            <ul>
                                {tache.contacts.map((contact, index) => (
                                    <li key={index}>{contact.name}</li>
                                ))}
                            </ul>
                        ) : (
                            "Aucun contact enregistré"
                        )
                    ) : (
                        <div>
                            {tache.contacts.map((contact, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={contact.name}
                                        onChange={(e) => {
                                            const newContact = {
                                                name: e.target.value
                                            };

                                            setListTaches(prevTaches =>
                                                prevTaches.map(t =>
                                                    t.id === tache.id
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
                                        setListTaches(prevTaches =>
                                            prevTaches.map(t =>
                                                t.id === tache.id
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
                                            setListTaches(prevTaches =>
                                                prevTaches.map(t =>
                                                    t.id === tache.id
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
                    <button onClick={() => handleDelete(tache.id)}>Supprimer</button>
                    <button onClick={() => setShowPopup(prev => !prev)}>Modifier</button>
                </div>
            </div>
        </div>
    );
}
