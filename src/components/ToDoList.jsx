import ToDoItem from "./ToDoItem";
import React, {useState} from "react";

export default function ToDoList({ listTaches, setListTaches }) {
    const [showTasks, setShowTasks] = useState({});

    const toggleTasks = (taskId) => {
        setShowTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));

    }

    return (
        <main>
            <h2>Liste des tâches :</h2>
            <ul className="tacks-list">
                {listTaches.map(tache => (
                    <li key={tache.id}>
                        <div className="task-name">
                            <h3>{tache.name}</h3>
                            <button id={"item-" + tache.id} onClick={() => toggleTasks(tache.id)}>
                                {showTasks[tache.id] ? "⇑" : "⇓"}
                            </button>
                        </div>
                        {showTasks[tache.id] && (<ToDoItem tache={tache} listTaches={listTaches} setListTaches={setListTaches} />)}
                    </li>
                ))}
            </ul>
        </main>
    );
}