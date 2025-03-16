export default function ToDoItem({ tache, listTaches,setListTaches }) {
    const handleDelete = (id) => {
        setListTaches(prevTaches => prevTaches.filter(tache => tache.id !== id));
    };

    return (<div className="task-description">
        <h4>Description :</h4>
            <p>{tache.description}</p>
        <h4>Date de création :</h4>
            <p>Créée le {tache.dateCreation}</p>
        <h4>Échéance :</h4>
            <p>Se termine le {tache.dateEcheance}</p>
        <h4>Degré de la tâche :</h4>
            <p>{tache.urgent ? "Urgent" : "Pas urgent"}</p>
        <h4>Statut :</h4>
            <p>{tache.enCours ? "En cours" : "Terminée"}</p>
        <div className="tacks-description-end">
            <h4>Contacts :</h4>
            <p>{tache.contacts.length > 0 ? tache.contacts.join(", ") : "Aucun"}</p>
            <button className="delete-button" onClick={() => handleDelete(tache.id) && listTaches.shift(tache.id)}>Supprimer</button>
        </div>

        </div>);
}