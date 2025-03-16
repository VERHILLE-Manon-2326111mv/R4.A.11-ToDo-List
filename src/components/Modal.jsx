import ToDoForm from "./ToDoForm";
import CategoryForm from "./CategoryForm";
import React, {useState} from "react";

export default function Modal({ setShowPopup, listTaches, setListTaches }) {
    const [formType, setFormType] = useState("");
    const [selectedForm, setSelectedForm] = useState("");

    const showTaskForm = () => {
        setFormType("task");
        setShowPopup(true);
        setSelectedForm("task");
    };

    const showCategoryForm = () => {
        setFormType("category");
        setShowPopup(true);
        setSelectedForm("category");
    };

    return <div className="popup">
        <div className="popup-content">
            <div className="button-group">
                <button className={selectedForm === "task" ? "selected" : ""} onClick={showTaskForm}>Créer une tâche</button>
                <button className={selectedForm === "category" ? "selected" : ""} onClick={showCategoryForm}>Créer une catégorie</button>
            </div>

            {formType === "task" && <ToDoForm listTaches={listTaches} setListTaches={setListTaches}/>}
            {formType === "category" && <CategoryForm />}

        </div>
    </div>
}