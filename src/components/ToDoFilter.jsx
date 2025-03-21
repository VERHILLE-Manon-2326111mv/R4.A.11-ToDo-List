export default function ToDoFilter({trier, filtrer, rechercher}){
    return (
        <div id="filter-buttons">
            <select onChange={(e) => trier(e.target.value)}>
                <option value="tri_date_echeance_croissant">Tri par date d'échéance (croissant)</option>
                <option value="tri_date_echeance_décroissant">Tri par date d'échéance (décroissant)</option>
                <option value="tri_alpha_croissant">Tri par ordre alphabétique (croissant)</option>
                <option value="tri_alpha_decroissant">Tri par ordre alphabétique (décroissant)</option>
                <option value="tri_date_creation_croissant">Tri par date de création (croissant)</option>
                <option value="tri_date_creation_decroissant">Tri par date de création (décroissant)</option>
                <option value="tri_categorie">Trier par catégorie</option>
            </select>

            <select onChange={(e) => filtrer(e.target.value)}>
                <option value="all">Toutes les tâches</option>
                <option value="not_done">Tâches en cours</option>
                <option value="done">Tâches effectuées</option>
            </select>

            <input type="search" minLength={3} placeholder="Rechercher une tâche" onChange={(e) => rechercher(e.target.value)}/>
        </div>
    );
}