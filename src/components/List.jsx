import React, {useState} from "react";
import ToDoList from "./ToDoList";
import CategoryList from "./CategoryList";


export default function List() {
    const [listype, setListType] = useState("task");
    const [selectedList, setSelectedList] = useState("task");

    const showTaskList = () => {
        setListType("task");
        setSelectedList("task");
    };

    const showCategoryList = () => {
        setListType("category");
        setSelectedList("category");
    };

    return <main>
        <div className="list-content">
            <div className="button-group">
                <button className={selectedList === "task" ? "selected" : ""} onClick={showTaskList}>Liste des tâches</button>
                <button className={selectedList === "category" ? "selected" : ""} onClick={showCategoryList}>Liste des catégories</button>
            </div>

            {listype === "task" && <ToDoList />}
            {listype === "category" && <CategoryList />}

        </div>
    </main>
}