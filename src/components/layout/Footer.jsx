import Modal from "../Modal";
import React, {useState} from "react";
import {useToDo} from "../../context/ToDoContext";

export default function Footer() {
    const [showPopup, setShowPopup] = useState(false);
    const {setTasks, setCategories, setRelations} = useToDo();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const reset = () => {
        setTasks([]);
        setCategories([]);
        setRelations([]);
    };

    if (!isDataLoaded) {
        if (window.confirm('Voulez vous reset des données ?')) {
            reset();
        }
        setIsDataLoaded(true)
    }

    const resetButton = () => {
        if (window.confirm('Voulez vous reset des données ?')) {
            reset();
        }
    }

    return (
        <footer className="App-footer">
            <p>To-Do List by Manon VERHILLE</p>

            {/*Pop-up d'affichage des formulaires :*/}
            {showPopup && (<Modal setShowPopup={setShowPopup}/>)}

            <button onClick={() => resetButton()}>
                RESET
            </button>

            <button onClick={() => setShowPopup(prev => !prev)}>
                {showPopup ? "✘" : "+"}
            </button>
        </footer>
    );
}