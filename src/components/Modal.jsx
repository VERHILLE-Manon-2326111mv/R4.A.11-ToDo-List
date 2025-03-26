import ToDoForm from "./ToDoForm";
import CategoryForm from "./CategoryForm";
import React, {useState} from "react";

export default function Modal({ setShowPopup }) {
    // Déclaration de l'état local pour gérer quel formulaire afficher (par défaut "task")
    const [formType, setFormType] = useState("task");

    // Déclaration de l'état pour gérer quel bouton est actuellement sélectionné
    const [selectedForm, setSelectedForm] = useState("task");

    // Fonction pour afficher le formulaire de création de tâche
    const showTaskForm = () => {
        setFormType("task");
        setShowPopup(true);
        setSelectedForm("task");
    };

    // Fonction pour afficher le formulaire de création de catégorie
    const showCategoryForm = () => {
        setFormType("category");
        setShowPopup(true);
        setSelectedForm("category");
    };

    return <div className="popup">
        <div className="popup-content">
            {/* Groupe de boutons pour choisir entre les formulaires de création de tâche ou de catégorie */}
            <div className="button-group">
                {/* Bouton pour afficher le formulaire de création de tâche */}
                <button className={selectedForm === "task" ? "selected" : ""} onClick={showTaskForm}>
                    Créer une tâche
                </button>

                {/* Bouton pour afficher le formulaire de création de catégorie */}
                <button className={selectedForm === "category" ? "selected" : ""} onClick={showCategoryForm}>
                    Créer une catégorie
                </button>
            </div>

            {/* Affichage conditionnel des formulaires */}
            {formType === "task" && <ToDoForm />}  {/* Si "task", afficher le formulaire ToDoForm */}
            {formType === "category" && <CategoryForm />}  {/* Si "category", afficher le formulaire CategoryForm */}

        </div>
    </div>
}
