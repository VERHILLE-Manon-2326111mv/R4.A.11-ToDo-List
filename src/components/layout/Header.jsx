import React from "react";
import {useToDo} from "../../context/ToDoContext";

export default function Header(){
    const {tasks} = useToDo()

    return (
        <header className="App-header">
            <div className="App-name">
                <h1>To-Do</h1>
                <img src="/img/logoAMU.png" alt="Logo de l'académie d'AMU"/>
            </div>
            <p> {tasks.length} tâches, dont {tasks.filter(task => !task.done).length} en cours</p>
        </header>
    )
}