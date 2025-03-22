import React, { useState, useEffect } from "react";
import { useToDo } from "../context/ToDoContext";
import ToDoItem from "./ToDoItem";
import ToDoFilter from "./ToDoFilter";

export default function ToDoList() {
    const { tasks, setTasks } = useToDo();
    const [showTasks, setShowTasks] = useState({});
    const [ordreTri, setOrdreTri] = useState("tri_date_echeance");
    const [typeFiltre, setTypeFiltre] = useState("all");
    const listTachesOriginal = [...tasks];
    const [searchQuery, setSearchQuery] = useState("");

    const toggleTasks = (taskId) => {
        setShowTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    const normalizeString = (str) => (str || "").trim().toLowerCase();

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    const stripLeadingNumbers = (str) => str.replace(/^\d+\.\s*/, "");

    useEffect(() => {
        let newList = [...listTachesOriginal];

        switch (typeFiltre) {
            case "not_done":
                newList = newList.filter(tache => !tache.done);
                break;
            case "done":
                newList = newList.filter(tache => tache.done);
                break;
            default:
                break;
        }

        if (searchQuery.length >= 3) {
            newList = newList.filter(tache =>
                normalizeString(tache.title).includes(normalizeString(searchQuery)) ||
                normalizeString(tache.description).includes(normalizeString(searchQuery))
            );
        }

        switch (ordreTri) {
            case "tri_alpha_croissant":
                newList.sort((a, b) => normalizeString(stripLeadingNumbers(a.title))
                    .localeCompare(normalizeString(stripLeadingNumbers(b.title))));
                break;
            case "tri_alpha_decroissant":
                newList.sort((a, b) => normalizeString(stripLeadingNumbers(b.title))
                    .localeCompare(normalizeString(stripLeadingNumbers(a.title))));
                break;
            case "tri_date_creation_croissant":
                newList.sort((a, b) => parseDate(a.date_creation) - parseDate(b.date_creation));
                break;
            case "tri_date_creation_decroissant":
                newList.sort((a, b) => parseDate(b.date_creation) - parseDate(a.date_creation));
                break;
            case "tri_date_echeance_croissant":
                newList.sort((a, b) => parseDate(a.date_echeance) - parseDate(b.date_echeance));
                break;
            case "tri_date_echeance_decroissant":
                newList.sort((a, b) => parseDate(b.date_echeance) - parseDate(a.date_echeance));
                break;
            case "tri_categorie":
                newList.sort((a, b) => (a.categories?.[0] || "").localeCompare(b.categories?.[0] || ""));
                break;
            default:
                break;
        }

        setTasks(newList); // 🔥 Mise à jour du contexte
    }, [ordreTri, typeFiltre, searchQuery, listTachesOriginal]);

    const trier = (value) => {
        setOrdreTri(value);
    };

    const filtrer = (value) => {
        setTypeFiltre(value);
    };

    return (
        <main>
            <h2>Filtrer les tâches :</h2>
            <ToDoFilter trier={trier} filtrer={filtrer} rechercher={setSearchQuery}/>
            <h2>Liste des tâches :</h2>
            <ul className="tacks-list">
                {tasks.map(task => (
                    <li className="tacks-list-li" key={task.id}>
                        <div className="task-name">
                            <input type="checkbox" checked={task.done} onChange={(e) => {
                                setTasks(prevTaches =>
                                    prevTaches.map(t =>
                                        t.id === task.id ? { ...t, done: e.target.checked } : t
                                    )
                                );
                            }}></input>
                            <h3 className={"task-" + task.done}>{task.title}</h3>
                            <p>Fini le {task.date_echeance}</p>
                            <button id={"item-" + task.id} onClick={() => toggleTasks(task.id)}>
                                {showTasks[task.id] ? "⇑" : "⇓"}
                            </button>
                        </div>
                        {showTasks[task.id] && (<ToDoItem task={task}/>)}
                    </li>
                ))}
            </ul>
        </main>
    );
}
