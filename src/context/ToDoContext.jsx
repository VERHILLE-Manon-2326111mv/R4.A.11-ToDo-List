import { createContext, useContext, useState } from "react";
import todos from "../json/todos.json";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
    // Gestion des tâches expirées
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const parseDate = (dateString) => {
        if (!dateString) return null;
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const [day, month, year] = parts.map(Number);
            return new Date(year, month - 1, day);
        }
        return new Date(dateString);
    };

    const filterValidTasks = (taskList) => {
        return taskList.filter(tache => {
            if (!tache.date_echeance) return true;
            const taskDate = parseDate(tache.date_echeance);
            return taskDate && taskDate >= oneWeekAgo;
        });
    };

    // Création des états
    const [tasks, setTasksState] = useState(filterValidTasks(todos.taches || []));
    const [categories, setCategories] = useState(todos.categories || []);
    const [relations, setRelations] = useState(todos.relations || []);

    const setTasks = (newTasks) => {
        setTasksState(filterValidTasks(newTasks));
    };

    // Mise en place du contexte
    return (
        <ToDoContext.Provider value={{ tasks, setTasks, categories, setCategories, relations, setRelations }}>
            {children}
        </ToDoContext.Provider>
    );
};

// Hook pour utiliser le contexte
export const useToDo = () => {
    return useContext(ToDoContext);
};
