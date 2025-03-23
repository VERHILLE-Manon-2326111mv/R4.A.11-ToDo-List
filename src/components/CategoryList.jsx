import React, {useState} from "react";
import { useToDo } from "../context/ToDoContext";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
    const {categories} = useToDo();
    const [showCategories, setShowCategories] = useState({});

    const toggleCategroies = (catId) => {
        setShowCategories(prev => ({
            ...prev,
            [catId]: !prev[catId]
        }));
    };

    return (
        <div className="list">
            <h2>Liste des catégories :</h2>
            <ul className="list-ul">
                {categories.map(cat => (
                    <li className={"list-ul-li " + cat.color} key={cat.id}>
                        <div className="task-name">
                            {cat.icon !== "" && (
                                <p>{cat.icon}</p>
                            )}
                            <h3>{cat.title}</h3>
                            <button id={"item-" + cat.id} onClick={() => toggleCategroies(cat.id)}>
                                {showCategories[cat.id] ? "⇑" : "⇓"}
                            </button>
                        </div>
                        {showCategories[cat.id] && (<CategoryItem cat={cat}/>)}
                    </li>
                ))}
            </ul>
        </div>
    );
}