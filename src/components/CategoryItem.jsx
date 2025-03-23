import React, {useState} from "react";
import {useToDo} from "../context/ToDoContext";

export default function CategoryItem({cat}) {
    const handleDelete = (id) => {
        setCategories(prevCat => prevCat.filter(c => c.id !== id));
    };
    const {setCategories} = useToDo()
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className="description">
            <h4>Description :</h4>
            {!showEdit ? (
                <p>{cat.description}</p>
            ) : (
                <div>
                    <textarea
                        id="Description"
                        value={cat.description || ''}
                        onChange={(e) => {
                            setCategories(prevCat =>
                                prevCat.map(c =>
                                    c.id === cat.id ? { ...c, description: e.target.value } : c
                                )
                            );
                        }}
                    ></textarea>

                    <h4>Couleur :</h4>
                    <select value={cat.color} onChange={(e) => {
                        setCategories(prevCat =>
                            prevCat.map(c =>
                                c.id === cat.id ? { ...c, color: e.target.value } : c
                            )
                        );
                    }}>
                        <option value="brown">Marron</option>
                        <option value="red">Rouge</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Jaune</option>
                        <option value="green">Vert</option>
                        <option value="bluesky">Bleu clair</option>
                        <option value="blue">Bleu foncé</option>
                        <option value="purple">Violet</option>
                        <option value="pink">Rose</option>
                    </select>

                    <h4>Icône : </h4>
                    <select value={cat.icon} onChange={(e) => {
                        setCategories(prevCat =>
                            prevCat.map(c =>
                                c.id === cat.id ? { ...c, icon: e.target.value } : c
                            )
                        );
                    }}>
                        <option value="">Aucune icône</option>
                        <option value="📍">📍</option>
                        <option value="📢">📢</option>
                        <option value="✨">✨</option>
                        <option value="⚽">⚽</option>
                        <option value="💻">💻</option>
                        <option value="🎮">🎮</option>
                        <option value="🎉">🎉</option>
                        <option value="👕">👕</option>
                        <option value="✈️">✈️</option>
                    </select>
                </div>
            )}
            <div className="description-end">
                <div className="task-buttons">
                    <button onClick={() => handleDelete(cat.id)}>Supprimer</button>
                    <button onClick={() => setShowEdit(prev => !prev)}>Modifier</button>
                </div>
            </div>
        </div>
    );
}