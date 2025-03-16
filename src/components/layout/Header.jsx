export default function Header({nbTaches, nbTachesEnCours}){
    return (
        <header className="App-header">
            <div className="App-name">
                <h1>To-Do</h1>
                <img src="/img/logoAMU.png" alt="Logo de l'académie d'AMU"/>
            </div>
            <p> {nbTaches} tâches, dont {nbTachesEnCours} en cours</p>
        </header>
    )
}