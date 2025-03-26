import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

export default function CategoryItem({ cat }) {
    const { setCategories } = useToDo();
    const [showEdit, setShowEdit] = useState(false);

    // Fonction pour supprimer une catégorie
    const handleDelete = (id) => {
        setCategories(prevCat => prevCat.filter(c => c.id !== id));
    };

    return (
        <div className="description">
            <h4>Description :</h4>

            {/* Affichage de la description, si on est en mode édition */}
            {!showEdit ? (
                <p>{cat.description}</p>
            ) : (
                <div>
                    {/* Champ texte pour modifier la description de la catégorie */}
                    <textarea
                        id="Description"
                        value={cat.description || ''}
                        onChange={(e) => {
                            // Met à jour la description de la catégorie dans le contexte
                            setCategories(prevCat =>
                                prevCat.map(c =>
                                    c.id === cat.id ? { ...c, description: e.target.value } : c
                                )
                            );
                        }}
                    ></textarea>

                    <h4>Couleur :</h4>
                    {/* Sélecteur pour changer la couleur de la catégorie */}
                    <select value={cat.color} onChange={(e) => {
                        // Met à jour la couleur de la catégorie dans le contexte
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
                    {/* Sélecteur pour changer l'icône de la catégorie */}
                    <select value={cat.icon} onChange={(e) => {
                        // Met à jour l'icône de la catégorie dans le contexte
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

            {/* Section avec les boutons pour supprimer ou modifier la catégorie */}
            <div className="description-end">
                <div className="task-buttons">
                    {/* Bouton pour supprimer la catégorie */}
                    <button onClick={() => handleDelete(cat.id)}>Supprimer</button>

                    {/* Bouton pour basculer en mode édition */}
                    <button onClick={() => setShowEdit(prev => !prev)}>Modifier</button>
                </div>
            </div>
        </div>
    );
}
