import {createContext, useContext,  useState} from "react";
import todos from "../json/todos.json";

const ToDoContext = createContext();

export const ToDoProvider = ({children}) => {
    const [tasks, setTasks] = useState(todos.taches || []);
    const [categories, setCategories] = useState(todos.categories ||[]);
    const [relations, setRelations] = useState(todos.relations ||[]);

    return (
        <ToDoContext.Provider value={{tasks, setTasks, categories, setCategories, relations, setRelations}}>
            {children}
        </ToDoContext.Provider>
    );
};

export const useToDo = () => {
    return useContext(ToDoContext);
}
