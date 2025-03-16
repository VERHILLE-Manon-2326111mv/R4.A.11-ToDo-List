export default function ToDoList({ listTaches, setListTaches }) {
    const handleDelete = (id) => {
        setListTaches(prevTaches => prevTaches.filter(tache => tache.id !== id));
    };

    return (
        <div className="App-main">
            <ul>
                {listTaches.map(tache => (
                    <li key={tache.id}>
                        {tache.name}
                        <button className="delete-button" onClick={() => handleDelete(tache.id) && listTaches.shift(tache.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}