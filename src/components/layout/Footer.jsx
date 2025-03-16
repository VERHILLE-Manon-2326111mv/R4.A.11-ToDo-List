import Modal from "../Modal";
import React, {useState} from "react";

export default function Footer({listTaches, setListTaches }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <footer className="App-footer">
            <p>To-Do List by Manon VERHILLE</p>

            {/*Pop-up d'affichage des formulaires :*/}
            {showPopup && (<Modal setShowPopup={setShowPopup} listTaches={listTaches} setListTaches={setListTaches}/>)}

            <button onClick={() => setShowPopup(prev => !prev)}>
                {showPopup ? "✘" : "+"}
            </button>
        </footer>
    );
}