import Modal from "../Modal";
import React, {useState} from "react";
import {useToDo} from "../../context/ToDoContext";

export default function Footer() {
    const [showPopup, setShowPopup] = useState(false);
    const {tasks, setTasks} = useToDo();

    return (
        <footer className="App-footer">
            <p>To-Do List by Manon VERHILLE</p>

            {/*Pop-up d'affichage des formulaires :*/}
            {showPopup && (<Modal setShowPopup={setShowPopup}/>)}

            <button onClick={() => setShowPopup(prev => !prev)}>
                {showPopup ? "✘" : "+"}
            </button>
        </footer>
    );
}