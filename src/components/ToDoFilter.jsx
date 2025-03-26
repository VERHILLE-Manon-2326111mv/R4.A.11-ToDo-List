export default function ToDoFilter({ trier, filtrer, rechercher }) {
    return (
        <div id="filter-buttons">
            <div id="select-container">
                {/* Sélecteur pour trier les tâches selon différents critères */}
                <select onChange={(e) => trier(e.target.value)}>
                    <option value="tri_date_echeance_croissant">Tri par date d'échéance (croissant)</option>
                    <option value="tri_date_echeance_decroissant">Tri par date d'échéance (décroissant)</option>
                    <option value="tri_alpha_croissant">Tri par ordre alphabétique (croissant)</option>
                    <option value="tri_alpha_decroissant">Tri par ordre alphabétique (décroissant)</option>
                    <option value="tri_date_creation_croissant">Tri par date de création (croissant)</option>
                    <option value="tri_date_creation_decroissant">Tri par date de création (décroissant)</option>
                    <option value="tri_categorie">Trier par catégorie</option>
                </select>

                {/* Sélecteur pour filtrer les tâches en fonction de leur statut */}
                <select onChange={(e) => filtrer(e.target.value)}>
                    <option value="all">Toutes les tâches</option>
                    <option value="not_done">Tâches en cours</option>
                    <option value="done">Tâches effectuées</option>
                </select>
            </div>

            {/* Champ de recherche pour filtrer les tâches par texte */}
            <input type="search"
                minLength={3}  // Minimum de 3 caractères pour la recherche
                placeholder="Rechercher une tâche"
                onChange={(e) => rechercher(e.target.value)} />
        </div>
    );
}
