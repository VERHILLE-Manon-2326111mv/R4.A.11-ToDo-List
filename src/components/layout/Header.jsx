import React from "react";
import { useToDo } from "../../context/ToDoContext";

export default function Header() {
    // Utilisation du hook personnalisé `useToDo` pour récupérer les tâches depuis le contexte
    const { tasks } = useToDo();

    return (
        <header className="App-header">
            {/* Section affichant le nom et le logo */}
            <div className="App-name">
                <h1>To-Do</h1>
                <img src="/img/logoAMU.png" alt="Logo de l'académie d'AMU" />
            </div>

            {/* Affiche le nombre total de tâches et le nombre de tâches en cours */}
            <p>
                {tasks.length} tâches, dont {tasks.filter(task => !task.done).length} en cours
            </p>
        </header>
    );
}
