import React, {useState} from "react";

export default function ToDoItem({ tache, listTaches,setListTaches }) {
    const handleDelete = (id) => {
        setListTaches(prevTaches => prevTaches.filter(tache => tache.id !== id));
    };

    const [showPopup, setShowPopup] = useState(false);

    const [newContact, setNewContact] = useState("");

    return (<div className="task-description">
        <h4>Description :</h4>
            {!showPopup ? (
                <p className>{tache.description}</p>
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
            <p>Créée le {tache.dateCreation}</p>
        <h4>Échéance :</h4>
        {!showPopup ? (
            <p>Se termine le {tache.dateEcheance}</p>
        ) : (
            <input
                type="date"
                id="appt"
                value={tache.dateEcheance || ''}
                onChange={(e) => {
                    setListTaches(prevTaches =>
                        prevTaches.map(t =>
                            t.id === tache.id ? { ...t, dateEcheance: e.target.value } : t
                        )
                    );
                }}
            ></input>
        )}
        <h4>Degré de la tâche :</h4>
        {!showPopup ? (
            <p>{tache.urgent ? "Urgent" : "Pas urgent"}</p>
        ) : (
            <input
                type="checkbox"
                id="urgent"
                name="urgent"
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
            <p>{tache.enCours ? "En cours" : "Terminée"}</p>
        ) : (
            <input
                type="checkbox"
                id="termine"
                name="termine"
                checked={tache.enCours}
                onChange={(e) => {
                    setListTaches(prevTaches =>
                        prevTaches.map(t =>
                            t.id === tache.id ? { ...t, enCours: e.target.checked } : t
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
                                    <li key={index}>{contact}</li>
                                ))}
                            </ul>
                        ) : "Aucun"
                ) : (
                    <div>
                        {tache.contacts.map((contact, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={contact}
                                    onChange={(e) => {
                                        setListTaches(prevTaches =>
                                            prevTaches.map(t =>
                                                t.id === tache.id
                                                    ? {
                                                        ...t,
                                                        contacts: t.contacts.map((c, i) =>
                                                            i === index ? e.target.value : c
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
                        <input
                            type="text"
                            placeholder="Ajouter un contact"
                            value={newContact}
                            onChange={(e) => setNewContact(e.target.value)}
                        />
                        <button onClick={() => {
                            if (newContact.trim() !== "") {
                                setListTaches(prevTaches =>
                                    prevTaches.map(t =>
                                        t.id === tache.id
                                            ? { ...t, contacts: [...t.contacts, newContact] }
                                            : t
                                    )
                                );
                                setNewContact("");
                            }
                        }}>Ajouter un contact</button>
                    </div>
                )}
            </div>
            <div className="task-buttons">
                <button onClick={() => handleDelete(tache.id) && listTaches.shift(tache.id)}>Supprimer</button>
                <button onClick={() => setShowPopup(prev => !prev)}>Modifier</button>
            </div>
        </div>

        </div>);
}